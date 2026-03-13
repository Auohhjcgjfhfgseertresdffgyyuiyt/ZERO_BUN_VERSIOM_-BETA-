/*
📌 Name: Lyrics Scraper
🏷️ Type: Plugin ESM
📑 Noted: Support Bun.js (tanpa axios)
*/

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        // Ambil teks dari args atau quote
        let title = args.join(" ") || (m.quoted && m.quoted.text);
        if (!title) throw `Contoh penggunaan: ${usedPrefix + command} judul lagu`;

        // Panggil fungsi fetch
        const data = await fetchLyrics(title);

        if (!data || !data.results || data.results.length === 0) throw "Lirik tidak ditemukan.";

        // Ambil lirik pertama
        const first = data.results[0];
        let caption = `🎵 *Judul:* ${first.title}\n🎤 *Penyanyi:* ${first.artist}\n\n${first.lyrics || 'Lirik belum tersedia'}`;

        m.reply(caption);
    } catch (err) {
        m.reply(`Error: ${err.message || err}`);
    }
};

// Fungsi fetch untuk Bun
async function fetchLyrics(title) {
    const url = `https://lrclib.net/api/search?q=${encodeURIComponent(title)}`;
    const res = await fetch(url, {
        headers: {
            referer: `https://lrclib.net/search/${encodeURIComponent(title)}`,
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
        }
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return await res.json();
}

handler.help = ['lyrics <judul>'];
handler.tags = ['downloader'];
handler.command = /^lyrics$/i;

export default handler;