/* 
  Facebook Downloader — Scrape LikeeDownloader
  By ChatGPT
*/

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`Contoh:\n${usedPrefix + command} https://www.facebook.com/reel/...`)

  let url = args[0]
  if (!/facebook\.com/.test(url)) return m.reply('Link tidak valid!')

  try {
    m.reply('Downloading...')

    let data = await fesnuk(url)
    if (!data || data.status === 'error') return m.reply('Gagal mengambil data.')

    let { thumb, sd, hd } = data

    let caption = `*FACEBOOK DOWNLOADER*\n`
    caption += `📹 HD: ${hd ? '✔️' : '❌'}\n`
    caption += `📼 SD: ${sd ? '✔️' : '❌'}\n`
    caption += `🔖 Thumbnail tersedia\n`

    // Kirim thumbnail
    if (thumb) {
      await conn.sendMessage(m.chat, {
        image: { url: thumb },
        caption
      }, { quoted: m })
    } else {
      m.reply(caption)
    }

    // Kirim HD dulu jika ada
    if (hd) {
      await conn.sendMessage(m.chat, {
        video: { url: hd },
        caption: '🎬 *HD Video*'
      }, { quoted: m })
      return
    }

    // Jika tidak ada HD, kirim SD
    if (sd) {
      await conn.sendMessage(m.chat, {
        video: { url: sd },
        caption: '📼 *SD Video*'
      }, { quoted: m })
      return
    }

    return m.reply('Tidak ditemukan link video.')

  } catch (e) {
    console.log(e)
    return m.reply('Terjadi kesalahan!')
  }
}


// SCRAPER FACEBOOK
async function fesnuk(u) {
  try {
    if (!/facebook\.com/.test(u)) throw new Error('Invalid url')

    // POST ke likeedownloader
    let body = new URLSearchParams({ id: u, locale: 'en' })

    let res = await fetch('https://likeedownloader.com/process', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
        'Accept': 'application/json,text/javascript,*/*',
        'x-requested-with': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        'origin': 'https://likeedownloader.com',
        'referer': 'https://likeedownloader.com/facebook-video-downloader'
      },
      body
    })

    let json = await res.json()
    if (!json?.template) throw new Error('Fetch failed')

    let html = json.template

    let pick = (re) => {
      const m = html.match(re)
      return m ? m[1] : null
    }

    // Ambil semua link download
    const link = []
    for (const m of html.matchAll(/href="([^"]+)"[^>]*download/g)) {
      link.push(m[1])
    }

    return {
      thumb: pick(/<img[^>]+src="([^"]+)"/),
      sd: link[0] || null,
      hd: link[1] || null
    }

  } catch (e) {
    return { status: 'error', msg: e.message }
  }
}


handler.help = ['fb']
handler.tags = ['downloader']
handler.command = /^(fb|facebook|fbdl)$/i

export default handler