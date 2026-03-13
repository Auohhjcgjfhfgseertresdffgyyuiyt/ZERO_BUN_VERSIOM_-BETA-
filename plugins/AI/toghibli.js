/**
  ╔══════════════════════
        ⧉  [toghibli] — [maker]
 ╚══════════════════════

  ✺ Type     : Plugin ESM
  ✺ Source   : https://whatsapp.com/channel/0029VbAXhS26WaKugBLx4E05
  ✺ Creator  : SXZnightmare
  ✺ API      : [ https://kayzzidgf.my.id/docs.html ]
  ✺ Req    : seseorang
*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    try {
        if (!text && (!mime || !mime.startsWith('image/'))) {
            return m.reply(
                `*Example:*\n\n• ${usedPrefix + command} <url>\n• Reply/kirim gambar dengan caption: ${usedPrefix + command}`
            );
        }

        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        let imageUrl = '';

        if (text && /^https?:\/\//i.test(text)) {
            imageUrl = text.trim();
        } else {
            const media = await q.download();

            const upload = await fetch('https://uguu.se/upload.php', {
                method: 'POST',
                body: (() => {
                    const form = new FormData();
                    form.append('files[]', new Blob([media], { type: mime }), 'image.jpg');
                    return form;
                })()
            });

            if (!upload.ok) {
                return m.reply('🍂 *Gagal mengunggah gambar ke server.*');
            }

            const json = await upload.json();
            imageUrl = json?.files?.[0]?.url;

            if (!imageUrl) {
                return m.reply('🍂 *Upload gagal, URL tidak ditemukan.*');
            }
        }

        const endpoint = `https://kayzzidgf.my.id/api/tools/toghibli?image=${encodeURIComponent(imageUrl)}&apikey=FreeLimit`;
        const res = await fetch(endpoint);

        if (!res.ok) {
            return m.reply('🍂 *Gagal memproses gambar ke mode Ghibli.*');
        }

        const buffer = Buffer.from(await res.arrayBuffer());

        await conn.sendMessage(
    m.chat,
    { image: buffer },
    { quoted: m }
    );

    } catch (e) {
        await m.reply('🍂 *Terjadi kesalahan saat memproses gambar.*');
    } finally {
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
};

handler.help = ['toghibli'];
handler.tags = ['maker'];
handler.command = /^(toghibli)$/i;
handler.limit = false;
handler.register = false; // true kan jika ada fitur register atau daftar di bot mu.

export default handler;