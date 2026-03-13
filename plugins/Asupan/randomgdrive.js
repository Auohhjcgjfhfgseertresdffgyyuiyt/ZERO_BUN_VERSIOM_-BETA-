let handler = async (m, { conn }) => {
    try {
        const files = [
            "https://drive.google.com/uc?export=download&id=1f_UQ1rE-Or-PdUm3BJmn-bXhz0jOUijV",
            "https://drive.google.com/uc?export=download&id=ANOTHER_FILE_ID",
            "https://drive.google.com/uc?export=download&id=ANOTHER_FILE_ID_2"
        ]

        if (!files.length) throw "Tidak ada file JPG di daftar!"

        // Pilih acak langsung dari array string
        const pick = files[Math.floor(Math.random() * files.length)]

        // Download file
        const res = await fetch(pick)
        const buffer = new Uint8Array(await res.arrayBuffer())

        // Kirim ke WhatsApp
        await conn.sendMessage(m.chat, { 
            image: buffer, 
            caption: `📸 Random JPG dari Google Drive` 
        }, { quoted: m })

    } catch (err) {
        m.reply(`❌ Error: ${err.message || err}`)
    }
}

handler.help = ['Machi']
handler.tags = ['tools']
handler.command = /^machi$/i

export default handler