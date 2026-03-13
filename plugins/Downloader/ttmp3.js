import fs from "fs-extra"
import { spawn } from "bun"
import path from "path"
import { ffmpegPath } from "#ffmpeg"
import { tiktok } from "#tiktok"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const url = args[0]
    if (!url)
        return m.reply(
            `Masukkan link TikTok.\nContoh: ${usedPrefix + command} https://vt.tiktok.com/`
        )

    if (!/^https?:\/\/(www\.)?(vm\.|vt\.|m\.)?tiktok\.com\/.+/i.test(url))
        return m.reply("URL TikTok tidak valid!")

    await global.loading(m, conn)

    let tempInput = null
    let tempOutput = null

    try {
        // Ambil data TikTok
        const { success, type, videoUrl, error } = await tiktok(url)
        if (!success) throw new Error(error || "Gagal mengambil data TikTok")

        if (type !== "video") return m.reply("Konten TikTok ini tidak memiliki video!")

        // Download video buffer
        const buffer = await (await fetch(videoUrl)).arrayBuffer()

        // Buat file tmp
        await fs.ensureDir("./tmp")
        tempInput = path.join("./tmp", `tt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.mp4`)
        tempOutput = path.join("./tmp", `mp3_${Date.now()}.mp3`)

        await Bun.write(tempInput, buffer)

        if (!ffmpegPath) throw new Error("FFmpeg tidak ditemukan!")

        // Convert ke MP3
        const child = spawn({
            cmd: [
                ffmpegPath,
                "-i", tempInput,
                "-vn",
                "-acodec", "libmp3lame",
                "-q:a", "2",
                "-y",
                tempOutput
            ],
            stdio: ["ignore", "ignore", "pipe"]
        })

        let errLog = ""
        if (child.stderr) {
            const reader = child.stderr.getReader()
            const decoder = new TextDecoder()
            try {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    errLog += decoder.decode(value, { stream: true })
                }
            } catch {}
        }

        const status = await child.exited

        // Bersihkan input
        if (tempInput && await fs.pathExists(tempInput)) {
            await fs.unlink(tempInput).catch(() => {})
        }

        if (status !== 0) {
            if (tempOutput && await fs.pathExists(tempOutput)) {
                await fs.unlink(tempOutput).catch(() => {})
            }
            return m.reply(`Gagal convert MP3!\n${errLog || "FFmpeg exit code: " + status}`)
        }

        // Kirim hasil MP3
        const mp3Buf = await Bun.file(tempOutput).arrayBuffer()
        await conn.sendMessage(m.chat, {
            audio: Buffer.from(mp3Buf),
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: m })

        // Hapus file output
        await fs.unlink(tempOutput).catch(() => {})

    } catch (e) {
        console.error("Error ttmp3:", e)

        if (tempInput) await fs.unlink(tempInput).catch(() => {})
        if (tempOutput) await fs.unlink(tempOutput).catch(() => {})

        m.reply("Error: " + e.message)
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ["ttmp3"]
handler.tags = ["downloader"]
handler.command = /^(ttmp3|tiktokmp3|tkmp3)$/i

export default handler