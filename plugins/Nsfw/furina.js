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
          caption: `Nih *${name}* furina cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['furina']
handler.tags = ['premium']
handler.command = /^(furina)$/i

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
  "https://drive.google.com/uc?export=download&id=1AEXrGIUGaFVbTguNfLLdt0S5uOx7Tc-l",
  "https://drive.google.com/uc?export=download&id=1qdDFSnzbZeVybOTspDvPd0OtO7Z7mwmH",
  "https://drive.google.com/uc?export=download&id=1bznq-0-o15UNaMgxcLGnE3XQZOnkTv0z",
  "https://drive.google.com/uc?export=download&id=1dwllbcr6ASJ4GYNRJm3oDP5TOa7_IgTt",
  "https://drive.google.com/uc?export=download&id=18oDrhXVEaBhgeonf19cf9DUqIUB0f2aQ",
  "https://drive.google.com/uc?export=download&id=14EVXy5RtscGgawYkHijZt-qIzPLZ4ep8",
  "https://drive.google.com/uc?export=download&id=1v6SARyvKZVr90b3W97aiy1cPsXzybBTO",
  "https://drive.google.com/uc?export=download&id=1aE0YwTbgbVZZzmDvySYlm1TjIbVqkQFD",
  "https://drive.google.com/uc?export=download&id=19YLab2JlURB_8vB9YKiiZgEjryqt3ilk",
  "https://drive.google.com/uc?export=download&id=1ovwUlcsmXGCPkfEZMKeRjF3jjcEsTDi-",
  "https://drive.google.com/uc?export=download&id=1UN57BPCmZMZutPhk7yHcFyR-VFmvb7Yy",
  "https://drive.google.com/uc?export=download&id=1X5J3D4QZ8FIzP1z18IYPTx2ERBCVELOX",
  "https://drive.google.com/uc?export=download&id=1MHAKuRIN46P9hOYcuYOLvrIE4dfNLlgV",
  "https://drive.google.com/uc?export=download&id=172h_cOggzXGUdPbKtF9Tbuol9Hx9VxT8",
  "https://drive.google.com/uc?export=download&id=1BYtqwTa4_o3pbXlo3XUdkhFj8mG_FePz",
  "https://drive.google.com/uc?export=download&id=1lVW3scP9au7MPDQMdlc0Y8wzcI9l8Ly8",
  "https://drive.google.com/uc?export=download&id=1ZKRaMeR1gUtg3KirepD88i0B7fEGevsa",
  "https://drive.google.com/uc?export=download&id=1gXIOzsY2mkk20PMGvurxE8sY1rDDE-vH",
  "https://drive.google.com/uc?export=download&id=1JuUu3ulqr3Dsw0eTino9MxV2R8F5yG_j",
  "https://drive.google.com/uc?export=download&id=1wuYRJ7OTGzB3g4TaZBiLTcZC1h-aLzC9",
  "https://drive.google.com/uc?export=download&id=1a5M2ws0z_LVZbImMQimukn83OBdvzlk6",
  "https://drive.google.com/uc?export=download&id=10WvcyZWrOURNSv8vEkfMe_ozr1jp-9DS",
  "https://drive.google.com/uc?export=download&id=1pvvMu6cesG-shKlGpcv2tuHoWvX_ZaUD",
  "https://drive.google.com/uc?export=download&id=1qLKa9DMt6IBAtA_Ar38T-Kq0bTpjxY6T",
  "https://drive.google.com/uc?export=download&id=1eIV5Iqk5gOUbioO681ru7W7RK1FiwBrr",
  "https://drive.google.com/uc?export=download&id=1dcdm3MquVkrYnIKVOG9jPg4G1bo5wuzD",
  "https://drive.google.com/uc?export=download&id=1YymqSJ_cIOSZPF9DW21V5xspJsGXeNq2",
  "https://drive.google.com/uc?export=download&id=1V5HD0CZw7-3OpLhW-EHoGBovBOgz3jGt",
  "https://drive.google.com/uc?export=download&id=143QFuAKDl4_L58Sjz8lzRv2tVBZQgb15",
  "https://drive.google.com/uc?export=download&id=1EOVfHegc50sT957bIhP2eZQgG0_ZLZLz",
  "https://drive.google.com/uc?export=download&id=1f38Ukg7kHrZR1fIFxi8cXQkbr1wYkyCI",
  "https://drive.google.com/uc?export=download&id=16LYegq6k7uSI3tGEg7WVSzRTkRUfg31E",
  "https://drive.google.com/uc?export=download&id=1i-UeY3a0pJdGby-SjyB7viw7Uv2DdqYy",
  "https://drive.google.com/uc?export=download&id=1wX9jSF2kFnH939VuUpxPB_ksNpX-WTPY",
  "https://drive.google.com/uc?export=download&id=1n2sWfi6mb54sSsvuOfLqW-2mJFM8vwH1",
  "https://drive.google.com/uc?export=download&id=18Lj2CzJ3gXkVeEoTh3aN77w2cPOLr3l9",
];