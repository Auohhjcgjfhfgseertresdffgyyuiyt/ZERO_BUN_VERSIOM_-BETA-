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
          caption: `Nih *${name}* aery cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['aery']
handler.tags = ['premium']
handler.command = /^(aery)$/i

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
  "https://drive.google.com/uc?export=download&id=1FstVmQc0-nwzWPo3Pa_xrWKOaIePsCJg",
  "https://drive.google.com/uc?export=download&id=1EeJ7_e76ncO-nVwI0XsJFDIUT5mWNHaN",
  "https://drive.google.com/uc?export=download&id=1lKCZjD9Mvm3NTCoqY9BZoNnQ22mZ_QXR",
  "https://drive.google.com/uc?export=download&id=1l1srfSp7o7snITcu-lqNSSb7LLm7fiaj",
  "https://drive.google.com/uc?export=download&id=1uzkPikAJPEpcZw5GFXsBbMTmsj04Jnve",
  "https://drive.google.com/uc?export=download&id=16LG4CjX-Qf4tZn2GZIq45Dpawm6HNtYZ",
  "https://drive.google.com/uc?export=download&id=1REHz3Om-2xmdpBFhUzPg-dh5xNjL3vQS",
  "https://drive.google.com/uc?export=download&id=17ZnR3W1C2TQQLOMOw1IVmB0BA_mmSCY_",
  "https://drive.google.com/uc?export=download&id=13hCUxQN_Bi3LZc0kpUHapfDyZ7OqjNGT",
  "https://drive.google.com/uc?export=download&id=1QPEUvuiZOsSXe5UkTK6FSSoifMl0emQL",
  "https://drive.google.com/uc?export=download&id=1PGCpC3laD8sp_lFzdD0QlZAsc9WwjebF",
  "https://drive.google.com/uc?export=download&id=1Xc8igjn8YsEr4s3vNjp_MEcv-JxAECKE",
  "https://drive.google.com/uc?export=download&id=1PEC_zZcY26yB3gzEmwRsmvSjYheh3oQM",
  "https://drive.google.com/uc?export=download&id=1rxYlAflLkxQfww6AvA2ndaZYcBfgCpLD",
  "https://drive.google.com/uc?export=download&id=1ajqfjMq3nUCJG0wxkMmSsQixPyEEGLaV",
  "https://drive.google.com/uc?export=download&id=1lSIwjGmzFhivoqCy2UCQBbg0urDe-4gV",
  "https://drive.google.com/uc?export=download&id=1ttkfsH8Tj1FU2-BNJn6vLum95ezDzZES",
  "https://drive.google.com/uc?export=download&id=1w2i7nWd5koB976PgsouUpToewYQTeZE3",
  "https://drive.google.com/uc?export=download&id=1LLk5x4yuZsUFA3X2_wILQ8t6ngETIWyB",
  "https://drive.google.com/uc?export=download&id=1mvwwldMdG6wOAdFdkdfjFwxQL5RMwYMM",
  "https://drive.google.com/uc?export=download&id=15J9jwEaKbDSP0lnVy9KV_9eqQDFTMBWm",
  "https://drive.google.com/uc?export=download&id=14RVs5BotukX902LvXLocu1sxTB9FI79k",
  "https://drive.google.com/uc?export=download&id=1CNufRZtczJ8UtR2CRen_pbxeLZj2Zfce",
  "https://drive.google.com/uc?export=download&id=1TZV9BqlUt1QkcQHLjM7Qnt1qdzY3lY3a",
  "https://drive.google.com/uc?export=download&id=1JLY7xquVjBMnBhm7b9z5ZhlsDPk5K16d",
  "https://drive.google.com/uc?export=download&id=1bQlUUXIAjJtEmoq91Y3K2eOS5YP3IrSp",
  "https://drive.google.com/uc?export=download&id=1xIjONqDWqn3pESX58jVAwKs89Sl38K5G",
  "https://drive.google.com/uc?export=download&id=1oI1u2j9J4rqqYdko7X0qmyxPy-p1ZrZ0",
  "https://drive.google.com/uc?export=download&id=1mHpUW174RxpYN7jddFShyIJxgT8KyANl",
  "https://drive.google.com/uc?export=download&id=1prMNCGTph1qEABkoZFpUHy-zmDdmC78H",
  "https://drive.google.com/uc?export=download&id=1K8VmxjJG5P4vKxA8QuvZfEaXN4y53Akz",
  "https://drive.google.com/uc?export=download&id=1sTdCKs_mRKmVsHEQU_3RnTKrc6cPECbE",
  "https://drive.google.com/uc?export=download&id=133npYXeGdLjIxugb9I2Yl9mceCNHSia9",
  "https://drive.google.com/uc?export=download&id=1aztNAWl3zaqYpDhvI1aRSS8kqj9ocpES",
  "https://drive.google.com/uc?export=download&id=1wBol5WoONpriBU7wbKhxIbOnlTtJieYO",
  "https://drive.google.com/uc?export=download&id=1w7Gk-zmMtePaWL8KZBUUIhiYBh1gGyrs",
  "https://drive.google.com/uc?export=download&id=1tgP8B0k3Nlvrfuy_NNQJ3bIHa5sDwYVf",
  "https://drive.google.com/uc?export=download&id=1JJbPgJiTC_BxWQpET7WMAhGhBt8e5pNy",
  "https://drive.google.com/uc?export=download&id=19gGVPkiC7gogM41UGjfRmoT_4neabXyl",
  "https://drive.google.com/uc?export=download&id=1JjO9M7IGgpdHZImdsJM5eaJo24im0_m1",
  "https://drive.google.com/uc?export=download&id=1g-ruiLbZRxPS5OZ_ytZDMB2Bn728_NEB",
  "https://drive.google.com/uc?export=download&id=1zAapn4uGnhZiL1HfcDcp2ba22ncsr0Q0",
  "https://drive.google.com/uc?export=download&id=1lbi5CK4RG6dfhaOU0b2d2vNXYk227xg0",
  "https://drive.google.com/uc?export=download&id=16oAWFe0c9WwDPWbTUJU3PGDxsG_ANN-M",
  "https://drive.google.com/uc?export=download&id=1s1nk7Y0jwecbXmIGNQAWfBY3gZHDryqG",
  "https://drive.google.com/uc?export=download&id=1rrjjmpovRr8MBwSnDEpTRdAGjgnZ4MdB",
  "https://drive.google.com/uc?export=download&id=1WKgT2TgUmn59EWLHeRzYy3faR6q7H4FK",
  "https://drive.google.com/uc?export=download&id=11c63zkZtnieJaBMGxBBGEHH5Ktpggiu1",
  "https://drive.google.com/uc?export=download&id=1NoISwGT7CP6XYnfrRbLlePk9gpNUq-J5",
  "https://drive.google.com/uc?export=download&id=1aWr0RdGOIp6LHxlyoAkl-6Yl9N4197KW",
  "https://drive.google.com/uc?export=download&id=1-IoRl6HO4louFs2wwZPrSPDeH80IGNeM",
  "https://drive.google.com/uc?export=download&id=1Vik-TbSxDRSoZbEInA2XFCbO7_kRV-a1",
  "https://drive.google.com/uc?export=download&id=1nS3bby0Ry3_CSoc3K5qwBzTUgEq63Mp-",
  "https://drive.google.com/uc?export=download&id=1h5SUuB5x6P4C_Ck6NYS-ZSlOrNdjazB6",
];