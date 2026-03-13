let handler = async (m, { conn, text, command, usedPrefix, groupMetadata }) => {
  if (!m.isGroup) throw '❌ Perintah ini hanya bisa digunakan di dalam grup.'
  if (!text) throw `Contoh:\n${usedPrefix + command} Alay`

  const em = ['🥶','🤨','🗿','🤔','😫','🤫','🥴','🤣','😊','😍']
  const toMention = a => '@' + a.split('@')[0]

  // Fallback ke m.participant jika groupMetadata gagal
  let participants = groupMetadata?.participants?.map(v => v.id)
  if (!participants || participants.length === 0) {
    participants = (await conn.groupMetadata(m.chat)).participants.map(v => v.id)
  }

  // Jika tetap gagal, fallback terakhir ke pengirim sendiri
  let target = participants.length ? participants[Math.floor(Math.random() * participants.length)] : m.sender
  let emoji = em[Math.floor(Math.random() * em.length)]

  conn.reply(
    m.chat,
    `Sii Paling *${text}* Adalah ${toMention(target)} ${emoji}`,
    m,
    { mentions: [target] }
  )
}

handler.help = ['sipaling <teks>']
handler.command = ['sipaling']
handler.tags = ['fun']
handler.group = true
export default handler