import axios from "axios"
import * as cheerio from "cheerio"

class Animasu {

  constructor() {
    this.base = "https://v1.animasu.app"

    this.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8"
    }
  }

  async search(query) {

    const { data } = await axios.get(
      `${this.base}/?s=${encodeURIComponent(query)}`,
      { headers: this.headers }
    )

    const $ = cheerio.load(data)

    const results = []

    for (const el of $(".listupd .bs").toArray()) {

      const link = $(el).find("a")

      const detailUrl = link.attr("href")

      const detail = await this.getDetail(detailUrl)

      results.push({
        title: link.attr("title") || link.find(".tt").text().trim(),
        url: detailUrl,
        thumbnail: $(el).find(".limit img").attr("src"),
        type: $(el).find(".typez").text().trim(),
        episode: $(el).find(".epx").text().trim(),
        detail
      })
    }

    return results
  }

  async getDetail(url) {

    const { data } = await axios.get(url, {
      headers: this.headers
    })

    const $ = cheerio.load(data)

    const downloadLinks = []

    $(".soraddlx .soraurlx").each((i, el) => {

      const quality = $(el).find("strong").text().trim()

      const links = []

      $(el).find("a").each((j, a) => {

        links.push({
          server: $(a).text().trim(),
          url: $(a).attr("href")
        })

      })

      if (quality && links.length) {
        downloadLinks.push({ quality, links })
      }

    })

    const genres = []

    $(".infox .spe a[href*='/genre/']").each((i, el) => {
      genres.push($(el).text().trim())
    })

    return {
      title: $("h1").first().text().trim(),
      description: $(".desc p").text().trim(),
      genres,
      status: $(".spe span:contains('Status:')").text().replace("Status:", "").trim(),
      type: $(".spe span:contains('Jenis:')").text().replace("Jenis:", "").trim(),
      duration: $(".spe span:contains('Durasi:')").text().replace("Durasi:", "").trim(),
      rating: $(".rating strong").text().replace("Rating", "").trim(),
      trailer: $(".tply iframe").attr("src"),
      downloadLinks
    }
  }

}

/* ================= HANDLER ================= */

let handler = async (m, { conn, text }) => {

  if (!text) {
    return m.reply(
`❌ Masukkan nama anime

Contoh:
.anime boruto`
    )
  }

  m.reply("🔎 Mencari anime...")

  try {

    const scraper = new Animasu()

    const results = await scraper.search(text)

    if (!results.length) {
      return m.reply("❌ Anime tidak ditemukan")
    }

    const anime = results[0]

    const d = anime.detail

    const caption = `
╭─「 Anime Search 」
│ 📺 Judul
│ ${d.title}
│
│ ⭐ Rating
│ ${d.rating || "-"}
│
│ 📂 Type
│ ${d.type}
│
│ ⏱ Durasi
│ ${d.duration}
│
│ 🎭 Genre
│ ${d.genres.join(", ")}
│
│ 📖 Deskripsi
│ ${d.description.slice(0,200)}...
│
│ 🔗 Halaman
│ ${anime.url}
╰────────────
`

    await conn.sendMessage(
      m.chat,
      {
        image: { url: anime.thumbnail },
        caption
      },
      { quoted: m }
    )

  } catch (e) {

    console.log(e)

    m.reply("❌ Gagal mengambil data anime")
  }

}

handler.command = ["anime","animasu"]
handler.tags = ["anime"]
handler.limit = false

export default handler