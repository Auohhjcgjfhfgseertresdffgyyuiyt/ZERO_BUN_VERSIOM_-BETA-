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
          caption: `Nih *${name}* kato cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['kato']
handler.tags = ['premium']
handler.command = /^(kato)$/i

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
  "https://drive.google.com/uc?export=download&id=1pH5Lq6G2bav7yfaXRK5A9ztMgkBq4a_X",
  "https://drive.google.com/uc?export=download&id=1ol6QWNCQ8vBTfyiC_-4YUuQH8uDszFLL",
  "https://drive.google.com/uc?export=download&id=1ilm5hboXUrPExk-Qcuun72f1j0XGfgGN",
  "https://drive.google.com/uc?export=download&id=1IL2ADTmrhGMIsQunMYMJXx73kWxoKzAN",
  "https://drive.google.com/uc?export=download&id=1KMNmmJH6WWN5aovBQ6rlEcy19UyA2Bkq",
  "https://drive.google.com/uc?export=download&id=1aB2MoQ6399ilcld73Q9WLV-RWlWQFSCX",
  "https://drive.google.com/uc?export=download&id=1l2R7T6M5YQaOaDV4AWEphoncbaPi8-3d",
  "https://drive.google.com/uc?export=download&id=1h1MlACsNFpNRoC97FJow_MZPhv2lRyO8",
  "https://drive.google.com/uc?export=download&id=1aaqqgk4QDPyW1dM3gd6gv5uh9Vsqe0Sl",
  "https://drive.google.com/uc?export=download&id=1NFG4fyM1yTaGGz26JwICLfm9Mub2FCdN",
  "https://drive.google.com/uc?export=download&id=1DRaC_qYQjN-mhajueXqapWcsOQFDptte",
  "https://drive.google.com/uc?export=download&id=14LSqGSSJ3CbcoH1SFRQEPHkRBjXXAqU3",
  "https://drive.google.com/uc?export=download&id=1ZnRZYLrAKdFLylKgLPJh1m9jNgb9VQHp",
  "https://drive.google.com/uc?export=download&id=1FnJScyopCNkQz1bKHRorpx0sA1Vz7M53",
  "https://drive.google.com/uc?export=download&id=1zSRUcdL6OjqigwEwUmWRSSijhIwVFIc8",
  "https://drive.google.com/uc?export=download&id=1IDAVsojYGbHNovyKZSx7yBK6nSgQ5w4d",
  "https://drive.google.com/uc?export=download&id=18n0JWLW1vmLbvGXGwdHM3dssybjuwl5T",
  "https://drive.google.com/uc?export=download&id=1E8ubIHOWL4H_AsFOKr8qG8iMnlNW66rf",
  "https://drive.google.com/uc?export=download&id=1_DImc2E2KBESTnFfxMos9y-7W9A7GgC-",
  "https://drive.google.com/uc?export=download&id=1qaGzgVTzgWBrVGLddZsUMdgJM-305JaX",
  "https://drive.google.com/uc?export=download&id=1ANd_g7jjzCK-sa1KANX9FeBbfzDLz2Tm",
  "https://drive.google.com/uc?export=download&id=1IQXYEhTe_OkD8wZJue7ZEBNUzIvxDvsU",
  "https://drive.google.com/uc?export=download&id=1RBJrtlL6i8qCiGKDvIKoX-vO42DW-tUm",
  "https://drive.google.com/uc?export=download&id=13MDOvWWEbhpIVIDozw9HEzw59tP8JTog",
  "https://drive.google.com/uc?export=download&id=1ehc1yrSP0InBU0oXUprWM-EXTmOgJbLd",
  "https://drive.google.com/uc?export=download&id=1nEDeHAX0erlVe-qYkGybQPSVIF36wPEl",
  "https://drive.google.com/uc?export=download&id=1WThE3pqIyAhZNO1YoIGYTg1AigypgMN7",
  "https://drive.google.com/uc?export=download&id=1Zj6LhaoAKQ6hQH3saPgf8fpSpbWlvjeG",
  "https://drive.google.com/uc?export=download&id=1eRdRfTQ-354RYA8kifEaaJ_xoW5R4qmP",
  "https://drive.google.com/uc?export=download&id=1K9BOi8cK6HQkrmzfCKIc0KA7mXuFyhJt",
  "https://drive.google.com/uc?export=download&id=16DlQBvAByn_QHYrhWZoe4hbfPLdcYuXn",
  "https://drive.google.com/uc?export=download&id=11PNrFxpjRug9xB1d648eVBuswx5Z1ccB",
  "https://drive.google.com/uc?export=download&id=1JumfkeSn4T1WgY8giAfUFoSQhfzXXrvW",
  "https://drive.google.com/uc?export=download&id=1JPidnvNJzHQYIXkADtClZ5HZCVlRfe9c",
  "https://drive.google.com/uc?export=download&id=1mtgbWuXPwEWUJMWQ6fB27kj80Z-QjGUs",
  "https://drive.google.com/uc?export=download&id=1Y4Dt1SB9blRQZn0D4kzK60Yg7GimfGYe",
  "https://drive.google.com/uc?export=download&id=1djmRB3XDfVyLX2cdsGHWVrmcXozoUv44",
  "https://drive.google.com/uc?export=download&id=1PaepX95sfQ7imaN0wlz9Q0EICnTJ_4WG",
];