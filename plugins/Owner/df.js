import fetch from "node-fetch";
import fs from "fs";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('*example*: .df plugins/info.js');
  let path = require('path');
  let filePath = path.join(process.cwd(), text);
  if (!fs.existsSync(filePath)) {
    return m.reply('Sorry, the file or folder was not found.');
  }
  
  if (fs.statSync(filePath).isDirectory()) {
    fs.rmdirSync(filePath, { recursive: true });
  } else {
    fs.unlinkSync(filePath);
  }
  
  m.reply(`Successful delete ${text}`);
};

handler.help = ['df'];
handler.tags = ['owner'];
handler.owner = true;
handler.command = /^(df|deletefile)$/i;


export default handler;