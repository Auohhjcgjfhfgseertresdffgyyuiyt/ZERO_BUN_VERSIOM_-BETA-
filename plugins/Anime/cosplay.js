let handler = async (m, { conn, command }) => {
  try {
    // fetch JSON langsung
    let res = await fetch("https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json")

    if (!res.ok) throw new Error("Gagal mengambil data!")

    let list = await res.json()

    // pilih random
    let url = list[Math.floor(Math.random() * list.length)]

    await conn.sendMessage(
      m.chat,
      {
        image: { url },
        caption: "Nih",
      },
      { quoted: m }
    )
  } catch (e) {
    console.log(e)
    m.reply("❌ Error mengambil data cosplay!")
  }
}

handler.command = /^(cosplay)$/i
handler.tags = ["anime"]
handler.help = ["cosplay"]

export default handler