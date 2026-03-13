/*
Jangan Hapus Wm Bang 

*Bilibili/Bstation Search Plugins ESM*

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*
https://whatsapp.com/channel/0029VadfVP5ElagswfEltW0L/2192
*/

import { load } from 'cheerio'

// ===============================
//   SCRAPER TANPA AXIOS
// ===============================
async function getBsTation(query) {
    try {
        const url = `https://www.bilibili.tv/id/search-result?q=${encodeURIComponent(query)}`;

        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "text/html"
            }
        });

        const html = await res.text();
        const $ = load(html);

        let result = [];

        $('.card-container').each((_, el) => {
            const search = $(el).find('p.card-container__title').text().trim();
            const link = $(el).find('a').attr('href');
            const img = $(el).find('img').attr('src');
            const views = $(el).find('span.meta__tips-text').text().trim();
            const desc = $(el).find('p').text().trim();

            result.push({
                search,
                videoUrl: "https://www.bilibili.tv" + link,
                imageUrl: img,
                views,
                description: desc
            });
        });

        return result;
    } catch (e) {
        console.log(e);
        return [];
    }
}

// ===============================
//         HANDLER PLUGIN
// ===============================
let handler = async (m, { conn, text }) => {

    if (!text) return m.reply(
        `Berikan query pencarian\n\n*Contoh :*\n.bilibili Spy X Family`
    );

    try {
        const data = await getBsTation(text);

        if (!data.length) return m.reply('Tidak ditemukan, coba kata lain.');

        let txt = `*Bilibili Search Result*\n\n`;

        for (let x of data) {
            txt += `*Title:* ${x.search}\n`;
            txt += `*Views:* ${x.views}\n`;
            txt += `*Description:* ${x.description}\n`;
            txt += `*URL:* ${x.videoUrl}\n\n`;
        }

        await conn.sendMessage(
            m.chat,
            {
                image: { url: data[0].imageUrl },
                caption: txt
            },
            { quoted: m }
        );

    } catch (err) {
        console.log(err);
        m.reply("Terjadi kesalahan.");
    }
};

handler.help = ['bilibili <query>'];
handler.tags = ['internet'];
handler.command = ['bilibili', 'bstation'];

export default handler;