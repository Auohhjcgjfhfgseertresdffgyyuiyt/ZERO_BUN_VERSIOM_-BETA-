// ========== TikTok Search TANPA axios ==========
async function ttSearch(query) {
    try {
        const body = new URLSearchParams({
            keywords: query,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
        });

        const res = await fetch("https://tikwm.com/api/feed/search", {
            method: "POST",
            body,
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "cookie": "current_language=en",
                "User-Agent": "Mozilla/5.0"
            }
        });

        const json = await res.json();
        return json.data;
    } catch (err) {
        return null;
    }
}

// ========== Google Image Scraper TANPA axios ==========
async function googleImageScrape(query) {
    try {
        const params = new URLSearchParams({
            q: query,
            tbm: "isch"
        });

        const res = await fetch("https://www.google.com/search?" + params, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        const html = await res.text();

        const imageRegex = /"ou":"(.*?)"/g;
        const images = [];
        let match;
        while ((match = imageRegex.exec(html)) !== null) {
            images.push(match[1]);
        }

        return images;
    } catch (err) {
        return [];
    }
}

// ========== HANDLER PLUGIN ==========
let handler = async (m, { conn, command }) => {

    // --- Command: zerotwo ---
    if (command === "zerotwo") {
        await m.reply("Searching images...");

        const imgList = await googleImageScrape("zero two anime");
        if (!imgList.length) return m.reply("Gambar tidak ditemukan.");

        const img = imgList[Math.floor(Math.random() * imgList.length)];

        return conn.sendMessage(
            m.chat,
            {
                image: { url: img },
                caption: "R A N D O M  Z E R O  T W O"
            },
            { quoted: m }
        );
    }

    // --- Command: vidzero ---
    if (command === "vidzero") {
        await m.reply("_Mohon tunggu..._");

        const results = await ttSearch("amv zerotwo");
        if (!results || !results.videos) return m.reply("Video tidak ditemukan.");

        let vids = results.videos;
        let random = vids[Math.floor(Math.random() * vids.length)];

        let videoUrl = "https://tikwm.com/" + random.play;

        return conn.sendMessage(
            m.chat,
            {
                video: { url: videoUrl },
                caption: "AMV Zero Two © ZeroBotAI",
                jpegThumbnail: Buffer.alloc(0) // FIX ANTI ERROR FFMPEG di Zeabur
            },
            { quoted: m }
        );
    }
};

handler.help = ["zerotwo", "vidzero"];
handler.tags = ["anime"];
handler.command = /^(zerotwo|vidzero)$/i;
handler.limit = true;

export default handler;