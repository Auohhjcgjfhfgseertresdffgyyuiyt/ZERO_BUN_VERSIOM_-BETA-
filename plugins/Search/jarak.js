 import { load } from "cheerio";

let handler = async (m, { q, setReply, conn }) => {
  if (!q) return setReply("Masukan query");
  if (!q.includes("|")) return setReply("Contoh: jogja|jakarta");

  let [Dari, Ke] = q.split("|");

  async function jarak(dari, ke) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      "jarak " + dari + " ke " + ke
    )}&hl=id`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
    });

    const html = await res.text();
    const $ = load(html);

    // 🖼️ ambil gambar maps (base64) dari var s='...'
    let imgBase64 = "";
    try {
      imgBase64 = html.split("var s='")[1].split("'")[0];
    } catch {
      imgBase64 = "";
    }

    let bufferImg = "";
    if (/^data:.*?\/.*?;base64,/i.test(imgBase64)) {
      bufferImg = Buffer.from(imgBase64.split(",")[1], "base64");
    }

    // 📌 ambil deskripsi jarak
    let desc =
      $("div.BNeawe.deIvCb.AP7Wnd").text() ||
      $("div.BNeawe.tAd8D.AP7Wnd").text() ||
      "Tidak ditemukan";

    return {
      img: bufferImg,
      desc,
    };
  }

  let data = await jarak(Dari, Ke);

  let caption = `*🗺️ Google Maps*\n\n${data.desc}`;

  await conn.sendMessage(
    m.chat,
    {
      image: data.img,
      caption,
    },
    { quoted: m }
  );
};

handler.help = ["jarak"];
handler.tags = ["search"];
handler.command = ["jarak"];

export default handler;
