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

handler.help = ['casrice']
handler.tags = ['premium']
handler.command = /^(casrice)$/i

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
  "https://drive.google.com/uc?export=download&id=1DYdxAGP63Mf6bZISno5hii_3rDrTFyBx",
  "https://drive.google.com/uc?export=download&id=1NlGRescRALsgYVqfygXurb-jyizJ7HL2",
  "https://drive.google.com/uc?export=download&id=15lSMZf519MUqgEtmJnwTOPIZKOLf1iUg",
  "https://drive.google.com/uc?export=download&id=1L2m8zotatWRTn0ksKUXIkVL4Lyn1aRiZ",
  "https://drive.google.com/uc?export=download&id=1Bcl7b5Xcnr1aBmsUhhQXC6EgTgqY23pk",
  "https://drive.google.com/uc?export=download&id=1Q4O8RHv57ofU1GeJPnxr9jXEvBvbUN_K",
  "https://drive.google.com/uc?export=download&id=1AsD-DYFR9RjkFCRuNH5iX5_C2cqB2tnd",
  "https://drive.google.com/uc?export=download&id=1xCivcFrMwS9tzYEevGUKFq03kgGc7_3T",
  "https://drive.google.com/uc?export=download&id=1BINp6ndOh_x7c46x-gFVh7XbN_HwznuS",
  "https://drive.google.com/uc?export=download&id=14TFMcMM2EUb9_5f3WAuqtWAwU3P0CzkE",
  "https://drive.google.com/uc?export=download&id=1aAhmGi3JHhb7N8ZJFcE1pZCzIux4qZUg",
  "https://drive.google.com/uc?export=download&id=1zyW4tn50nNg3iXmAqQowi3iqFElqoy2m",
  "https://drive.google.com/uc?export=download&id=1r2A2s941dt_6SgDsk9q1h_bTtoUo4Pni",
  "https://drive.google.com/uc?export=download&id=10Wpp7iyMPNMuCTyrMg55brV-SeXnACJ6",
  "https://drive.google.com/uc?export=download&id=1e2EmkuTRquJdK8YFrTxc4REk3TdqB2Lc",
  "https://drive.google.com/uc?export=download&id=1ZLTYI3OJ16M5Eo0icfvIfgvJLk1YXR7M",
  "https://drive.google.com/uc?export=download&id=1Scx4YlFrCdf5FBvdAohArz0JO-Nbs78k",
];