// ffmpeg-runner.js
import { spawn } from "bun"
import { access } from "fs/promises"

let ffmpegPath = null

// Coba load ffmpeg-static kalau ada
try {
  const ffmpegStatic = (await import("ffmpeg-static")).default
  if (ffmpegStatic) {
    ffmpegPath = ffmpegStatic
  }
} catch {}

// Kalau ffmpeg-static tidak ada atau corrupt → fallback ke ffmpeg sistem
if (!ffmpegPath) {
  try {
    await access("/usr/bin/ffmpeg")
    ffmpegPath = "/usr/bin/ffmpeg"
  } catch {
    try {
      await access("/usr/local/bin/ffmpeg")
      ffmpegPath = "/usr/local/bin/ffmpeg"
    } catch {
      ffmpegPath = "ffmpeg" // terakhir, biarkan PATH yg urus
    }
  }
}

/**
 * Run ffmpeg dengan Bun.spawn
 * @param {string[]} args 
 * @returns {Promise<void>}
 */
export async function runFFmpeg(args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn({
      cmd: [ffmpegPath, ...args],
      stdout: "ignore",
      stderr: "pipe"
    })

    proc.exited.then(code => {
      if (code === 0) resolve()
      else reject(new Error(`FFmpeg exited with code ${code}`))
    })
  })
}

export { ffmpegPath }
