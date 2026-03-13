 import fs from "fs-extra";
import path from "path";

/* ==========================================================
   ZIP WRITER TANPA ARCHIVER — PURE JS ZIP FORMAT (STORE)
   - Fixed header offsets, added CRC32, DOS timestamp
   - EOCD fields corrected
   - Safe for large files (writes to disk, not building giant Buffer)
========================================================== */

function writeUInt16LE(buf, v, o) { buf.writeUInt16LE(v, o); }
function writeUInt32LE(buf, v, o) { buf.writeUInt32LE(v, o); }

// Simple CRC32 implementation (fast table-driven)
const CRC32_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : (c >>> 1);
    t[i] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Convert JS Date to DOS time/date fields used by ZIP
function dateToDos(dt) {
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  const seconds = Math.floor(dt.getSeconds() / 2); // DOS stores seconds divided by 2

  const dosTime = (hours << 11) | (minutes << 5) | seconds;
  const dosDate = ((year - 1980) << 9) | (month << 5) | day;
  return { time: dosTime & 0xffff, date: dosDate & 0xffff };
}

async function zipFolderNative(folderPath, outPath) {
  const files = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = path.relative(folderPath, full).replace(/\\/g, "/");

      if (e.isDirectory()) {
        await walk(full);
      } else {
        const stat = await fs.stat(full);
        files.push({ full, rel, size: stat.size, mtime: stat.mtime });
      }
    }
  }

  await walk(folderPath);

  // open file descriptor for writing
  const fd = await fs.open(outPath, "w");
  let offset = 0;
  const centralDir = [];

  for (const f of files) {
    const data = await fs.readFile(f.full);
    const nameBuf = Buffer.from(f.rel);
    const dos = dateToDos(new Date(f.mtime || Date.now()));
    const crc = crc32(data);
    const compSize = data.length;
    const uncompSize = data.length;

    // Local File Header (30 bytes fixed)
    const localHeader = Buffer.alloc(30);
    writeUInt32LE(localHeader, 0x04034b50, 0); // local file header sig
    writeUInt16LE(localHeader, 20, 4); // version needed to extract
    writeUInt16LE(localHeader, 0, 6); // general purpose bit flag
    writeUInt16LE(localHeader, 0, 8); // compression method (0 = store)
    writeUInt16LE(localHeader, dos.time, 10); // last mod time
    writeUInt16LE(localHeader, dos.date, 12); // last mod date
    writeUInt32LE(localHeader, crc, 14); // crc32
    writeUInt32LE(localHeader, compSize, 18); // compressed size
    writeUInt32LE(localHeader, uncompSize, 22); // uncompressed size
    writeUInt16LE(localHeader, nameBuf.length, 26); // file name length
    writeUInt16LE(localHeader, 0, 28); // extra field length

    // Write local header
    await fs.write(fd, localHeader, 0, localHeader.length, offset);
    offset += localHeader.length;

    // Write filename
    await fs.write(fd, nameBuf, 0, nameBuf.length, offset);
    offset += nameBuf.length;

    // Write file data (stored, uncompressed)
    await fs.write(fd, data, 0, data.length, offset);
    offset += data.length;

    // Save info for central directory. The relative offset is the position
    // where the local header begins.
    const localHeaderOffset = offset - (localHeader.length + nameBuf.length + data.length);
    centralDir.push({
      rel: f.rel,
      size: uncompSize,
      compSize,
      crc,
      offset: localHeaderOffset,
      dos
    });
  }

  const centralStart = offset;

  // Central Directory
  for (const f of centralDir) {
    const nameBuf = Buffer.from(f.rel);
    const header = Buffer.alloc(46);

    writeUInt32LE(header, 0x02014b50, 0); // central file header sig
    writeUInt16LE(header, 20, 4); // version made by
    writeUInt16LE(header, 20, 6); // version needed to extract
    writeUInt16LE(header, 0, 8); // general purpose bit flag
    writeUInt16LE(header, 0, 10); // compression method
    writeUInt16LE(header, f.dos.time, 12); // last mod time
    writeUInt16LE(header, f.dos.date, 14); // last mod date
    writeUInt32LE(header, f.crc, 16); // crc32
    writeUInt32LE(header, f.compSize, 20); // compressed size
    writeUInt32LE(header, f.size, 24); // uncompressed size
    writeUInt16LE(header, nameBuf.length, 28); // file name length
    writeUInt16LE(header, 0, 30); // extra field length
    writeUInt16LE(header, 0, 32); // file comment length
    writeUInt16LE(header, 0, 34); // disk number start
    writeUInt16LE(header, 0, 36); // internal file attributes
    writeUInt32LE(header, 0, 38); // external file attributes
    writeUInt32LE(header, f.offset, 42); // relative offset of local header

    await fs.write(fd, header, 0, header.length, offset);
    offset += header.length;

    await fs.write(fd, nameBuf, 0, nameBuf.length, offset);
    offset += nameBuf.length;
  }

  const centralEnd = offset;
  const centralSize = centralEnd - centralStart;

  // End of central directory record (22 bytes)
  const endRecord = Buffer.alloc(22);
  writeUInt32LE(endRecord, 0x06054b50, 0); // EOCD signature
  writeUInt16LE(endRecord, 0, 4); // number of this disk
  writeUInt16LE(endRecord, 0, 6); // number of the disk with the start of the central directory
  writeUInt16LE(endRecord, centralDir.length, 8); // total entries on this disk
  writeUInt16LE(endRecord, centralDir.length, 10); // total entries
  writeUInt32LE(endRecord, centralSize, 12); // size of central directory
  writeUInt32LE(endRecord, centralStart, 16); // offset of start of central directory
  writeUInt16LE(endRecord, 0, 20); // zip file comment length

  await fs.write(fd, endRecord, 0, endRecord.length, offset);
  offset += endRecord.length;

  await fs.close(fd);
}

/* ==========================================================
   HANDLER (menyesuaikan sedikit: gunakan setReply bukan mess.wait)
========================================================== */

let handler = async (m, { text: q, conn, setReply }) => {
  if (!q) return setReply("Nama foldernya apa?");
  const folderPath = path.resolve(`./${q}`);
  const zipPath = path.resolve(`./${q}.zip`);
  const name = `${q}.zip`;
  const mimetype = "application/zip";
  let jpegThumbnail = null;
  try {
    jpegThumbnail = await fs.readFile("./media/thumbnaildokumen.jpg");
  } catch {
    // thumbnail optional; ignore if not present
  }

  try {
    if (!(await fs.pathExists(folderPath)))
      return setReply("Folder tidak ditemukan");

    if (!(await fs.stat(folderPath)).isDirectory())
      return setReply("Path tersebut bukan folder");

    setReply("Membuat arsip ZIP, mohon tunggu...");

    await zipFolderNative(folderPath, zipPath);

    const file = await fs.readFile(zipPath);

    await conn.sendMessage(
      m.chat,
      {
        document: file,
        fileName: name,
        mimetype,
        jpegThumbnail,
      },
      { quoted: m }
    );

    await fs.unlink(zipPath);
  } catch (error) {
    console.error(error);
    setReply(`Error: ${error.message}`);
  }
};

handler.help = ["getfolder"];
handler.tags = ["internet"];
handler.command = /^(getfolder|gfo)$/i;
handler.owner = true;

export default handler;