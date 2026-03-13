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
          caption: `Nih *${name}* freiren cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['freiren']
handler.tags = ['premium']
handler.command = /^(freiren)$/i

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
  "https://drive.google.com/uc?export=download&id=1kHZY1_62YxgmwDLi401cHM0Ngu-jRvBU",
  "https://drive.google.com/uc?export=download&id=1_2MruPXIzQCwx8rHj71f0QStBtl8H7bC",
  "https://drive.google.com/uc?export=download&id=1rIQEGYDOwYkHccx1AeXe9zrV_5yMxB_5",
  "https://drive.google.com/uc?export=download&id=150gL1icTV842BGPstC1avDRzHHg1Nv2A",
  "https://drive.google.com/uc?export=download&id=1MIpY7as7wQ3GbkS3q_j7o3boffHzIFO5",
  "https://drive.google.com/uc?export=download&id=1mGwUY96S1FqHLi7IiTIXrOMaGN0yy_KQ",
  "https://drive.google.com/uc?export=download&id=1CcHCXngL-EafWNbO1mQ8mhmarh2INXrf",
  "https://drive.google.com/uc?export=download&id=1_SJHeQ3jmGNxgSzNG4DPiwTyWTZ-IWoI",
  "https://drive.google.com/uc?export=download&id=1umh0Z6MEjpS42K8LCxbfsOHxNMtgFh4p",
  "https://drive.google.com/uc?export=download&id=1Ag-6KxLqqHovzqo75cOMNqrdjgHz4uYs",
  "https://drive.google.com/uc?export=download&id=1crmbu7wbYQ2Ipb_WeEXkOr7BRkvhTPpA",
  "https://drive.google.com/uc?export=download&id=1tCjliPUQa3N1a77-KyXk2sJEzoLGWo6S",
  "https://drive.google.com/uc?export=download&id=1MSx2CYAIEn_RTsjUohbesDoFp7GSITOq",
  "https://drive.google.com/uc?export=download&id=1lh-p8q5fFvkyO8AqlIFjgViFWBrocBuk",
  "https://drive.google.com/uc?export=download&id=1lPUXXvsmi1VWR6aKbTinzFp1nWNbJTPI",
  "https://drive.google.com/uc?export=download&id=15cK489-DEEY0q1EDXcu5KOJmZl6DKKUV",
  "https://drive.google.com/uc?export=download&id=1ypXPN-IYV7gzzHo6dVnw_ahe0yNQfPsq",
  "https://drive.google.com/uc?export=download&id=1vO_Ue5IzBetR6d1aHogeHFIW8FOhFOnL",
  "https://drive.google.com/uc?export=download&id=1yfKvlHaeeCuAbcMDOOz8NHRTqYgQXVx5",
  "https://drive.google.com/uc?export=download&id=1KJo10mv-RyZYh9vJnSBXGFLj8s2EktPq",
  "https://drive.google.com/uc?export=download&id=1Nm0TdzozjVLdAMk5OdM2bdKLzZ348uvq",
  "https://drive.google.com/uc?export=download&id=1cqnf_GxHsCEzY_gLUs0n8gEQTrNpqQTT",
  "https://drive.google.com/uc?export=download&id=18aLPpkgNUlhGeaea2QOPOgFLuqZ4t5j7",
  "https://drive.google.com/uc?export=download&id=1W34OCpK6ipDS5YsYZCIEbMp_cU8b12IZ",
  "https://drive.google.com/uc?export=download&id=1Oe81XgNsdiBSXUuVJIw3gGw2Rr2Sxd9n",
  "https://drive.google.com/uc?export=download&id=12lxPgwxfWvH8nKLFSnmWAHHaiNZC8ljc",
  "https://drive.google.com/uc?export=download&id=1ES9s3JZNffZRE0oML2RyX5GDa5NQznwg",
  "https://drive.google.com/uc?export=download&id=1dYyhTIGC3Y_H8UnTsoVNEmT31bmD6gWD",
  "https://drive.google.com/uc?export=download&id=18RRRdRRilDfnyERbIXgPcsEpscaN93eX",
  "https://drive.google.com/uc?export=download&id=1YuC9y1OIIAS-iDSDvPfzYQ_DfmA7j1aW",
  "https://drive.google.com/uc?export=download&id=1wqyUY6Te983NHEKW4ZPi6l91HOcx2DmO",
];