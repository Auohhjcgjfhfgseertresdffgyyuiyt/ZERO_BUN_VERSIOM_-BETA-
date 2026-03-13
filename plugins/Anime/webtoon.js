/*
📌 Name : Webtoon Scraper
🏷️ Type : Plugin Esm
📦 Saluran : https://whatsapp.com/channel/0029Vb4HHTJFCCoYgkMjn93K
🔗 Base url : webtoons.com
📑 Desc : Fixed cheerio import (Bun compatible)
👤 Creator : Hazel
*/

import { load } from "cheerio"  // ✅ FIX: cheerio ESM

const handler = async (m, { conn }) => {
    try {
        await m.reply('⏳ Fetching latest webtoons...')

        const today = getToday()
        const result = await scrapeWebtoon(today)

        if (!result || !result.results?.length) {
            throw 'No webtoons found today'
        }

        const message = formatWebtoonMessage(result)

        await conn.sendMessage(m.chat, { text: message }, { quoted: m })

    } catch (error) {
        console.error(error)
        await conn.sendMessage(m.chat, {
            text: `❌ Error: ${error.message || error}`
        }, { quoted: m })
    }
}


/* =======================
      SCRAPER UTAMA
======================= */

async function scrapeWebtoon(day = "sunday") {
    try {
        const url = `https://www.webtoons.com/en/originals/${day}?sortOrder=UPDATE`

        const headers = {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/html",
            "Referer": "https://www.webtoons.com/"
        }

        // ✔ Native fetch (Bun/Node compatible)
        const res = await fetch(url, { headers })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const html = await res.text()
        const $ = load(html)   // ← FIX

        const results = []

        $("ul.webtoon_list li").each((_, el) => {
            if (results.length >= 20) return false

            const title = $(el).find(".info_text .title").text().trim()
            const genre = $(el).find(".info_text .genre").text().trim()
            const viewCount = $(el).find(".info_text .view_count").text().trim()
            const link = $(el).find("a.link").attr("href")
            const img = $(el).find("img").attr("src")
            const titleNo = link?.match(/title_no=(\d+)/)?.[1]

            const isNew = $(el).find(".badge_new2").length > 0
            const isUpdate = $(el).find(".badge_up2").length > 0

            results.push({
                title: title || "No Title",
                genre: genre || "Unknown",
                likes: formatLikes(viewCount),
                link: link || null,
                img: img || null,
                titleNo,
                isNew,
                isUpdate
            })
        })

        const totalSeries = $(".series_count .number").text().trim() || "0"

        const dayNames = {
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday"
        }

        return {
            day: dayNames[day.toLowerCase()] || day.toUpperCase(),
            totalSeries: parseInt(totalSeries),
            sortOrder: "Latest Update",
            results,
            scrapedAt: new Date().toLocaleString('id-ID')
        }

    } catch (err) {
        console.error("Scraping error:", err)
        throw err
    }
}


/* =======================
       UTILITIES
======================= */

function formatLikes(str) {
    if (!str) return "0"
    if (str.includes("M")) return str

    let n = parseInt(str.replace(/,/g, ""))
    if (isNaN(n)) return str

    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K"
    return str
}

function getToday() {
    return ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][new Date().getDay()]
}

function formatWebtoonMessage(data) {
    let msg = `📚 *WEBTOON UPDATE - ${data.day}*\n`
    msg += `📊 Total Series: ${data.totalSeries}\n`
    msg += `🕐 Sort: ${data.sortOrder}\n`
    msg += `⏰ Scraped: ${data.scrapedAt}\n`
    msg += '═'.repeat(30) + '\n\n'

    data.results.forEach((w, i) => {
        const badge = w.isNew ? '🆕 ' : w.isUpdate ? '📝 ' : '📖 '
        msg += `*${i + 1}. ${badge}${w.title}*\n`
        msg += `🎭 Genre: ${w.genre}\n`
        msg += `❤️ Likes: ${w.likes}\n`
        if (w.titleNo) msg += `🔗 ID: ${w.titleNo}\n`
        if (w.link) msg += `🔗 Link: ${w.link}\n`
        msg += '\n'

        if (i === 9) {
            msg += `...and ${data.results.length - 10} more\n`
            return false
        }
    })

    msg += '═'.repeat(30) + '\n'
    msg += `✨ Showing ${Math.min(data.results.length, 10)} of ${data.results.length}`

    return msg
}


/* =======================
       EXPORT HANDLER
======================= */

handler.help = ['webtoon']
handler.tags = ['anime', 'scraper']
handler.command = /^(webtoon)$/i

export default handler   // ← ✔ ADA default export