const cp = require("child_process")
const { promisify } = require("util")
const exec = promisify(cp.exec)

let handler = async (m, { conn }) => {

	await conn.reply(m.chat, `Please Wait... Testing Speed`, m)

	let o
	try {
		 o = await exec("python3 modules/speed.py --share --secure")
	} catch (e) {
		o = e
	} finally {

		let { stdout, stderr } = o

		if (stdout && stdout.trim()) 
		conn.relayMessage(m.chat, {
			extendedTextMessage:{
				text: stdout,
				contextInfo: {
					externalAdReply: {
						title: "Speedtest Result",
						mediaType: 1,
						previewType: 0,
						renderLargerThumbnail: true,
						thumbnailUrl: 'https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg',
						sourceUrl: ''
					}
				},
				mentions: [m.sender]
			}
		}, {})

		if (stderr && stderr.trim()) m.reply(stderr)

	}
}

handler.help = ['speedtest']
handler.tags = ['info']
handler.command = /^(speedtest|ookla)$/i
handler.premium = false

module.exports = handler