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
          caption: `Nih *${name}* koneko cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['koneko']
handler.tags = ['premium']
handler.command = /^(koneko)$/i

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
  "https://drive.google.com/uc?export=download&id=14Oak2I-moGelQTVwqZUsB3mhAfuI8cuY",
  "https://drive.google.com/uc?export=download&id=1SDgcx6BGXG_iYBOvdlQZrBBeJ4sEokb2",
  "https://drive.google.com/uc?export=download&id=1KSfahifGPtKNWbzfnLmER9yKZAF3QcNw",
  "https://drive.google.com/uc?export=download&id=1bS5XZ0yU3tQXNz9LD9QjekyyGUqx--71",
  "https://drive.google.com/uc?export=download&id=13yiCWYwkGQOLpPwYNbIvOMM8bC64k8zy",
  "https://drive.google.com/uc?export=download&id=1z4JfpeJ0Ezw_fR_s6B6p_OppfuQeMFQ2",
  "https://drive.google.com/uc?export=download&id=1e34cNFsMK0ThBAf13NTWyowUR4vdmDbE",
  "https://drive.google.com/uc?export=download&id=1JU56fDFQpnIisKbVKfvO0XqZ1os6pv1G",
  "https://drive.google.com/uc?export=download&id=1JDEVuDCQOVjdNSsT6kNUlgODFQnUV4RY",
  "https://drive.google.com/uc?export=download&id=1c5ESENFoKKls7qt56MxsM8TR8gFlMn43",
  "https://drive.google.com/uc?export=download&id=1zDhQI2Ml3NbH0UoVugEDAciqCKb91nri",
  "https://drive.google.com/uc?export=download&id=14Jd0vcAXr-h0L1sNUxlzrkHTj0OsZxHr",
  "https://drive.google.com/uc?export=download&id=13QYIR_v4gryaJuod-GWQ3xy1QSXU5WYa",
  "https://drive.google.com/uc?export=download&id=1QXGzh5VOKjKD0VL5IfaE4_4HqGRAld4f",
  "https://drive.google.com/uc?export=download&id=1y8j-xWGJkOXDb-VL-LtZarD6iTP72OgO",
  "https://drive.google.com/uc?export=download&id=1bYQIwdA9njTWzzUbDEaPfDlxH3n3sOLx",
  "https://drive.google.com/uc?export=download&id=1LQ0GeFF5knM7akXwbxPUu_8WizKyvoJW",
  "https://drive.google.com/uc?export=download&id=1228uPrKzz9Y_ncatyzRta6U9_inABVdm",
  "https://drive.google.com/uc?export=download&id=1kI126AkXUXDzuYpsgLe--x63L8RAt2hP",
  "https://drive.google.com/uc?export=download&id=1AzY0v7pmm78vXiOQnLBTB8a36lm1M-Ym",
  "https://drive.google.com/uc?export=download&id=11lAe9zJGo_352_bEgpaWHUz5JGFDIfIR",
  "https://drive.google.com/uc?export=download&id=1HMbBaTNat0FvVqip_naxeZxod4-VFC97",
  "https://drive.google.com/uc?export=download&id=1xEIlax7EEdYDPTko85DCWiszopT_fokl",
  "https://drive.google.com/uc?export=download&id=1YJyqzYWvaL3zdWVdmv3WWcpvpKykTRqO",
  "https://drive.google.com/uc?export=download&id=1uf9ejfbKhX_-AaJ1VLndmpdpKS_8zlSH",
  "https://drive.google.com/uc?export=download&id=1-yPjdofMBQEibh3s-74Z71sWE1wSmyfQ",
  "https://drive.google.com/uc?export=download&id=1NmuUtLb4Gsc6H_nmtT98mRnU_K7ddw67",
  "https://drive.google.com/uc?export=download&id=1WnIeqYJ7tOGg7tsYe8P954_FzQCwJgz8",
  "https://drive.google.com/uc?export=download&id=1kxmI5Ok--VMsA21k8UIoV5HSOZ63xcxL",
  "https://drive.google.com/uc?export=download&id=1avtvEOWBBnaXnBYdlmvmxtFW0_-Ps3iu",
  "https://drive.google.com/uc?export=download&id=1uphWaGxywDsoadmyM1vr5Vn2WN0vxDpi",
  "https://drive.google.com/uc?export=download&id=1Mcs-Pk9kZ4QRSFUEdLpKAMZCic6vDOjo",
  "https://drive.google.com/uc?export=download&id=1_02v4rPKvr2U7DFSKQkfSZfpdEEJBnpt",
  "https://drive.google.com/uc?export=download&id=1kf_Q36IXrpvk6p9tsWYQiMdBQLGep90J",
  "https://drive.google.com/uc?export=download&id=18SP8f2bF7ukHz8TpeCw5UK8mPtm2pBw7",
  "https://drive.google.com/uc?export=download&id=1_sMgSODP5u9SBiACopksyRAlnxMecLSd",
  "https://drive.google.com/uc?export=download&id=1KTdoSbIdy9wsW5pM8Uf0HaI4vmVBagc7",
  "https://drive.google.com/uc?export=download&id=1jml3GNjpl9_S08ceNXiKe6dyaOr-jgR7",
  "https://drive.google.com/uc?export=download&id=1X05ToiuGq4a1__trycVAJa9TCn3bIDmw",
  "https://drive.google.com/uc?export=download&id=16Ngbd-Pz3vB9bvGIuoAr8qGVaxEp9X5b",
  "https://drive.google.com/uc?export=download&id=1dnrRZL7C5TrTpP7dIuM9dqzhg4s-gQAc",
  "https://drive.google.com/uc?export=download&id=1LfdKeEqKr2x7vZhc8DbRyClZVVbGHQBu",
  "https://drive.google.com/uc?export=download&id=15hh0QCeWBhgoj7_aJo2ISEHg7nwWyBiB",
  "https://drive.google.com/uc?export=download&id=1acTKM8G5VT1GpABAN8CRAoQdxpUjebm-",
  "https://drive.google.com/uc?export=download&id=1CUawCV7bGGqSsjNF_6bkyWTpKO6tYQjq",
  "https://drive.google.com/uc?export=download&id=1T1nzRhs6JTd3snsFVOZ1F-utFZ5FAYyt",
  "https://drive.google.com/uc?export=download&id=1J6fFlfjpur9Op6qVK7iJdGNIbMWU39Bp",
  "https://drive.google.com/uc?export=download&id=18GdcljAyhjFeV5l2jXS0rVogbShbNEwQ",
  "https://drive.google.com/uc?export=download&id=1Jjw_pxoBP20dQelURQKFTkYcVJ-LdwOi",
  "https://drive.google.com/uc?export=download&id=1vnGMIEzkF7Yx0dITLu8UtGiJhcFbp7xF",
  "https://drive.google.com/uc?export=download&id=1YSA2TDtQyf9lFZW2__da0XykiC9bhMaX",
  "https://drive.google.com/uc?export=download&id=1KnxXixosSGJmHQ9jm7Z3HlBa3rLRHhhp",
  "https://drive.google.com/uc?export=download&id=1hWhFH2JcZYYSDDM7U3pPOUlHfCjlBDeq",
  "https://drive.google.com/uc?export=download&id=102FKVoo1aK-pI62DcQYXPZz4zXmoYD_t",
  "https://drive.google.com/uc?export=download&id=1XboFY7pXO5ZnzNmiS2bzSySJ-v1zx9ZX",
  "https://drive.google.com/uc?export=download&id=1cOyrHoRpqbA1KUvM7eKOpcIeOrm4_0jb",
  "https://drive.google.com/uc?export=download&id=1qfndGB7CPrvg3RBI2jSTXkAlQzrPQqQ4",
  "https://drive.google.com/uc?export=download&id=1bz8YFtGoIAmCZtcOZQ8ZlpDzK3mUyVsj",
  "https://drive.google.com/uc?export=download&id=1H1lR2Iw_Pj5fSSqyLBqXeEUUEYHqWwev",
  "https://drive.google.com/uc?export=download&id=1ePiI5dxV-X81tq8E8-0wxodAj2eX0PLX",
  "https://drive.google.com/uc?export=download&id=172Rak8t9jbw2HrICeYZeefG97ksojc5I",
  "https://drive.google.com/uc?export=download&id=1Oijvpy9IuFfagJwkHaOuwvXiFDhfkIPG",
  "https://drive.google.com/uc?export=download&id=1gGShwh-xrK0FK9aBBBmmmVR6aASKeNR_",
  "https://drive.google.com/uc?export=download&id=1B8Bh0H7RTsnsP36wIOnpP7Cu_YavNuv_",
  "https://drive.google.com/uc?export=download&id=1zeCBeP5e6KuIgh1ZcoMcJH2bGxyiCAjh",
];