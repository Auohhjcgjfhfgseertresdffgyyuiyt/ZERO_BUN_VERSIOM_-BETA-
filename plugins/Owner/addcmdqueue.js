const handler = async (m, { q, setReply }) => {
  const cmd = q

  if (!cmd) return setReply('❗ Contoh penggunaan: *.addcmdqueue freya*')

  global.db.data.queue = global.db.data.queue || []

  if (global.db.data.queue.includes(cmd)) {
    return setReply(`⚠️ Command *${cmd}* sudah ada dalam antrean.`)
  }

  global.db.data.queue.push(cmd)
  return setReply(`✅ Command *${cmd}* berhasil ditambahkan ke antrean queue.`)
}

handler.command = ['addcmdqueue']
handler.help = ['addcmdqueue <command>']
handler.tags = ['owner']
handler.owner = true

export default handler
