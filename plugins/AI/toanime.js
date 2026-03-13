/**
 ╔══════════════════════
      ⧉  [Toanime] — [maker]
 ╚══════════════════════

  ✺ Type     : Plugin ESM
  ✺ Creator  : SXZnightmare (Mod by AI)
  ✺ Note     : FULL native Bun (fetch, FormData, Blob).
*/

async function uploadCatbox(buffer) {
    try {
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", new Blob([buffer]), "image.jpg");

        const res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form
        });

        const txt = await res.text();

        if (!txt.startsWith("https://")) throw txt;
        return txt;
    } catch (e) {
        console.log("Uploader Error:", e);
        return null;
    }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || "";

        // Tidak ada link & tidak reply gambar
        if (!text && !/image\/(jpe?g|png|webp)/.test(mime)) {
            return m.reply(
                `*Contoh:* ${usedPrefix + command} (link gambar)\n*Atau reply gambar.*`
            );
        }

        await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

        let imageUrl = text;

        // Jika reply gambar → upload ke catbox
        if (/image\/(jpe?g|png|webp)/.test(mime)) {
            const buffer = await q.download();
            const uploaded = await uploadCatbox(buffer);

            if (!uploaded)
                return m.reply("❌ *Gagal upload gambar ke Catbox.*");

            imageUrl = uploaded;
        }

        const api = `https://zelapioffciall.koyeb.app/imagecreator/toanime?url=${encodeURIComponent(
            imageUrl
        )}`;

        const r = await fetch(api);
        if (!r.ok) return m.reply("❌ *Gagal mengonversi gambar menjadi anime.*");

        const animeBuffer = Buffer.from(await r.arrayBuffer());

        await conn.sendMessage(
            m.chat,
            {
                image: animeBuffer,
                caption: `*🎨 Gambar berhasil diubah menjadi Anime ✨*`
            },
            { quoted: m }
        );
    } catch (e) {
        console.log(e);
        m.reply("❌ *Terjadi kesalahan saat memproses.*");
    } finally {
        await conn.sendMessage(m.chat, { react: { text: "", key: m.key } });
    }
};

handler.help = ["toanime"];
handler.tags = ["maker"];
handler.command = /^(toanime|animeconv|animeconvert)$/i;
handler.limit = true;

export default handler;