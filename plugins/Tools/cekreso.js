 import fs from "fs-extra";
import { spawn } from "bun";
import sharp from "sharp";
import { ffmpegPath } from "#ffmpeg";

function safeUnlink(p) {
  try { if (fs.existsSync(p)) fs.unlinkSync(p); } catch {}
}

async function getFFprobePath() {
  // 1. Coba static pair
  const staticProbe = ffmpegPath.replace("ffmpeg", "ffprobe");
  if (fs.existsSync(staticProbe)) return staticProbe;

  // 2. Coba system ffprobe
  return "ffprobe"; 
}

let handler = async (m, { q, conn, prefix, command, setReply }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");

  const isVideo = m.type === "videoMessage";
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");

  const p = m.quoted ? m.quoted : m;

  // ======================
  //   IMAGE MODE
  // ======================
  if (isImage || isQuotedImage) {
    setReply("Scanning resolusi...");

    try {
      const media = await p.download(true);
      const meta = await sharp(media).metadata();

      await m.reply(`Resolusi gambar:\n📐 ${meta.width} x ${meta.height}`);

      safeUnlink(media);
    } catch (err) {
      m.reply("Gagal membaca metadata gambar.");
      console.error(err);
    }

    return;
  }

  // ======================
  //   VIDEO MODE
  // ======================
  if (isVideo || isQuotedVideo) {
    setReply("Scanning metadata video...");

    const ffprobePath = await getFFprobePath();

    try {
      const media = await p.download(true);

      const args = [
        "-v", "error",
        "-show_entries", "stream=width,height,codec_type",
        "-show_format",
        "-print_format", "json",
        media
      ];

      const proc = spawn({
        cmd: [ffprobePath, ...args],
        stdout: "pipe",
        stderr: "pipe"
      });

      const [stdout, stderr, exitCode] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited
      ]);

      if (exitCode !== 0) {
        console.error("ffprobe error:", stderr);
        safeUnlink(media);
        return m.reply("Gagal membaca metadata video.");
      }

      let json;
      try {
        json = JSON.parse(stdout);
      } catch (err) {
        safeUnlink(media);
        return m.reply("Gagal parsing metadata video.");
      }

      const stream = json.streams?.find((s) => s.codec_type === "video");

      if (!stream) {
        safeUnlink(media);
        return m.reply("Stream video tidak ditemukan.");
      }

      const width = stream.width || "unknown";
      const height = stream.height || "unknown";
      const duration = json.format?.duration
        ? parseFloat(json.format.duration).toFixed(2)
        : "unknown";

      await m.reply(
        `📹 Metadata Video:\n` +
        `Resolusi: ${width} x ${height}\n` +
        `Durasi: ${duration} detik`
      );

      safeUnlink(media);

    } catch (err) {
      console.error(err);
      m.reply("Gagal membaca metadata video.");
    }

    return;
  }

  // ======================
  //   NO MEDIA REPLIED
  // ======================
  setReply("Reply gambar/video-nya.");
};

handler.help = ["cekreso", "cekresoimg"];
handler.tags = ["tools"];
handler.command = ["cekreso", "cekresolusi", "cekresoimg"];

export default handler;
