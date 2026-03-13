 
import {catbox} from '../../lib/functions/uploader.js'
import fs from "fs-extra";
import { spawn } from "bun";
import { runFFmpeg, ffmpegPath } from "#ffmpeg"

let handler = async (m, { q, conn, isOwner, setReply }) => {
  const isQuotedAudio =
    m.type === "extendedTextMessage" && m.content.includes("audioMessage");
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isVideo = m.type === "videoMessage";
  const p = m.quoted ? m.quoted : m 


  if (!q) return setReply("Nama audionya apa?");
  if (db.data.audio[q])
    return setReply("Nama tersebut sudah ada di dalam database");

  if (isQuotedAudio) {
    let media = await p.download(true)
     let result = await catbox(media);
      db.data.audio[q] = {
        name: q,
        link: result,
      };

    let teks = `Berhasil menambahkan audio
        ke dalam database dengan nama *${q}*`;
    await setReply(teks);
    await fs.unlink(media);
  } else if (isQuotedVideo || isVideo) {
    setReply(mess.wait);
    let media = await p.download(true)
    let ran = getRandomFile(".mp3");

    // Fungsi konversi video/audio ke mp3 dengan ffmpeg-static
    const convertToMp3 = (input, output) =>
      new Promise((resolve, reject) => {
        const ffmpeg = spawn(ffmpegPath, [
          "-i", input,
          "-vn", // no video
          "-acodec", "libmp3lame",
          "-ab", "128k",
          "-f", "mp3",
          output,
        ]);

        ffmpeg.stderr.on("data", () => {}); // optional logging

        ffmpeg.on("error", (err) => reject(err));

        ffmpeg.on("close", (code) => {
          if (code === 0) resolve();
          else reject(new Error(`ffmpeg exited with code ${code}`));
        });
      });

    try {
      await convertToMp3(media, ran);
      await fs.unlink(media);

      let buffer453 = await fs.readFile(ran);
     let result = await catbox(buffer453);
      db.data.audio[q] = {
        name: q,
        link: result,
      };


      let teks = `Berhasil menambahkan audio
ke dalam database dengan nama *${q}*`;
      await setReply(teks);
      await fs.unlink(ran);
    } catch (err) {
      await fs.unlink(media).catch(() => {});
      await fs.unlink(ran).catch(() => {});
      setReply(`Err: ${err.message}`);
    }
  } else {
    setReply("Reply audio/videonya");
  }
};

handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addvn"];
handler.owner = true;
export default handler;
