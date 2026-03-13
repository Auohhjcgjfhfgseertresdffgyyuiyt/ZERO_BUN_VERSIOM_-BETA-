let handler = async (m, { conn, args, command }) => {
  try {
    if (!args[0]) return m.reply(`*Example :* .${command} https://music.apple.com/xxxx`)
    m.reply("Wait")
    const json = await (await fetch(`https://fgsi.dpdns.org/api/downloader/applemusic?apikey=fgsiapi-138b5392-6d&url=${encodeURIComponent(args[0])}`)).json()
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: json.data.mp3DownloadLink },
        mimetype: "audio/mpeg"
      },
      { quoted: m }
    )
  } catch (e) {
    m.reply('Fail')
  }
}

handler.help = ["apple", "appelnusic"]
handler.command = ["apple", "appelnusic"]
handler.tags = ["downloader"]

export default handler