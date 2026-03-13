const handler = async (m, { setReply }) => {
  global.db.data.queue = []
  setReply('✅ Semua command queue telah dibersihkan.')
}

handler.command = ['clearcmdqueue']
handler.help = ['clearcmdqueue']
handler.tags = ['owner']
handler.owner = true

export default handler
