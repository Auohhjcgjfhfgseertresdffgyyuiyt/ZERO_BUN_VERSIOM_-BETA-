let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender

  let name = conn.getName(who)
  let img = pickRandom(gambar)

  // PAKSA jadi IMAGE walau webp (ANTI STICKER)
  await conn.sendMessage(
    m.chat,
    {
      image: { url: img },
      caption: `Nih *${name}* choiji cosplay nya.`
    },
    { quoted: m }
  )
}

handler.help = ['choiji']
handler.tags = ['premium']
handler.command = /^(choiji)$/i

handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const gambar = [
  "https://drive.google.com/uc?export=download&id=10pihMlHjOj4a3CFGFitmjpNWi8AZsvlA",
  "https://drive.google.com/uc?export=download&id=10oy6D26IZCQLirUuYIS1Vw6Fukf8dSzj",
  "https://drive.google.com/uc?export=download&id=10fwHphuiOfI_Q-9-s8ekYnzqe3wQGzqq",
  "https://drive.google.com/uc?export=download&id=10_xd6oz0iludAuh6zn_lCy64fhUmcH3f",
  "https://drive.google.com/uc?export=download&id=10YEF1PDlZKXlxB3Rc0AONnau0x1fKdf_",
  "https://drive.google.com/uc?export=download&id=10W_UwbeTFrgPdX3YA7eD1iEOxUMttPUd",
  "https://drive.google.com/uc?export=download&id=10UDJ1lJ8JI1bvwAOEdLMQ2RY3DHd3HBq",
  "https://drive.google.com/uc?export=download&id=10UCbA6y-QdrVc0S-sFW8WeawE-t8ESgy",
  "https://drive.google.com/uc?export=download&id=10SBf1ddg0jDxQeI_Rz0ib3BpE1kZ5a3s",
  "https://drive.google.com/uc?export=download&id=10MZsZijzvtzeeysHoJH7sDSmlQHcvwKN",
  "https://drive.google.com/uc?export=download&id=10Luzem7TMMrbaKLOgCFaOrkuHm9vpoW2",
  "https://drive.google.com/uc?export=download&id=10IVm8u9mVTTtZGcE_stgmbMlhkHSaW5i",
  "https://drive.google.com/uc?export=download&id=10ATnw-pwsYKDLXD1WYAuzNQ6ybhKUn-w",
  "https://drive.google.com/uc?export=download&id=103rr7hLHCRWExm2Xc0DkmcCnAAo_y7i0",
  "https://drive.google.com/uc?export=download&id=103aeNrPaE8NngFdAFvXhpKs71JzsWrf4",
  "https://drive.google.com/uc?export=download&id=10-jP32AUX53Cuw8BwLBgxeI2ZYFaIksO",
  "https://drive.google.com/uc?export=download&id=1-zc_SGM1Jun9ba8obIRn44f3FVbSxJ9p",
  "https://drive.google.com/uc?export=download&id=1-yaOgcW7zu6B4agCRGgiIznsMRposfsk",
  "https://drive.google.com/uc?export=download&id=1-os_03N4cZP_OCEeuFfmqEayufanwLS4",
  "https://drive.google.com/uc?export=download&id=1-oiP_2Fa62R7i0huG_0wHM7g32SapGo_",
  "https://drive.google.com/uc?export=download&id=1-oahCvxhkKUhDb4nOQnd04sCfCwzyC85",
  "https://drive.google.com/uc?export=download&id=1-nXcP-xbwQRyJ_HA7_czRERvA-ENJUw1",
  "https://drive.google.com/uc?export=download&id=1-hPZdYu2URIH21V6EeJLe4chYe325my8",
  "https://drive.google.com/uc?export=download&id=1-f9A_k_Z5jwc0hh236h_cTPuj74JGKmt",
  "https://drive.google.com/uc?export=download&id=1-bDY2FJzbfE8_w9qfx5ygU7GjlP5WYjF",
  "https://drive.google.com/uc?export=download&id=1-YNmKFOs0t1_jCQ7xeJa3z9kIb6k2_ja",
  "https://drive.google.com/uc?export=download&id=1-Q-c18b53JP3qN1qwd0SeiJa-NekXx4f",
  "https://drive.google.com/uc?export=download&id=1-Edv42yivHwmE28CjLBRq0l7H4SIoK68",
];