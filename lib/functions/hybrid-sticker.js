// hybrid_sticker.js
// Satu file utuh — auto pilih node-webpmux → fallback webpmux (system)

import { runFFmpeg } from "#ffmpeg";
import { spawn } from "bun";
import fs from "fs";

// ==== Coba load node-webpmux ====
let nodeWebpMux = null;
let canUseNodeWebpmux = false;

try {
  nodeWebpMux = (await import("node-webpmux")).default;
  canUseNodeWebpmux = true;
} catch {
  canUseNodeWebpmux = false;
}

// ==== Helper exec ====
async function exec(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn([cmd, ...args], {
      stdout: "pipe",
      stderr: "pipe",
    });

    let stderr = "";
    (async () => {
      for await (const chunk of p.stderr) stderr += chunk;
    })();

    p.exited.then((code) => {
      if (code !== 0) reject(new Error(stderr || `Exit ${code}`));
      else resolve(true);
    });
  });
}

// ==== Generate EXIF sticker WA ====
function generateExif(m) {
  const exifData = {
    "sticker-pack-id": "your-id",
    "sticker-pack-name": m.pushName || "Unknown",
    "sticker-pack-publisher": "",
    emojis: ["✨"],
  };

  const exifAttr = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);

  const jsonBuf = Buffer.from(JSON.stringify(exifData), "utf-8");
  const exif = Buffer.concat([exifAttr, jsonBuf]);
  exif.writeUIntLE(jsonBuf.length, 14, 4);

  return exif;
}

// ==== Fungsi utama hybrid ====
export async function toSticker(conn, m, path) {
  const { filename: inputFile } = await conn.getFile(path, true);
  const outputFile = global.getRandomFile(".webp");
  const exifFile = global.getRandomFile(".exif");

  // FFmpeg → WebP
  const args = ["-i", inputFile, "-vcodec", "libwebp", "-vf", "scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse", "-loop", "0", "-preset", "default", "-an", "-vsync", "0", outputFile];

  await runFFmpeg(args);

  const exifBuffer = generateExif(m);

  // ==== MODE A → node-webpmux tersedia ====
  if (canUseNodeWebpmux) {
    try {
      const img = new nodeWebpMux.Image();
      await img.load(outputFile);
      img.exif = exifBuffer;
      await img.save(outputFile);

      await conn.sendMessage(m.chat, { sticker: fs.readFileSync(outputFile) }, { quoted: m });

      fs.unlinkSync(inputFile);
      fs.unlinkSync(outputFile);
      return;
    } catch {
      canUseNodeWebpmux = false;
    }
  }

  // ==== MODE B → fallback ke webpmux system ====
  fs.writeFileSync(exifFile, exifBuffer);
  await exec("webpmux", ["-set", "exif", exifFile, outputFile, "-o", outputFile]);

  await conn.sendMessage(m.chat, { sticker: fs.readFileSync(outputFile) }, { quoted: m });

  fs.unlinkSync(inputFile);
  fs.unlinkSync(outputFile);
  fs.unlinkSync(exifFile);
}
