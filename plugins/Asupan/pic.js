import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!args[0]) throw `*Please send query your anime pictures.*`
	let res = await fetch(`https://api.lolhuman.xyz/api/pixiv?apikey=b94fcccb672a15cb7d58ee8f&query=${text}`)
  
	if (!res.ok) throw await res.text()
	let json = await res.json()
	try {
	await conn.sendMessage(m.chat, {
			image:await(await fetch(json.result[0].image)).buffer(),
			caption: "Here your picture."
		}, { quoted: m })
	await conn.sendMessage(m.chat, {
			image:await(await fetch(json.result[1].image)).buffer(),
			caption: "Here your picture."
		}, { quoted: m })
	await conn.sendMessage(m.chat, {
			image:await(await fetch(json.result[2].image)).buffer(),
			caption: "Here your picture."
		}, { quoted: m })
	await conn.sendMessage(m.chat, {
			image:await(await fetch(json.result[3].image)).buffer(),
			caption: "Here your picture."
		}, { quoted: m })
	await conn.sendMessage(m.chat, {
			image:await(await fetch(json.result[4].image)).buffer(),
			caption: "Here your picture."
		}, { quoted: m })
	await conn.sendMessage(m.chat, {
			image:await(await fetch(json.result[5].image)).buffer(),
			caption: "Here your picture."
		}, { quoted: m })
		   } catch (e) {
    console.log(e)
    conn.reply(m.chat, '*Sorry cant find that character.*', m)
  }
}

handler.tags = ['anime']
handler.help = ['pic']
handler.command = /^(pic)$/i
handler.premium = false
handler.limit = false

export default handler