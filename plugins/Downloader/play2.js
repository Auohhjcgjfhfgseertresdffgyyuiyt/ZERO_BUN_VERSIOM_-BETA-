/**
 * Fitur: play2
 * Mode: Search (judul lagu)
 * Search: yt-search
 * Download: ytdown.to
 * Runtime: Bun
 */

import axios from "axios"
import ytSearch from "yt-search"

/* ================= CONFIG ================= */

const BASE = "https://app.ytdown.to/proxy.php"

const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  Accept: "*/*",
  Origin: "https://app.ytdown.to",
  Referer: "https://app.ytdown.to/id2/",
  "X-Requested-With": "XMLHttpRequest",
}

/* ================= HANDLER ================= */

let handler = async (m, { conn, text }) => {
  try {
    if (!text)
      return m.reply("⚠ Masukan judul lagu!\n\nContoh:\n.play2 alamate anak sholeh")

    await conn.sendMessage(
      m.chat,
      { text: "🔍 Mencari lagu..." },
      { quoted: m }
    )

    /* === SEARCH YOUTUBE === */
    const search = await ytSearch(text)
    const video = search.videos[0]

    if (!video) throw "Video tidak ditemukan"

    /* === SCRAPE AUDIO === */
    const info = await getVideoInfo(video.url)

    const audio =
      info?.formats?.audio?.find(v => v.ext === "mp3") ||
      info?.formats?.audio?.[0]

    if (!audio?.url) throw "Audio tidak tersedia"

    /* === SEND AUDIO === */
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audio.url },
        mimetype: "audio/mpeg",
        contextInfo: {
          externalAdReply: {
            title: video.title,
            body: `⏱ ${video.timestamp}`,
            thumbnailUrl: video.thumbnail,
            sourceUrl: video.url,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    m.reply("❌ Gagal memutar lagu")
  }
}

/* ================= HANDLER META ================= */

handler.command = ["play2", "ytplay2"]
handler.tags = ["search"]
handler.help = ["play2 <judul lagu>"]

export default handler

/* ================= SCRAPER ================= */

async function getVideoInfo(url) {
  const res = await axios.post(
    BASE,
    `url=${encodeURIComponent(url)}`,
    { headers }
  )

  const data = res.data

  if (!data?.api || data.api.status !== "ok")
    throw "Gagal mengambil data video"

  return data.api
}