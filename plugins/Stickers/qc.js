import fetch from "node-fetch"

let handler = async (m, { conn, args, user, command }) => {
  try {
    if (!args[0]) return m.reply(`*Example :* .${command} Hello World`)
    m.reply("Wait")

    const text = args.join(" ")
    const first_name = m.pushName || user?.name || "User"

    let photoUrl
    try {
      photoUrl = await conn.profilePictureUrl(m.sender, "image")
    } catch {
      photoUrl = "https://i.ibb.co/2kR5zq0/avatar.png"
    }

    const res = await fetch("https://brat.siputzx.my.id/quoted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            from: {
              id: 1,
              first_name,
              last_name: "",
              name: "",
              photo: { url: photoUrl }
            },
            text,
            entities: [],
            avatar: true,
            media: { url: "" },
            mediaType: "",
            replyMessage: {
              name: "",
              text: "",
              entities: [],
              chatId: 1
            }
          }
        ],
        backgroundColor: "#F5F5F5",
        width: 512,
        height: 512,
        scale: 2,
        type: "quote",
        format: "png", // ⬅️ PNG biar toSticker yang handle
        emojiStyle: "apple"
      })
    })

    if (!res.ok) throw new Error("Gagal generate quote")

    const buffer = Buffer.from(await res.arrayBuffer())

    // 🔥 PAKAI LOGIC STICKER BASE KAMU (ANTI GEPENG)
    await conn.toSticker(m, buffer)

  } catch (e) {
    m.reply("Error: " + e.message)
  }
}

handler.help = ["qc <text>"]
handler.command = ["qc"]
handler.tags = ["maker"]

export default handler