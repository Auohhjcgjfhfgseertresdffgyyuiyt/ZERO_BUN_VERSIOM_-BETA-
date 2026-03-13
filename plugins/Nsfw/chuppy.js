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

handler.help = ['chuppy']
handler.tags = ['premium']
handler.command = /^(chuppy)$/i

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


const gambar = [
  "https://drive.google.com/uc?export=download&id=10X6qXBvpjGGvIeZdm8JI7lRx9UIqcz53",
  "https://drive.google.com/uc?export=download&id=10WxLZRL9uOHCa5AdaG-piN2elh3kj_En",
  "https://drive.google.com/uc?export=download&id=10WivS8RMKVlxRlH2zCjjQdeysxX2qY2Y",
  "https://drive.google.com/uc?export=download&id=10W2cVcKympyrsfiVfc6S9CxmECeFErS0",
  "https://drive.google.com/uc?export=download&id=10Q79LYnxjwaOPtt1_p8EFNCEx_5tDODO",
  "https://drive.google.com/uc?export=download&id=10OFEAbBP6M5Rh97lpHiiK3NXnk7oA1cQ",
  "https://drive.google.com/uc?export=download&id=10JmKZGl2vRt-wZu0czBrGpc9WSjBStm6",
  "https://drive.google.com/uc?export=download&id=10JWYfsDWOBQRqJs2MY4zqKmvOBQDrV-P",
  "https://drive.google.com/uc?export=download&id=10CZf7m5C8iFSzEsv6KFn6Bgt42OL8sYa",
  "https://drive.google.com/uc?export=download&id=10BXeom0CL9ANP0zN9kack2H3xxAdgF4o",
  "https://drive.google.com/uc?export=download&id=10BSnT0mNetY3p_JVC-csWRhFNCUydbsg",
  "https://drive.google.com/uc?export=download&id=107rReVxCWDjri8aUgq3j2Bnz8uo9n7F0",
  "https://drive.google.com/uc?export=download&id=105s7RrO2gYHi94RqOBtvotzAgMccc0LS",
  "https://drive.google.com/uc?export=download&id=105-x4KhwSoltFRiE6BzSOBsC73NmChCi",
  "https://drive.google.com/uc?export=download&id=1-xCBjnT_2vAxURvQqHkhPZZy2DFpN59B",
  "https://drive.google.com/uc?export=download&id=1-qXUBrVYLXiLnNnu0Y1d9fPHpdH4OF70",
  "https://drive.google.com/uc?export=download&id=1-P2_5UWiAW4gKTbvNBS81HWhyajLkw1V",
  "https://drive.google.com/uc?export=download&id=1-MlTW8LxmLPQKadb7MJYCEBSZfE4PZz0",
  "https://drive.google.com/uc?export=download&id=1-Jsv8rMyJJDmdUOM9ZhvT--NKkFCcXue",
  "https://drive.google.com/uc?export=download&id=1-GyIFaxfg8uCAEtUhpzCdwyODduUiLhM",
  "https://drive.google.com/uc?export=download&id=1-GZtxZ1ZaxuaX6OQt5QS1k8l53XLwQ_-",
  "https://drive.google.com/uc?export=download&id=1-DPbDfUBQ4h7pRJEwPerj0g2iIWGULEq",
  "https://drive.google.com/uc?export=download&id=1-CjWFH2yclPFiB6xE34uHsUCz5vMSgpg",
];