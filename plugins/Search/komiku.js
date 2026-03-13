/**
 * KOMIKU NO AXIOS + NO PDFKIT
 * By Ainurridha (Rebuild)
 */

import * as cheerio from "cheerio";

let handler = async (m, { conn, text }) => {
    let q = text || (m.quoted?.text?.trim());
    if (!q) {
        return m.reply(`Penggunaan:
- /komiku latest
- /komiku populer
- /komiku <query>
- /komiku <detail>
- /komiku <chapter>`);
    }

    m.reply("Wait...");

    // LATEST
    if (q === "latest") {
        let data = await komikuLatest();
        let msg = "*KOMIKU LATEST*\n\n";
        for (let v of data) {
            msg += `📌 *${v.title}*\nGenre: ${v.genre}\nChapter: ${v.chapter}\n${v.link}\n\n`;
        }
        return conn.sendMessage(m.chat, { text: msg.trim() }, { quoted: m });
    }

    // POPULER
    if (q === "populer") {
        let data = await komikuPopuler();
        let msg = "*KOMIKU POPULER*\n\n";
        for (let v of data) {
            msg += `📌 *${v.title}*\nGenre: ${v.genre}\nChapter: ${v.chapter}\n${v.link}\n\n`;
        }
        return conn.sendMessage(m.chat, { text: msg.trim() }, { quoted: m });
    }

    // DOWNLOAD CHAPTER → PDF
    if (q.match(/chapter-\d+/)) {
        let info = await komikuDownload(q);
        if (!info) return m.reply("Gagal mengambil data.");

        m.reply("Sedang convert ke PDF tanpa module...");

        let pdf = await imagesToPdfRaw(info.images.map(v => v.url));

        await conn.sendMessage(m.chat, {
            document: pdf,
            mimetype: "application/pdf",
            fileName: info.title + ".pdf"
        }, { quoted: m });

        return;
    }

    // DETAIL
    if (q.includes("https://komiku.id/manga")) {
        let d = await komikuDetail(q);
        let msg = `*DETAIL MANGA*\n\n`;
        msg += `📌 Title: ${d.info.title}\n`;
        msg += `📌 Indonesia: ${d.info.indo}\n`;
        msg += `📌 Format: ${d.info.jenis}\n`;
        msg += `📌 Genre: ${d.info.genre}\n`;
        msg += `📌 Author: ${d.info.pengarang}\n`;
        msg += `📌 Status: ${d.info.status}\n`;
        msg += `📌 Rating: ${d.info.umur}\n\n`;
        msg += `📖 Sinopsis:\n${d.synopsis}\n\n`;
        msg += `📚 Chapter: \n`;
        for (let v of d.chapters) {
            msg += `- ${v.title} (${v.date})\n${v.link}\n`;
        }
        return m.reply(msg.trim());
    }

    // SEARCH
    let res = await komikuSearch(q);
    if (!res.length) return m.reply("Tidak ada hasil.");

    let msg = `*HASIL PENCARIAN: ${q}*\n\n`;
    for (let v of res) {
        msg += `📌 *${v.title}*\nGenre: ${v.genre}\nChapter: ${v.latestChapter}\n${v.link}\n\n`;
    }
    return conn.sendMessage(m.chat, { text: msg.trim() }, { quoted: m });
};

handler.command = /^komiku$/i;
handler.tags = ['anime'];
export default handler;

/* ================================================================== */
/* ========================= SCRAPER TANPA AXIOS ==================== */
/* ================================================================== */

async function fetchText(url) {
    return await (await fetch(url)).text();
}
async function fetchBuffer(url) {
    return Buffer.from(await (await fetch(url)).arrayBuffer());
}

async function komikuPopuler() {
    let $ = cheerio.load(await fetchText("https://komiku.id/"));
    return $('.ls12 .ls2').map((_, e) => ({
        title: $(e).find(".ls2j h3 a").text().trim(),
        genre: $(e).find(".ls2t").text().trim(),
        chapter: $(e).find(".ls2l").text().trim(),
        link: "https://komiku.id" + $(e).find(".ls2j h3 a").attr("href"),
    })).get();
}

