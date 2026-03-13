import   geminiAi  from "../../lib/gemini/gemini-respons.js"; 
import  autoDetect  from "../../lib/gemini/gemini-auto-downloader.js"; 
import {  geminiVoice } from "../../lib/gemini/gemini-voice.js";
//import { elevenLabsVoice } from "../../lib/elevenlabs.js";

 
 let handler = (m) => m;
handler.before = async function (m, { conn, command, q, prefix, isAccept }) {
  try{
    
  const chat = global.db.data.chats[m.chat];
  const numberQuery = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
  const Input = m.isGroup? m.mentionByTag[0]? m.mentionByTag[0] : m.mentionByReply ? m.mentionByReply : q? numberQuery : false : false
  const isSticker = m.type == "stickerMessage";
  const isCmd = m.body.startsWith(prefix);
  const allcommand = db.data.allcommand;
  const replyCommand = isCmd? isCmd : allcommand.includes(toFirstCase(command));
  const isAudio = m.type == "audioMessage";

const isReplyTextBotWithSticker = 
  m.type === 'stickerMessage' &&
  m.quoted &&
  m.quoted.fromMe &&
  m.quoted.type === 'conversation';

const isReplyStickerBotWithSticker = 
  m.type === 'stickerMessage' &&
  m.quoted &&
  m.quoted.fromMe &&
  m.quoted.type === 'stickerMessage';

  const mentionByReplySticker = m.type == "stickerMessage" && m.message.stickerMessage.contextInfo != null ? m.message.stickerMessage.contextInfo.participant || "" : "";
 
  if (
    (m.isGroup && //di dalam group
      chat.simi && //fitur simi di aktifkan
      Input ==  m.botJid && //jika user input nomer bot
      !replyCommand && //jika user memakai fitur bot tidak akan merespon
      !isAudio && //jika audio yang direply bot tidak akan merespm
      !isAccept &&
      !allcommand.includes(toFirstCase(command))) ||
    (m.isGroup &&
      chat.simi &&
      mentionByReplySticker ==  m.botJid &&
      isSticker &&
      !replyCommand) ||
    (m.isGroup &&
      chat.simi &&
      (m.body.toLowerCase().includes(botName.toLowerCase()) ||
       m.body.toLowerCase().includes(botName.toLowerCase().substring(0, 3))))
  ) {

//if (m.fromMe) return
// agar bot tidak merespon saat user main game
if (Object.keys(conn.game).some(key => key.includes(m.chat))) return
    //Bot gayanya sedang mengetik
    

    if (isReplyTextBotWithSticker || isReplyStickerBotWithSticker) {
      await sleep(2000);
      if(db.data.stickerBot == {}) {return}
      let namastc = Object.keys(db.data.sticker).getRandom();
     if(db.data.sticker[namastc]) return conn.sendMessage(m.chat, {sticker: {url:db.data.sticker[namastc].link}}, {quoted:m })
    } else {
 
    
   
    let violetName = m.text.toLowerCase().includes(botName.toLowerCase()) 
    let vioName = m.text.toLowerCase().includes(botName.toLowerCase().substring(0, 3))

      let userAnswer = m.mentionByTag? m.text.replace(m.mentionByTag, "") : violetName? m.text.replace(violetName, "") : vioName? m.text.replace(vioName, "") : m.text
      let kato = ["Kenapa ka ?","Iya ka ?","Ada apa ka ?","Iya ka, ada yang bisa aku bantu ?"];
      let acak = kato.getRandom();

if (m.mentionByTag[0] == conn.user.jid ||
   (m.body.toLowerCase() == botName.toLowerCase() ||
   m.body.toLowerCase() == botName.toLowerCase().substring(0, 3)) ) return conn.sendMessage(m.chat, { text: acak }, { quoted: m });
    
let input = userAnswer.limitText(1000) //.toLowerCase()//.replace(/[^\w\s]/gi, '')
    //if (input.length > 200) return



 

//Auto Respon dengan  gemini
const aiReply = await  geminiAi(conn, m, input)
if (aiReply || (aiReply && (violetName || vioName))) {
  let dariUser = input.trim();
  let dariBot = aiReply;

  if (dariBot.startsWith("#vn")) {
    let teks = dariBot.replace(/^#vn\s*/, "").trim(); // hapus prefix
    log(teks);
    let mood = teks.split("|")[0];
    let vnText = teks.split("|")[1];
    await conn.sendPresenceUpdate("recording", m.chat);
    let delayTime = Math.min(5000,Math.max(2000, vnText.length * 50))
    await sleep(delayTime);
    //elevenLabsVoice(conn, m, vnText)
     geminiVoice(conn,m,vnText,mood) 
  } else{
    await conn.sendPresenceUpdate("composing", m.chat);
    let delayTime = Math.min(5000,Math.max(2000, aiReply.length * 50))
    await sleep(delayTime);
    conn.reply(m.chat, aiReply, m, { mentions: conn.parseMention(aiReply) });
  }
    

  await autoDetect(conn, m, dariUser, dariBot);
  return;
}



 


    }
  }
} catch(err){
  log(err)
}
};
export default handler;
