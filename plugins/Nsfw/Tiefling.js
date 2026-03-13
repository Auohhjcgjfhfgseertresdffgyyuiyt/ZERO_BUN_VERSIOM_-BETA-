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

handler.help = ['tiefling']
handler.tags = ['premium']
handler.command = /^(tiefling)$/i

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
  "https://drive.google.com/uc?export=download&id=1gYinE_VSnfLY2eKoPDW29sStOqIvoHoQ",
  "https://drive.google.com/uc?export=download&id=13jfAiDQZW_snI4cWQwn5ddXhiNSDKVpi",
  "https://drive.google.com/uc?export=download&id=14NhEYAyySLkahwygx4foM2SinnA9XUJQ",
  "https://drive.google.com/uc?export=download&id=1RLJ2eDljTBVXaXwW1euM0jlMMIO7VK36",
  "https://drive.google.com/uc?export=download&id=1NJFdn9EeO5E5-90Png_UFeGOXQQPug2-",
  "https://drive.google.com/uc?export=download&id=100VXnNYz2aZ2OsY0XNxqiBOl3IxgROhV",
  "https://drive.google.com/uc?export=download&id=1TpyyYhgmdraYPR2V97o8krE28Bu1fW-t",
  "https://drive.google.com/uc?export=download&id=1FRjln0rAp8BspQjdakDJkQgNHdQmnBx0",
  "https://drive.google.com/uc?export=download&id=1vjpXeVEe7yhrDuMnwF72tVkW6O_Q8UWn",
  "https://drive.google.com/uc?export=download&id=1ssykEgI6QeoRoPhAJMA0FwKsuWxSlYNi",
  "https://drive.google.com/uc?export=download&id=1tFPiLISmSrWcVrs1WBHkQTriUZJkLiiM",
  "https://drive.google.com/uc?export=download&id=1xEWc4ypWpHrTWkxLJc7tWkTpaJkq0q2c",
  "https://drive.google.com/uc?export=download&id=18iPNfhqByrkbEmZiozOIPc8R2kEQ3RgN",
  "https://drive.google.com/uc?export=download&id=1H7iaMmS5fm1EbCTDMNgVWW0fB2R_0ysV",
  "https://drive.google.com/uc?export=download&id=1eVLUDRxNbNl2zS6yw0thxbNr9ufw5GjR",
  "https://drive.google.com/uc?export=download&id=1hzi1trGAE3J85qz5idUtnEYjjq4hw_r-",
  "https://drive.google.com/uc?export=download&id=13NFLyj2slQYVUt8ANJilIP8RilG_Y6co",
  "https://drive.google.com/uc?export=download&id=1hC8Lkm6XDX33Ve-hxNnPig3zcRLwPJ41",
  "https://drive.google.com/uc?export=download&id=1LBMaO69xHwZ_32pXurno07U3PeYi0Zzt",
  "https://drive.google.com/uc?export=download&id=1euhyrhb31n_wbJHUENz8erLj7PsUl7lR",
  "https://drive.google.com/uc?export=download&id=1Ws-q7TncytyHqnwPsDhOCcUP7VZHIayE",
  "https://drive.google.com/uc?export=download&id=1DHdl1vWsLymMjn91cVzN0xTlego50YHg",
  "https://drive.google.com/uc?export=download&id=1rG_GbWgKH4Y3Lgu7MUuz424BIBigU4Ek",
  "https://drive.google.com/uc?export=download&id=1cYXIroixZDwnZsCtTrw9g2bVqwuIcfMU",
  "https://drive.google.com/uc?export=download&id=1kxjomFF9VS2Y2C9T-XkTR-VyJPwHIy1i",
  "https://drive.google.com/uc?export=download&id=1W1B9Zb1PYJ7MZCxYjNm6eU7uhBO8IXkd",
  "https://drive.google.com/uc?export=download&id=1IOnty4SmcVQ8YwNxyorZ0kBJBlfsoWJW",
  "https://drive.google.com/uc?export=download&id=1P61FfwKQh1bTqWqlkEIQV4nlqCF6RDjt",
  "https://drive.google.com/uc?export=download&id=1pQyJZ89_QaG_f-1HOMA4kY2Isj47fkTN",
  "https://drive.google.com/uc?export=download&id=15bcpYmGJjEEN5YwwJNWimPckHPK7Ix51",
  "https://drive.google.com/uc?export=download&id=18rdZiEjiMJrjXnHo0NgDCZ6k4Fr28f4w",
  "https://drive.google.com/uc?export=download&id=1A-qR6z5Iu5oZDnsO6qYM1LOf1GpeMD-6",
  "https://drive.google.com/uc?export=download&id=1Xwet3gB9TXd8PGH7-JUK0Dpaw8VJT1zx",
  "https://drive.google.com/uc?export=download&id=1SkKXNzd4VvMtcmAbHVDpXy39pLLI1Xc0",
  "https://drive.google.com/uc?export=download&id=14JBCQD0PNR0jpAGkNuNTwh_UGWH6Xbda",
  "https://drive.google.com/uc?export=download&id=17DohSNDfrpeY8n7PDrD71K6qQTHNOkfF",
  "https://drive.google.com/uc?export=download&id=1hNXnPO1ZvQHYE0lRiL535T3l8Im1LqX7",
  "https://drive.google.com/uc?export=download&id=16VG84zqfxULYa9JmMGA8Gt448r7CMR4t",
  "https://drive.google.com/uc?export=download&id=1blRPPELsidonHvc1jR1-jmQGoWXsRaeL",
  "https://drive.google.com/uc?export=download&id=15-xPbQY4yfWDzdj_CRFb369yP02LBYCw",
  "https://drive.google.com/uc?export=download&id=1JoxqoeCX-EyNITgUq9E3ak7O1VOANq-P",
  "https://drive.google.com/uc?export=download&id=1dgNVBxwo6jHGhp0Qo7Kv3lcieKwXjS51",
  "https://drive.google.com/uc?export=download&id=1GuBGHDcbU1pNxLv-b92treAJQ8t98lDG",
  "https://drive.google.com/uc?export=download&id=12sPAdCSTVXR2XmOnyzZlcgTH28toMeCi",
  "https://drive.google.com/uc?export=download&id=1I_CLdNSOiRWy3b60W1VenkAQWMqk1zEU",
  "https://drive.google.com/uc?export=download&id=1FeVaJs0200C2DW6OxFpVz8lLr0_7MHZu",
  "https://drive.google.com/uc?export=download&id=1pUuRnz6-DbKkhYOCKJiuaM5Wlk4yxNFI",
  "https://drive.google.com/uc?export=download&id=1Dav413qeego84inkK0dehUoA6ln0X4B3",
  "https://drive.google.com/uc?export=download&id=1EpBhzFU484YeP_q2G57ZAas7Q8bTpMrZ",
  "https://drive.google.com/uc?export=download&id=1ZmHDIKcGdtvttjMCOa2AncMIdsglPgVF",
];