let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	try {
	let media = await q.download?.()

	if(session == 'sessions'){
conn.sendFile(ownerBot, media, null, '', m)
	} else conn.sendFile(m.chat, media, null, '', m)
	  

	
	} catch (e) {
      m.reply('Media gagal dimuat!')
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = ['readviewonce', 'read', 'rvo', 'liat', 'readvo']

export default handler;