const handler = async (m, { setReply }) => {
  global.db.data.queue = global.db.data.queue || []

  if (global.db.data.queue.length === 0) {
    return setReply('📭 Tidak ada command yang sedang masuk dalam antrean.')
  }

  const list = global.db.data.queue
    .map((cmd, i) => `${i + 1}. ${cmd}`)
    .join('\n')

  setReply(`📋 Daftar Command dalam Queue:\n\n${list}`)
}

handler.command = ['listcmdqueue']
handler.help = ['listcmdqueue']
handler.tags = ['owner']
handler.owner = true

export default handler
