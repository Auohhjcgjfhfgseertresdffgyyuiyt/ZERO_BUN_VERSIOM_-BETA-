import axios from "axios"

const API_KEY = "dfcb6d76f2f6a9894gjkege8a4ab232222"

async function ytdl(link, options = {}) {
  try {
    const {
      type = "mp3", 
      quality = 720
    } = options

    const encodedUrl = encodeURIComponent(link)
    const format = type === "mp3" ? "mp3" : quality

    const { data } = await axios.get(
      `https://p.savenow.to/ajax/download.php?copyright=0&format=${format}&url=${encodedUrl}&api=${API_KEY}`,
      {
        headers: {
          accept: "application/json",
          "user-agent": "Mozilla/5.0"
        }
      }
    )

    if (!data?.success) throw new Error("Gagal memulai proses download")
    if (!data?.progress_url) throw new Error("Progress URL tidak ditemukan")

    let result = null
    let attempt = 0

    while (attempt < 25) {
      const res = await axios.get(data.progress_url, {
        headers: {
          accept: "application/json",
          "user-agent": "Mozilla/5.0"
        }
      })

      if (res.data?.download_url) {
        result = res.data
        break
      }

      await new Promise(r => setTimeout(r, 2000))
      attempt++
    }

    if (!result) throw new Error("Timeout menunggu proses convert")

    return {
      title: data.title,
      thumbnail: data.info?.image,
      type,
      quality: type === "mp4" ? quality + "p" : "audio",
      download: result.download_url,
      alternative: result.alternative_download_urls || []
    }

  } catch (err) {
    throw new Error("Error ytdl: " + err.message)
  }
}

const handler = async (m, { sock, text, args }) => {
  if (!text) {
    return m.reply(
`Contoh:
.ytdl https://youtube.com/watch?v=xxxx
.ytdl mp4 https://youtube.com/watch?v=xxxx`
    )
  }

  let type = "mp3"
  let link = text

  if (args[0] === "mp4") {
    type = "mp4"
    link = args[1]
  }

  if (!/youtu\.?be/.test(link)) {
    return m.reply("Link harus berupa YouTube.")
  }

  try {
    await m.reply("⏳ Sedang memproses, tunggu sebentar...")

    const res = await ytdl(link, { type, quality: 720 })

   
    if (res.thumbnail) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: res.thumbnail },
          caption:
`🎬 *YouTube Downloader*

📌 Title: ${res.title || "-"}
📦 Type: ${res.type.toUpperCase()}
📺 Quality: ${res.quality}

⏳ Mengirim file...`
        },
        { quoted: m }
      )
    }

    if (res.type === "mp4") {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: res.download },
          caption: "✅ Video berhasil dikirim"
        },
        { quoted: m }
      )
    } else {
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: res.download },
          mimetype: "audio/mpeg",
          fileName: `${res.title || "audio"}.mp3`
        },
        { quoted: m }
      )
    }

  } catch (err) {
    console.error(err)
    m.reply(`❌ ${err.message}`)
  }
}

handler.help = ["ytdl link", "ytdl mp4 link"]
handler.tags = ["downloader"]
handler.command = ["ytdl"]

export default handler