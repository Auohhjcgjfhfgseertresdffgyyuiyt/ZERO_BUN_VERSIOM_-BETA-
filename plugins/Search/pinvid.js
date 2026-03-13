/**
 🍀 Plugins Pinterest Video (BUN VERSION)
 
 * Rewrite by AI
 * Original CR Ponta Sensei
**/

import fs from "fs";
import path from "path";

const tmpDir = "./tmp";

async function runFFmpeg(inputUrl, outputPath) {
  const proc = Bun.spawn({
    cmd: [
      "ffmpeg",
      "-y",
      "-loglevel",
      "error",
      "-allowed_extensions", "ALL",
      "-i",
      inputUrl,
      "-c",
      "copy",
      "-bsf:a",
      "aac_adtstoasc",
      outputPath,
    ],
    stdout: "pipe",
    stderr: "pipe",
  });

  const exitCode = await proc.exited;
  if (exitCode !== 0) {
    const err = await new Response(proc.stderr).text();
    throw new Error(err || "FFmpeg gagal");
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `⚠️ *Contoh penggunaan:*\n` +
      `${usedPrefix + command} anime\n` +
      `${usedPrefix + command} landscape video\n` +
      `${usedPrefix + command} cooking tutorial`
    );
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: "🕑", key: m.key } });

    const query = `${text} video`;
    const apiUrl =
      "https://api.codeteam.web.id/api/v1/pinterest-search?query=" +
      encodeURIComponent(query);

    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json?.data || json.data.length === 0) {
      return m.reply("❌ *Tidak ditemukan video!*");
    }

    // Ambil video yang punya URL valid
    const videos = json.data.filter(v => v.videoUrl && v.videoUrl !== "gak ada");
    if (!videos.length) return m.reply("❌ *Video tidak ditemukan!*");

    const pick = videos[Math.floor(Math.random() * videos.length)];

    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const filename = `pinvid_${Date.now()}.mp4`;
    const output = path.join(tmpDir, filename);

    try {
      await runFFmpeg(pick.videoUrl, output);

      if (!fs.existsSync(output)) throw new Error("File video tidak terbentuk");

      const caption =
        `📌 *PINTEREST VIDEO*\n\n` +
        `*Judul:* ${pick.title || "-"}\n` +
        `*Uploader:* ${pick.pinner || "-"}\n` +
        `*Username:* ${pick.pinnerUsername || "-"}\n` +
        `*Board:* ${pick.boardName || "-"}\n` +
        `*ID:* ${pick.id}\n\n` +
        `_Query: ${text}_`;

      await conn.sendMessage(
        m.chat,
        {
          video: fs.readFileSync(output),
          caption,
          mimetype: "video/mp4",
          fileName: filename,
        },
        { quoted: m }
      );

      fs.unlinkSync(output);
    } catch (e) {
      // Fallback: kirim URL langsung
      const fallback =
        `🎬 *VIDEO DETAIL*\n\n` +
        `*Judul:* ${pick.title || "-"}\n` +
        `*Uploader:* ${pick.pinner || "-"}\n` +
        `*Username:* ${pick.pinnerUsername || "-"}\n` +
        `*Board:* ${pick.boardName || "-"}\n` +
        `*Video URL:* ${pick.videoUrl}\n` +
        `*Image:* ${pick.imageUrl || "-"}\n\n` +
        `_⚠️ Gagal convert video, silakan buka link di atas_`;

      await conn.sendMessage(m.chat, { text: fallback }, { quoted: m });
    }
  } catch (err) {
    console.error(err);
    m.reply("❌ *Terjadi kesalahan!* " + err.message);
  }
};

handler.help = ["pinvid"];
handler.tags = ["internet"];
handler.command = /^(pinterestvideo|pinvid)$/i;
handler.limit = true;
handler.register = true;

export default handler;