import axios from "axios"
import * as cheerio from "cheerio"

class APKMirror {

  constructor() {
    this.base = "https://www.apkmirror.com"

    this.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
      "Referer": this.base + "/"
    }
  }

  async search(query) {

    const params = new URLSearchParams({
      post_type: "app_release",
      searchtype: "apk",
      s: query,
      "bundles[]": "apkm_bundles",
      "bundles[]": "apk_files"
    })

    const url = `${this.base}/?${params}`

    const { data } = await axios.get(url, {
      headers: this.headers
    })

    const $ = cheerio.load(data)
    const results = []

    $(".appRow").each((i, el) => {

      const row = $(el)

      const titleEl = row.find("h5.appRowTitle a.fontBlack")

      const title = titleEl.text().trim()
      const link = titleEl.attr("href")

      const version = row.find(".infoSlide-value").first().text().trim()
      const size = row.find(".infoSlide-value").eq(1).text().trim()

      const icon = row.find("img").attr("src")

      if (title && link) {
        results.push({
          title,
          version,
          size,
          link: link.startsWith("http") ? link : this.base + link,
          icon: icon?.startsWith("http") ? icon : this.base + icon
        })
      }

    })

    return results
  }
}

/* ================= HANDLER ================= */

let handler = async (m, { conn, text }) => {

  if (!text) {
    return m.reply("❌ Masukkan nama aplikasi\n\nContoh:\n.apkmirror WhatsApp")
  }

  m.reply("🔎 Mencari APK...")

  try {

    const scraper = new APKMirror()
    const results = await scraper.search(text)

    if (!results.length) {
      return m.reply("❌ APK tidak ditemukan")
    }

    const apk = results[0]

    const caption = `
╭─「 APKMirror Search 」
│ 📱 Nama
│ ${apk.title}
│
│ 🏷 Version
│ ${apk.version}
│
│ 📦 Size
│ ${apk.size}
│
│ 🔗 Link
│ ${apk.link}
╰────────────
`

    await conn.sendMessage(m.chat, {
      image: { url: apk.icon },
      caption
    }, { quoted: m })

  } catch (e) {

    console.log(e)

    m.reply("❌ Gagal mengambil data APK")
  }
}

handler.command = ["apkmirror","apksearch"]
handler.tags = ["tools"]

export default handler