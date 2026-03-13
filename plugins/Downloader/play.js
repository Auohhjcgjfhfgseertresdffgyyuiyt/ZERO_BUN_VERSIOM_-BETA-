//source: https://whatsapp.com/channel/0029VacFb8kLNSZwwiUfq62b
//yt play

import axios from 'axios'
import yts from 'yt-search'

class Youtube {
  constructor(url) {
    this.base = "https://embed.dlsrv.online/api";
    this.id = null;
    this.headers = {
      "Content-Type": "application/json",
      origin: "https://embed.dlsrv.online",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      referer: `https://embed.dlsrv.online/v2/full?videoId=${this.id}`,
    };
    this.setId(url);
  }

  setId(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regex);
    this.id = match ? match[1] : null;
    this.headers.referer = `https://embed.dlsrv.online/v2/full?videoId=${this.id}`;
  }

  async info() {
    try {
      let { data } = await axios.post(
        `${this.base}/info`,
        { videoId: this.id },
        { headers: this.headers }
      );
      return data;
    } catch (e) {
      return "error: " + e.message;
    }
  }

  async download(format, quality) {
    if (!format || !quality) return "format and quality parameter is required";
    try {
      let { data } = await axios.post(
        `${this.base}/download/${format}`,
        { videoId: this.id, quality, format },
        { headers: this.headers }
      );
      return data;
    } catch (e) {
      return "error: " + e.message;
    }
  }
}

let handler = async (m, { conn, args }) => {
  try {
    let query = args.join(' ')
    if (!query) return m.reply('*Example :* .play Only We Know Speed Up')

    let searchResult = await yts(query)
    let video = searchResult.videos[0]
    if (!video) return m.reply('Video tidak ditemukan')

    let caption = `*${video.title}*\n`
    caption += `📌 *Channel:* ${video.author.name}\n`
    caption += `⏱️ *Durasi:* ${video.timestamp}\n`
    caption += `👁️ *Views:* ${video.views}\n`
    caption += `🔗 *URL:* ${video.url}\n\n`
    caption += `_Sedang memproses audio..._`

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      caption: caption
    }, { quoted: m })

    const ytdl = new Youtube(video.url)

    let info = await ytdl.info()
    if (typeof info === 'string' && info.startsWith('error')) {
      return m.reply('Gagal mendapatkan info video: ' + info)
    }

    let downloadResult = await ytdl.download('mp3', '320')
    if (typeof downloadResult === 'string' && downloadResult.startsWith('error')) {
      return m.reply('Gagal download audio: ' + downloadResult)
    }

    let audioUrl
    if (typeof downloadResult === 'string') {
      audioUrl = downloadResult
    } else if (downloadResult.url) {
      audioUrl = downloadResult.url
    } else if (downloadResult.download_url) {
      audioUrl = downloadResult.download_url
    } else {
      console.log('Respons download tidak dikenal:', downloadResult)
      return m.reply('Gagal mendapatkan URL audio. Cek console.')
    }

    await conn.sendMessage(m.chat, {
      document: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: video.title + '.mp3',
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: video.author.name || 'Unknown',
          thumbnailUrl: video.thumbnail,
          sourceUrl: video.url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    m.reply('Error: ' + e.message)
  }
}

handler.help = ['play']
handler.command = ['play']
handler.tags = ['downloader']

export default handler