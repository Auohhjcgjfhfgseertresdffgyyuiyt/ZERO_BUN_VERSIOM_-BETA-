import fs from "fs";

// ==========================
// CRC32 (Bun Built-in)
// ==========================
const crc32 = (buf) => Bun.CRC32(buf);

// ==========================
// ZIP Builder Manual (ESM)
// ==========================
function createZipESM(files, outPath) {
  let offset = 0;
  let entries = [];
  const fd = fs.openSync(outPath, "w");

  for (const f of files) {
    const data = f.buffer;
    const name = f.name;
    const nameBuf = Buffer.from(name);
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);

    fs.writeSync(fd, local);
    fs.writeSync(fd, nameBuf);
    fs.writeSync(fd, data);

    entries.push({
      nameBuf,
      crc,
      size: data.length,
      offset,
    });

    offset += local.length + nameBuf.length + data.length;
  }

  const cdStart = offset;

  for (const f of entries) {
    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(0, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt32LE(f.crc, 16);
    cd.writeUInt32LE(f.size, 20);
    cd.writeUInt32LE(f.size, 24);
    cd.writeUInt16LE(f.nameBuf.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(f.offset, 42);

    fs.writeSync(fd, cd);
    fs.writeSync(fd, f.nameBuf);

    offset += cd.length + f.nameBuf.length;
  }

  const cdEnd = offset;

  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cdEnd - cdStart, 12);
  end.writeUInt32LE(cdStart, 16);
  end.writeUInt16LE(0, 20);

  fs.writeSync(fd, end);
  fs.closeSync(fd);

  return outPath;
}

// ==========================
// GOOGLE DRIVE Scraper (ESM)
// ==========================
async function gdriveESM(url) {
  const KEY = "AIzaSyAA9ERw-9LZVEohRYtCWka_TQc6oXmvcVU";

  const extract = (u) => {
    const p = [
      /\/file\/d\/(.+?)\//,
      /id=(.+?)(&|$)/,
      /folders\/(.+?)(\/|$)/,
    ];
    for (const r of p) {
      const m = u.match(r);
      if (m) return m[1];
    }
    return url;
  };

  const id = extract(url);

  const meta = await fetch(
    `https://www.googleapis.com/drive/v3/files/${id}?key=${KEY}&fields=id,name,mimeType`
  ).then((r) => r.json());

  // ===== FILE =====
  if (meta.mimeType !== "application/vnd.google-apps.folder") {
    return {
      type: "file",
      name: meta.name,
      download: `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${KEY}`,
    };
  }

  // ===== FOLDER → ZIP =====
  const list = await fetch(
    `https://www.googleapis.com/drive/v3/files?key=${KEY}&q='${id}'+in+parents&fields=files(id,name,mimeType)`
  ).then((r) => r.json());

  const arr = [];

  for (const f of list.files) {
    if (!f.mimeType.startsWith("image")) continue;

    const buff = await fetch(
      `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${KEY}`
    ).then((r) => r.arrayBuffer());

    arr.push({
      name: f.name,
      buffer: Buffer.from(buff),
    });
  }

  const zipName = meta.name + ".zip";
  const path = "./" + zipName;

  createZipESM(arr, path);

  return {
    type: "zip",
    name: zipName,
    path,
  };
}

// ==========================
// HANDLER (ESM)
// ==========================
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`Example:\n${usedPrefix + command} <drive-url>`);

  m.reply("⏳ Downloading...");

  try {
    const res = await gdriveESM(args[0]);

    if (res.type === "file") {
      return await conn.sendMessage(m.chat, {
        document: { url: res.download },
        fileName: res.name,
        mimetype: "application/octet-stream",
      });
    }

    if (res.type === "zip") {
      return await conn.sendMessage(m.chat, {
        document: fs.readFileSync(res.path),
        fileName: res.name,
        mimetype: "application/zip",
      });
    }
  } catch (e) {
    m.reply("❌ Error: " + e.message);
  }
};

handler.help = ["gdrive <url>"];
handler.tags = ["tools"];
handler.command = /^gdrive|drive|gd$/i;

export default handler;