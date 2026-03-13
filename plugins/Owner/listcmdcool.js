const handler = async (m, { setReply }) => {
  global.db.data.cooldown = global.db.data.cooldown || []

  if (global.db.data.cooldown.length === 0) {
    return setReply('📭 Belum ada command yang menggunakan cooldown.')
  }

  const list = global.db.data.cooldown.map((cmd, i) => `*${i + 1}.* ${cmd}`).join('\n')
  setReply(`🕒 Daftar Command dengan Cooldown:\n\n${list}`)
}

handler.command = ['listcmdcool']
handler.help = ['listcmdcool']
handler.tags = ['owner']
handler.owner = true

export default handler
