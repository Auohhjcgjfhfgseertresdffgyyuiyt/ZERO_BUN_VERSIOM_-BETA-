/*
📌 Name : React ch
🏷️ Type : Plugin ESM
🔗 Base url : http://asitha.top/channel-manager
👤 Creator : Hazel
*/

const handler = async (m, { text, conn }) => {
    if (!text)
        throw `Masukkan link post dan reaksi\nContoh:\n.react https://whatsapp.com/channel/xxxx/1529 ❤️ 🙏🏻`

    try {
        const [post_link, ...reactsArray] = text.split(' ')
        const reacts = reactsArray.join(', ')

        if (!post_link || !reacts)
            throw `Format salah!\nContoh:\n.react https://whatsapp.com/channel/xxxx/1529 ❤️ 🙏🏻`

        const url = `https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/channel/react-to-post`

        const body = JSON.stringify({
            post_link,
            reacts
        })

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzgyZDFhMTE0YWI3MTE5ZmNhNTdjZiIsImlhdCI6MTc2NTI4OTI0MiwiZXhwIjoxNzY1ODk0MDQyfQ.PyblreikWf2_fcPwRfrM_w-_VZmSlvk1vQtrrOuNFBo'
        }

        // ⛔ TANPA AXIOS — PURE FETCH
        const res = await fetch(url, {
            method: 'POST',
            headers,
            body
        })

        const data = await res.json()

        if (!res.ok)
            throw {
                status: res.status,
                message: data?.message || "Unknown error"
            }

        let hasil = `✅ *Reaction Berhasil!*\n\n`
        hasil += `📝 *Pesan:* ${data.message || 'Reaksi berhasil dikirim'}\n`
        if (data.botResponse) hasil += `🤖 *Bot:* ${data.botResponse}\n`
        hasil += `🔗 *Post:* ${post_link}\n`
        hasil += `🎯 *Reactions:* ${reacts}`

        await conn.sendMessage(m.chat, { text: hasil }, { quoted: m })

    } catch (e) {
        let teks = `❌ *Error*\n\n`

        if (e.status) {
            teks += `📊 *Status:* ${e.status}\n`
            teks += `📝 *Pesan:* ${e.message}\n`
        } else {
            teks += `⚙️ *Problem:* ${e.message || e}\n`
        }

        teks += `\n🔧 *Tips:* Pastikan link & emoji benar.`

        await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
    }
}

handler.help = ['react']
handler.tags = ['channel']
handler.command = /^react$/i
handler.limit = false

export default handler