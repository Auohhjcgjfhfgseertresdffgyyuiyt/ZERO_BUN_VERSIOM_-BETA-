import fs from "fs-extra";
import { spawn } from "bun";
import { runFFmpeg, ffmpegPath } from "#ffmpeg"

let handler = async (m, { conn, args, setReply }) => {
 const isQuotedAudio = m.quoted? m.quoted.type === "audioMessage" : m 
  const p = m.quoted ? m.quoted : m 

  if (Number(args[0]) >= 11) return setReply("Maksimal volume adalah 10");

  if (!isQuotedAudio) {
    return setReply("Reply audio!");
  }

  setReply("Tunggu sebentar...");

  try {
    let media3 = await p.download(true)
    let rname = getRandomFile(".mp3");

    // Fungsi convert dengan filter volume pakai ffmpeg-static
const adjustVolume = (input, output, volume) =>
  new Promise((resolve, reject) => {
    const ffmpeg = Bun.spawn({
      cmd: [
        ffmpegPath,
        "-i", input,
        "-filter:a", `volume=${volume}`,
        "-y",
        output,
      ],
      stdout: "ignore",
      stderr: "inherit",
    });

    ffmpeg.exited
      .then((code) => {
        if (code === 0) resolve();
        else reject(new Error(`ffmpeg exited with code ${code}`));
      })
      .catch(reject);
  });

    await adjustVolume(media3, rname, args[0]);

    let jadie = await fs.readFile(rname);
    await conn.sendMessage(m.chat, { audio: jadie, mimetype: "audio/mp4", ptt: true }, { quoted: m });

    await fs.unlink(media3);
    await fs.unlink(rname);
  } catch (err) {
    try { await fs.unlink(media3); } catch {}
    try { await fs.unlink(rname); } catch {}
    setReply(`Error: ${err.message || "Terjadi kesalahan saat mengonversi audio."}`);
  }
};

handler.help = ["converter"];
handler.tags = ["internet"];
handler.command = ["volume"];

export default handler;
