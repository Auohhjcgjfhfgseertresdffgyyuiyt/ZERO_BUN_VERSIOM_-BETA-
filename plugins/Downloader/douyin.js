import axios from "axios"
import { createHash } from "crypto"

const base = "https://api.seekin.ai/ikool/media/download"
const secret = "3HT8hjE79L"

/* ===== SIGN GENERATOR ===== */
function sortAndStringify(obj) {
  if (!obj || typeof obj !== "object") return ""
  return Object.keys(obj)
    .sort()
    .map(k => `${k}=${obj[k]}`)
    .join("&")
}

function generateSign(lang, timestamp, body = {}) {
  const raw = `${lang}${timestamp}${secret}${sortAndStringify(body)}`
  return createHash("sha256").update(raw).digest("hex")
}

function buildHeaders(body = {}) {
  const lang = "en"
  const timestamp = Date.now().toString()
  const sign = generateSign(lang, timestamp, body)

  return {
    accept: "*/*",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    lang,
    origin: "https://www.seekin.ai",
    referer: "https://www.seekin.ai/",
    "user-agent":
      "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/137.0.0.0 Mobile Safari/537.36",
    sign,
    timestamp
  }
}

/* ===== SCRAPER ===== */
async function douyinDl(url) {
  const body = { url }

  const res = await axios.post(base, body, {
    headers: buildHeaders(body)
  })

  const { msg, data } = res.data

  return {
    msg,
    title: data.title,
    image: data.imageUrl,
    video: data.medias?.[0]?.url ?? null
  }
}

/* ===== HANDLER ===== */
const handler = async (m, { text, conn }) => {
  try {

    if (!text) {
      return m.reply("Contoh:\n.douyin https://www.douyin.com/video/xxxx")
    }

    await m.reply("⏳ Mengambil video Douyin...")

    const res = await douyinDl(text)

    if (!res.video) return m.reply("❌ Video tidak ditemukan")

    const caption = `🎬 *Douyin Downloader*

📌 Title : ${res.title}

🔗 Source :
${text}`

    await conn.sendFile(
      m.chat,
      res.video,
      "douyin.mp4",
      caption,
      m
    )

  } catch (e) {
    console.error(e)
    m.reply("❌ Gagal mengambil video Douyin")
  }
}

handler.help = ["douyin <url>"]
handler.tags = ["downloader"]
handler.command = ["douyin"]

export default handler