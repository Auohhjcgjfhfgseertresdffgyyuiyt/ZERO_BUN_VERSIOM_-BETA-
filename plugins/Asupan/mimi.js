let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
  conn.sendFile(m.chat, pickRandom(vbokep), null, `Nih *${name}* Video doyinnya..`, m)
}

handler.help = ['mimi']
handler.tags = ['premium']
handler.command = /^(mimi)$/i
handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const vbokep = ['https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE39.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE38.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE37.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE36.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE35.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE34.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE33.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE32.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE31.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE30.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE29.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE28.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE27.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE26.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE25.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE24.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE23.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE22.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE21.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE20.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE19.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE18.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE17.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE16.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE15.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE14.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE13.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE12.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE11.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE10.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE09.jpg','https://raw.githubusercontent.com/hoshino555/Ze/main/九言_-_大慈树王/XCosplay YMNSE08.jpg',]


//https://drive.google.com/drive/folders/1-_PKZYYmAJ_pCOT7I8aPTpPi3o1aQN4U//
//https://drive.google.com/drive/folders/1-2zGVt-aHvRo9ZxvG9a9xKPeKYpahQNJ//