import axios from "axios"
import FormData from "form-data"

async function uploadToImgur(buffer, filename) {
  const form = new FormData()
  form.append("image", buffer, { filename })

  const { data } = await axios.post(
    "https://uploadimgur.com/api/upload",
    form,
    {
      headers: {
        ...form.getHeaders(),
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/137.0.0.0 Mobile Safari/537.36",
        Accept: "*/*",
        Origin: "https://uploadimgur.com",
        Referer: "https://uploadimgur.com/",
      },
      timeout: 60000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    }
  )

  if (!data.link) throw new Error("Upload gagal")

  return data.link
}

const handler = async (m, { conn }) => {
  try {

    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ""

    if (!mime) {
      return m.reply("Reply media yang ingin dijadikan URL")
    }

    await m.reply("⏳ Uploading...")

    const buffer = await q.download()

    const ext = mime.split("/")[1] || "file"

    const link = await uploadToImgur(buffer, `tourl.${ext}`)

    const txt = `🔗 *URL Berhasil Dibuat*

${link}

📦 Size : ${(buffer.length / 1024 / 1024).toFixed(2)} MB`

    m.reply(txt)

  } catch (e) {
    console.error(e)
    m.reply("❌ Gagal upload media")
  }
}

handler.help = ["tourl"]
handler.tags = ["tools"]
handler.command = ["tourl"]

export default handler