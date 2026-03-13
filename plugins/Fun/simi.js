let handler = async (m, { conn, text }) => {
  const chat = global.db.data.chats[m.chat];

  if (text == "off") {
    chat.simi = false;
    m.reply("Berhasil mematikan auto simi di group ini");
  } else if (text == "on") {
    chat.simi = true;
    m.reply("Berhasil mengaktifkan auto simi di group ini");
  }
};
handler.help = ["simi"];
handler.tags = ["fun"];
handler.command = /^(simi)$/i;
handler.onlyprem = true;
handler.limit = true;
export default handler;
