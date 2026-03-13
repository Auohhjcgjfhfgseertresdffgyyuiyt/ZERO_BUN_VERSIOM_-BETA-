//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import "#global";
import "#settings";
import "#loader-plugins2";
//import "#loader-plugins";

import  { proto,fetchLatestBaileysVersion,Browsers,useMultiFileAuthState,makeCacheableSignalKeyStore} from "baileys";
import fs from "fs";
import { Socket, smsg, protoType } from "../lib/simple.js";
import { memberUpdate, groupsUpdate } from "../message/group.js";
import { antiCall } from "../message/anticall.js";
import { connectionUpdate } from "../message/connection.js";
import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
import chalk from '#chalk';
import * as util from "util"
import liteStore from '../modules/liteStore.js'
import { antiDouble } from '../lib/functions/antiDouble.js'
//import { SQLiteAuth } from "#sqlite-auth";
import logger from '#logger'
import initDatabase from "../message/database.js";
import { updateUserData,getDefaultUserData,updateChatData,getDefaultChatData  } from '../message/register.js'

 


global.__filename = function filename(pathURL = import.meta.url,rmPrefix = platform !== "win32") {
return rmPrefix? /file:\/\/\//.test(pathURL)? fileURLToPath(pathURL): pathURL: pathToFileURL(pathURL).toString();
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

protoType();
 
logger.setLevel('fatal')
const msgRetryCounterMap = new Map()


//Connect to WhatsApp
const connectToWhatsApp = async () => {
await initDatabase();
if (!fs.existsSync(global.session)) fs.mkdirSync(global.session, { recursive: true })

//const auth = SQLiteAuth();
const { state, saveCreds } = await useMultiFileAuthState(global.session)
const { version, isLatest } = await fetchLatestBaileysVersion();



const getMessage = (key) => {
  if (!key?.remoteJid || !key?.id) return ;
  const msg = liteStore.loadMessage(key.remoteJid, key.id);
  return msg || undefined;
}


/*
const getMessage = (key) => {
if (!key?.remoteJid || !key?.id) return proto.Message.fromObject({})
let msg = liteStore.loadMessage(key.remoteJid, key.id)
if (!msg && global.conn?.chats?.[key.remoteJid]?.messages)
msg = global.conn.chats[key.remoteJid].messages.find(m => m.key.id === key.id)
return msg?.message || proto.Message.fromObject({})
}

*/

//Untuk menyimpan session
const baileysAuth = {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, logger)
}


 
//Koneksi nih silakan di isi
const connectionOptions = {
browser: Browsers.ubuntu("Safari"),
version,
printQRInTerminal: !global.pairingCode,
logger,
auth:baileysAuth,
getMessage,
printQRInTerminal: false,
defaultQueryTimeoutMs: 60000,
connectTimeoutMs: 60000,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
retryRequestDelayMs: 250,
maxMsgRetryCount: 5,
appStateMacVerification: {
  patch: true,
   snapshot: true,
},
linkPreviewImageThumbnailWidth: 192,
transactionOpts: {
maxCommitRetries: 5,
delayBetweenTriesMs: 2500,
},
enableAutoSessionRecreation: true,
enableRecentMessageCache: true,
shouldIgnoreJid: (jid) => {
if (!jid) return true;
return jid.endsWith("@broadcast") || jid.startsWith("status@broadcast");
},
shouldSyncHistoryMessage: (msg) => {
   return true;
},
patchMessageBeforeSending: (msg, recipientJids) => {
  return msg;
},
};

global.conn = Socket(connectionOptions);
liteStore.integrateWithConn(conn)
 

if (global.pairingCode && !conn.authState.creds.registered) {
  if (global.nomerBot == "")
    return console.log("Masukan nomer bot di settings.js");
  setTimeout(async () => {
    let code = await conn.requestPairingCode(global.nomerBot);
    code = code?.match(/.{1,4}/g)?.join("-") || code;
    console.log(
      chalk.black(chalk.green(`✅ Your Phone Number : `)),
      chalk.black(chalk.white(global.nomerBot)),
      chalk.black(chalk.green(`\n✅ Your Pairing Code : `)),
      chalk.black(chalk.white(code))
    );
  }, 3000);
}
  

  conn.ev.on("groups.update", async (updates) => {
    groupsUpdate(conn, updates);
  });

  conn.ev.on("group-participants.update", async (updates) => {
    memberUpdate(conn, updates);
  });

  conn.ev.on("creds.update", async () => {
     //auth.saveCreds()
  await saveCreds();
  });

  conn.ev.on("call", async (calls) => {
    await antiCall(db, calls, conn);
  });

  conn.ev.on("connection.update", async (updates) => {
    await connectionUpdate(connectToWhatsApp, conn, updates);
  });
 
// received a new message
conn.ev.on('messages.upsert', async (chatUpdate) => {
 //log(chatUpdate)
const { handler } = await import(`../handler.js?v=${Date.now()}`).catch((err) => console.log(err));

if (!chatUpdate.messages || !chatUpdate.messages[0]) return  
let m = chatUpdate.messages[0];
let id = m.key.id
let from = m.key.remoteJid
if (!m.message) {return}
if(!m.pushName){return}
if (antiDouble(id, 'upsert', { from })) {return}
m = await smsg(conn, m);      
    

try{

if (global.db.data.users[m.sender]) {
updateUserData(global.db.data.users[m.sender], m);
} else global.db.data.users[m.sender] = getDefaultUserData(m);

if (m.isGroup) {
if (global.db.data.chats[m.chat]) {
updateChatData(global.db.data.chats[m.chat], m); 
} else global.db.data.chats[m.chat] = getDefaultChatData(m);
}


if (global.db.data) global.db.write();
if (global.dbMemory.data) global.dbMemory.write();

handler(conn, m, chatUpdate);

} catch(err){
log(err)
let e = util.format(err)
let a = util.format(m)
await conn.sendMessage(ownerBot, {text:e+'\n\n\nMessage upsert'})
await conn.sendMessage(ownerBot, {text:a})
}
})



//------------------------------------[BATAS]--------------------------------\\


 



return conn;
};




connectToWhatsApp().catch((e) => {
    logger.fatal(e.message);
    if (e?.stack) logger.fatal(e.stack);
    process.exit(1);
});


process.on('uncaughtException', (err) => {
console.error('❌ Uncaught Exception:', err.stack || err);
});

process.on("unhandledRejection", async (err) => {
  const msg = String(err)

  if (msg.includes("No sessions")) {
    global.log?.("⚠️ Session missing detected, skipping...")
    return
  }

  if (msg.includes("JSON parse error in file")) {
    const match = msg.match(/in file (.+?):/)
    const file = match ? match[1] : null

    if (file && file.endsWith(".json")) {
      try {
        console.log(`⚠️ File JSON rusak terdeteksi: ${file}`)
        console.log(`🔧 Memperbaiki otomatis dengan file kosong...`)
        fs.writeFileSync(file, "{}", "utf8")
        console.log(`✅ File ${file} berhasil diperbaiki!`)
      } catch (e) {
        console.error(`❌ Gagal memperbaiki file ${file}:`, e.message)
      }
    }
  } else {
    console.error("💥 Unhandled Promise Rejection!", err)
  }
})

process.on('warning', (warning) => {
console.warn('⚠️ Warning:', warning.name);
console.warn(warning.message);
console.warn(warning.stack);
});



 


