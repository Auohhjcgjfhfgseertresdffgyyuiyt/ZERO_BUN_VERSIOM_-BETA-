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
          caption: `Nih *${name}* xiao cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['xiao']
handler.tags = ['premium']
handler.command = /^(xiao)$/i

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
  "https://drive.google.com/uc?export=download&id=1qOhxQP0GSMoOz7YHHbnd1aW0K_Nt0dBZ",
  "https://drive.google.com/uc?export=download&id=1K_sXO2CkpbZKcGaZdTHo_zDm-D8t5HrL",
  "https://drive.google.com/uc?export=download&id=1cjQuNCE9qT8EvI22JprtnXlEvaWgqcCE",
  "https://drive.google.com/uc?export=download&id=1ittosxRojgW8Op2TbsNZpjmDFv6ecar_",
  "https://drive.google.com/uc?export=download&id=12k5cgptozjhmHLzsTsFG3_sX1o5etQXB",
  "https://drive.google.com/uc?export=download&id=1LkYKdnYfozFvDYu7xu6RbeCi28ltWmO_",
  "https://drive.google.com/uc?export=download&id=1QOIiODbS3Xvfoz-lUSo7D9xd-UXNdNat",
  "https://drive.google.com/uc?export=download&id=1MFYbmaBrnN6Uk5wR_5rNbikSSOfLaXRj",
  "https://drive.google.com/uc?export=download&id=1DTz4ZHrpuBGECukdI1nhyYEIITq-nTGN",
  "https://drive.google.com/uc?export=download&id=1uad6GwXThwUcsT00lLA-NHgOzgXmtaeS",
  "https://drive.google.com/uc?export=download&id=10o7qub0prSh06keHivpq7wvYpgcHwxCh",
  "https://drive.google.com/uc?export=download&id=1ZaoXLlp3JrQxpHFJwrf2pQfEyPdCUeOS",
  "https://drive.google.com/uc?export=download&id=16ecaXlqbss2DPiRvYUJrsh3N_vk3lTBb",
  "https://drive.google.com/uc?export=download&id=1NilUJ69khOy10yc4YWcGekXYUOw4CCha",
  "https://drive.google.com/uc?export=download&id=1o8OIRkxosQ2J24Fi1DlFV0zoFAsL4IE-",
  "https://drive.google.com/uc?export=download&id=1zzG_DHllyuRV5qTAGaYycvOI0S1KNyOC",
  "https://drive.google.com/uc?export=download&id=1wTaa8q9JxTx-lto63atNz41XijlvWjRh",
  "https://drive.google.com/uc?export=download&id=1QVjEH91KQ2hO9FHOgjZ5lnbuKNrQnQUZ",
  "https://drive.google.com/uc?export=download&id=1ByoeW-nbv2un7cEoHaSHKpAR1HBnTbc7",
  "https://drive.google.com/uc?export=download&id=1CusTEYV9pIoaXnLz7-5Pc4MotLh5cSMJ",
  "https://drive.google.com/uc?export=download&id=1bFgjeShRTzFeyh2lX3zePhZFGrdeRZYE",
  "https://drive.google.com/uc?export=download&id=1v-k_58rmQFuHAs075wONt1UJJBcMsn1O",
  "https://drive.google.com/uc?export=download&id=1Nu61ee4cPP-fLCih_I6rWMPVAPvayhVw",
  "https://drive.google.com/uc?export=download&id=1mOvUvJJve5xODo60sqSGCwaJ3cdnrAqE",
  "https://drive.google.com/uc?export=download&id=11ekHGE0GEjdgUnrSbMTEC12oDmdBGXs3",
  "https://drive.google.com/uc?export=download&id=1bJT1OtwQyvMtTcxn-vrEJ9Nukzi5LZKy",
  "https://drive.google.com/uc?export=download&id=1LxVskuhAPA4cpxK7LQYVWV66QDz4cXLH",
];