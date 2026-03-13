/*
📌 Name : Vermeil Images
🏷️ Type : Plugin ESM
*/

let handler = async (m, { conn, command }) => {
  try {
    // List gambar Vermeil
    const imgs = [
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸32.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸31.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸30.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸29.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸28.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸27.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸26.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸25.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸24.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸23.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸22.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸21.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸20.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸19.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸18.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸17.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸16.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸15.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸14.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸13.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸12.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸11.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸10.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸09.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸08.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸07.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸06.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸05.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸04.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸03.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸02.webp",
      "https://raw.githubusercontent.com/hoshino555/Ze/main/Yoshinobi_-_Vermeil/©𝑌𝑀𝑁𝑆𝐸01.webp"
    ];

    let url = imgs[Math.floor(Math.random() * imgs.length)];

    await conn.sendMessage(m.chat, {
      image: { url },
      caption: "✨ *Vermeil Random Image*"
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Terjadi kesalahan!");
  }
};

handler.help = ["vermeil"];
handler.tags = ["anime"];
handler.command = /^(vermeil)$/i;

export default handler;