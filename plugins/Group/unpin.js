let handler = async (m, { conn }) => {
    if (!m.quoted) return m.reply("Reply a message to unpin.");

    let q = m.quoted;

    // Cari key dari berbagai kemungkinan lokasi Baileys
    let quotedKey =
        q.key ||
        q.msg?.key ||
        q.message?.key ||
        q.fakeObj?.key ||
        (q.id ? { id: q.id, fromMe: q.fromMe, remoteJid: m.chat } : null);

    // Jika tetap tidak ada key
    if (!quotedKey || !quotedKey.id) {
        return m.reply("Cannot unpin: quoted message key not found");
    }

    try {
        await conn.sendMessage(m.chat, {
            pin: quotedKey,
            type: 2, // 2 = unpin
        });

        m.reply("Message unpinned.");
    } catch (e) {
        console.error(e);
        m.reply(`Error: ${e.message}`);
    }
};

handler.help = ["unpin"];
handler.tags = ["group"];
handler.command = /^(unpin)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;