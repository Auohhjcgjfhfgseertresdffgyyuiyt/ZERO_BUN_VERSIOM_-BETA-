import axios from "axios"
import FormData from "form-data"

async function uploadFile(buffer, filename = "file.bin") {

  const form = new FormData()

  form.append("file", buffer, { filename })

  const headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
    "Origin": "https://uploadf.com",
    "Referer": "https://uploadf.com/id/",
    "X-Requested-With": "XMLHttpRequest",
    ...form.getHeaders()
  }

  const { data } = await axios.post(
    "https://uploadf.com/fileup.php",
    form,
    { headers }
  )

  return {
    success: data.FLG,
    url: "https://uploadf.com/s/" + data.NAME,
    filename: data.NRF
  }
}

/* ================= HANDLER ================= */

let handler = async (m, { conn }) => {

  const q = m.quoted ? m.quoted : m
  const mime = (q.msg || q).mimetype || ""

  if (!mime) {
    return m.reply(
`❌ Kirim atau reply file

Contoh:
.reply file
.uploadf`
    )
  }

  m.reply("⏳ Uploading file...")

  try {

    const media = await q.download()

    const filename =
      q.fileName ||
      `file_${Date.now()}`

    const result = await uploadFile(
      Buffer.from(media),
      filename
    )

    if (!result.success) throw "Upload gagal"

    m.reply(
`╭─「 UploadF 」
│ ✅ Upload berhasil
│
│ 📄 Nama
│ ${result.filename}
│
│ 🔗 Link
│ ${result.url}
╰────────────`
    )

  } catch (e) {

    console.log(e)

    m.reply("❌ Upload gagal")
  }
}

handler.command = ["uploadf","uf"]
handler.tags = ["tools"]
handler.limit = true

export default handler