import moment from '../../modules/moment.js'

let handler = async (m, { conn, q }) => {
  const chat = db.data.chats[m.chat]

  if (!m.isGroup) throw 'Group only'
  if (m.isGroup && !q) throw 'tag user'

  let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

  let d = new Date(Date.now() + 3600000)
  let locale = 'id'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const numberQuery =
    q.replace(/[()+-/ +/]/gi, '') + '@s.whatsapp.net'

  let Input = m.isGroup
    ? m.mentionByTag?.[0]
      ? m.mentionByTag[0]
      : m.mentionByReply
        ? m.mentionByReply
        : q
          ? numberQuery
          : false
    : false

  let pesanan = m.mentionByReply ? q : ''

  let skyline = `*TRANSAKSI SUKSES*

☍ Jam : ${wib}
☍ Tanggal : ${date}
☍ Status : Sukses
☍ ID Buyer : ${Input.replace('@s.whatsapp.net', '').replace(/[\(\)\-\+ ]/g, '')}

Transaksi @${Input.split('@')[0]} sukses dilakukan, terima kasih telah
membeli produk kami >.<`

  let text = (chat.sDone !== '' ? chat.sDone : skyline)
    .replace('@user', Input.replace('@s.whatsapp.net', ''))
    .replace('@jam', wib)        // ✅ FIX DI SINI
    .replace('@tanggal', date)
    .replace('@group', m.groupName)
    .replace('@pesanan', pesanan)

  await conn.sendMessage(m.chat, {
    text,
    mentions: [Input],
    contextInfo: {
      mentionedJid: [Input]
    }
  })
}

handler.help = ['done *@user*']
handler.tags = ['store']
handler.command = ['done', 'd']

export default handler