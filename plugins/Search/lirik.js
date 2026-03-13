 import { load } from "cheerio";

let handler = async (m, { text, conn }) => {
    if (!text) throw "Masukkan lirik atau judulnya";
    m.reply(wait);

    try {
        let res = await genius.getSongLyrics(text);

        if (res.error) {
            return m.reply(res.error);
        }

        let bjir = `*Title:* ${res.title}
*Artist:* ${res.artist}
*Lyrics:* 

${res.lyrics}`;

        await conn.reply(m.chat, bjir, m);
    } catch (e) {
        m.reply(`Error: ${e.message}`);
    }
};

handler.help = handler.command = ["lirik", "lyric"];
handler.tags = ["tools"];

export default handler;

// ==========================================================
//  GENIUS API (FETCH VERSION)
// ==========================================================

const GENIUS_API_URL = "https://api.genius.com";
const GENIUS_ACCESS_TOKEN = "L0BY-i4ZVi0wQ53vlvm2zucqjHTuLbHv--YgjxJoN0spnEIhb5swTr_mWlQ6Ye-F";

const headers = {
    Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
    "User-Agent": "apitester.org Android/7.5(641)",
};

const logs = (message, code) => {
    const error = new Error(message);
    error.code = code;
    return error;
};

const genius = {
    // ============================================
    // SEARCH SONG
    // ============================================
    async searchSong(query) {
        const url = new URL("/search", GENIUS_API_URL);
        url.searchParams.append("q", query);

        try {
            const response = await fetch(url.toString(), {
                method: "GET",
                headers,
            });

            if (!response.ok) {
                throw logs(`❌ Error: ${response.status}`, response.status);
            }

            const data = await response.json();
            return data.response.hits || [];
        } catch (err) {
            throw logs(`❌ Error: ${err.message}`, "NETWORK_ERROR");
        }
    },

    // ============================================
    // GET LYRICS FROM GENIUS PAGE
    // ============================================
    async getLyrics(songUrl) {
        try {
            const response = await fetch(songUrl);
            if (!response.ok) throw logs("❌ Error fetch lyrics", "LYRICS_ERROR");

            const html = await response.text();
            const $ = load(html);

            let lyrics = "";

            $('[class^="Lyrics__Container-"]').each((index, element) => {
                $(element).find("br").replaceWith("\n");
                lyrics +=
                    $(element)
                        .html()
                        .replace(/<(?!\/?i>|\/?b>)[^>]+>/g, "")
                        .replace(/&nbsp;/g, " ") + "\n";
            });

            lyrics = lyrics
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line !== "")
                .join("\n");

            lyrics = lyrics.replace(/\[/g, "\n\n[");
            lyrics = lyrics.replace(/\]\n/g, "]\n");
            lyrics = lyrics.replace(/\n{3,}/g, "\n\n");

            return lyrics.trim();
        } catch (error) {
            throw logs("❌ Error ambil lirik", "LYRICS_ERROR");
        }
    },

    // ============================================
    // MAIN FUNCTION
    // ============================================
    async getSongLyrics(query) {
        try {
            const searchResults = await this.searchSong(query);

            if (searchResults.length === 0) {
                return { error: "Lirik nya gak ada 🌝" };
            }

            const song = searchResults[0].result;
            const lyrics = await this.getLyrics(song.url);

            return {
                title: song.title,
                artist: song.primary_artist.name,
                lyrics,
                url: song.url,
                thumbnailUrl: song.song_art_image_thumbnail_url,
            };
        } catch (err) {
            return { error: err.message };
        }
    },

    // ============================================
    // BATCH GET
    // ============================================
    async *batchGetLyrics(queries) {
        for await (const query of queries) {
            try {
                yield await this.getSongLyrics(query);
            } catch (err) {
                yield { error: err.message, query };
            }
        }
    },
};
