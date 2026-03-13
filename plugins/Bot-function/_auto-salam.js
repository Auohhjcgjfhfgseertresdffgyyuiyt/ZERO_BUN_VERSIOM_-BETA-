import _spam from "../../lib/functions/antispam.js";
let handler = (m) => m;
handler.before = async function (m, { conn, thePrefix }) {
  //jika ada yg cek prefix bot akan merespon
  const AntiSpam = db.data.antispam;
  //Jika ada yg kirim pesan "Asalamualaikun" botz akan respon✓
  if (m.body.includes(`ualaikum`) || m.body.includes(`u'alaikum`)) {
    if (_spam.check("NotCase", m.senderNumber, AntiSpam)) return;
    _spam.add("NotCase", m.senderNumber, "10s", AntiSpam);
    m.reply("Walaikumsalam kak");
  }
};
export default handler;
