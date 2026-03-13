let handler = (m) => m;

handler.before = async function (m, { conn,setReply,isOwner }) {
    const isImage = m.type === "imageMessage";
    const isVideo = m.type === "videoMessage";
    const p = m.quoted ? m.quoted : m 
    const user = db.data.users[m.sender]
    const isCmd = m.body.startsWith('.')

let teks = `Hallo kak ${m.pushName}
Untuk memasukan bot ke dalam group
kamu harus menyewa bot terlebih dahulu
harga mulai 3k untuk 7 hari, bisa cek di
https://wa.me/c/6285953938243

untuk order
silakan hub: wa.me/6285156137901
`
//ketika ada yang invite/kirim link grup di chat pribadi
//if ((m.type === 'groupInviteMessage' || m.body.includes('https://chat') || m.body.includes('Buka tautan ini')) && !isCmd && !m.isBaileys && !m.isGroup && !m.fromMe && !isOwner) {
 


if(!m.isGroup && m.body.startsWith('https://chat')){
  const match = m.body.match(/chat\.whatsapp\.com\/([\w\d]+)/);
  if (!match) return m.reply("Masukan linkgc dengan benar");

  const code = match[1];
  let info;

  try {
    info = await conn.groupGetInviteInfo(code);
  } catch (e) {
    return m.reply("❌ Gagal mengambil data. Mungkin link sudah kadaluarsa atau bot tidak punya izin.");
  }

  const {
    id,
    subject,
    subjectOwner,
    subjectTime,
    desc,
    descOwner,
    owner,
    descId,
    participants,
    size,
    creation,
   // creator,
    ephemeralDuration,
    inviteCode,
    inviteExpiration,
  } = info

if(db.data.chats[id]){
let chat = db.data.chats[id]
if (chat.expired == 0) return m.reply(teks)
await conn.groupAcceptInvite(code) 

let cekid = conn.ms(chat.expired - Date.now())
let tagnya = owner == undefined?  subjectOwner: owner
let creator = `${owner == undefined? subjectOwner  == undefined? 'Tidak ada' : "@"+ subjectOwner.split("@")[0]: "@"+ owner.split("@")[0]}`
let member = participants
let admin = member.filter(u => u.admin === 'admin' || u.admin === 'superadmin' )
let cekbulan = Math.floor(cekid.days / 30);
let teksOrder = `
––––––『 *ORDER EXPIRE* 』––––––

🔰 *Group*
• Name: ${subject}
• Creat at: ${new Date(creation * 1000).toLocaleString()}
• Creator: ${creator}
• Group Id: ${id}
• Admin: ${admin.length}
• Members: ${member.length}
• Days:  ${cekbulan} Bulan ${cekid.days - cekbulan * 30} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit
• Countdown: ${chat.expired - Date.now()}
• Time order: ${chat.timeOrder}
• Time end: ${chat.timeEnd}
•·–––––––––––––––––––––––––·•

📮 *Note:* ↓
• Ketik .menu untuk mengakses bot
• Ketik .ceksewa untuk melihat sisa sewa
• Lapor ke owner jika bot tidak berfungsi
• Silakan hubungi owner untuk menyewa bot
• Owner wa.me/${nomerOwner} 

${copyright} - ${calender}`
await conn.sendMessage(m.chat,{text:teksOrder},{quoted:m})


m.reply("Berhasil join ke group")
} else m.reply(teks)

//} else m.reply(teks)

}

};
export default handler;
