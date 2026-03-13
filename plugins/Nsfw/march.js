import fetch from "node-fetch"

let handler = async (m, { conn, command }) => {
  let who = m.sender
  let name = await conn.getName(who)

  // ambil 2 gambar random
  let imgs = pickRandomMulti(gambar, 2)

  for (let url of imgs) {
    try {
      let res = await fetch(url)
      if (!res.ok) continue

      let buffer = Buffer.from(await res.arrayBuffer())

      // 🔥 PAKSA IMAGE WALAU WEBP
      await conn.sendMessage(
        who,
        {
          image: buffer,
          mimetype: "image/jpeg",
          caption: `Nih *${name}* mura cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['march']
handler.tags = ['premium']
handler.command = /^(march)$/i

handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandomMulti(arr, total = 1) {
  let copy = [...arr]
  let res = []
  for (let i = 0; i < total && copy.length; i++) {
    let idx = Math.floor(Math.random() * copy.length)
    res.push(copy.splice(idx, 1)[0])
  }
  return res
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


//https://drive.google.com/drive/folders/1-_PKZYYmAJ_pCOT7I8aPTpPi3o1aQN4U//
//https://drive.google.com/drive/folders/1-2zGVt-aHvRo9ZxvG9a9xKPeKYpahQNJ//