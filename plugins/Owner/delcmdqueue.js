const handler = async (m, { args, setReply }) => {
  const cmd = args[0]?.toLowerCase()

  if (!cmd) return setReply('❗ Contoh penggunaan: *.delcmdqueue freya*')

  global.db.data.queue = global.db.data.queue || []

  if (!global.db.data.queue.includes(cmd)) {
    return setReply(`⚠️ Command *${cmd}* tidak ditemukan dalam antrean.`)
  }

  global.db.data.queue = global.db.data.queue.filter(c => c !== cmd)
  return setReply(`✅ Command *${cmd}* berhasil dihapus dari antrean queue.`)
}

handler.command = ['delcmdqueue']
handler.help = ['delcmdqueue <command>']
handler.tags = ['owner']
handler.owner = true

export default handler
