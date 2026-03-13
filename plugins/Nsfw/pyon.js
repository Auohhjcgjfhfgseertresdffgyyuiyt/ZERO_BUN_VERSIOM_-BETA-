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
          caption: `Nih *${name}* pyon cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['pyon']
handler.tags = ['premium']
handler.command = /^(pyon)$/i

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
  "https://drive.google.com/uc?export=download&id=15EFeEVi-iccBLJHBxYWsPGbTFlHlq3WD",
  "https://drive.google.com/uc?export=download&id=124ivpcrSB-zeSHYfSYbFbaPM4TztLd_g",
  "https://drive.google.com/uc?export=download&id=15BYZyQrj6zyW5G_NiMkeMgMQxwIDQAit",
  "https://drive.google.com/uc?export=download&id=1F6iEZvjofBeZHNd3xwzcgklU7NGRk2Fm",
  "https://drive.google.com/uc?export=download&id=1cwYoz7YC7EUDVP-vCcPkq-0VgTaiFJG0",
  "https://drive.google.com/uc?export=download&id=1TaRPbrBgbVNESyJMtPYdUQ73SNK8HYoP",
  "https://drive.google.com/uc?export=download&id=1x9okqnorHEj1FXzJU-VHI65fNdG1RgSl",
  "https://drive.google.com/uc?export=download&id=1XA1qZ0oFkcvFTAXXPziH02UcBMPR8SMe",
  "https://drive.google.com/uc?export=download&id=1YuZDvUql7T8UB6pmlUL2xw-CMgtJMjjU",
  "https://drive.google.com/uc?export=download&id=1sUB4xHrgKiEJ6XCa95rldJVpCFpaCoJT",
  "https://drive.google.com/uc?export=download&id=1NbvINSYvXFIt8H36z69iCJw-2_0ciIuL",
  "https://drive.google.com/uc?export=download&id=1lAjxnbah4xXXU0euWKm6GH8qs1vnyADk",
  "https://drive.google.com/uc?export=download&id=169lfMx6B3W9sn_Y8UFuYBYUyc4MgQt0g",
  "https://drive.google.com/uc?export=download&id=1aeEWvi1f767lXhBzJdbiiMZVJo221hvY",
  "https://drive.google.com/uc?export=download&id=1Ey3MT28DOledXRq7bXDpMfp2FDfEwJJi",
  "https://drive.google.com/uc?export=download&id=1I92D9mJZ_esvX9TjYpdiQZ4YsOiI3Gu-",
  "https://drive.google.com/uc?export=download&id=1ms0Hm1FloR6byzBnonMvOKcs9QWFqEJ3",
  "https://drive.google.com/uc?export=download&id=1NlcFMRufD1gkFV0rdZ4wGMhDubCPgSn9",
  "https://drive.google.com/uc?export=download&id=1bCEyxH6ze_yJhLH1j64HjLHvBLnTx1Lm",
  "https://drive.google.com/uc?export=download&id=1PXj7C5yeiCGg1Av11UD3D95YqCS0vpO2",
  "https://drive.google.com/uc?export=download&id=1oa5EhTVtx06pbuQ_2io6fHL4APfT9mvS",
  "https://drive.google.com/uc?export=download&id=1r6Rott9qyJ9LeLRvrDFsx-blDbmic2t6",
  "https://drive.google.com/uc?export=download&id=1jQI7c8eEM_uj3PpnmcqQQ0QmT1eGArvt",
  "https://drive.google.com/uc?export=download&id=1YB_-LVE_xXy5Cru0ao8h4_uRdnSFYPEC",
  "https://drive.google.com/uc?export=download&id=1B73wCsTxy3ETXoCtVP-lTXX6OaEaWWjm",
  "https://drive.google.com/uc?export=download&id=1MHJSjwk_jTXIGsbQx7_uHEOmmcwFmXn9",
  "https://drive.google.com/uc?export=download&id=1SwnNe-HuFUBe33L6_HxCfGVUs0KOUP4y",
  "https://drive.google.com/uc?export=download&id=1_eQ9EvwphDlIsCgGGlnTxKKhgQfnthGF",
  "https://drive.google.com/uc?export=download&id=1G777sl205284iLNYbD1kxN5yp-AeR678",
  "https://drive.google.com/uc?export=download&id=1HgI8g0A-ODja06ORXG8_Vro55M-N9i60",
];