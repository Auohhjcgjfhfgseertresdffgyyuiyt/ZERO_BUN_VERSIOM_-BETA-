let handler = async (m, { conn, text, usedPrefix, command, groupMetadata }) => {
    let war = global.maxwarn || 3

    let who
    if (m.isGroup) {
        who = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : false
    } else {
        who = m.chat
    }

    if (!who)
        throw `✳️ Tag atau reply member yang ingin diperingatkan\n\n📌 Contoh : ${usedPrefix + command} @user`

    if (!(who in global.db.data.users))
        throw `✳️ Pengguna tidak ditemukan di database`

    let user = global.db.data.users[who]
    if (!user.warn) user.warn = 0

    let adminName = await conn.getName(m.sender)
    let warn = user.warn

    // ================= WARN =================
    if (warn < war) {
        user.warn += 1

        await m.reply(
`⚠️ *WARNING DIBERIKAN* ⚠️

▢ *Admin:* ${adminName}
▢ *Pengguna:* @${who.split('@')[0]}
▢ *Warning:* ${user.warn}/${war}
▢ *Alasan:* ${text || '-'}`,
            null,
            { mentions: [who] }
        )

        await conn.sendMessage(
            who,
            {
                text:
`⚠️ *PERINGATAN* ⚠️
Anda menerima peringatan dari admin

▢ *Warning:* ${user.warn}/${war}
Jika mencapai *${war}* peringatan,
Anda akan dikeluarkan otomatis dari grup.`
            }
        )

    // ================= MAX WARN =================
    } else {
        user.warn = 0

        await m.reply(
`⛔ *BATAS WARNING TERCAPAI*

Pengguna @${who.split('@')[0]} telah menerima *${war}* warning
dan akan dikeluarkan dari grup.`,
            null,
            { mentions: [who] }
        )

        await delay(3000)
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove')

        await conn.sendMessage(
            who,
            {
                text:
`♻️ Anda dikeluarkan dari grup *${groupMetadata.subject}*
karena telah menerima *${war}* peringatan.`
            }
        )
    }
}

handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['warn']
handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler

// ================= DELAY =================
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))