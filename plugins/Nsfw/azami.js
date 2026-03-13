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

handler.help = ['azami']
handler.tags = ['premium']
handler.command = /^(azami)$/i

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
  "https://drive.google.com/uc?export=download&id=1D2fnL71v8vzsValVLg7PGJZm7HP_jZ-P",
  "https://drive.google.com/uc?export=download&id=1eZRW4E5RnkOZHKKtfvoxFOxm6QV4Kgoj",
  "https://drive.google.com/uc?export=download&id=1mve0b8Z-IlNSfx5UJ6Nuda81KlRLohcN",
  "https://drive.google.com/uc?export=download&id=1utfe58M-CDATkQEMSmyaeF2NaX2FJLVo",
  "https://drive.google.com/uc?export=download&id=1DteQBCrVRNU9utm2wVoLmN9oiWswp1YI",
  "https://drive.google.com/uc?export=download&id=1mwmoClE7rt5ouEV8d2KtXBx22JXOTFeq",
  "https://drive.google.com/uc?export=download&id=1cNea4WdG7mjyhYoTJvGjzsM-mnrmgklN",
  "https://drive.google.com/uc?export=download&id=1xwltYHC1n7K5keyOG-RVbew88G4HBpvx",
  "https://drive.google.com/uc?export=download&id=18sBsTXjZgeJ_3uj3D8QxJWBGlPO6aoe6",
  "https://drive.google.com/uc?export=download&id=1vffpLAraUx4f02Eaw28tfTWhPw3fhRa3",
  "https://drive.google.com/uc?export=download&id=18NkMh-UpReI7LO3amNvZEpVHXuhcSNjR",
  "https://drive.google.com/uc?export=download&id=1UKxXEM3RKxRkljBxjP9cm8PX2WD9L6ES",
  "https://drive.google.com/uc?export=download&id=1uo4eib7FkQPzTjFHGiNhdjMKQzvD-0Wm",
  "https://drive.google.com/uc?export=download&id=1vaw5C2W5WUEkFEqsFW645QuAqfSzHfod",
  "https://drive.google.com/uc?export=download&id=1xbYGV0NynpeQ1JCfXysccsvGdXBupRdP",
];