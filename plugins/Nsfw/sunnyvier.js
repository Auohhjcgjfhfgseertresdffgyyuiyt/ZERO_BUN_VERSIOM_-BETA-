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

handler.help = ['sunnyvier']
handler.tags = ['premium']
handler.command = /^(sunnyvier)$/i

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
  "https://drive.google.com/uc?export=download&id=15xhdX6bdKUpJqsk5tocWHxsVLfg4B2ab",
  "https://drive.google.com/uc?export=download&id=15wQEIAKrOzmYekQNoW0xxqCAkNqmAWKp",
  "https://drive.google.com/uc?export=download&id=15w0lF9m2tMXiTwID5lPa9ZZIZ2a7JyuQ",
  "https://drive.google.com/uc?export=download&id=15srs_fHOPxZWK-8Q2Y5pU3F1B_jWdNcB",
  "https://drive.google.com/uc?export=download&id=15rDtYwzP8-vAUaumEWDtDHU6QjbNBpnn",
  "https://drive.google.com/uc?export=download&id=15py_0jZQkL4BhO83VvYiToElFukf0Qyp",
  "https://drive.google.com/uc?export=download&id=15m4gPt1Vbx9oDhkSho3r544QvEf461Gy",
  "https://drive.google.com/uc?export=download&id=15fS1hEKfwOo7oyAnNmzYg2bacolaJBv0",
  "https://drive.google.com/uc?export=download&id=15b1hT4Hla4QGWg9e_RdrwBUynNDSNhRJ",
  "https://drive.google.com/uc?export=download&id=15ao9_UWNCpz5-twOZXGEvbnFqjfD2PlB",
  "https://drive.google.com/uc?export=download&id=15UfdkZB8xEoQ_o8dtFm6hj2wG9x4_81L",
  "https://drive.google.com/uc?export=download&id=15UMEdwrBBpfh871OasUcB2rCGcX4U7p9",
  "https://drive.google.com/uc?export=download&id=15Sd0F51N2lYmEiPvujf86U-9EOJD99Vk",
  "https://drive.google.com/uc?export=download&id=15S7uDpjD4BiysOyGJB8b_R_iG840jY2w",
  "https://drive.google.com/uc?export=download&id=15QzRfq-2RfaMuWJIIWCc-PW3dxJnh0ey",
  "https://drive.google.com/uc?export=download&id=15O8rGAtczhf6sCOmHZBVwz5RTXPorsai",
  "https://drive.google.com/uc?export=download&id=15JQw2nP0tKsN8CGe5J3M9EGu2eIqCzaq",
  "https://drive.google.com/uc?export=download&id=15Cev_m1Vwnwo9fPwTXnZOL4HrsV-Xgua",
  "https://drive.google.com/uc?export=download&id=157rZPPUKckegOFcHP6vy9uTFqirvN-_C",
  "https://drive.google.com/uc?export=download&id=156b0QWXlCB-btwOvWdhD6L8zjGg8qSqp",
  "https://drive.google.com/uc?export=download&id=1559lzBhmO0rXioICy2A2cEK99hCL32CK",
  "https://drive.google.com/uc?export=download&id=15-WkvJ481p_B-_8-dFpzMV-oiQYKOwmT",
  "https://drive.google.com/uc?export=download&id=14xonIOJPqAdUHIq8uNUeRYM2dcj6iua2",
  "https://drive.google.com/uc?export=download&id=14wPs8SH9ryA0R7ihxAp4oIvWrKshNp2p",
  "https://drive.google.com/uc?export=download&id=14vBXa6qoDxismqZoT6GagKsnlcQszAfL",
  "https://drive.google.com/uc?export=download&id=14rwClUdcfKaczK76useIxxPIMciGVE0F",
  "https://drive.google.com/uc?export=download&id=14n6AyppmlQPRZJkltk9TyPt5WPBrg4yJ",
  "https://drive.google.com/uc?export=download&id=14hnFyiOTeMHJ7QLqjs2pgtDyCdwJsXAa",
  "https://drive.google.com/uc?export=download&id=14gUtwj3Fnlfif2u9hmfDB2C1B2r8NY2w",
  "https://drive.google.com/uc?export=download&id=14dzApSMR_jafweak3qTTvDjrjM5THv8x",
  "https://drive.google.com/uc?export=download&id=14bIjPsLZRBLi8gQPN7BlWPNio8HR-q2e",
  "https://drive.google.com/uc?export=download&id=14YwuQ7QdroV8sO6UXPisnDUNUccgDha8",
  "https://drive.google.com/uc?export=download&id=14Pca5HgUZG4IgOOpsquwA_a2IJWvYuXM",
  "https://drive.google.com/uc?export=download&id=14M_zr-BtSgeblwLEx04DXYkbFVs8yTVX",
  "https://drive.google.com/uc?export=download&id=14JgIE_DjJSQteb4hntC0TMdIsTYbdAUc",
  "https://drive.google.com/uc?export=download&id=14G-UzelyIXtd9xkvZ2wdqiHMiaVMC21H",
  "https://drive.google.com/uc?export=download&id=14CGZW5ZGCA-YfB2l16hZiEDkj8PvF0Dt",
  "https://drive.google.com/uc?export=download&id=143ji_0y34TCIbpuCZHaC72hpmg515IPm",
  "https://drive.google.com/uc?export=download&id=13zpOXN1wbIYJv__rTuMVowtHx7R9tl_l",
  "https://drive.google.com/uc?export=download&id=13whfgcC1D6siUOsuw634w_HklylQ-0Jc",
  "https://drive.google.com/uc?export=download&id=13vZ_jPJdNPgdlBBeVFkHxTgQ2bDCAxRC",
  "https://drive.google.com/uc?export=download&id=13sjIBLoLfhakxiV-CoQ18OqKZFQ25WtD",
  "https://drive.google.com/uc?export=download&id=13qN2ca2NAyP-Kufr8tpMroiPkKEgZ4cD",
  "https://drive.google.com/uc?export=download&id=13qHeKxzGoauWFPxslpI40x-6TNyP51r4",
  "https://drive.google.com/uc?export=download&id=13oLcp6ZofgKR3PDOXzdfpdvWB1JHjMzO",
  "https://drive.google.com/uc?export=download&id=13kcECdCusiWekKz-_v3qlTRBlBR_Bkiz",
  "https://drive.google.com/uc?export=download&id=13dZTC3jReWNKUalglGuwkZs8ClJLy-YN",
  "https://drive.google.com/uc?export=download&id=13WCPSPrUeAX96388O2-PLA_5V4zs9fPM",
  "https://drive.google.com/uc?export=download&id=13SMKI9_24BGs4z03jQMo8t4J4hhFd9VS",
  "https://drive.google.com/uc?export=download&id=13P1WW46jJCFLQhQOyf8ocRNkCP-8_R0r",
  "https://drive.google.com/uc?export=download&id=13O91g6IOqnBDFk_ggG_-uUJHgUwT4YcO",
  "https://drive.google.com/uc?export=download&id=13Ih1H-anBhaYgM4cgAeH4HQnT9T4lo6e",
  "https://drive.google.com/uc?export=download&id=13IgotUPsT5kZBveMAll7neRbr6HM84Ua",
  "https://drive.google.com/uc?export=download&id=13GUCrYlJz5BKrJ0YmYuz1mkFksrOcCKq",
  "https://drive.google.com/uc?export=download&id=13AnzeX71f-SEQqBNjR0CeoKgDeOqDW2b",
];