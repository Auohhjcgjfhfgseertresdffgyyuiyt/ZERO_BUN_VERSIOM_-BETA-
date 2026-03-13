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

handler.help = ['hoshino']
handler.tags = ['premium']
handler.command = /^(hoshino)$/i

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