 import sharp from 'sharp'
import fs from 'fs'
import { spawn } from "bun"
import path from 'path'
import os from 'os'
import { ffmpegPath } from "#ffmpeg"

const temp = (name) => path.join(os.tmpdir(), name)

function escapeXML(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']

// =============================
// FRAME CREATOR
// =============================
async function createFrames(text, size = 512) {
  const frameDir = temp('attp_frames_' + Date.now())
  fs.mkdirSync(frameDir)

  const frames = []

  const fontSize = text.length < 6 ? 100 : text.length < 12 ? 80 : 60
  const centerY = size / 2 + fontSize * 0.35

  for (let i = 0; i < colors.length; i++) {
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="none"/>
        <text x="50%" y="${centerY}" font-size="${fontSize}" fill="${colors[i]}" font-family="sans-serif" font-weight="bold"
        dominant-baseline="middle" text-anchor="middle">${escapeXML(text)}</text>
      </svg>
    `

    const buffer = await sharp(Buffer.from(svg)).png().toBuffer()
    const file = path.join(frameDir, `frame_${String(i).padStart(3, '0')}.png`)
    fs.writeFileSync(file, buffer)
    frames.push(file)
  }

  return { frames, frameDir }
}

// =============================
// GIF GENERATOR
// =============================
async function generateGif(frames, outputPath) {
  if (!ffmpegPath) throw new Error("FFmpeg tidak ditemukan di system maupun static.")

  const framePattern = path.join(path.dirname(frames[0]), "frame_%03d.png")

  const ff = spawn({
    cmd: [
      ffmpegPath,
      "-y",
      "-framerate", "2",
      "-i", framePattern,
      "-filter_complex", "[0:v]palettegen[p];[0:v][p]paletteuse",
      "-loop", "0",
      outputPath
    ],
    stdout: "ignore",
    stderr: "pipe"
  })

  const exitCode = await ff.exited
  if (exitCode !== 0) {
    const errMsg = await new Response(ff.stderr).text()
    throw new Error("FFmpeg gagal: " + errMsg)
  }

  return outputPath
}

// =============================
// MAIN HANDLER
// =============================
const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Teksnya mana? Contoh: .attp halo 😎')

  const gifFile = temp(`attp_${Date.now()}.gif`)

  try {
    const { frames, frameDir } = await createFrames(text)

    await generateGif(frames, gifFile)

    await conn.toSticker(m, gifFile)

    // Cleanup
    for (const f of frames) fs.unlinkSync(f)
    fs.rmdirSync(frameDir)
    //fs.unlinkSync(gifFile)

  } catch (err) {
    console.error(err)
    return m.reply("Gagal membuat ATTp.\nDetail: " + err.message)
  }
}

export default handler
handler.command = ['attp']
