 import fs from "fs-extra";
import { spawn } from "bun";
import { runFFmpeg, ffmpegPath } from "#ffmpeg"
import path from "path";

let handler = async (m, { conn, setReply }) => {
  const isVideo = m.type === "videoMessage";
  const isQuotedVideo = m.quoted?.type === "videoMessage";

  if (!isVideo && !isQuotedVideo) return setReply("Reply video nya dulu kak!");

  setReply("Sedang convert ke MP3... ⏳");

  let tempInput = null;
  let tempOutput = null;

  try {
    const q = m.quoted || m;

    // Download dan simpan ke folder tmp dengan nama pendek aman
    const buffer = await q.download(); // ini Buffer atau ArrayBuffer
    tempInput = path.join("./tmp", `vid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.tmp`);
    tempOutput = path.join("./tmp", `audio_${Date.now()}.mp3`);

    // Pastikan folder tmp ada
    await fs.ensureDir("./tmp");

    // Tulis buffer ke file temporary dengan nama pendek
    await Bun.write(tempInput, buffer);

    // Cek ffmpeg ada
    if (!ffmpegPath) throw new Error("FFmpeg tidak terdeteksi!");

    const child = spawn({
      cmd: [
        ffmpegPath,
        "-i", tempInput,
        "-vn",
        "-acodec", "libmp3lame",
        "-q:a", "2",      // kualitas bagus
        "-y",             // overwrite tanpa tanya
        tempOutput
      ],
      stdio: ["ignore", "ignore", "pipe"] // stderr = pipe
    });

    // Baca error ffmpeg cara Bun yang BENAR di Bun
    let errLog = "";
    if (child.stderr) {
      const reader = child.stderr.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          errLog += decoder.decode(value, { stream: true });
        }
      } catch (_) { }
    }

    const status = await child.exited;

    // Hapus input pasti, walaupun error
    if (tempInput && await fs.pathExists(tempInput)) {
      await fs.unlink(tempInput).catch(() => {});
    }

    if (status !== 0) {
      if (tempOutput && await fs.pathExists(tempOutput)) {
        await fs.unlink(tempOutput).catch(() => {});
      }
      return setReply(`Gagal convert ke MP3!\n\n${errLog.trim() || "FFmpeg error code: " + status}`);
    }

    // Kirim MP3
    const audioBuffer = await Bun.file(tempOutput).arrayBuffer();
    await conn.sendMessage(m.chat, {
      audio: Buffer.from(audioBuffer),
      mimetype: "audio/mpeg",
      ptt: false
    }, { quoted: m });

    // Hapus output
    await fs.unlink(tempOutput).catch(() => {});

  } catch (e) {
    console.error("Error tomp3:", e);
    
    // Cleanup kalau ada yang tertinggal
    if (tempInput) await fs.unlink(tempInput).catch(() => {});
    if (tempOutput) await fs.unlink(tempOutput).catch(() => {});

    setReply(`Error: ${e.message || "Terjadi kesalahan saat convert video"}`);
  }
};

handler.help = ["tomp3"];
handler.tags = ["converter"];
handler.command = /^(tomp3|toaudio|mp3)$/i;

export default handler;