async function komikuLatest() {
    let $ = cheerio.load(await fetchText("https://komiku.id/"));
    let arr = [];
    $("#Terbaru .ls4").each((_, e) => {
        arr.push({
            title: $(e).find(".ls4j h3 a").text().trim(),
            genre: $(e).find(".ls4s").text().trim(),
            chapter: $(e).find(".ls24").text().trim(),
            link: "https://komiku.id" + $(e).find(".ls4j h3 a").attr("href"),
        });
    });
    return arr;
}

async function komikuSearch(q) {
    let html = await fetchText(`https://api.komiku.id/?post_type=manga&s=${q}`);
    let $ = cheerio.load(html);
    let arr = [];
    $(".bge").each((_, e) => {
        arr.push({
            title: $(e).find("h3").text().trim(),
            genre: $(e).find(".tpe1_inf b").text().trim(),
            latestChapter: $(e).find(".new1 span:last").text().trim(),
            link: "https://komiku.id" + $(e).find("a").attr("href"),
        });
    });
    return arr;
}

async function komikuDetail(url) {
    let $ = cheerio.load(await fetchText(url));
    let info = {};

    $("table.inftable tr").each((_, tr) => {
        let k = $(tr).find("td:first").text().trim();
        let v = $(tr).find("td:last").text().trim();
        if (k.includes("Judul Komik")) info.title = v;
        if (k.includes("Judul Indonesia")) info.indo = v;
        if (k.includes("Jenis Komik")) info.jenis = v;
        if (k.includes("Konsep")) info.genre = v;
        if (k.includes("Pengarang")) info.pengarang = v;
        if (k.includes("Status")) info.status = v;
        if (k.includes("Umur")) info.umur = v;
    });

    let chapters = [];
    $("tr").each((_, tr) => {
        let a = $(tr).find("td.judulseries a");
        if (!a.length) return;
        chapters.push({
            title: a.find("span").text().trim(),
            link: "https://komiku.id" + a.attr("href"),
            date: $(tr).find(".tanggalseries").text().trim(),
        });
    });

    return {
        synopsis: $("p.desc").text().trim(),
        info,
        chapters,
    };
}

async function komikuDownload(url) {
    let $ = cheerio.load(await fetchText(url));
    let images = $("#Baca_Komik img, .content-comic img").map((_, e) => ({
        url: $(e).attr("src")
    })).get();

    return {
        title: $("title").text().trim(),
        images
    };
}

/* ================================================================== */
/* ======================= RAW PDF CREATOR ========================== */
/* ================================================================== */

async function imagesToPdfRaw(imgUrls) {
    let objects = [];
    let xref = [];
    let pos = 0;

    function add(obj) {
        let s = obj + "\n";
        objects.push(s);
        pos += Buffer.byteLength(s);
        xref.push(pos);
    }

    add("%PDF-1.3");

    let pages = [];
    for (let url of imgUrls) {
        let img = await fetchBuffer(url);
        let id = xref.length + 1;

        add(`${id} 0 obj<< /Length ${img.length} /Filter /DCTDecode >>stream`);
        add(img.toString("binary"));
        add("endstream endobj");

        let pageId = xref.length + 1;
        add(`${pageId} 0 obj<< /Type /Page /Parent 1 0 R /MediaBox [0 0 595 842] /Resources<< /XObject<< /Im${id} ${id} 0 R >> >> /Contents 4 0 R >>endobj`);
        pages.push(pageId);
    }

    add(`1 0 obj<< /Type /Pages /Kids [${pages.map(v => v + " 0 R").join(" ")}] /Count ${pages.length} >>endobj`);
    add(`2 0 obj<< /Type /Catalog /Pages 1 0 R >>endobj`);

    let startXref = pos;
    let x = "xref\n0 " + xref.length + "\n0".padStart(10, "0") + " 65535 f \n";
    xref.forEach(p => (x += String(p).padStart(10, "0") + " 00000 n \n"));
    let trailer = `trailer<< /Root 2 0 R /Size ${xref.length} >>\nstartxref\n${startXref}\n%%EOF`;

    return Buffer.from(objects.join("") + x + trailer);
}