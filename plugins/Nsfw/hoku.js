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
          caption: `Nih *${name}* hoku cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['hoku']
handler.tags = ['premium']
handler.command = /^(hoku)$/i

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
  "https://drive.google.com/uc?export=download&id=11PYqN-3qVEZ73u0uY6xoDc5ziRDHsR9i",
  "https://drive.google.com/uc?export=download&id=1j9id9GaHTQ-cT8b1JvEeHbyk6_brCxdr",
  "https://drive.google.com/uc?export=download&id=13_mUqpM6x9zYowXbezHNDcKTrBjT55-F",
  "https://drive.google.com/uc?export=download&id=1WN1ZKaHn6ZQH379JrG_DdQXpY9-ArUAR",
  "https://drive.google.com/uc?export=download&id=1RJnr0i_9dcirW3tTRBX4be9yi0qMSnK_",
  "https://drive.google.com/uc?export=download&id=1pwHMMNiaFzqa0DJNNhtwTo6xetFr5QpO",
  "https://drive.google.com/uc?export=download&id=1P3TwGWkjQwzDek4CaKVqdtI_WfAkOTtz",
  "https://drive.google.com/uc?export=download&id=1Xbkh2PJbwHxYKHfTXi1oK0hRjH4iVwf8",
  "https://drive.google.com/uc?export=download&id=1rUHIhlJCv8lGAVTemi7iXTmV1qvCIn3o",
  "https://drive.google.com/uc?export=download&id=1D0LKz2YM8uW6otxwXcuvqoctpszPECpK",
  "https://drive.google.com/uc?export=download&id=1IJWtk9EfpId6JQVg-L9FSJaH3plEKpb5",
  "https://drive.google.com/uc?export=download&id=1C4FuBBcikSeXeSEMvsnRKE-jn4xImk_Q",
  "https://drive.google.com/uc?export=download&id=1rV0o3awTpaddJO91971YfcDHsU4eDYOi",
  "https://drive.google.com/uc?export=download&id=1KorS_3J3x3kHLyODaHs8DklNEvqps1N8",
  "https://drive.google.com/uc?export=download&id=10DgLRihFzE-5hBZ7QWzie-wkeL97l3k-",
  "https://drive.google.com/uc?export=download&id=1UvYIwJPnl4SXYWhddNEqwd5SwJukJ3mV",
  "https://drive.google.com/uc?export=download&id=13zBc8x-d68ys8rtlS6XIi0o1gDWPnTbe",
  "https://drive.google.com/uc?export=download&id=1GMh4w7TFK-7m4zC3U6RoQiYqdeoRdKIo",
  "https://drive.google.com/uc?export=download&id=1D-fyql7MEbDK6E-VqREYbX4_kto8jFG2",
  "https://drive.google.com/uc?export=download&id=1nZjvmG8gl-0tjcP-ViJh-wTHjl4U_sMO",
  "https://drive.google.com/uc?export=download&id=1fOOaSuZAhTZ5W34tiEnjP1mflDFC9_3U",
  "https://drive.google.com/uc?export=download&id=1L8ODfKmyQ1ObsiHeoazBIMpJc-_cq4Sp",
  "https://drive.google.com/uc?export=download&id=1gZbJlkDGMx4pVME8YuJ82QivEVvE0gb-",
  "https://drive.google.com/uc?export=download&id=12t9_GUY3eF0RY437UeEELIfmROjHiTC5",
  "https://drive.google.com/uc?export=download&id=1JoUN56Wk14FbbUJXFzMHAIIEJxvAruaB",
  "https://drive.google.com/uc?export=download&id=1oLwzJhOJWCfeM8TtuA5yLgKVnFUbKsWQ",
  "https://drive.google.com/uc?export=download&id=1LemFwbLasOGDWWoEIKIIPpFmUwpOIvyj",
  "https://drive.google.com/uc?export=download&id=1g0ChKfCokdBJwIJzCAUAH4bDkrA97YAc",
  "https://drive.google.com/uc?export=download&id=1exLhHlyiMj8eQ3PNrByNevHJuQ_F2p_j",
  "https://drive.google.com/uc?export=download&id=1QNNR6vL3-pGq3OfaujjCrh4gsA3XxwJh",
  "https://drive.google.com/uc?export=download&id=1z29xEZN2eHChvBgM6_iVJmRoKQO010Zp",
  "https://drive.google.com/uc?export=download&id=1OgWWiYfjojM25Wd1-YPCs5fRtn2T9YXJ",
  "https://drive.google.com/uc?export=download&id=1DjwL9wd6fNlNpwMpXyzOkRuALLlblNdO",
  "https://drive.google.com/uc?export=download&id=1SZqcONsGgu_3QTOt-EyHUAphTyIuLHhZ",
  "https://drive.google.com/uc?export=download&id=1lR7tzdT_Vawt3uHeGcoS_7YAH7GAHKIX",
  "https://drive.google.com/uc?export=download&id=1WqH9mgkKMHxwd-KNcHQKfJjoNL9XsniF",
  "https://drive.google.com/uc?export=download&id=1UPtXTHzviVAKO55VKYEIEAoIXQsfm3KR",
  "https://drive.google.com/uc?export=download&id=1NvdUxKhUJ8dJqWFwsy4Oh-hiyo9OOpQx",
  "https://drive.google.com/uc?export=download&id=1AEobYWRqcyqSi-r1EUYUUK79KZy8TJfJ",
  "https://drive.google.com/uc?export=download&id=10gU4int5coBs8JOpOVm16F7gBEr2ctwc",
];