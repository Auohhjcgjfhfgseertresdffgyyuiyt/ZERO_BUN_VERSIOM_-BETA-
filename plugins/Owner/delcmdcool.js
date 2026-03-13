const handler = async (m, { args, setReply, command }) => {
  global.db.data.cooldown = global.db.data.cooldown || []

  const cmd = (args[0] || '').toLowerCase()

  if (!cmd) return setReply(`⚠️ Contoh penggunaan:\n.${command} freya`)

  if (!global.db.data.cooldown.includes(cmd)) {
    return setReply(`❌ Command *${cmd}* tidak ditemukan dalam daftar cooldown.`)
  }

  global.db.data.cooldown = global.db.data.cooldown.filter(c => c !== cmd)
  setReply(`✅ Command *${cmd}* berhasil dihapus dari daftar cooldown.`)
}

handler.command = ['delcmdcool']
handler.help = ['delcmdcool <command>']
handler.tags = ['owner']
handler.owner = true

export default handler
