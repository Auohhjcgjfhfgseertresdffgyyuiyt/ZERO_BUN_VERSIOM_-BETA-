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
          caption: `Nih *${name}* hanea cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['hanea']
handler.tags = ['premium']
handler.command = /^(hanea)$/i

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
  "https://drive.google.com/uc?export=download&id=1XWukM4SOSLxDhObujFi5EeetnQd7KNL4",
  "https://drive.google.com/uc?export=download&id=1jpqFnQOhUqoWA4Wrc5GG2aeb3gll2jWa",
  "https://drive.google.com/uc?export=download&id=1u9uawyDJ6UAyTAhE4t40T2sppVHTRGK0",
  "https://drive.google.com/uc?export=download&id=11lfTWhjVsFMGVwGXeAR5-nLMIVTH6PiP",
  "https://drive.google.com/uc?export=download&id=1fG73QcJDsIBVLw2IitXBkw7GnlztVKAL",
  "https://drive.google.com/uc?export=download&id=17dtoHUt2UpBtnysdPDX0l8qZvB8DZa9s",
  "https://drive.google.com/uc?export=download&id=1-85ZCgj0FQKRruVQR-oM45AjfH-nez_o",
  "https://drive.google.com/uc?export=download&id=1sPMt4Kpj036pq6W78PjDlt9t34z2TKtX",
  "https://drive.google.com/uc?export=download&id=17S50vwnUqBTiYVP7kReWTTEa9RnhE9Oy",
  "https://drive.google.com/uc?export=download&id=1Rpc4Z9I0cF-0jFmycw8NG1PB66ENXM48",
  "https://drive.google.com/uc?export=download&id=1xI1uWBivxDjWfwz1dqOVT0kUR-xCw2wN",
  "https://drive.google.com/uc?export=download&id=1mW_E2_apF_fcHU13V0k6Q0xwy5c94quc",
  "https://drive.google.com/uc?export=download&id=1VUuYLjcBXicrHNsvzqMNG-lQev3RLJ1X",
  "https://drive.google.com/uc?export=download&id=1OUQLiea8paymNcE5LaQYKFE5GZXcVnST",
  "https://drive.google.com/uc?export=download&id=1Fe_9-Q1x0MbBL7ZqrgjcEvn8VfEt-O_s",
  "https://drive.google.com/uc?export=download&id=1h3VnuudRvj9Q71emdKkPpNINkeQUu5gZ",
  "https://drive.google.com/uc?export=download&id=1zBJ2_3R_WnCRviuLIx3TT7xUyT9RDo_b",
  "https://drive.google.com/uc?export=download&id=1wq4KoKDVuLrDgszkU6sVC-swPxnFsQ4R",
  "https://drive.google.com/uc?export=download&id=11lyiYc6NDXyvYxsKptKkxDnjTzbp7bB3",
  "https://drive.google.com/uc?export=download&id=1A8TwCJR4Dco-tEg2WcS-TY6xl7TsAWXB",
  "https://drive.google.com/uc?export=download&id=1pP7s8SB9XnDdbEweMU_8Sp3IgMSt_RR0",
  "https://drive.google.com/uc?export=download&id=10JlSfk3t4KKvLUPEgWuqaz_IkJO95KIO",
  "https://drive.google.com/uc?export=download&id=1q6na_r_DpZfUxpOq5j5W2SADSDDn54kO",
  "https://drive.google.com/uc?export=download&id=15t2pDCErEtNGm-SPf0zckb3I1YRnkflh",
  "https://drive.google.com/uc?export=download&id=1gSuihFO7JStSROfei6iDtC9sQgykro_K",
  "https://drive.google.com/uc?export=download&id=1k_7xq_KqFsKAfJp9owqgwiSc_oITqMIs",
  "https://drive.google.com/uc?export=download&id=15QESeI7VEOLqiFHiBj4Dm9lY5b1QuVzq",
  "https://drive.google.com/uc?export=download&id=18XWPQb-ZLBfMTIfgsBdZ7c-yFjn-lwjJ",
];