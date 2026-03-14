import axios from "axios"

class YTDL {
  constructor() {
    this.baseUrl = "https://ytdownloader.io"
    this.nonce = "cf1ae5b0cc"

    this.headers = {
      Accept: "*/*",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "Content-Type": "application/json",
      Origin: this.baseUrl,
      Referer: this.baseUrl + "/",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      "x-visolix-nonce": this.nonce,
    }

    this.formatMap = {
      mp3: "mp3",
      m4a: "m4a",
      webm: "webm_audio",
      aac: "aac",
      flac: "flac",
      opus: "opus",
      ogg: "ogg",
      wav: "wav",
      "360": "360",
      "480": "480",
      "720": "720",
      "1080": "1080",
      "1440": "1440",
      "2160": "2160",
    }
  }

  async getVideoInfo(url, format) {
    const payload = {
      url: url,
      format: this.formatMap[format],
      captcha_response: null,
    }

    const res = await axios.post(
      `${this.baseUrl}/wp-json/visolix/api/download`,
      payload,
      { headers: this.headers }
    )

    const html = res.data.data

    const videoId =
      url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/
      )?.[1]

    const downloadId =
      html.match(/download-btn-([a-zA-Z0-9]+)/)?.[1]

    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

    return { videoId, downloadId, thumbnail }
  }

  async getProgress(downloadId) {
    const payload = { id: downloadId }

    const res = await axios.post(
      `${this.baseUrl}/wp-json/visolix/api/progress`,
      payload,
      { headers: this.headers }
    )

    return res.data
  }

  async getSecureUrl(downloadUrl, downloadId) {
    const payload = {
      url: downloadUrl,
      host: "youtube",
      video_id: downloadId,
    }

    const res = await axios.post(
      `${this.baseUrl}/wp-json/visolix/api/youtube-secure-url`,
      payload,
      { headers: this.headers }
    )

    return res.data.secure_url
  }

  async download(url, format) {
    const info = await this.getVideoInfo(url, format)

    let progress = await this.getProgress(info.downloadId)

    while (progress.progress < 1000) {
      await new Promise((r) => setTimeout(r, 2000))
      progress = await this.getProgress(info.downloadId)
    }

    const secureUrl = await this.getSecureUrl(
      progress.download_url,
      info.downloadId
    )

    return {
      videoId: info.videoId,
      thumbnail: info.thumbnail,
      url: secureUrl,
    }
  }
}

const scraper = new YTDL()

let handler = async (m, { conn, text, command }) => {
  if (!text) throw "Masukkan link YouTube"

  await m.reply("⏳ Processing...")

  let format = command === "ytmp3" ? "mp3" : "720"

  let res = await scraper.download(text, format)

  if (command === "ytmp3") {
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: res.url },
        mimetype: "audio/mpeg",
        fileName: res.videoId + ".mp3",
      },
      { quoted: m }
    )
  } else {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: res.url },
        caption: "Done",
      },
      { quoted: m }
    )
  }
}

handler.command = ["ytmp3", "ytmp4"]
handler.tags = ["downloader"]
handler.help = ["ytmp3 <url>", "ytmp4 <url>"]

export default handler