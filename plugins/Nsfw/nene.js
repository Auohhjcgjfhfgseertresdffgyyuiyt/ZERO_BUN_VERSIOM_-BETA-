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
          caption: `Nih *${name}* nene cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['nene']
handler.tags = ['premium']
handler.command = /^(nene)$/i

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
  "https://drive.google.com/uc?export=download&id=1v4cqs1AewnCZ0OyzrGfnhWJTvUXkuqKI",
  "https://drive.google.com/uc?export=download&id=10IC70jdgR3UDKMiBwQfzAhs1_KeXEKg9",
  "https://drive.google.com/uc?export=download&id=1OJwVO4lYxTzHPuyOQGz9XHHjAa4S4VQl",
  "https://drive.google.com/uc?export=download&id=1jZtDnWheQcJMeldIptIirKiga-gpYndE",
  "https://drive.google.com/uc?export=download&id=1b6qwfZZY-_biHM-rbyuw8x4y2P6mo6hX",
  "https://drive.google.com/uc?export=download&id=1pcyXxdCktKa36zFbHsRnJSg13emiRZOz",
  "https://drive.google.com/uc?export=download&id=1H7W5DLMpURnB6kE-at9NBgAEMLPT0zOL",
  "https://drive.google.com/uc?export=download&id=1EXz8dXQ8T6v1WPnraXLRaOaywZBd1kFk",
  "https://drive.google.com/uc?export=download&id=1bZE8D14dQtKyHsSQaywKrTo5NKcOU5fa",
  "https://drive.google.com/uc?export=download&id=1sXN72SqHZH3BLGQCnDrHNaseOniCLR34",
  "https://drive.google.com/uc?export=download&id=162filBVo5ptwuo0AMfoGBCkVljKUusW8",
  "https://drive.google.com/uc?export=download&id=1JmyXwRedDf-_tfPtE15ls8T23Kqcl3eh",
  "https://drive.google.com/uc?export=download&id=1bhm2Y3dY6Au-bwWnEPfzjCjNgDF1mWKP",
  "https://drive.google.com/uc?export=download&id=1eu7O70-pG2OPgn8xNk2VGWrQSh2akGpG",
  "https://drive.google.com/uc?export=download&id=1dysJ8iSeHs1eaAZuwXvuCND1Gsh6LJvt",
];