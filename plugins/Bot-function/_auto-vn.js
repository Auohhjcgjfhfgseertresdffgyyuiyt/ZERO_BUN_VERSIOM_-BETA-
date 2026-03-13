import _spam from "../../lib/functions/antispam.js";
import fs from 'fs-extra'
let handler = (m) => m;

handler.before = async function (m, { conn, isPremium, isOwner, chatUpdate }) {
  const AntiSpam = db.data.antispam;
  //Auto VN Online
  if (db.data.audio[m.body] || db.data.audio[m.body.toLowerCase()]) {
    if (_spam.check("NotCase", m.senderNumber, AntiSpam)) return;
    let nono = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: m.sender } : {}),
      },
      message: {
        extendedTextMessage: {
          text: `${m.pushName} \n「 audio 」 ${
            db.data.audio[m.body.toLowerCase()].name
          }`,
          title: `Hmm`,
          jpegThumbnail: fs.readFileSync("./media/thumb.jpeg"),
        },
      },
    };
    const iniQuoted = m.mentionByReply ? m.quoted.fakeObj : nono;
    conn.sendMessage(
      m.chat,
      {
        audio: { url: db.data.audio[m.body.toLowerCase()].link },
        ptt: true,
        mimetype: "audio/mpeg",
      },
      { quoted: iniQuoted }
    );
    _spam.add("NotCase", m.senderNumber, "5s", AntiSpam);
  }
};
export default handler;
