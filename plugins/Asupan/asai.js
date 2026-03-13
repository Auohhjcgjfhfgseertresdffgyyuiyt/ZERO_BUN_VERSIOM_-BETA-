let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender

    let name = conn.getName(who)

    let url = pickRandom(asai)

    // Kirim gambar biasa (image), bukan sticker
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `Nih *${name}*, Asai-channya.. 💗`
    }, { quoted: m })

  } catch (e) {
    m.reply("Error ngab 😔")
    console.log(e)
  }
}

handler.help = ['asai']
handler.tags = ['premium']
handler.command = /^asai$/i
handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const asai = [
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume26.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume25.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume24.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume23.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume22.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume21.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume20.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume19.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume18.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume17.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume16.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume15.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume14.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume13.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume12.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume11.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume10.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume09.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume08.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume07.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume06.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume05.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume04.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume03.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume02.webp",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/核酸酱_(Asai_chan)/Yume01.webp"
]