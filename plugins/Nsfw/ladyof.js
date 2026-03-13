import fetch from "node-fetch"

let handler = async (m, { conn, command }) => {
  let who = m.sender
  let name = await conn.getName(who)

  let imgs = pickRandomMulti(gambar, 2)

  for (let url of imgs) {
    try {
      let res = await fetch(url)
      if (!res.ok) continue

      let buffer = Buffer.from(await res.arrayBuffer())

      // 🔥 PAKSA IMAGE WALAU WEBP (ANTI STICKER)
      await conn.sendMessage(
        who,
        {
          image: buffer,
          mimetype: "image/jpeg",
          caption: `Nih *${name}* ladyof cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['ladyof']
handler.tags = ['premium']
handler.command = /^(ladyof)$/i

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
  "https://drive.google.com/uc?export=download&id=17cFfBx9TRQXnk_Y1s4ESaaB9oTymVy_k",
  "https://drive.google.com/uc?export=download&id=1CN9VRS6dHP-SIcblop7gkBoi3mDzxU1Z",
  "https://drive.google.com/uc?export=download&id=14zNVomkRHUJJfXN6cOtgfOz8hHp7B1Kz",
  "https://drive.google.com/uc?export=download&id=10yHJnySm7o6kS88aMY5r9kc7dk49K7o0",
  "https://drive.google.com/uc?export=download&id=14D0iniIIWwDi928PbjhFYrOZPkPFTyHo",
  "https://drive.google.com/uc?export=download&id=1U4scG6fRo2svwxk2uQ0YjtZTeVqdzBqw",
  "https://drive.google.com/uc?export=download&id=1n0Xrn-wJODHcHU1EadlmzO0R1avohbK9",
  "https://drive.google.com/uc?export=download&id=1638yTnNbwzSnWmqD9dzSm7XOoVOsqFC_",
  "https://drive.google.com/uc?export=download&id=1yU1BtbH3ZaVY8nCf-awTh6g7XKi_iaIW",
  "https://drive.google.com/uc?export=download&id=19J74FPnZYz0fqEjsBBr0DRCK6cHebOk0",
];