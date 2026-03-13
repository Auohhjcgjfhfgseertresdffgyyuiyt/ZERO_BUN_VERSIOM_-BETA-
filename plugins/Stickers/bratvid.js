 import sharp from "sharp";
import fs from "fs";
import path from "path";
import os from "os";
import { runFFmpeg } from "#ffmpeg";

const temp = (name) => path.join(os.tmpdir(), name);

const safeUnlink = (p) => {
  try {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  } catch {}
};

const safeRmdir = (dir) => {
  try {
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  } catch {}
};

function escapeXML(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function createFrames(text, size = 512) {
  const frames = [];
  const frameDir = temp("brat_frames_" + Date.now());
  fs.mkdirSync(frameDir);

  const words = text.trim().split(/\s+/);
  const marginLeft = 20;
  const marginTop = 60;
  const availableHeight = size - marginTop * 2;

  const maxFontSize = Math.floor(availableHeight / (1.2 * words.length));
  const fontSize = Math.min(maxFontSize, 80);
  const lineHeight = fontSize * 1.2;

  // Frame kosong dulu
  const blankSVG = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
    </svg>
  `;
  const blankPath = path.join(frameDir, `frame_000.png`);
  fs.writeFileSync(blankPath, await sharp(Buffer.from(blankSVG)).png().toBuffer());
  frames.push(blankPath);

  // Frame bertambah kata
  for (let i = 1; i <= words.length; i++) {
    const part = words.slice(0, i);
    const startY = marginTop + 5;

    const textLines = part
      .map(
        (w, idx) => `
      <text 
        x="${marginLeft}" 
        y="${startY + idx * lineHeight}" 
        font-size="${fontSize}" 
        fill="black" 
        font-family="sans-serif"
        font-weight="bold"
      >${escapeXML(w)}</text>`
      )
      .join("\n");

    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white"/>
        ${textLines}
      </svg>
    `;

    const out = path.join(frameDir, `frame_${String(i).padStart(3, "0")}.png`);
    fs.writeFileSync(out, await sharp(Buffer.from(svg)).png().toBuffer());
    frames.push(out);
  }

  return { frames, frameDir };
}

async function generateVideo(frameDir, outputPath) {
  // Gunakan pola POSIX agar ffmpeg tidak rusak di Windows
  const pattern = frameDir.replace(/\\/g, "/") + "/frame_%03d.png";

  await runFFmpeg([
    "-y",
    "-framerate", "2",
    "-i", pattern,
    "-vf", "pad=ceil(iw/2)*2:ceil(ih/2)*2",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    outputPath,
  ]);

  return outputPath;
}

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply("Tulisannya mana? Contoh: .bratvid halo bang");

  const maxChar = 60;
  if (text.length > maxChar) text = text.slice(0, maxChar) + "...";

  const output = temp(`brat_${Date.now()}.mp4`);

  let frameDir = null;
  let frames = [];

  try {
    const res = await createFrames(text);
    frames = res.frames;
    frameDir = res.frameDir;

    await generateVideo(frameDir, output);

    await conn.toSticker(m, output);

  } catch (e) {
    console.error(e);
    m.reply("Gagal membuat video.");
  } finally {
    for (const f of frames) safeUnlink(f);
    safeRmdir(frameDir);
    safeUnlink(output);
  }
};

export default handler;
handler.command = ["bratvid"];
