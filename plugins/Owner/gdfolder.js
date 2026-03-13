const API_KEY = process.env.GDRIVE_KEY || "AIzaSyAA9ERw-9LZVEohRYtCWka_TQc6oXmvcVU";

function getFolderId(url) {
  const m = url.match(/folders\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

async function listFiles(folderId) {
  const q = `'${folderId}' in parents and trashed=false`;
  const url =
    "https://www.googleapis.com/drive/v3/files" +
    `?key=${API_KEY}` +
    `&q=${encodeURIComponent(q)}` +
    "&fields=files(id,name,mimeType)";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal ambil file");
  const json = await res.json();
  return json.files || [];
}

let handler = async (m, { conn, args, setReply }) => {
  if (!args[0]) return setReply("❌ Masukkan link folder Google Drive");

  const folderId = getFolderId(args[0]);
  if (!folderId) return setReply("❌ Link folder tidak valid");

  setReply("⏳ Mengambil daftar file...");

  let files;
  try {
    files = await listFiles(folderId);
  } catch (e) {
    return setReply("❌ Gagal membaca folder");
  }

  if (!files.length) return setReply("❌ Folder kosong");

  // (opsional) filter gambar saja
  files = files.filter(f =>
    f.mimeType?.startsWith("image/")
  );

  if (!files.length) return setReply("❌ Tidak ada file gambar");

  let teks = "const gambar = [\n";

  for (const f of files) {
    teks += `  "https://drive.google.com/uc?export=download&id=${f.id}",\n`;
  }

  teks += "];";

  await conn.sendMessage(
    m.chat,
    { text: teks },
    { quoted: m }
  );
};

handler.command = ["gdfolder"];
handler.tags = ["tools"];
handler.help = ["gdfolder <link folder gdrive>"];

export default handler;