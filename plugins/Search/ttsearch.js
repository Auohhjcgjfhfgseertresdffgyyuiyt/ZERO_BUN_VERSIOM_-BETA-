let handler = async (m, { conn, command, text }) => {
  try {
    if (!text)
      return m.reply(`*Example :* .${command} Takamura Sakamoto Days,3`)

    // support NEXT
    let q, count = '3', cursor = '0'

    if (text.includes('|')) {
      // format dari button
      const parts = text.split('|')
      q = parts[0]
      count = parts[1]
      cursor = parts[2]
    } else {
      const split = text.split(',')
      q = split[0]
      count = split[1] || '3'
    }

    await m.reply(
      `⏳ *Sedang mencari video TikTok...*\n` +
      `Keyword: *${q}*\n` +
      `Limit: *${count}*`
    )

    const res = await fetch('https://www.tikwm.com/api/feed/search', {
      method: 'POST',
      body: new URLSearchParams({
        keywords: q,
        count,
        cursor,
        web: '1',
        hd: '1'
      })
    })

    const json = await res.json()

    if (!json?.data?.videos?.length)
      return m.reply("❌ *Video tidak ditemukan.*")

    for (let v of json.data.videos) {
      await conn.sendMessage(
        m.chat,
        { video: { url: 'https://www.tikwm.com' + v.play } },
        { quoted: m }
      )
    }

    // ambil cursor berikutnya
    const nextCursor = json.data.cursor

    // BUTTON NEXT
    await conn.sendButton(
      m.chat,
      {
        text: "➡️ *Lanjut ke video berikutnya?*",
        footer: "TikTok Search",
        buttons: [
          {
            buttonId: `.${command} ${q}|${count}|${nextCursor}`,
            buttonText: { displayText: "⏭️ NEXT" },
            type: 1
          }
        ],
        headerType: 1
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    m.reply("❌ Terjadi kesalahan: " + e.message)
  }
}

handler.help = ['ttsearch']
handler.command = /^(ttsearch|tiktoksearch|tt-s)$/i
handler.tags = ['search']

export default handler