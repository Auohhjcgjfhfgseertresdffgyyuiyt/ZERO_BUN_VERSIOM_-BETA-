 import fs from "fs";
import path from "path";
import { runFFmpeg } from "#ffmpeg";

function safeUnlink(p) {
  try { if (fs.existsSync(p)) fs.unlinkSync(p); } catch {}
}

function getRandomFile(ext) {
  return path.join(process.cwd(), Date.now() + "_" + Math.random().toString(36).slice(2) + ext);
}

let handler = async (m, { q, conn, prefix, command }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage = m.type === "extendedTextMessage" && m.content.includes("imageMessage");

  const p = m.quoted ? m.quoted : m;

  if (!(isImage || isQuotedImage)) {
    return m.reply("Reply gambarnya.");
  }

  if (!q) {
    return m.reply(`Masukkan ukuran panjangxlebar. Contoh: ${prefix + command} 300x300`);
  }

  let [panjang, lebar] = q.split("x");

  if (!panjang || !lebar || isNaN(panjang) || isNaN(lebar)) {
    return m.reply("Format salah. Contoh benar: 300x300");
  }

  m.reply("Processing...");

  // File input & output
  const input = await p.download(true);
  const output = getRandomFile(".jpeg");

  try {
    // Gunakan runFFmpeg (lebih aman)
    await runFFmpeg([
      "-y",
      "-i", input,
      "-vf", `scale=${panjang}:${lebar}`,
      output
    ]);

    // Kirim hasil
    const buffer = fs.readFileSync(output);
    await conn.sendMessage(
      m.chat,
      { image: buffer, caption: `Nih hasil resize ${panjang}x${lebar}` },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    m.reply("Gagal resize gambar. Pastikan ffmpeg-static berjalan.");
  } finally {
    safeUnlink(input);
    safeUnlink(output);
  }
};

handler.help = ["resize"];
handler.tags = ["tools"];
handler.command = ["resize"];

export default handler;
