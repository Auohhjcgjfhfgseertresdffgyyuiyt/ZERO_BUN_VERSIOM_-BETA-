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

handler.help = ['tifa']
handler.tags = ['premium']
handler.command = /^(tifa)$/i

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
  "https://drive.google.com/uc?export=download&id=16To174OvezU0ts_EbGLQpSOX_mVWfC_o",
  "https://drive.google.com/uc?export=download&id=16ScKbFhAM5X5H2SzQ986C7LzZOJ2YJgi",
  "https://drive.google.com/uc?export=download&id=16O9Eu_oO6V2MVNJtN6juk9sOZ-wlwZzu",
  "https://drive.google.com/uc?export=download&id=16FzHcy-maNzMVxEwYyefoAd-pdoKI5iu",
  "https://drive.google.com/uc?export=download&id=1634WS_tmts4OmHYr-1-oiown84AsjkXf",
  "https://drive.google.com/uc?export=download&id=15wyy72YuGkeS5H4q7IOCMZWgx6Y3v3-m",
  "https://drive.google.com/uc?export=download&id=15vP_jILpgpdzemhUXPYyM40BdEe3DVVx",
  "https://drive.google.com/uc?export=download&id=15mnuyVBaH6cQh07R5A99lYB-TJsYT35d",
  "https://drive.google.com/uc?export=download&id=15d2aWEr9AqnntAizhFkKg3dx-MwN49x7",
  "https://drive.google.com/uc?export=download&id=15VSoCgsuFzlF9Uonzh5C1lPUT63XGCdY",
  "https://drive.google.com/uc?export=download&id=15VPPzBKhE9jKzhBAZJ_nGPEp5sITZzre",
  "https://drive.google.com/uc?export=download&id=15Ue8zmEEfWfBEA5jPHCR2GGynM59rGv8",
  "https://drive.google.com/uc?export=download&id=15TkQk8vaRIu-4t0XW6gRh1eVOEkUi15E",
  "https://drive.google.com/uc?export=download&id=15Q5X-IuLeNQT26s-iulJUvHvrOgIa7uT",
  "https://drive.google.com/uc?export=download&id=15BDpuk4pfT7VC6RnjezsjUjJ9hm5EsAg",
  "https://drive.google.com/uc?export=download&id=154LFMVfyRhIaxTHOEz3Olmcm-G2rcu50",
  "https://drive.google.com/uc?export=download&id=151-cVkkNDzUejA0eBU9azpXzBUDYHDe-",
  "https://drive.google.com/uc?export=download&id=14yZXD3VgpjBMRqMf2BIhedofceEiQ-Oq",
  "https://drive.google.com/uc?export=download&id=14wpJlccweVYl-3h1zouIlkm_gYhn7wQf",
  "https://drive.google.com/uc?export=download&id=14r22jPVKaZ09zmNVwc0wxWvkKIgelkvk",
  "https://drive.google.com/uc?export=download&id=14hIEheKM0jQyWRC8vpgz3VkK_l-2Y65u",
  "https://drive.google.com/uc?export=download&id=14fDcZaaIei7WjwdZ389QV85sqTjItVwX",
];