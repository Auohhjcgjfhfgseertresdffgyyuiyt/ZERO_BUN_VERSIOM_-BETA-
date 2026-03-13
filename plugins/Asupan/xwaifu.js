// Tidak perlu import fetch (Bun sudah native)

let handler = async (m, { conn }) => {
  m.reply(wait);

  try {
    const res = await fetch('https://api.waifu.pics/nsfw/waifu');

    if (!res.ok) {
      await m.react('❌');
      return;
    }

    const json = await res.json();

    if (!json.url) {
      await m.react('❌');
      return;
    }

    await conn.sendFile(
      m.chat,
      json.url,
      'xwaifu.png',
      '*RANDOM WAIFU*',
      m
    );

  } catch (e) {
    console.error(e);
    await m.react('❌');
    m.reply('Terjadi kesalahan saat mengambil gambar.');
  }
};

handler.help = ['xwaifu'];
handler.tags = ['nsfw'];
handler.command = ['xwaifu'];
handler.nsfw = true;

export default handler;