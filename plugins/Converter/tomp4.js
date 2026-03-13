import fs from "fs-extra";
import { ffmpegPath } from "#ffmpeg";

function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = Bun.spawn([cmd, ...args], {
      stdout: "pipe",
      stderr: "pipe",
    });

    let stderr = "";
    p.stderr?.pipeTo(
      new WritableStream({
        write(chunk) {
          stderr += Buffer.from(chunk).toString();
        },
      })
    );

    p.exited.then((code) => {
      if (code === 0) resolve(true);
      else reject(stderr);
    });
  });
}

let handler = async (m, { conn, setReply }) => {
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const p = m.quoted ? m.quoted : m;

  if (!isQuotedSticker) return setReply("❌ Reply sticker WebP untuk convert!");

  setReply("⏳ Tunggu bentar, lagi di-convert...");

  let file = await p.download(true);
  let outGif = "./" + Date.now() + ".gif";
  let outMp4 = "./" + Date.now() + ".mp4";

  try {
    // STEP 1 — WebP ➜ GIF (ImageMagick)
    await runCommand("convert", [file, outGif]);

    // STEP 2 — GIF ➜ MP4 (FFmpeg)
    await runCommand(ffmpegPath, [
      "-y",
      "-i", outGif,
      "-vf", "crop=trunc(iw/2)*2:trunc(ih/2)*2",
      "-b:v", "0",
      "-crf", "25",
      "-pix_fmt", "yuv420p",
      outMp4,
    ]);

    await conn.sendMessage(
      m.chat,
      { video: fs.readFileSync(outMp4), caption: "✅ Nih hasilnya!" },
      { quoted: m }
    );
  } catch (err) {
    console.log(err);
    setReply("❌ Gagal convert:\n" + err);
  }

  // Bersihkan file sementara
  [file, outGif, outMp4].forEach((f) => fs.existsSync(f) && fs.unlinkSync(f));
};

handler.help = ["tomp4"];
handler.tags = ["converter"];
handler.command = ["tomp4"];
export default handler;