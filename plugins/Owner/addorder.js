// plugins/Owner/addorder.original.js
import moment from '../../modules/moment.js'

/**
 * addorder.original.js
 * - WAJIB pakai linkgc di PRIVATE maupun GRUP
 * - Bot harus join dulu (atau pending jika belum di-ACC)
 * - Robust parsing link (mengabaikan query params)
 * - Tidak menerima tanpa link
 * - Notifikasi admin ketika pending
 */

let handler = async (m, { conn, q, args, setReply, usedPrefix, command }) => {
  try {
    if (!q) return m.reply('Contoh penggunaan:\n.addsewa https://chat.whatsapp.com/XXXXX|30d')

    // ambil link dan durasi (format wajib: link|durasi)
    const rawLink = q.includes('|') ? q.split('|')[0].trim() : q.split(' ')[0].trim()
    const rawDur = q.includes('|') ? q.split('|')[1].trim() : (q.split(' ')[1] || '').trim()

    if (!rawLink || !rawDur) return m.reply('Format salah. Gunakan:\n.addsewa https://chat.whatsapp.com/XXXXX|30d')

    // ekstrak kode invite (mengabaikan query string)
    const match = rawLink.match(/chat\.whatsapp\.com\/([A-Za-z0-9_-]+)/i)
    if (!match) return setReply('⚠️ Tidak ada link grup yang valid. Pastikan link berbentuk https://chat.whatsapp.com/XXXXX')

    const kode = match[1]

    // ambil info grup dari link
    let groupInfo
    try {
      groupInfo = await conn.groupGetInviteInfo(kode)
    } catch (e) {
      const errMsg = e?.message || String(e || '')
      if (errMsg.includes('not-authorized')) {
        return m.reply('⚠️ Bot sudah pernah di-kick dari grup tersebut. Tidak bisa bergabung lewat link ini.')
      } else if (errMsg.includes('revoked') || errMsg.includes('revoke')) {
        return m.reply('⚠️ Link grup sudah di-revoke (tidak valid lagi). Minta link baru ke admin grup.')
      } else if (errMsg.includes('full') || errMsg.includes('Group is full')) {
        return m.reply('⚠️ Grup sudah penuh, tidak bisa join.')
      } else {
        return setReply('⚠️ Link tidak valid atau bot tidak bisa mengakses link.')
      }
    }

    // data dari groupInfo
    const { id, subject, creation, participants = [], owner, subjectOwner } = groupInfo
    const tagOwner = owner ?? subjectOwner ?? null
    const creatorLabel = tagOwner ? (String(tagOwner).startsWith('@') ? tagOwner : ('@' + tagOwner)) : 'Tidak ada'

    // contextInfo / preview (jaga agar tidak crash jika variabel global kosong)
    const fake = global?.opts?.fake || 'Bot'
    const baileysVersion = global?.baileysVersion || ''
    const nomerOwner = String(global?.owner?.split?.(',')?.[0] || '6280000000000').replace(/[^\d]/g, '')
    const copyright = global?.copyright || ''
    const calender = moment().tz('Asia/Jakarta').format('DD/MM/YYYY')

    const contextInfo = {
      forwardingScore: 50,
      isForwarded: true,
      mentionedJid: tagOwner ? [tagOwner] : [],
      externalAdReply: {
        showAdAttribution: false,
        title: `${fake}`,
        body: baileysVersion,
        mediaType: 1,
        sourceUrl: `https://wa.me/${nomerOwner}`,
        thumbnailUrl: 'https://telegra.ph/file/0aa9d587a19e37a0b0122.jpg'
      }
    }

    // coba join grup via invite link
    let joinResult
    try {
      joinResult = await conn.groupAcceptInvite(kode)
    } catch (e) {
      // jika gagal join, tetap set joinResult = undefined (pending)
      joinResult = undefined
    }

    // simpan ke DB — jika join gagal maka pending = true
    const pending = joinResult === undefined
    add(id, subject, rawLink, rawDur, pending, creatorLabel, command, conn)

    // ambil metadata (prefer refresh jika sudah join)
    let groupMetadata = await conn.groupMetadata(id).catch(_ => null)
    let data = groupMetadata ? groupMetadata.participants : participants
    let member = data.filter(u => !(u.admin === 'admin' || u.admin === 'superadmin'))
    let admin = data.filter(u => (u.admin === 'admin' || u.admin === 'superadmin'))
    let allMember = data.map(i => i.id)

    const timeWib = moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')
    const teks = `
––––––『 *ORDER BOT SUCCESS* 』––––––

🔰 *Group*
• Name: ${subject}
• Creat at:  ${creation ? new Date(creation * 1000).toLocaleString() : 'N/A'}
• Creator: ${creatorLabel}
• Group Id: ${id}
• Admin: ${admin.length}
• Members: ${member.length}
• Days: ${conn.msToDate(conn.toMs(rawDur))}
• Countdown: ${conn.toMs(rawDur)}
• Time order: ${timeWib}
• Time end: ${tSewaBerakhir(Date.now() + conn.toMs(rawDur))}
•·–––––––––––––––––––––––––·•

📮 *Note:* ↓
• Bot yang sudah di order tidak dapat di refund
• Ketik .menu untuk mengakses bot
• Ketik .cekorder untuk melihat sisa order
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk menyewa bot
• Owner wa.me/${nomerOwner}

${copyright} - ${calender}
`.trim()

    // kirim konfirmasi ke pengirim (private chat)
    await conn.sendMessage(m.chat, { text: teks, mentions: tagOwner ? [tagOwner] : [] }, { quoted: m })

    // jika bot berhasil join --> kirim pesan ke grup serta lakukan tindakan pasca-join
    if (joinResult !== undefined) {
      // jika bot baru saja join dan belum ada cache, refresh
      if (!conn.chats[id]) {
        try { await conn.refreshGroups(id) } catch {}
      }

      // kirim ke group (welcome/order)
      // tunggu sedikit supaya metadata settle
      await new Promise(r => setTimeout(r, 2000))
      await conn.sendMessage(id, { text: teks, contextInfo }).catch(_ => {})

      // optional: kirim pesan pembuka
      await sendOpeningMessage(conn, id, subject).catch(_ => {})
      await notifyOwnerApproval(conn, creatorLabel).catch(_ => {})

      return m.reply(`✅ Berhasil menambahkan sewa dan bot telah bergabung ke grup: ${subject}`)
    }

    // jika join gagal (pending)
    // jika bot sebenarnya sudah ada di grup (allMember contains bot id), artinya joinResult undefined karena error lain — treat as joined
    if (allMember.includes(m.botLid)) {
      // bot sebenarnya sudah di grup, treat as success
      await conn.sendMessage(id, { text: teks, contextInfo }).catch(_ => {})
      return m.reply('✅ Berhasil menambahkan waktu sewa (bot sudah ada di grup).')
    }

    // notifikasi ke admin untuk ACC
    await notifyAdminApproval(conn, participants, subject).catch(_ => {})

    return m.reply(`⏳ Menunggu persetujuan admin grup. Status: ${global.db?.data?.chats?.[id]?.pending ? 'Pending' : 'Sukses'}`)

  } catch (err) {
    console.error(err)
    return m.reply('Terjadi error: ' + (err?.message || String(err)))
  }
}

