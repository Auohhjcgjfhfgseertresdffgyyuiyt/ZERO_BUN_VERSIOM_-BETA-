 let handler = async (m) => {
    const url = 'https://raw.githubusercontent.com/IdkJhus/JhuszBotV1/main/node_modules/ra-api/lib/database/pantun.json';

    // fetch pantun
    const res = await fetch(url);
    if (!res.ok) throw `Gagal mengambil pantun: ${res.status}`;

    const list = await res.json();

    // random pantun (pakai getRandom milik kamu)
    let data = list.getRandom();

    m.reply(data.trim());
};

handler.help = ['pantun'];
handler.tags = ['quotes'];
handler.command = /^(pantun)$/i;

export default handler;
