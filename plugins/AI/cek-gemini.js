let handler = async (m, { conn }) => {

  // === Masukkan 4 APIKEY di sini ===
  const keys = [
    "AIzaSyCh3nquTfRQs2juL2SddgXd5bC37pWT1jQ",
    "AIzaSyC3i6qSI4lnIMcsTIttsqKskuKUxT9jCPM",
    "APIKEY_3",
    "APIKEY_4"
  ];

  m.reply("🔍 Mengecek 4 API Key Gemini (gemini-2.5-flash)...");

  const results = [];

  for (let i = 0; i < keys.length; i++) {
    const apiKey = keys[i];

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      
      const body = {
        contents: [
          {
            parts: [
              { text: "ping" } // test ringan
            ]
          }
        ]
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const json = await res.json();

      // ERROR
      if (json.error) {
        results.push(
          `*API Key ${i + 1}: ERROR ❌*\n` +
          `• Code   : ${json.error.code}\n` +
          `• Status : ${json.error.status}\n` +
          `• Pesan  : ${json.error.message}\n`
        );
        continue;
      }

      // SUKSES
      results.push(
        `*API Key ${i + 1}: AKTIF ✅*\n` +
        `• Model  : gemini-2.5-flash\n` +
        `• Status : Normal / Tidak Kena Limit\n`
      );

    } catch (e) {
      results.push(
        `*API Key ${i + 1}: ERROR ❌*\n` +
        `• Tidak dapat menguji: ${e.message}\n`
      );
    }
  }

  await m.reply(
    `🔰 *CEK APIKEY GOOGLE AI STUDIO — MODEL gemini-2.5-flash* 🔰\n\n` +
    results.join("\n") +
    `\n📌 Jika status *AKTIF*, berarti APIKEY benar-benar bekerja untuk Gemini.`
  );
};

handler.help = ["cek-gemini"];
handler.tags = ["ai"];
handler.command = ["cek-gemini"];

export default handler;