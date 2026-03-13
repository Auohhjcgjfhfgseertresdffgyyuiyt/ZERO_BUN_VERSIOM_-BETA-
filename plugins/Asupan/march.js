let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
  conn.sendFile(m.chat, pickRandom(vbokep), null, `Nih *${name}* Video doyinnya..`, m)
}

handler.help = ['march']
handler.tags = ['premium']
handler.command = /^(march)$/i
handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const vbokep = [
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸76.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸75.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸74.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸73.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸72.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸71.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸70.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸69.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸68.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸67.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸66.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸65.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸64.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸63.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸62.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸61.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸60.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸59.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸58.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸57.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸56.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸55.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸54.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸53.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸52.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸51.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸50.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸49.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸48.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸47.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸46.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸45.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸44.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸43.jpg",
  "https://raw.githubusercontent.com/hoshino555/Ze/main/黏黏团子兔_-_March_Works原神雷电将军_1/©𝑌𝑀𝑁𝑆𝐸42.jpg",
]