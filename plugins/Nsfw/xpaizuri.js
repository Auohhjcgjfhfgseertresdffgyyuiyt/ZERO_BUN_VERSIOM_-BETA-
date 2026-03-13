// Tidak perlu import fetch karena Bun sudah punya fetch
let handler = async (m, { conn }) => {
  const url = 'https://api.waifu.im/search?included_tags=paizuri';

  try {
    // fetch bawaan Bun
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return m.reply(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.images || data.images.length === 0)
      return m.reply('No anime images found.');

    const img = data.images[0];

    const caption = `
Signature : ${img.signature}
Extension : ${img.extension}
Image ID  : ${img.image_id}
Favorites : ${img.favorites}
Source    : ${img.source}
Width     : ${img.width}
Height    : ${img.height}
Byte Size : ${img.byte_size}
URL       : ${img.url}
    `.trim();

    await conn.sendFile(m.chat, img.url, null, caption, m);

  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat mengambil data.');
  }
};

handler.help = ['xpaizuri'];
handler.command = ['xpaizuri'];
handler.tags = ['nsfw'];
handler.limit = true;
export default handler;