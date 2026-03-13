import fs from "fs-extra";
import { spawn } from "child_process";

let handler = async (m, { conn, setReply }) => {
  const p = m.quoted ? m.quoted : m;
  const mime = (p.msg || p).mimetype || "";

  if (!/audio/.test(mime)) {
    return setReply("Reply audionya");
  }

  setReply("Tunggu sebentar...");

  try {
    let medoi = await p.download(true);
    let ran = getRandomFile(".mp3");

    const args = [
      "-i",
      medoi,
      "-af",
      "atempo=1.06,asetrate=44100*1.25",
      "-b:a",
      "128k",
      "-y",
      ran
    ];

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.on("error", async (err) => {
      await fs.remove(medoi).catch(() => {});
      await fs.remove(ran).catch(() => {});
      console.error(err);
      setReply(`Error: ${err.message}`);
    });

    ffmpeg.on("close", async (code) => {
      if (code !== 0) {
        await fs.remove(medoi).catch(() => {});
        await fs.remove(ran).catch(() => {});
        return setReply(`FFmpeg exited with code ${code}`);
      }

      let buffer = await fs.readFile(ran);

      await conn.sendMessage(
        m.chat,
        {
          audio: buffer,
          mimetype: "audio/mpeg",
          fileName: "nightcore.mp3"
        },
        { quoted: m }
      );

      await fs.remove(medoi).catch(() => {});
      await fs.remove(ran).catch(() => {});
    });

  } catch (err) {
    console.error(err);
    setReply(`Error: ${err.message || "Terjadi kesalahan saat memproses audio."}`);
  }
};

handler.help = ["nightcore"];
handler.tags = ["audio"];
handler.command = ["nightcore"];

export default handler;

function getRandomFile(ext) {
  return `./tmp/${Date.now()}${ext}`;
}