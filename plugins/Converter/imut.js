import fs from "fs/promises";
import { spawn } from "child_process";

let handler = async (m, { conn, setReply }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";

  if (!/audio/.test(mime)) {
    return setReply("Reply audionya");
  }

  setReply("Tunggu sebentar...");

  try {
    let input = await q.download(true);
    let output = getRandomFile(".mp3");

    const args = [
      "-i", input,
      "-af", "atempo=1/2,asetrate=44500*2/1",
      "-b:a", "128k",
      "-y",
      output
    ];

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.on("error", async (err) => {
      await fs.unlink(input).catch(() => {});
      await fs.unlink(output).catch(() => {});
      setReply(`Error: ${err.message}`);
    });

    ffmpeg.on("close", async (code) => {
      if (code !== 0) {
        await fs.unlink(input).catch(() => {});
        await fs.unlink(output).catch(() => {});
        return setReply(`FFmpeg exited with code ${code}`);
      }

      let buffer = await fs.readFile(output);

      await conn.sendMessage(
        m.chat,
        {
          audio: buffer,
          mimetype: "audio/mpeg",
          fileName: "imut.mp3"
        },
        { quoted: m }
      );

      await fs.unlink(input).catch(() => {});
      await fs.unlink(output).catch(() => {});
    });

  } catch (err) {
    setReply(`Error: ${err.message || "Terjadi kesalahan saat memproses audio."}`);
  }
};

handler.help = ["imut"];
handler.tags = ["audio"];
handler.command = ["imut"];

export default handler;

function getRandomFile(ext) {
  return `./tmp/${Date.now()}${ext}`;
}