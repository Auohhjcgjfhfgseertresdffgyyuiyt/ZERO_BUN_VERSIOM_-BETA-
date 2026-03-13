
import moment from '../modules/moment.js'
 import chalk from '#chalk';
import * as util from "util"


//Function update member
export const memberUpdate = async (conn, anu) => {
//log(anu)
await sleep(3000)
try {

let { id, author,participants,authorPn, action } = anu;
if(author == undefined) author = global.ownerBot
if(participants[0].id == author && action == 'remove' ) return global.log(`User keluar dari group atas keinginan sendiri`)

const myGroup = Object.keys(db.data.chats);
const botNumber = conn.decodeJid(conn.user.id || conn.user.jid);
const chat = db.data.chats[id]
const from = id

const groupMetadata = ["add", "remove","promote","demote"].includes(action)? (conn.chats[from] || {}).metadata || await conn.groupMetadata(from).catch(_ => null) : {}
const addressingMode = groupMetadata.addressingMode
const isCommunity = groupMetadata.isCommunity
const isCommunityAnnounce = groupMetadata.isCommunityAnnounce
  if(isCommunity) return global.log('Bukan group tapi isCommunity')
  if(isCommunityAnnounce) return global.log('Bukan group tapi isCommunityAnnounce')
const members = addressingMode == 'lid'? (groupMetadata.participants.map(p => ({lid: p.id, id: p.phoneNumber ,admin: p.admin}))) : groupMetadata.participants 
  
 
const actions = ["add", "remove", "promote", "demote"];
const isLidAction = author?.endsWith("@lid") && actions.includes(action);
const targetah = isLidAction? members.find(p => p.lid === author)?.id : author 
const sender = conn.decodeJid(participants[0].phoneNumber)//132345273258041_1@s.whatsapp.net
  author = conn.decodeJid(targetah)
const authorNumber = author.split('@')[0]
const groupMembers = members
const groupName = groupMetadata.subject || ''
const senderNumber = sender.split("@")[0];
const groupDesc = groupMetadata.desc || [];
const bot = groupMembers.find((u) => conn.decodeJid(u.id) == conn.user.jid) || {};
const isOwner = sender.split('@')[0] === nomerOwner 
const isBotAdmin = (bot && bot.admin == "admin") || false; // Are you Admin?
const pushname = await conn.getName(sender);
const oneMem = participants.length === 1;
const itsMe = sender === botNumber;
const add = action == "add";
const remove = action == "remove";
const isBanchat = myGroup.includes(from)? db.data.chats[from].banchat: false;
const totalMember = groupMetadata.participants?.length || 0;



 

//Update conn.chats[id] bagian promote dan demote 
if (["promote", "demote"].includes(action)) {
  const member = members.find(p => p.id === sender);
  if (member) {
    member.admin = action === "promote" ? "admin" : null;
    global.log(`${action} ${sender.split('@')[0]}`);
  } else {
    global.log(`⚠️ Member ${sender} tidak ditemukan di metadata.`);
  }
}


if (action === "add") {
  const chat = conn.chats[id];
  const isLidUpdate = chat?.metadata?.addressingMode === "lid-update";
  const participant = participants?.[0];

  //Update conn.chats[id Tambahkan participant jika mode 'lid-update'
  if (isLidUpdate && participant) {
    chat.metadata.participants.push({
      lid: participant.id,
      id: sender,
      admin: null
    });
  }

  // Jika owner masuk, auto promote
  if (isBotAdmin && senderNumber === global.nomerOwner) {
    await conn.groupParticipantsUpdate(id, [sender], "promote");
  }
} 


if (action === "remove") {
// Update metadata: hapus user dari list participant
if(addressingMode == 'lid-update') {
conn.chats[id].metadata.participants = conn.chats[id].metadata.participants.filter(p => p.id !== sender);
} else groupMetadata.participants = members.filter(p => p.id !== sender);

if (sender === botNumber && chat) {
      
      // Cari admin grup          
let apologize = `🙏🏻 *Halo kak!* \n\n` +
                `Maaf ya, tadi aku baru aja di keluarin dari grup *${groupName}*.\n\n` +
                `Terima kasih banyak udah sempet ngasih kesempatan buat gabung dan bantu-bantu di grup!\n` +
                `Kalau ada salah kata, spam, atau fitur bot yang kurang berkenan, aku mohon maaf sebesar-besarnya 🙏🏻.\n\n` +
                `Semoga grupnya makin rame, berkah, dan sukses terus! 🚀🔥`;
await sleep(3000);
await conn.sendMessage(author, { text: apologize });

          

                // Kirim laporan ke owner bot
let notif = `🚫 *Bot telah dikeluarkan dari grup!*\n\n` +
            `📛 *Nama Grup:* ${groupName}\n` +
            `🆔 *ID Grup:* ${id}\n` +
            `👥 *Jumlah Member:* ${totalMember}\n` +
            `👤 *Pelaku:* ${author.split('@')[0]}\n` +
            `📤 *Status:* Grup dihapus dari cache conn.chats`;

 
await sleep(3000);
await conn.sendMessage(global.ownerBot, {text: notif});

delete conn.chats[id]; // Hapus dari memori
console.log(`Bot dikeluarkan dari grup ${groupName} (${id}) oleh ${authorNumber}`);

}
}
  
  
  
 

//let text = 'Siapa yang ngekick gua anjir, lagi enak" main ama member tiba" di kick bangke'
if(action == 'add' && sender === botNumber && chat && author !== null )// conn.reply(from,text)
if(sender.includes('@lid')) return log(`log 1: nomer user ada lidnya ${sender}`)
if (["remove", "promote", "demote"].includes(action) && sender === botNumber) return log(`log 2: ini adalah bot, action: ${action}`);
if (isBanchat) return log('log 4: bot di banchat sehingga tidak bisa kirim pesan')
if (!chat) return log('log 5: tidak ada database pada group ini di db')





//if (!chat.welcome) return log('log 6')
let sBye = chat.sBye;
let sWelcome = chat.sWelcome;

//Group Update Console.log
if (add && oneMem)
console.log(chalk.magenta("[GRUP UPDATE]"),chalk.green(`${pushname} telah bergabung dari gc`),chalk.magenta(`${groupName}`));
if (remove && oneMem)
console.log(chalk.magenta("[GRUP UPDATE]"),chalk.green(`${pushname} telah keluar di gc`),chalk.magenta(`${groupName}`));

//Auto kick jika itu user yang sudah di tandai
let kickon = db.data.kickon[from];
if (add && kickon && kickon.includes(senderNumber)) {
let teks = `@user tidak di izinkan masuk
karena dia telah keluar dari group ini sebelumnya,
dan juga sudah di tandai sebagai user biadap`;
let text = teks.replace("user", await conn.getName(sender));

await conn.sendMessage(from,{ text,mentions: [sender],contextInfo: { mentionedJid: [sender] }},);
if (!isBotAdmin) return conn.sendMessage(from,{text: `Gagal  mengeluarkan @${senderNumber} dari group karena bot bukan admin`,contextInfo: { mentionedJid: [sender] }});
if (isBotAdmin) return conn.groupParticipantsUpdate(from, [sender], "remove")
}

 

let welcome ='https://telegra.ph/file/e90a359b95411b120c635.jpg' 
let goodbye = 'https://telegra.ph/file/57355c93403c36dbf2ca4.jpg' 
 

if (action == "add") {
var link = chat.welcomeImage == ''? welcome : chat.welcomeImage
} else {
var link = chat.leaveImage == ''? goodbye : chat.leaveImage
}



const botRun = global.db.data.others['runtime']
const botTime = botRun? (new Date - botRun.runtime) :  "Tidak terdeteksi"
const runTime = clockString(botTime)
 

let contextInfo = {
forwardingScore: 1,
isForwarded: false,
mentionedJid: [sender],
forwardedNewsletterMessageInfo: {
newsletterJid,
serverMessageId: 100,
newsletterName
},
externalAdReply:{
showAdAttribution: false,
title: `${action == "add"? 'W E L C O M E': 'G O O D  B Y E'}`,
body:`Runtime ${transformText(runTime)} `,
sourceUrl:global.myUrl,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: link,
}
}







switch (action) {

case "add":{
if (!chat.welcome) return   
let teks = `Halo @user
welcome to group ${groupName}
${sWelcome}`;
const welcomeText = (chat.sWelcome || teks)
.replace("user", await conn.getName(sender))
.replace("@desc", groupDesc.toString() || "unknow")
.replace("@subject", groupName);


 
let data = isOwner? groupMetadata.participants : {}
let member = isOwner? data.filter(u => u.admin !== 'admin' || u.admin !== 'superadmin' ) : {}
let admin = isOwner? data.filter(u => u.admin === 'admin' || u.admin === 'superadmin' ) : {}

const welcometeks =`Yeeeaaay ownerku masuk group!!

Halloo ${conn.getName(sender)}
welcome to group ${groupName} 
total member : ${member.length} member 
total admin : ${admin.length} admin


${copyright} - ${calender}
`
if (chat.welcome && !itsMe && oneMem) conn.sendMessage(from,{ text: isOwner? welcometeks:welcomeText, mentions: [sender],contextInfo})
}
break;

case "remove":
{
if (!chat.welcome) return 
let teks = `Selamat tinggal @user
${sBye}`;
const byeText = (chat.sBye || teks)
.replace("user", await conn.getName(sender))
.replace("@desc", groupDesc.toString() || "unknow")
.replace("@subject", groupName);

const byeTeks =`Bye bye owner, thanks udah mmampir 😁`

if (chat.welcome && !itsMe && oneMem) conn.sendMessage(
from,
{ text:isOwner? byeTeks: byeText,mentions: [sender],
contextInfo
}
);
}
break






} // Akhir dari swith action

await sleep(5000);

} catch (err) {


console.log(err);
let e = String(err);
if (e.includes("this.isZero")) {return;}
if (e.includes("rate-overlimit")) {return;}
if (e.includes("Connection Closed")) {return;}
if (e.includes("Timed Out")) {return;}
console.log(chalk.white("GROUP :"), chalk.green(e));

let text = `
FROM Group.js

${util.inspect(anu, { depth: 5, colors: false })}

${util.inspect(err, { depth: 5, colors: false })}
`;
conn.sendMessage(ownerBot,{text})

}
};



//----------------BATAS--------------\\




// Function Update Group
export async function groupsUpdate(conn, updates) {
  if (!Array.isArray(updates) || updates.length === 0) return

  // kalau lebih dari 1 data, jangan proses biar gak spam
  if (updates.length > 1) return

  const group = updates[0] // ambil hanya 1 data pertama
  const id = group.id
  if (!id) return

  // pastikan chat dan metadata tersedia
  if (!conn.chats[id]) conn.chats[id] = { id, metadata: {} }
  if (!conn.chats[id].metadata) conn.chats[id].metadata = {}

  // update field metadata & cari tahu yang berubah
  const changes = []
  for (const key of Object.keys(group)) {
    if (['id', 'author', 'authorPn'].includes(key)) continue
    conn.chats[id].metadata[key] = group[key]
    changes.push(`${key}: ${group[key]}`)
  }

  // buat teks keterangan perubahan
  const subject = conn.chats[id].metadata.subject || id
  const detail = changes.length ? changes.join(', ') : 'tidak diketahui'

  global.log(`🔄 Grup ${subject} diperbarui (${detail})`)
}


