import fetch from "node-fetch"

let handler = async (m, { conn, command }) => {
  let who = m.sender
  let name = await conn.getName(who)

  // ambil 2 gambar random
  let imgs = pickRandomMulti(gambar, 2)

  for (let url of imgs) {
    try {
      let res = await fetch(url)
      if (!res.ok) continue

      let buffer = Buffer.from(await res.arrayBuffer())

      // 🔥 PAKSA IMAGE WALAU WEBP
      await conn.sendMessage(
        who,
        {
          image: buffer,
          mimetype: "image/jpeg",
          caption: `Nih *${name}* mura cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['asai']
handler.tags = ['premium']
handler.command = /^(asai)$/i

handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandomMulti(arr, total = 1) {
  let copy = [...arr]
  let res = []
  for (let i = 0; i < total && copy.length; i++) {
    let idx = Math.floor(Math.random() * copy.length)
    res.push(copy.splice(idx, 1)[0])
  }
  return res
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