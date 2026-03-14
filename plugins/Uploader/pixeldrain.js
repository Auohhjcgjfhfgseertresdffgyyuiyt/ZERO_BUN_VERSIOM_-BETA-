import axios from "axios"
import FormData from "form-data"
import crypto from "crypto"

/* ================= PIXELDRAIN CLIENT ================= */

const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36"

const BASE_H = {
  Accept: "*/*",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
  Connection: "keep-alive",
  "User-Agent": UA
}

// auto register + login
async function autoLogin() {
  const rand = crypto.randomBytes(6).toString("hex")
  const user = `mzx_${rand}`
  const email = `${user}@proton.me`
  const pass = crypto.randomBytes(10).toString("hex")

  const regForm = new FormData()
  regForm.append("username", user)
  regForm.append("email", email)
  regForm.append("password", pass)

  await axios.post("https://pixeldrain.com/api/user/register", regForm, {
    headers: { ...BASE_H, ...regForm.getHeaders() }
  }).catch(() => {})

  const loginForm = new FormData()
  loginForm.append("username", user)
  loginForm.append("password", pass)
  loginForm.append("app_name", "website login")
  loginForm.append("redirect", "/user/filemanager")

  const res = await axios.post("https://pixeldrain.com/api/user/login", loginForm, {
    headers: { ...BASE_H, ...loginForm.getHeaders() }
  })

  const cookie = res.headers["set-cookie"]?.find(v => v.startsWith("pd_auth_key="))
  const key = cookie ? cookie.split(";")[0].split("=")[1] : res.data?.auth_key

  if (!key) throw "Login Pixeldrain gagal"
  return key
}

async function uploadToPixeldrain(buffer, filename, mime) {
  const authKey = await autoLogin()

  const form = new FormData()
  form.append("name", filename)
  form.append("file", buffer, { filename, contentType: mime })

  const res = await axios.post("https://pixeldrain.com/api/file", form, {
    headers: {
      ...BASE_H,
      ...form.getHeaders(),
      Cookie: `pd_auth_key=${authKey}`
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })

  if (!res.data?.id) throw "Upload gagal"

  return {
    id: res.data.id,
    url: `https://pixeldrain.com/u/${res.data.id}`,
    download: `https://pixeldrain.com/api/file/${res.data.id}`,
    filename,
    size: buffer.length
  }
}

function fmtBytes(b) {
  if (b >= 1073741824) return (b / 1073741824).toFixed(2) + " GB"
  if (b >= 1048576) return (b / 1048576).toFixed(2) + " MB"
  if (b >= 1024) return (b / 1024).toFixed(2) + " KB"
  return b + " B"
}

function getMime(mimetype, ext) {
  if (mimetype) return mimetype

  const map = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    mp3: "audio/mpeg",
    pdf: "application/pdf",
    zip: "application/zip",
    txt: "text/plain",
    js: "text/javascript"
  }

  return map[ext?.toLowerCase()] || "application/octet-stream"
}

/* ================= HANDLER ================= */

let handler = async (m, { conn }) => {

  const src =
    /image|video|audio|application|document/.test(m.mimetype || "")
      ? m
      : m.quoted &&
        /image|video|audio|application|document/.test(m.quoted?.mimetype || "")
      ? m.quoted
      : null

  if (!src) {
    return m.reply(
`❌ Kirim atau reply file dulu

Support:
• gambar
• video
• audio
• dokumen

Contoh:
.reply file
.pixeldrain`
    )
  }

  const msg = await conn.sendMessage(m.chat, { text: "⏳ Mengunggah..." }, { quoted: m })

  try {
    const media = await src.download()

    const mimetype = src.mimetype || ""
    const ext = mimetype.split("/")[1]?.split(";")[0] || "bin"
    const filename = src.fileName || `file_${Date.now()}.${ext}`
    const mime = getMime(mimetype, ext)

    const result = await uploadToPixeldrain(Buffer.from(media), filename, mime)

    await conn.sendMessage(m.chat, { delete: msg.key })

    m.reply(
`╭─「 Pixeldrain Upload 」
│ ✅ File berhasil diunggah
│
│ 📄 Nama
│ ${result.filename}
│
│ 📦 Ukuran
│ ${fmtBytes(result.size)}
│
│ 🔗 Link
│ ${result.url}
│
│ ⬇️ Download
│ ${result.download}
╰────────────`
    )

  } catch (e) {
    console.error(e)
    m.reply("❌ Upload gagal")
  }
}

handler.command = ["pixeldrain","pdrain"]
handler.tags = ["tools"]
handler.limit = true

export default handler