import fs from "fs";

/**
 * Enhance image helper (NO axios, NO external form-data)
 */
async function enhanceImage(path) {
  try {
    const file = Bun.file(path);
    if (!(await file.exists())) {
      throw new Error("File tidak ditemukan");
    }

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

    const form = new FormData();
    form.append("image", blob, file.name || "photo.jpg");
    form.append("enable_quality_check", "true");
    form.append("output_format", "jpg");

    const res = await fetch("https://photoenhancer.pro/api/fast-enhancer", {
      method: "POST",
      body: form,
      headers: {
        origin: "https://photoenhancer.pro",
        referer: "https://photoenhancer.pro/upload?tool=enhance&mode=fast",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      },
    });

    const json = await res.json().catch(() => null);
    if (!json || !json.success) throw new Error("Gagal enhance gambar!");

    return {
      success: true,
      url: "https://photoenhancer.pro" + json.url,
      filename: file.name || "result.jpg",
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Download hasil ke buffer
 */
async function downloadBuffer(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error("Gagal download hasil");
  return Buffer.from(await r.arrayBuffer());
}

let handler = async (m, { conn, setReply, command }) => {
  // ============================
  // CEK SUMBER GAMBAR
  // ============================

  // 1️⃣ PRIORITAS: Quoted Image
  let mediaMsg =
    m.quoted &&
    (m.quoted.mimetype?.includes("image") ||
      m.quoted.msg?.mimetype?.includes("image"))
      ? m.quoted
      : null;

  // 2️⃣ Jika tidak ada quoted, ambil gambar utama
  if (
    !mediaMsg &&
    (m.mimetype?.includes("image") ||
      (m.msg?.mimetype && m.msg.mimetype.includes("image")))
  ) {
    mediaMsg = m;
  }

  if (!mediaMsg) {
    return setReply("❌ Kirim *gambar + caption 'remini'* atau reply gambar!");
  }

  setReply("⏳ Memproses gambar dengan *Remini AI*...");

  // ============================
  // DOWNLOAD INPUT
  // ============================
  const inputPath = "./" + Date.now() + ".jpg";
  const buffer = await mediaMsg.download();
  fs.writeFileSync(inputPath, buffer);

  // ============================
  // GUNAKAN API PhotoEnhancer (fast, tanpa api key)
  // ============================
  const enhanced = await enhanceImage(inputPath);

  if (!enhanced.success) {
    fs.unlinkSync(inputPath);
    return setReply("❌ Remini gagal:\n" + enhanced.error);
  }

  // ============================
  // DOWNLOAD HASIL HD
  // ============================
  const resultBuffer = await downloadBuffer(enhanced.url);

  // ============================
  // KIRIM HASIL
  // ============================
  await conn.sendMessage(
    m.chat,
    {
      image: resultBuffer,
      caption: `✨ *Remini Result* — ${enhanced.filename}`,
    },
    { quoted: m }
  );

  fs.existsSync(inputPath) && fs.unlinkSync(inputPath);
};

handler.help = ["remini"];
handler.tags = ["ai", "tools"];
handler.command = ["remini"];

export default handler;