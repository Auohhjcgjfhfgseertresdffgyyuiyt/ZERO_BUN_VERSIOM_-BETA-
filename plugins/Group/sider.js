let handler = async (m, { conn, text, groupMetadata }) => {
    await conn.sendPresenceUpdate('composing', m.chat);

    // ─────────────────────────────────────────────
    // FIX 1 → Jika bukan grup = stop
    // FIX 2 → Jika groupMetadata tidak ada, fetch ulang
    // ─────────────────────────────────────────────
    if (!m.isGroup) 
        return conn.reply(m.chat, "❌ Fitur ini hanya untuk grup", m);

    if (!groupMetadata) {
        try {
            groupMetadata = await conn.groupMetadata(m.chat);
        } catch (e) {
            return conn.reply(m.chat, "❌ Gagal mengambil metadata grup.", m);
        }
    }

    if (!groupMetadata.participants)
        return conn.reply(m.chat, "❌ Data anggota grup tidak tersedia.", m);

    // ─────────────────────────────────────────────
    const participants = groupMetadata.participants;
    const member = participants.map(v => v.id);

    const lama = 86400000 * 7;
    const now = Date.now();

    let pesan = text || "Harap aktif di grup karena akan ada pembersihan member setiap saat";

    let total = 0;
    let sider = [];

    for (let id of member) {
        let dataUser = global.db.data.users[id];
        let peserta = participants.find(u => u.id === id) || {};

        let last = dataUser?.lastseen ?? 0;
        let banned = dataUser?.banned ?? false;

        let isInactive = (now - last) > lama || !dataUser;

        if (isInactive && !peserta.admin && !peserta.superAdmin) {
            if (banned || !dataUser) {
                total++;
                sider.push(id);
            }
        }
    }

    if (total === 0)
        return conn.reply(m.chat, `✓ Tidak ada sider di grup ini.`, m);

    const list = sider.map(v => {
        let last = global.db.data.users[v]?.lastseen ?? 0;
        let status = !global.db.data.users[v] ? "Sider" : "Off " + msToDate(now - last);
        return `  ○ @${v.split('@')[0]} — ${status}`;
    }).join('\n');

    conn.reply(
        m.chat,
        `*${total}/${member.length}* anggota grup *${await conn.getName(m.chat)}* adalah sider:\n\n` +
        `Alasan:\n1. Tidak aktif 7 hari\n2. Baru join tapi tidak nimbrung\n\n` +
        `Pesan:\n_“${pesan}”_\n\n` +
        `*LIST SIDER:*\n${list}`,
        m,
        { contextInfo: { mentionedJid: sider } }
    );
};

handler.help = ["gcsider"];
handler.tags = ["group"];
handler.command = /^(gcsider|sider|getsider)$/i;
handler.group = true;
handler.admin = true;

export default handler;

// ────────────────────────────────
function msToDate(ms) {
    let d = Math.floor(ms / 86400000);
    let h = Math.floor(ms / 3600000) % 24;
    let m = Math.floor(ms / 60000) % 60;
    if (isNaN(ms)) return "--";
    if (d === 0 && h === 0 && m === 0) return "Baru Saja";
    return `${d}H ${h}J`;
}