handler.help = ['addsewa <linkgc>|<durasi>']
handler.tags = ['owner']
handler.command = /^(setexpired|addsewa|addorder)$/i
handler.owner = true
handler.group = false

export default handler



// ----------------- HELPERS -----------------

// Notifikasi ke Owner jika bot di-approve / join
async function notifyOwnerApproval(conn, creator) {
  try {
    const ownerNumber = (global?.owner?.split?.(',')?.[0]) || global?.owner?.[0] || '6280000000000'
    const jid = ownerNumber.includes('@') ? ownerNumber : `${ownerNumber}@s.whatsapp.net`
    const ownerNotif = `🔔 *BOT APPROVAL NOTIFICATION*\n\nBot telah berhasil diterima oleh admin ke grup!\nCreator: ${creator}\n\nBot sekarang aktif dan siap digunakan! 🚀`
    await conn.sendMessage(jid, { text: ownerNotif }).catch(_ => {})
  } catch (e) { /* ignore */ }
}

// Pesan pembuka setelah bot berhasil join
async function sendOpeningMessage(conn, id, subject) {
  try {
    const openingMessage = `📢 *Halo anggota grup ${subject}*\n\nBot resmi telah bergabung untuk membantu mengelola grup.\nKetik *.menu* untuk melihat semua fitur yang tersedia.\n\nTerima kasih! 🙏`
    await conn.sendMessage(id, { text: openingMessage }).catch(_ => {})
  } catch (e) { /* ignore */ }
}

// Notifikasi ke admin untuk ACC jika join pending
async function notifyAdminApproval(conn, participants = [], subject = '') {
  try {
    const adminList = (participants || []).filter(u => u.admin === 'admin' || u.admin === 'superadmin')
    if (!adminList || adminList.length === 0) return
    const adminMentions = adminList.map(a => a.id)
    const notifText = `🚨 *PERHATIAN ADMIN GROUP*\n\nBot memerlukan persetujuan admin untuk aktif di grup *${subject}*.\nMohon ACC permintaan masuk agar order aktif.\n\nTerima kasih 🙏`
    for (let i of adminMentions) {
      await new Promise(r => setTimeout(r, 1000))
      await conn.sendMessage(i, { text: notifText, mentions: adminMentions }).catch(_ => {})
    }
  } catch (e) { /* ignore */ }
}

// Fungsi untuk menghitung tanggal sewa berakhir
function tSewaBerakhir(tanggalSewa) {
  return moment(tanggalSewa).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')
}

// Fungsi untuk menambahkan / update sewa di DB
function add(gid, subject, link, expired, pending = false, creator = 'tidak ada', command, conn) {
  // wrapper to original add to keep compatibility
  addInternal(gid, subject, link, expired, pending, creator, conn)
}
function addInternal(gid, subject, link, expired, pending = false, creator = 'tidak ada', conn) {
  try {
    const timeWib = moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')
    if (!global.db) global.db = { data: { chats: {} } }
    const chat = global.db.data.chats[gid]
    const obj = {
      expired: Date.now() + conn.toMs(expired),
      timeEnd: tSewaBerakhir(Date.now() + conn.toMs(expired)),
      linkgc: link,
      id: gid,
      threeDaysLeft: false,
      tenDaysLeft: false,
      oneDaysLeft: false,
      endDays: false,
      timeOrder: timeWib,
      creator: creator === 'Tidak ada' ? 'Tidak ada' : ('wa.me/' + String(creator).replace(/^@/, '').replace(/[^\d]/g, '')),
      name: subject,
      pending: !!pending
    }
    if (chat) Object.assign(chat, obj)
    else global.db.data.chats[gid] = obj
  } catch (e) {
    console.error('addInternal error', e)
  }
}