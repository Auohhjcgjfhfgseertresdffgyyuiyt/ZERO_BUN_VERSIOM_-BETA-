// NSFW Checker Plugin — Bun/Node Compatible

async function nsfwchecker(buffer) {
    try {
        if (!Buffer.isBuffer(buffer) && !(buffer instanceof Uint8Array)) {
            throw new Error('Image must be a buffer.');
        }

        const blob = new Blob([buffer], { type: "image/jpeg" });
        const form = new FormData();
        form.append("file", blob, `${Date.now()}.jpg`);

        const response = await fetch(
            "https://www.nyckel.com/v1/functions/o2f0jzcdyut2qxhu/invoke",
            {
                method: "POST",
                body: form
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} — ${response.statusText}`);
        }

        return await response.json();

    } catch (err) {
        throw new Error(err.message);
    }
}


let handler = async (m, { conn }) => {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || '';

        if (!mime.startsWith('image/')) {
            return m.reply('Kirim atau reply gambar untuk dicek.');
        }

        m.reply('🔍 *Checking NSFW...*');

        const img = await q.download();
        const result = await nsfwchecker(img);

        // Output default Nyckel
        let text = `*🔎 NSFW CHECK RESULT*\n\n`;

        if (typeof result === 'object') {
            for (let key in result) {
                text += `• *${key}*: ${JSON.stringify(result[key])}\n`;
            }
        } else {
            text += JSON.stringify(result, null, 2);
        }

        m.reply(text.trim());

    } catch (e) {
        m.reply(`❌ Error: ${e.message}`);
    }
};

handler.help = ['nsfwcheck'];
handler.tags = ['tools'];
handler.command = /^nsfw(check)?$/i;

export default handler;