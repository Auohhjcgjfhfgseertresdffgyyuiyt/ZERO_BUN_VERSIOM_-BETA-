import {catbox} from '../../lib/functions/uploader.js'

let handler = async (m, { text, isOwner,q, setReply, usedPrefix, command }) => {
  if (!m.quoted) throw `Balas ke media dengan perintah *${usedPrefix + command} <nama_sticker>*`
  if (!text) throw `Masukkan nama sticker!\n\nContoh:\n${usedPrefix + command} monyet`

  const mediaMsg = m.quoted || m
  const mime = mediaMsg.type || ""
  if (!/sticker/.test(mime)) throw `⚠️ Media tidak didukung! Harap reply sticker.`

  // download langsung ke buffer
  const buffer = await mediaMsg.download()
  if (!buffer) throw "Gagal download media."

  m.reply("⏳ Uploading...")

 
 let result = await catbox(buffer);
   
  const name = q
  if (db.data.stickerBot[name]) throw `Nama *${name}* sudah ada di database stickerBot.`

  db.data.sticker[name] = {
    name,
    link: result,
  }

  const teks = `
✅ *Berhasil menambahkan stiker ke database!*
📛 Nama: *${name}*
🌐 URL: ${result}
`.trim()

   m.reply(teks)
}

handler.help = ["addstikbot <nama>"]
handler.tags = ["owner"]
handler.command = ["addstikbot", "addstik", "addstick", "addsticker"]
handler.owner = true

export default handler



 