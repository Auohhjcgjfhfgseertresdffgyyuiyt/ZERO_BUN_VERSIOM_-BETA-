import fetch from 'node-fetch'

const baseURL = `https://raw.githubusercontent.com/KazukoGans/database/main/anime/`

// Semua karakter anime (nama = command + nama file JSON)
const characters = [
  "akira", "akiyama", "anna", "asuna", "ayuzawa", "boruto", "chitanda", "chitoge",
  "deidara", "doraemon", "elaina", "emilia", "erza", "gremory", "hestia", "hinata",
  "inori", "isuzu", "itachi", "itori", "kaga", "kagura", "kakasih", "kaori",
  "kosaki", "kotori", "kuriyama", "kuroha", "kurumi", "loli", "madara", "mikasa",
  "miku", "minato", "naruto", "natsukawa", "neko2", "nekohime", "nezuko",
  "nishimiya", "onepiece", "pokemon", "rem", "rize", "sagiri", "sakura",
  "sasuke", "shina", "shinka", "shizuka", "shota", "tomori", "toukachan",
  "tsunade"
]

let handler = async (m, { conn, usedPrefix, command }) => {
  // LIST COMMAND .anime
  if (command === "anime") {
    let txt = `*📺 LIST KARAKTER ANIME*\n\n`
    txt += characters.map(v => `• ${usedPrefix}${v}`).join("\n")
    return m.reply(txt)
  }

  // CEK APA COMMAND ADA DI DAFTAR
  if (characters.includes(command)) {
    try {
      let url = `${baseURL}${command}.json`
      let res = await (await fetch(url)).json()

      if (!Array.isArray(res)) return m.reply("❌ Data JSON error.")

      let pick = res[Math.floor(Math.random() * res.length)]
      await conn.sendFile(m.chat, pick, "anime.jpg", `✨ *${command}*`, m)

    } catch (e) {
      console.log(e)
      return m.reply("❌ Gagal mengambil data karakter.")
    }
  }
}

handler.help = ["anime", ...characters]
handler.tags = ["anime"]
handler.command = new RegExp(`^(${["anime", ...characters].join("|")})$`, "i")

export default handler