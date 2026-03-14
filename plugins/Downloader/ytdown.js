import axios from "axios"
import FormData from "form-data"
import { randomUUID } from "crypto"

class YTDown {

  constructor() {

    this.baseUrl = "https://app.ytdown.to"

    this.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
      "Origin": this.baseUrl,
      "Referer": this.baseUrl + "/id15/",
      "x-requested-with": "XMLHttpRequest"
    }

    this.cookies = {
      PHPSESSID: randomUUID().replace(/-/g, ""),
      _ga: "GA1.1." + Math.floor(Math.random()*1000000000) + "." + Math.floor(Date.now()/1000)
    }

  }

  generateSession() {

    this.cookies.PHPSESSID = randomUUID().replace(/-/g, "")
    this.cookies._ga = "GA1.1." + Math.floor(Math.random()*1000000000) + "." + Math.floor(Date.now()/1000)

  }

  getCookieString() {

    return Object.entries(this.cookies)
      .map(([k,v]) => `${k}=${v}`)
      .join("; ")

  }

  async getVideoInfo(url) {

    this.generateSession()

    const form = new FormData()
    form.append("url", url)

    const { data, headers } = await axios.post(
      this.baseUrl + "/proxy.php",
      form,
      {
        headers: {
          ...this.headers,
          ...form.getHeaders(),
          Cookie: this.getCookieString()
        }
      }
    )

    if (headers["set-cookie"]) {

      headers["set-cookie"].forEach(cookie => {

        const [key,value] = cookie.split(";")[0].split("=")
        this.cookies[key] = value

      })

    }

    return data

  }

}

/* ================= HANDLER ================= */

let handler = async (m, { text, conn }) => {

  if (!text) {
    return m.reply(
`❌ Masukkan link YouTube

Contoh:
.ytdown https://youtu.be/xxxx`
    )
  }

  m.reply("⏳ Mengambil data video...")

  try {

    const scraper = new YTDown()

    const res = await scraper.getVideoInfo(text)

    if (!res) {
      return m.reply("❌ Gagal mengambil data")
    }

    let caption =
`╭─「 YTDown 」
│ 🎬 Title : ${res.title || "-"}
│ ⏱ Duration : ${res.duration || "-"}
│ 👁 Views : ${res.views || "-"}
│
│ 🔗 Download Links
`

    if (res.links) {

      res.links.forEach(v => {

        caption += `│ ${v.quality || v.format} : ${v.url}\n`

      })

    }

    caption += "╰────────────"

    m.reply(caption)

  } catch (e) {

    console.log(e)

    m.reply("❌ Error mengambil video")

  }

}

handler.command = ["ytdown","ytd"]
handler.tags = ["downloader"]
handler.limit = true

export default handler