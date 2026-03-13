import fs from "fs"
import path from "path"

let handler = async (m, { conn, text }) => {
  if (!m.quoted)
    return m.reply("❌ Reply teks / kode JavaScript yang mau dijadiin file .js")

  let code =
    m.quoted.text ||
    m.quoted.caption ||
    ""

  if (!code.trim())
    return m.reply("❌ Kode kosong")

  // ambil nama file
  let filename = text
    ? text.replace(/[^a-z0-9-_]/gi, "").toLowerCase()
    : "script"

  if (!filename.endsWith(".js")) filename += ".js"

  let dir = "./tmp"
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  let filePath = path.join(dir, filename)

  fs.writeFileSync(filePath, code)

  await conn.sendMessage(
    m.chat,
    {
      document: fs.readFileSync(filePath),
      fileName: filename,
      mimetype: "application/javascript"
    },
    { quoted: m }
  )

  fs.unlinkSync(filePath)
}

handler.help = ["tojs <nama_file>"]
handler.tags = ["tools"]
handler.command = /^tojs$/i

handler.limit = false
handler.register = false

export default handler