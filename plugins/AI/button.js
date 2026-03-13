let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, {
        text: "Halo 👋\nPilih salah satu tombol di bawah",
        footer: "Zero Bot",
        buttons: [
            {
                buttonId: ".menu",
                buttonText: { displayText: "📜 Menu" },
                type: 1
            },
            {
                buttonId: ".owner",
                buttonText: { displayText: "👤 Owner" },
                type: 1
            }
        ],
        headerType: 1
    }, { quoted: m })
}

handler.command = ["button"]
export default handler