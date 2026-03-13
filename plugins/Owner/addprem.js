// Optimized by ChatGPT

import moment from '../../modules/moment.js'

const delay = ms => new Promise(res => setTimeout(res, ms));

let handler = async (m, { conn, usedPrefix, command, isOwner, q, setReply }) => {
  let timeWib = moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm');
  let { isGroup, mentionByReply, mentionByTag, botNumber } = m;

  // Owner only
  if (!isOwner) return setReply(mess.only.ownerB);

  let nomernya, waktunya, namanye;

  // ===== INPUT HANDLING (PRIVATE & GROUP SAMA) =====
  if (mentionByReply) {
    nomernya = mentionByReply;
    waktunya = q.trim();
    namanye = await conn.getName(nomernya);

  } else if (mentionByTag && mentionByTag.length) {
    nomernya = mentionByTag[0];
    waktunya = q.replace(/@\d+/g, '').trim();
    namanye = await conn.getName(nomernya);

  } else if (q && q.startsWith("+")) {
    nomernya = q.split("|")[0].replace(/[()+-/\s]/g, "") + "@s.whatsapp.net";
    waktunya = q.split("|")[1];
    namanye = await conn.getName(nomernya);

  } else {
    return setReply(
      `Penggunaan salah ❌

Contoh:
• Reply user: .addprem 7d
• Tag user : .addprem @user 7d
• Nomor    : .addprem +628xxxx|7d`
    );
  }

  if (!waktunya) return setReply("Masukan waktu: s / h / d\nContoh: 7d");

  if (nomernya === botNumber) {
    return setReply("Bot tidak bisa dijadikan user premium.");
  }

  let msTime = conn.toMs(waktunya);
  if (!msTime) return setReply("Format waktu tidak valid.");

  let user = db.data.users[nomernya] || {};

  // ===== SET / EXTEND PREMIUM =====
  user.name = namanye;
  user.premium = true;
  user.premiumTime = (user.premiumTime && user.premiumTime > Date.now())
    ? user.premiumTime + msTime
    : Date.now() + msTime;

  user.timeOrder = timeWib;
  user.timeEnd = moment(user.premiumTime)
    .tz('Asia/Jakarta')
    .format('DD/MM/YYYY HH:mm');
  user.reminded = false;

  db.data.users[nomernya] = user;

  // ===== MESSAGE =====
  let teks = `
––––––『 *PREMIUM SUCCESS* 』––––––

👤 *User*
• Name   : ${namanye}
• Number : ${nomernya.split("@")[0]}

⏳ *Duration*
• Time   : ${conn.msToDate(msTime)}
• Order  : ${timeWib}
• End    : ${user.timeEnd}

📮 *Note*
• Tidak dapat refund
• Ketik .menu untuk akses bot
• Ketik .cekprem untuk cek sisa waktu
• Hubungi owner jika ada kendala
• wa.me/${global.nomerOwner}
`;

  // kirim ke user (private)
  await conn.sendMessage(nomernya, { text: teks });

  // balasan di chat tempat command
  let sent = await m.reply(teks);

  // auto delete command di grup
  if (isGroup) {
    await delay(5000);
    await conn.sendMessage(m.chat, { delete: m.key });
  }
};

handler.help = ['addprem [@user] <time>'];
handler.tags = ['owner'];
handler.command = /^(add|tambah|\+)p(rem)?$/i;
handler.owner = true;

export default handler;