import axios from "axios"

/* ================================
   YTDL SCRAPER
================================ */

const BASE = "https://ytdownloader.io"
const NONCE = "cf1ae5b0cc"

const HEADERS = {
  Accept: "*/*",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
  "Content-Type": "application/json",
  Origin: BASE,
  Referer: BASE + "/",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
  "x-visolix-nonce": NONCE
}

const FORMAT_MAP = {
  mp3: "mp3",
  m4a: "m4a",
  webm: "webm_audio",
  aac: "aac",
  flac: "flac",
  opus: "opus",
  ogg: "ogg",
  wav: "wav",

  360: "360",
  480: "480",
  720: "720",
  1080: "1080",
  1440: "1440",
  4k: "2160"
}

function parseFormat(arg) {
  if (!arg) return null
  const a = arg.toLowerCase().replace(/p$/, "")
  return FORMAT_MAP[a] || null
}

function isAudio(fmt) {
  return [
    "mp3",
    "m4a",
    "webm_audio",
    "aac",
    "flac",
    "opus",
    "ogg",
    "wav"
  ].includes(fmt)
}

async function getInfo(url, fmtKey) {
  const r = await axios.post(
    `${BASE}/wp-json/visolix/api/download`,
    {
      url,
      format: fmtKey,
      captcha_response: null
    },
    { headers: HEADERS }
  )

  const html = r.data.data || ""

  const videoId =
    url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/
    )?.[1]

  const dlId = html.match(/download-btn-([a-zA-Z0-9]+)/)?.[1]

  if (!dlId) throw new Error("gagal ambil download ID")

  return {
    videoId,
    dlId,
    thumb: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  }
}

async function waitProgress(dlId) {
  let prog
  let tries = 0

  do {
    await new Promise(r => setTimeout(r, 2000))

    const r = await axios.post(
      `${BASE}/wp-json/visolix/api/progress`,
      { id: dlId },
      { headers: HEADERS }
    )

    prog = r.data

    if (++tries > 60) throw new Error("timeout menunggu proses")
  } while (prog.progress < 1000)

  return prog
}

async function getSecureUrl(dlUrl, dlId) {
  const r = await axios.post(
    `${BASE}/wp-json/visolix/api/youtube-secure-url`,
    {
      url: dlUrl,
      host: "youtube",
      video_id: dlId
    },
    { headers: HEADERS }
  )

  return r.data.secure_url
}

async function ytdl(url, fmtKey) {
  const info = await getInfo(url, fmtKey)
  const prog = await waitProgress(info.dlId)
  const secure = await getSecureUrl(prog.download_url, info.dlId)

  return {
    ...info,
    downloadUrl: secure
  }
}

/* ================================
   HANDLER ZERO / VIOLET
================================ */

const HELP = `
╭─「 *YouTube Downloader* 」
│
│ Format:
│ .ytdl <url> <format>
│
│ Audio:
│ mp3 m4a aac flac opus ogg wav webm
│
│ Video:
│ 360 480 720 1080 1440 4k
│
│ Contoh:
│ .ytdl https://youtu.be/xxx mp3
│ .ytdl https://youtu.be/xxx 720
╰───────────────
`

const handler = async (m, { conn, args }) => {

  const url = args[0]
  const fmt = parseFormat(args[1])

  if (!url || !fmt) return m.reply(HELP)

  if (!/youtu\.?be/.test(url))
    return m.reply("❌ URL harus dari YouTube")

  const msg = await conn.sendMessage(
    m.chat,
    { text: "⏳ memproses..." },
    { quoted: m }
  )

  const edit = txt =>
    conn.sendMessage(m.chat, { text: txt, edit: msg.key })

  try {
    await edit("🔎 mengambil info video...")

    const result = await ytdl(url, fmt)

    await edit("📥 mengirim file...")

    const audio = isAudio(fmt)

    const caption = `
╭─「 *YouTube Downloader* 」
│ ✅ Berhasil
│ 🎵 Format : ${args[1].toUpperCase()}
│ 🆔 ID : ${result.videoId}
╰───────────────
`

    await conn.sendMessage(m.chat, { delete: msg.key })

    if (audio) {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: result.downloadUrl },
          mimetype: "audio/mpeg",
          fileName: `${result.videoId}.${args[1]}`,
          caption
        },
        { quoted: m }
      )
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: result.downloadUrl },
          caption
        },
        { quoted: m }
      )
    }

  } catch (e) {
    console.error("[YTDL ERROR]", e)
    await edit("❌ gagal: " + e.message)
  }
}

/* ================================
   CONFIG
================================ */

handler.command = ["ytdl", "yt", "ytdown"]
handler.tags = ["downloader"]
handler.limit = true

export default handler