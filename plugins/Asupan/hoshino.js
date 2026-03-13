let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender

    let name = conn.getName(who)

    let url = pickRandom(hoshino)

    await conn.sendMessage(
      m.chat,
      {
        image: { url },
        caption: `Nih *${name}*, Hoshino 新春巫女 cantiknya ✨`
      },
      { quoted: m }
    )

  } catch (e) {
    console.log(e)
    m.reply("⚠️ Error ngab, coba ulangi.")
  }
}

handler.help = ['hoshino']
handler.tags = ['premium']
handler.command = /^hoshino$/i
handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const hoshino = [
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸60-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸59-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸58-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸57-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸56-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸55-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸54-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸53-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸52-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸51-1.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸50.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸49.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸48.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸47.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸46.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸45.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸44.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸43.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸42.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸41.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸40.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸39.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸38.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸37.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸36.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸35.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸34.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸33.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸32.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸31.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸30.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸29.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸28.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸27.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸26.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸25.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸24.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸23.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/星之迟迟_–_新春巫女/©𝑌𝑀𝑁𝑆𝐸22.jpg"
]