/*
Creator: Manzxy (ey ay)
Edited by: AI
Sticker via conn.toSticker (Baileys compatible)
Bun Support
Memegen.link API
*/

import { fileTypeFromBuffer } from "file-type"

/* ===============================
 * UPLOAD IMAGE
 * =============================== */
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

/* ===============================
 * MEMEGEN SAFE TEXT
 * =============================== */
function clean(text = "") {
  return encodeURIComponent(
    text
      .replace(/\n/g, " ")
      .replace(/[?#%/\\]/g, "")
      .trim() || "_"
  )
}

/* ===============================
 * HANDLER
 * =============================== */
let handler = async (m, { conn, text }) => {
  try {
    if (!text)
      return m.reply(
        "Format:\n`smeme <atas>|<bawah>`\n\nContoh:\n`smeme Lucu|Lu bang`"
      )

    let [topRaw, bottomRaw] = text.split("|")
    if (!bottomRaw) return m.reply("Pisahkan teks dengan tanda `|`")

    const top = clean(topRaw)
    const bottom = clean(bottomRaw)

    /* === AMBIL GAMBAR === */
    let buffer
    if (m.quoted?.mimetype?.includes("image")) {
      buffer = await m.quoted.download()
    } else if ((m.msg || m).mimetype?.includes("image")) {
      buffer = await m.download()
    } else {
      return m.reply("Kirim atau reply gambar!")
    }

    /* === UPLOAD === */
    const imgUrl = await upload(buffer)

    /* === MEMEGEN API (YANG PERTAMA) === */
    const memeUrl =
      `https://api.memegen.link/images/custom/${top}/${bottom}.png` +
      `?background=${encodeURIComponent(imgUrl)}`

    /* === FETCH → BUFFER === */
    const res = await fetch(memeUrl)
    if (!res.ok) throw "Gagal generate meme"

    const memeBuffer = Buffer.from(await res.arrayBuffer())

    /* === STICKER === */
    await conn.toSticker(m, memeBuffer)

  } catch (e) {
    console.error(e)
    m.reply("❌ Error: " + e)
  }
}

handler.command = /^smeme$/i
handler.tags = ["maker"]
handler.help = ["smeme <atas>|<bawah>"]

export default handler