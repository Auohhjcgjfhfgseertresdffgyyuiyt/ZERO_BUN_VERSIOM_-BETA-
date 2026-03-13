/*
Jangan Hapus Wm Bang 

*Otakudesu Search,Detail, Latest Plugins Esm*
*/

import { load } from "cheerio"

const baseUrl = "https://otakudesu.cloud"

// =========================
// LATEST ANIME
// =========================
async function latestAnime() {
    try {
        const url = `${baseUrl}/ongoing-anime/`
        const res = await fetch(url)
        const html = await res.text()
        const $ = load(html)

        let animeList = []

        $(".venz ul li").each((i, elem) => {
            const title = $(elem).find("h2.jdlflm").text().trim()
            const episode = $(elem).find(".epz").text().replace("Episode ", "").trim()
            const releaseDay = $(elem).find(".epztipe").text().trim()
            const releaseDate = $(elem).find(".newnime").text().trim()
            const image = $(elem).find(".thumbz img").attr("src")
            const link = $(elem).find(".thumb a").attr("href")

            animeList.push({ title, episode, releaseDay, releaseDate, image, link })
        })

        return animeList
    } catch {
        return { error: "Gagal mengambil data anime terbaru." }
    }
}

// =========================
// DETAIL ANIME
// =========================
async function animeDetail(url) {
    try {
        const res = await fetch(url)
        const html = await res.text()
        const $ = load(html)

        const title = $('title').text().split('|')[0].trim()
        const description = $('meta[name="description"]').attr('content')
        const image = $('meta[property="og:image"]').attr('content')
        const publishedTime = $('meta[property="article:published_time"]').attr('content')
        const modifiedTime = $('meta[property="article:modified_time"]').attr('content')

        const get = (label) => $('p:contains("' + label + '")').text().replace(new RegExp(`^${label}\\s*:\\s*`), '').trim()

        const titleJapanese = get("Japanese")
        const score = get("Skor")
        const rating = get("Rating")
        const producer = get("Produser")
        const type = get("Tipe")
        const status = get("Status")
        const totalEpisodes = get("Total Episode")
        const duration = get("Durasi")
        const releaseDate = get("Tanggal Rilis")
        const studio = get("Studio")

        const genres = $('p:contains("Genre") a')
            .map((i, el) => $(el).text().trim())
            .get()
            .join(', ')

        const synopsis = $('.sinopc p')
            .map((i, el) => $(el).text().trim())
            .get()
            .join(' ')

        return {
            title, titleJapanese, description, image, publishedTime, modifiedTime,
            score, rating, producer, type, status, totalEpisodes, duration,
            releaseDate, studio, genres, synopsis, url
        }
    } catch {
        return { error: "Gagal mengambil detail anime." }
    }
}

// =========================
// SEARCH ANIME
// =========================
async function searchAnime(query) {
    try {
        const searchUrl = `${baseUrl}/?s=${encodeURIComponent(query)}&post_type=anime`

        const res = await fetch(searchUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0 Safari/537.36"
            }
        })

        const html = await res.text()
        const $ = load(html)

        const results = []

        $('.chivsrc > li').each((i, el) => {
            const image = $(el).find('img').attr('src')
            const title = $(el).find('h2 a').text().trim()
            const url = $(el).find('h2 a').attr('href')

            const genres = []
            $(el).find('.set').eq(0).find('a').each((_, g) => {
                genres.push($(g).text().trim())
            })

            const status = $(el).find('.set').eq(1).text().replace(/^Status\s*:\s*/, '').trim()
            const rating = $(el).find('.set').eq(2).text().replace(/^Rating\s*:\s*/, '').trim()

            if (title && url) results.push({ title, url, image, genres, status, rating })
        })

        return results
    } catch {
        return { error: "Gagal mengambil data, coba lagi nanti." }
    }
}

// =========================
// HANDLER COMMAND MAIN
// =========================
const handler = async (m, { conn, command, args }) => {

    if (!args.length) {
        return m.reply(
`Gunakan format:
- *otakudesu latest*
- *otakudesu search <judul>*
- *otakudesu detail <url>*`
        )
    }

    if (args[0] === "latest") {
        let data = await latestAnime()
        if (data.error) return m.reply(data.error)

        let txt = "*📺 Anime Terbaru:*\n\n"
        data.slice(0, 10).forEach((v, i) => {
            txt += `${i + 1}. *${v.title}*\nEpisode: ${v.episode}\nRilis: ${v.releaseDate}\nLink: ${v.link}\n\n`
        })

        return m.reply(txt)
    }

    if (args[0] === "search") {
        if (!args[1]) return m.reply("Masukkan judul anime yang ingin dicari.")

        let data = await searchAnime(args.slice(1).join(" "))
        if (data.error) return m.reply(data.error)

        let txt = "*🔍 Hasil Pencarian:*\n\n"
        data.slice(0, 10).forEach((v, i) => {
            txt += `${i + 1}. *${v.title}*\nStatus: ${v.status}\nRating: ${v.rating}\nLink: ${v.url}\n\n`
        })

        return m.reply(txt)
    }

    if (args[0] === "detail") {
        if (!args[1]) return m.reply("Masukkan URL anime dari Otakudesu.")

        let data = await animeDetail(args[1])
        if (data.error) return m.reply(data.error)

        let caption = 
`*${data.title}*

*Japanese:* ${data.titleJapanese}
*Score:* ${data.score}
*Studio:* ${data.studio}
*Release:* ${data.releaseDate}

*Total Episodes:* ${data.totalEpisodes}
*Genres:* ${data.genres}

*Synopsis:* ${data.synopsis.slice(0, 500)}...
`

        return conn.sendMessage(
            m.chat,
            { image: { url: data.image }, caption },
            { quoted: m }
        )
    }

    return m.reply("Format salah.")
}

handler.help = ["otakudesu"]
handler.tags = ["anime"]
handler.command = ["otakudesu"]

export default handler