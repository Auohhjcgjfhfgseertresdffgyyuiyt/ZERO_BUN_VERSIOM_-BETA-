//source: https://whatsapp.com/channel/0029VacFb8kLNSZwwiUfq62b
//upch,media,audio,image
//kalau ada yang error perbaiki sendiri 
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        throw `Contoh:\n${usedPrefix}${command} Halo?`;
    }
    const who = m.sender;
    const idch = '120363307019082653@newsletter'; // ID Channel Newsletter

    let username;
    try {
        username = conn.getName(who);
    } catch {
        username = 'Pengguna';
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
    } catch (e) {
        console.error('Gagal mengirim reaksi loading:', e);
    }

    let url;
    try {
        url = await conn.profilePictureUrl(who, 'image');
    } catch {
        url = null;
    }
    const q = m.quoted ? m.quoted : m;
    const mime = q.mimetype || '';

    let content = { text };

    if (mime) {
        try {
            const mediaBuffer = await q.download();
            if (!mediaBuffer) throw new Error('Gagal mengunduh media');

            if (mime.includes('image')) {
                content = { image: mediaBuffer, caption: text };
            } else if (mime.includes('video')) {
                content = { video: mediaBuffer, caption: text };
            } else if (mime.includes('audio')) {
                content = { audio: mediaBuffer, mimetype: 'audio/mpeg', fileName: 'Rin.mp3', ptt: true };
            } else {
                content = { text };
            }
        } catch (downloadError) {
            console.error('Error downloading media:', downloadError);
            content = { text: `${text}\n\n[Media gagal diunduh, hanya teks yang dikirim]` };
        }
    }

    content.contextInfo = {
        externalAdReply: {
            body: `Pesan dari ${username}`,
            thumbnailUrl: url,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: false,
            showAdAttribution: false
        }
    };
    
    try {
        await conn.sendMessage(idch, content);
        try {
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } catch (e) {
            console.error('Gagal mengirim reaksi sukses:', e);
        }
        await m.reply('✅ Pesanmu telah terkirim ke channel!');
    } catch (sendError) {
        console.error('Error sending message to channel:', sendError);
        await m.reply('❌ Gagal mengirim pesan ke channel. Silakan coba lagi nanti.');
        try {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        } catch (e) {
            console.error('Gagal mengirim reaksi error:', e);
        }
    }
};

handler.command = /^(msgch)$/i;
handler.help = ['msgch'];
handler.tags = ['owner'];
handler.premium = true;
handler.mods = true;

export default handler;