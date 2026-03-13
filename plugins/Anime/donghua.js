/*
📌 Name : Donghua Schedule
🏷️ Type : Plugin Esm
📦 Saluran : https://whatsapp.com/channel/0029Vb4HHTJFCCoYgkMjn93K
🔗 Base url : donghub.vip
👤 Creator : Hazel
*/

import * as cheerio from 'cheerio'

const handler = async (m, { conn }) => {
    try {
        await m.reply('⏳ Fetching donghua schedule...')

        const schedule = await scrapeDonghuaSchedule()

        if (!schedule || !schedule.results) throw 'No donghua schedule found'

        const msg = formatScheduleMessage(schedule)

        await conn.sendMessage(m.chat, { text: msg }, { quoted: m })

    } catch (e) {
        console.error(e)
        await conn.sendMessage(m.chat, {
            text: `❌ Error: ${e.message || e}`
        }, { quoted: m })
    }
}

async function scrapeDonghuaSchedule() {
    const url = "https://donghub.vip/schedule/"

    const headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 12)",
        "Accept": "text/html",
        "Referer": "https://donghub.vip/"
    }

    // *** axios.get > fetch replacement ***
    const res = await fetch(url, { headers })
    const html = await res.text()

    const $ = cheerio.load(html)
    const results = {}
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']

    days.forEach(day => {
        results[day] = []

        $(`.sch_${day} .bsx`).each((_, el) => {
            const title = $(el).find('.tt').text().trim()
            const link = $(el).find('a').attr('href')
            const episode = $(el).find('.sb.Sub').text().trim()
            const status = $(el).find('.epx').text().trim()
            const img = $(el).find('img').attr('src')

            let countdown = null
            const cd = $(el).find('.epx.cndwn').attr('data-cndwn')
            if (cd) countdown = formatCountdown(parseInt(cd))

            results[day].push({
                title: title || "No Title",
                link: link || null,
                episode: episode || "Unknown",
                status: status || "Unknown",
                countdown,
                img: img || null
            })
        })
    })

    const total = Object.values(results).reduce((a,b) => a + b.length, 0)

    const dayNames = {
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday'
    }

    return {
        totalDonghua: total,
        scrapedAt: new Date().toLocaleString('id-ID'),
        days: dayNames,
        results
    }
}

function formatCountdown(sec) {
    if (!sec || sec < 0) return null

    const d = Math.floor(sec / 86400)
    sec %= 86400
    const h = Math.floor(sec / 3600)
    sec %= 3600
    const m = Math.floor(sec / 60)

    let s = ""
    if (d) s += `${d}d `
    if (h) s += `${h}h `
    if (m) s += `${m}m`
    return s.trim() || "Soon"
}

function formatScheduleMessage(data) {
    let msg = `📺 *DONGHUA SCHEDULE*\n`
    msg += `📊 Total Donghua: ${data.totalDonghua}\n`
    msg += `⏰ Scraped: ${data.scrapedAt}\n`
    msg += '═'.repeat(30) + '\n\n'

    for (const [day, items] of Object.entries(data.results)) {
        if (!items.length) continue

        msg += `*${data.days[day].toUpperCase()}*\n`
        msg += '─'.repeat(20) + '\n'

        items.slice(0, 5).forEach((v, i) => {
            const icon = v.status === 'released' ? '✅' : '⏳'

            msg += `${i+1}. ${icon} *${v.title}*\n`
            msg += `   📺 Episode: ${v.episode}\n`
            if (v.countdown) msg += `   ⏱️ Countdown: ${v.countdown}\n`
            msg += `   🔗 ${v.link}\n\n`
        })

        if (items.length > 5) {
            msg += `   ... and ${items.length - 5} more donghua\n\n`
        }
    }

    msg += '═'.repeat(30) + '\n'
    msg += `✨ _Data from donghub.vip_`

    return msg
}

handler.help = ['donghua']
handler.tags = ['anime', 'scraper']
handler.command = /^(donghua|schedule)$/i
handler.limit = false

export default handler