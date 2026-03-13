import fs from "fs-extra";
import { spawn } from "bun";
import { ffmpegPath } from "#ffmpeg"

function getRandomFile(ext = "") {
  return `${Math.floor(Math.random() * 9999999)}${ext}`;
}

let handler = async (m, { conn, setReply }) => {
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const p = m.quoted ? m.quoted : m;

  if (!isQuotedSticker) return setReply("Reply stickernya dulu");

  setReply("Tunggu sebentar...");

  try {
    let media = await p.download(true);
    let ran = getRandomFile(".png");

    // Bun spawn (HARUS ARRAY)
    const ffmpeg = spawn([
      ffmpegPath,
      "-i",
      media,
      ran,
    ]);

    // Handle ketika ffmpeg selesai
    ffmpeg.exited.then(async (code) => {
      try {
        if (code !== 0) {
          fs.unlinkSync(media);
          if (fs.existsSync(ran)) fs.unlinkSync(ran);
          return setReply(`FFmpeg exit code: ${code}`);
        }

        let buffer = fs.readFileSync(ran);
        await conn.sendMessage(m.chat, { caption: "Nih", image: buffer });

        fs.unlinkSync(media);
        fs.unlinkSync(ran);
      } catch (err) {
        setReply(err.message);
      }
    });

  } catch (err) {
    setReply(err.message || "Terjadi kesalahan.");
  }
};

handler.help = ["toimg"];
handler.tags = ["converter"];
handler.command = ["toimg", "toimage"];

export default handler;