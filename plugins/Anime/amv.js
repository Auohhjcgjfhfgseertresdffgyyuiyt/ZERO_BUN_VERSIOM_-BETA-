import { load } from "cheerio" // versi ESM, aman buat Bun

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) return m.reply('Masukan Nomornya Kak\nContoh: .amv 1')

    await m.reply('Wait...')

    try {
        let data
        if (text === '1') data = await animeVideo()
        else if (text === '2') data = await animeVideo2()
        else return m.reply('Pilihan hanya 1 atau 2!')

        if (!data?.source) return m.reply('❌ Video tidak ditemukan!')

        await conn.sendFile(m.chat, data.source, "", `Nih Kak Videonya`, m)
    } catch (e) {
        console.error(e)
        m.reply('❌ Terjadi kesalahan saat mengambil video!')
    }
}

handler.help = ["amv"]
handler.tags = ["anime"]
handler.command = /^(amv)$/i
handler.limit = true
export default handler


// FUNCTION 1
async function animeVideo() {
    const url = 'https://shortstatusvideos.com/anime-video-status-download/'

    const res = await fetch(url)
    const html = await res.text()

    const $ = load(html)

    const videos = []

    $('a.mks_button.mks_button_small.squared').each((i, el) => {
        const href = $(el).attr('href')
        const title = $(el).closest('p').prevAll('p').find('strong').text()
        if (href) videos.push({ title, source: href })
    })

    return videos[Math.floor(Math.random() * videos.length)]
}


// FUNCTION 2
async function animeVideo2() {
    const url = 'https://mobstatus.com/anime-whatsapp-status-video/'

    const res = await fetch(url)
    const html = await res.text()

    const $ = load(html)

    const videos = []
    const title = $('strong').text()

    $('a.mb-button.mb-style-glass.mb-size-tiny.mb-corners-pill.mb-text-style-heavy').each((i, el) => {
        const href = $(el).attr('href')
        if (href) videos.push({ title, source: href })
    })

    return videos[Math.floor(Math.random() * videos.length)]
}