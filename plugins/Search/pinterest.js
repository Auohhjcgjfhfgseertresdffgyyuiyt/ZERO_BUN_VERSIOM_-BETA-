import {
  generateWAMessageFromContent,
  prepareWAMessageMedia,
} from "baileys";

const SERPAPI_KEY = global.serApi; // kosongkan jika tidak pakai SerpAPI

let handler = async (m, { conn, q, command, prefix }) => {
  if (!q)
    return m.reply(
      `Kirim perintah:\n${command} aesthetic\n${command} aesthetic --10`
    );

  await m.reply("🔍 Sedang mencari gambar Pinterest...");

  // jumlah gambar
  let jumlah = 5;
  if (q.includes("--")) {
    const parts = q.split("--");
    q = parts[0].trim();
    jumlah = parseInt(parts[1]) || 5;
  }

  const data = await pinterest(q);
  if (!data.result.length)
    return m.reply("❌ Tidak ditemukan gambar!");

  const result = data.result.slice(0, jumlah);

  // tombol next (private chat)
  const nextButton = !m.isGroup
    ? {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Next",
          title: "Next",
          id: `${prefix}pinterest ${q}`,
        }),
      }
    : {};

  const cards = await Promise.all(
    result.map(async (url) => ({
      header: {
        hasMediaAttachment: true,
        ...(await prepareWAMessageMedia(
          { image: { url } },
          { upload: conn.waUploadToServer }
        )),
      },
      body: { text: q },
      nativeFlowMessage: {
        buttons: [
          nextButton,
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Url",
              url,
              merchant_url: url,
            }),
          },
        ],
      },
    }))
  );

  const msg = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: "📌 Hasil Pencarian Pinterest" },
            carouselMessage: {
              cards,
              messageVersion: 1,
            },
          },
        },
      },
    },
    { quoted: m }
  );

  await conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id,
  });
};

handler.help = ["pinterest <query>"];
handler.tags = ["info", "internet"];
handler.command = /^(pinterest|pin)$/i;
handler.premium = true;

export default handler;

/* ===============================
   PINTEREST SEARCH ENGINE
   SerpAPI ➜ Bing Scrape (fallback)
   =============================== */

async function pinterest(query) {
  // 🔵 SERPAPI (jika ada key)
  if (SERPAPI_KEY) {
    try {
      const url = new URL("https://serpapi.com/search");
      url.searchParams.set("engine", "google");
      url.searchParams.set("q", `${query} site:pinterest.com`);
      url.searchParams.set("tbm", "isch");
      url.searchParams.set("api_key", SERPAPI_KEY);

      const res = await fetch(url);
      if (!res.ok) throw new Error("SerpAPI error");

      const json = await res.json();
      const result = (json.images_results || [])
        .map((v) => v.original)
        .filter((x) => x && x.startsWith("http"));

      if (result.length)
        return {
          status: 200,
          creator: "officialdittaz",
          result,
        };
    } catch (e) {
      console.error("SerpAPI gagal, fallback ke Bing");
    }
  }

  // 🔴 FALLBACK → BING IMAGE SCRAPE (pengganti g-i-s)
  try {
    const res = await fetch(
      `https://www.bing.com/images/search?q=${encodeURIComponent(
        query + " site:pinterest.com"
      )}&form=HDRSC2`
    );

    const html = await res.text();

    const result = [
      ...new Set(
        [...html.matchAll(/"murl":"(https:[^"]+)"/g)]
          .map((v) => v[1])
          .filter(Boolean)
      ),
    ];

    return {
      status: 200,
      creator: "officialdittaz",
      result,
    };
  } catch (e) {
    console.error("Bing scrape error:", e);
    return { status: 500, result: [] };
  }
}