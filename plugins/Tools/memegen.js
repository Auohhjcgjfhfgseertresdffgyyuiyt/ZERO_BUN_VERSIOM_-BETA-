/*
Creator: Manzxy (ey ay)
Edited by: AI
Sticker via conn.toSticker (Baileys compatible)
Bun Support
*/

import { fileTypeFromBuffer } from "file-type"

// === Upload Image ===
async function upload(buffer) {
  const type = await fileTypeFromBuffer(buffer)

  const form = new FormData()
  form.append(
    "file",
    new Blob([buffer], { type: type?.mime || "image/jpeg" }),
    `file.${type?.ext || "jpg"}`
  )

  const res = await fetch(
    "https://c.termai.cc/api/upload?key=AIzaBj7z2z3xBjsk",
    {
      method: "POST",
      body: form
    }
  )

  if (!res.ok) throw "Upload gagal"

  const json = await res.json()
  if (!json?.path) throw "Upload gagal"

  return json.path
}

let handler = async (m, { conn, text }) => {
  try {
    if (!text)
      return m.reply(
        "Format:\n`memegen <atas>|<bawah>`\n\nContoh:\n`memegen Lucu|Lu bang`"
      )

    let [top, bottom] = text.split("|")
    if (!bottom) return m.reply("Pisahkan teks dengan tanda `|`")

    // === Ambil gambar ===
    let buffer
    if (m.quoted?.mimetype?.includes("image")) {
      buffer = await m.quoted.download()
    } else if ((m.msg || m).mimetype?.includes("image")) {
      buffer = await m.download()
    } else {
      return m.reply("Kirim atau reply gambar!")
    }

    // === Upload ===
    const imgUrl = await upload(buffer)

    // === Generate Meme ===
    const api =
      "https://api.zenzxz.my.id/api/maker/memegen" +
      `?imageUrl=${encodeURIComponent(imgUrl)}` +
      `&topText=${encodeURIComponent(top)}` +
      `&bottomText=${encodeURIComponent(bottom)}`

    const res = await fetch(api)
    if (!res.ok) throw "Gagal generate meme"

    const memeBuffer = Buffer.from(await res.arrayBuffer())

    // === JADI STICKER (SAMA PERSIS CONTOH KAMU) ===
    await conn.toSticker(m, memeBuffer)

  } catch (e) {
    console.error(e)
    m.reply("❌ Error: " + e)
  }
}

handler.command = /^memegen$/i
handler.tags = ["maker"]
handler.help = ["memegen <atas>|<bawah>"]

export default handler