let handler = async (m, { conn, args, usedPrefix, command }) => {
    let text

    if (args.length >= 1) {
        text = args.join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `Example: ${usedPrefix + command} yourtext`

    async function sdxlWaifu(prompt) {
        try {
            const body = {
                prompt,
                negativePrompt: "nsfw, nude, uncensored, cleavage, nipples",
                key: "Waifu",
                width: 512,
                height: 768,
                quantity: 1,
                size: "512x768"
            }

            const res = await fetch("https://aiimagegenerator.io/api/model/predict-peach", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (data.code !== 0) throw data.message
            if (data.data.safetyState === "RISKY") throw "NSFW terdeteksi, coba prompt lain!"
            if (!data.data?.url) throw "Gagal generate image!"

            return {
                status: true,
                image: data.data.url
            }

        } catch (e) {
            return { status: false, message: e.toString() }
        }
    }

    try {
        let result = await sdxlWaifu(text)

        await conn.sendMessage(
            m.chat,
            {
                image: { url: result.image },
                caption: `nah itu bang`
            },
            { quoted: m }
        )

    } catch (e) {
        console.log(e)
        m.reply("Error bang")
    }
}

handler.help = ['sdxlwaifu']
handler.tags = ['tools']
handler.command = /^(sdxlwaifu)$/i
export default handler