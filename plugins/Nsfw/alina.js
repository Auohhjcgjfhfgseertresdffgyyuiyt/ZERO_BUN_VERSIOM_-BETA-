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

handler.help = ['alina']
handler.tags = ['premium']
handler.command = /^(alina)$/i

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
  "https://drive.google.com/uc?export=download&id=1J0dhrUkEU_RIVUaYdG7MrN2ilOAybsNG",
  "https://drive.google.com/uc?export=download&id=1UM5MRCltE6Dl0wl_vPwxxSUZ99Gs2RyU",
  "https://drive.google.com/uc?export=download&id=13DheXK8OaAucFMInpVGkE4POkzyZeDzV",
  "https://drive.google.com/uc?export=download&id=1tUcwGyWR1-LfniKeYtOuRvpJTfbvxnf5",
  "https://drive.google.com/uc?export=download&id=1Q3STCGE0j2ICx2V4aXBiL1uGKZWsP1X6",
  "https://drive.google.com/uc?export=download&id=15mTB_Q2_nomMOxzdt1e_6KPvkSRBA7uh",
  "https://drive.google.com/uc?export=download&id=1tYejaVqykKiLd-OXNe0JQ15Og7BTmryZ",
  "https://drive.google.com/uc?export=download&id=1yKPJ_hxzxkwmn69CxHLoyVNCOe0l09Sh",
  "https://drive.google.com/uc?export=download&id=13JXwj5uImnvMffSqiaehQSgTf_HtFbAz",
  "https://drive.google.com/uc?export=download&id=1VAH1JrFQ3-21QW8q--PQv6aVX6KebG74",
  "https://drive.google.com/uc?export=download&id=1kpV9BF9jT3eC4kUF1j7-Z1j4PzhHNC2X",
  "https://drive.google.com/uc?export=download&id=1otG9tUDYQXDpSo1K-45RMmRNhsX4FaKb",
  "https://drive.google.com/uc?export=download&id=15F2s5DgEbhqtjVFQ-EPAmmLLu3p7SokC",
  "https://drive.google.com/uc?export=download&id=1Mol1nBdDmRQ2MEcKljn5iXRwWKSu5gUz",
  "https://drive.google.com/uc?export=download&id=1CRaBaS-4qMyr03HgN-pRz3DE5frOv8Z-",
  "https://drive.google.com/uc?export=download&id=1dmYVSs3GdJ7ZFsPKZpwJt-xxHn7yKzM5",
  "https://drive.google.com/uc?export=download&id=1aLdOyDyYCBMtW7tKwrUZ04YNFO_RbMXc",
  "https://drive.google.com/uc?export=download&id=1dKSjATt7PQhzBLfZuW_LL44OokHEOqh5",
  "https://drive.google.com/uc?export=download&id=1vN2jQw-3TxTDFaKc_evMjTksROTkiJNd",
  "https://drive.google.com/uc?export=download&id=1pTbLXT3c7Vce1i1tdBupegL2ZfmQIuNl",
  "https://drive.google.com/uc?export=download&id=1Ro7DjY-dyHGgJMwLp6tSsyZ0jHJOr2mD",
  "https://drive.google.com/uc?export=download&id=1Q7tEmuJ_N1W6XOY-6wK4rV9TkeNgf0rE",
  "https://drive.google.com/uc?export=download&id=17H3f6GsBBW9wmp356R_34n-AbWt-JEIy",
  "https://drive.google.com/uc?export=download&id=1z_OhliXjK9El94WdxvergXxshFDU73N5",
  "https://drive.google.com/uc?export=download&id=15nI1Ot23vqjFcnUxQ7BTHp5uJJ_ZudfM",
  "https://drive.google.com/uc?export=download&id=1uQCRw78gU6sXo8l8hrGhM3PS-33ezCcp",
  "https://drive.google.com/uc?export=download&id=1mQsINCwnaPJ8Tih_5s8hLFBnBl76eOtj",
  "https://drive.google.com/uc?export=download&id=1KSlk9QnLtcqFIoONlWBZkQXIlXLwi8rU",
  "https://drive.google.com/uc?export=download&id=1ohxPr39Hl3VW7qprTIKHNzyPvg8fglBj",
  "https://drive.google.com/uc?export=download&id=1nWbzZ9hJw4eaxhhYrfMmcJsfLg16bewM",
  "https://drive.google.com/uc?export=download&id=1R-LH-Hzfcqa7JAoIlxdml6x3AK8xnlNv",
];