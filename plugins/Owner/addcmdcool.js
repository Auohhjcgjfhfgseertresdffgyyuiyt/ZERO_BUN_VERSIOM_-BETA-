const handler = async (m, { q, setReply, command }) => {
  global.db.data.cooldown = global.db.data.cooldown || []

  const cmd = q

  if (!cmd) return setReply(`⚠️ Contoh penggunaan:\n.${command} freya`)

  if (global.db.data.cooldown.includes(cmd)) {
    return setReply(`❌ Command *${cmd}* sudah ada dalam daftar cooldown.`)
  }

  global.db.data.cooldown.push(cmd)
  setReply(`✅ Command *${cmd}* berhasil ditambahkan ke daftar cooldown.`)
}

handler.command = ['addcmdcool']
handler.help = ['addcmdcool <command>']
handler.tags = ['owner']
handler.owner = true

export default handler
