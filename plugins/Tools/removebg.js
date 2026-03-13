

/**
 ╔═══════════════════════
  ⧉  Remove Background (Pixelcut)
 ╚═══════════════════════

  ✺ Bun Support
  ✺ No axios
  ✺ Fetch + FormData
*/

import fs from "fs";
import path from "path";

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";

    if (!/image/.test(mime))
      return m.reply(`❌ Kirim atau reply gambar\n\nContoh:\n${usedPrefix + command}`);

    m.reply("⏳ Menghapus background...");

    // download image
    const buffer = await quoted.download();
    if (!buffer) throw "Gagal download gambar";

    // FormData Bun
    const form = new FormData();
    form.append("format", "png");
    form.append("model", "v1");
    form.append(
      "image",
      new Blob([buffer], { type: mime }),
      "image.png"
    );

    const res = await fetch("https://api2.pixelcut.app/image/matte/v1", {
      method: "POST",
      headers: {
        "x-client-version": "web",
      },
      body: form,
    });

    if (!res.ok) throw "API error";

    const arrayBuffer = await res.arrayBuffer();
    const result = Buffer.from(arrayBuffer);

    await conn.sendMessage(
      m.chat,
      {
        image: result,
        caption: "✅ Background berhasil dihapus",
      },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    m.reply("❌ Gagal remove background");
  }
};

handler.help = ["removebf", "removebg"];
handler.tags = ["tools"];
handler.command = /^remove(bf|bg)$/i;

export default handler;