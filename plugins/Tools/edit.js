let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply('❌ Contoh: .edit tifa')
  if (!m.quoted) return m.reply('❌ Reply pesan WhatsApp yang berisi `const gambar = [...]`')

  const edit = text.toLowerCase().trim()
  const quotedText = m.quoted.text || m.quoted.caption || ''

  const match = quotedText.match(/const gambar = ([\s\S]*)/)
  if (!match) return m.reply('❌ Reply harus mengandung `const gambar = [...]`')

  const gambarCode = `const gambar = ${match[1].trim()}`

  const plugin = `
let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender

  let name = conn.getName(who)

  conn.sendFile(
    m.chat,
    pickRandom(gambar),
    null,
    \`Nih *\${name}* ${edit} cosplay nya.\`,
    m
  )
}

handler.help = ['${edit}']
handler.tags = ['premium']
handler.command = /^(${edit})$/i

handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

${gambarCode}
`.trim()

  await conn.sendMessage(m.chat, { text: plugin }, { quoted: m })
}

handler.help = ['edit <nama>']
handler.tags = ['owner']
handler.command = /^edit$/i
handler.owner = true

export default handler