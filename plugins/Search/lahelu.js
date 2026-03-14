import axios from "axios"

async function laheluSearch(query) {
  try {
    if (!query) throw "Masukkan kata kunci!"

    const { data } = await axios.get("https://lahelu.com/api/post/get-search", {
      params: { query },
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10)"
      }
    })

    const posts = data.postInfos
    if (!posts || !posts.length) throw "Meme tidak ditemukan!"

    const results = posts.map(v => ({
      title: v.title,
      author: v.userUsername,
      media: v.media,
      id: v.postID,
      hashtags: v.hashtags || []
    }))

    return {
      status: true,
      total: results.length,
      results
    }

  } catch (e) {
    return {
      status: false,
      msg: e.message || e
    }
  }
}

let handler = async (m, { conn, text }) => {

  if (!text) throw "Contoh:\n.lahelu spongebob"

  let res = await laheluSearch(text)

  if (!res.status) throw res.msg

  let pick = res.results[Math.floor(Math.random() * res.results.length)]

  let caption = `
乂 *LAHELU MEME*

📌 *Title:* ${pick.title}
👤 *Author:* ${pick.author}
🏷 *Tags:* ${pick.hashtags.join(", ") || "-"}

🔎 *Query:* ${text}
`.trim()

  await conn.sendFile(
    m.chat,
    pick.media,
    "meme",
    caption,
    m
  )
}

handler.help = ["lahelu <query>"]
handler.tags = ["fun"]
handler.command = ["lahelu", "meme"]

export default handler