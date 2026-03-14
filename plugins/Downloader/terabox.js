const headers = {
  "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
  "Accept": "application/json, text/plain, */*",
  "Content-Type": "application/json",
  "origin": "https://teraboxdl.site",
  "referer": "https://teraboxdl.site/"
}

async function teraboxdl(url) {

  const r = await fetch("https://teraboxdl.site/api/proxy", {
    method: "POST",
    headers,
    body: JSON.stringify({ url })
  })

  const data = await r.json()

  if (!data) throw "Gagal mengambil data"

  return data
}

let handler = async (m, { conn, text }) => {

  if (!text) throw "Contoh:\n.terabox https://terabox.com/s/xxxx"

  await conn.sendMessage(m.chat, {
    react: { text: "⏳", key: m.key }
  })

  const res = await teraboxdl(text)

  if (!res || !res.list) throw "File tidak ditemukan"

  for (let file of res.list) {

    const url = file.dlink || file.download_link

    let caption = `
乂 *TERABOX DOWNLOADER*

📁 Nama : ${file.name}
💾 Size : ${file.size || "-"}
`.trim()

    await conn.sendFile(
      m.chat,
      url,
      file.name,
      caption,
      m
    )

  }

}

handler.help = ["terabox <url>"]
handler.tags = ["downloader"]
handler.command = ["terabox", "tbox", "tdl"]

export default handler