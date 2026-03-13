import fs from 'fs-extra'
import path from 'path'

let handler = async (m, { conn, q, setReply, isOwner, command }) => {
  if (!isOwner) return setReply(mess.only.owner)

  const isImage = m.type === "imageMessage"
  const isQuotedImage = m.type === "extendedTextMessage" && m.content.includes("imageMessage")
  const p = m.quoted ? m.quoted : m

  if (isImage || isQuotedImage) {
    try {
      // Download media ke file sementara
      const mediaPath = await p.download(true)
      
      // Tentukan path tujuan
      const thumbDir = path.join(process.cwd(), 'media')
      const thumbPath = path.join(thumbDir, 'thumb.jpg')

      // Pastikan folder media ada
      await fs.ensureDir(thumbDir)

      // Hapus file lama jika ada
      if (await fs.pathExists(thumbPath)) {
        await fs.unlink(thumbPath)
      }

      // Pindahkan file hasil download ke thumb.jpg
      await fs.move(mediaPath, thumbPath, { overwrite: true })

      setReply(`✅ Sukses mengubah thumbnail menu!`)
    } catch (err) {
      console.error(err)
      setReply(`❌ Gagal menyimpan thumbnail.`)
    }
  } else {
    setReply(`Kirim atau balas gambar dengan caption *${command}* untuk mengubah foto profil menu.`)
  }
}

handler.help = ["sethumb"]
handler.tags = ["owner"]
handler.command = ["sethumb"]

export default handler
