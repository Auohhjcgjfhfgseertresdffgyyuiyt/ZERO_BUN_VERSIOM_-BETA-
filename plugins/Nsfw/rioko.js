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
          caption: `Nih *${name}* rioko cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['rioko']
handler.tags = ['premium']
handler.command = /^(rioko)$/i

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
  "https://drive.google.com/uc?export=download&id=1Lr5vXQGt1jFnD6IALpVvK_22To-a7x7Z",
  "https://drive.google.com/uc?export=download&id=1hSi9vNJQ0a3G1oZxMSgteFUKFAH5_W7e",
  "https://drive.google.com/uc?export=download&id=1h0V25zVuoH5wBdGTWMir8X6M-NTr67fH",
  "https://drive.google.com/uc?export=download&id=1H-H3Vca7faq8ybfAyNpqAHOn2lI3y3IF",
  "https://drive.google.com/uc?export=download&id=1HxHhj05anAd3-39PNYsoZYZmwTZtGwXf",
  "https://drive.google.com/uc?export=download&id=11lOQszG-Pdmyj5FX4FypG9qE1fNaKI8G",
  "https://drive.google.com/uc?export=download&id=1Sd7KgYCSk9j5dtm-Xxl5irzuglGWTLjG",
  "https://drive.google.com/uc?export=download&id=18FIa95Qt-g8EbnvLMjcTT5ek3cq25xo-",
  "https://drive.google.com/uc?export=download&id=1jXXJA8yhlh_p75TSfU3-BlwIY320KV3a",
  "https://drive.google.com/uc?export=download&id=1M0yjgxbfPwQ7tepnxqk4PqIXUu9p0THT",
  "https://drive.google.com/uc?export=download&id=1t0tqIyuZ5OTx0jDnYhLWhyy8d-CQqcVT",
  "https://drive.google.com/uc?export=download&id=12ts41FSH5KjNZdvvWniToIBtVVAZU4RA",
  "https://drive.google.com/uc?export=download&id=1BUfM2prXX2UGyoXtXVQ3JO0xlSQ0_wul",
  "https://drive.google.com/uc?export=download&id=1iym2j6zmQrtmBsEFFMieJbXjufUULBQt",
  "https://drive.google.com/uc?export=download&id=1rJTRI_lY4aTE7_czL7nffU6YPHVEJCIo",
  "https://drive.google.com/uc?export=download&id=1Oe4T4S_IiZwwkQP7_DYOnkVaxSCQhNQg",
  "https://drive.google.com/uc?export=download&id=1wk653_s9rq9umiPh6KacO6B3KQ4nwnLK",
  "https://drive.google.com/uc?export=download&id=1y_xJdbBASlh7r_qbiA5t8ZG5rXfd7DYQ",
  "https://drive.google.com/uc?export=download&id=1HupuknxwZHuNCnBQLfoCplsaVAsQ7pTM",
  "https://drive.google.com/uc?export=download&id=1erIC4Vu-iGNYiZxEn-ZvTZeMF-C0Sppz",
  "https://drive.google.com/uc?export=download&id=1UAHaQSQFfWIWGM3ULWlQjIA5b1i6snpL",
  "https://drive.google.com/uc?export=download&id=1xzBDROdNEVEAzuTQ3viN2V0tp2f7e8XP",
  "https://drive.google.com/uc?export=download&id=1kg7Pysd7RL3pcSDsk5xflRP3RCD1Doe3",
  "https://drive.google.com/uc?export=download&id=1UqBvfrQmI6c4CJ2wxMT0e-C_iZ1ESvh_",
  "https://drive.google.com/uc?export=download&id=12PsR2fGzmHSj4SmfXjIEUF3wpxHtY5aY",
  "https://drive.google.com/uc?export=download&id=1IarlVIeCWLVbAuNdKgE2b_584Xq7Qt7e",
  "https://drive.google.com/uc?export=download&id=1YJur-LeAgKHquSos4YLmg_y7BRNHebs8",
  "https://drive.google.com/uc?export=download&id=12WJVr8tSFAU5tS7RCUDOya4CQTlB06BH",
  "https://drive.google.com/uc?export=download&id=1Lh768WcC085bOMZ48PWH3kUHFAYP8hOR",
  "https://drive.google.com/uc?export=download&id=1d3ApA3Xo3EqufZhl8_EHdV31H0XqxgYR",
  "https://drive.google.com/uc?export=download&id=1K06YNjyrbhcUXiD-CkgKpXBAHf0CQV_Y",
  "https://drive.google.com/uc?export=download&id=1p56zRlaCJkvCV1hkszUodmo4JyfE0yir",
  "https://drive.google.com/uc?export=download&id=1WwbfkMtKXDW9PooeyKw1j-c80e73LLD_",
  "https://drive.google.com/uc?export=download&id=1ZTvL9so6yOwkTtWiFwNr97KU6-Do3Qxo",
  "https://drive.google.com/uc?export=download&id=1oV5QJatsdUgrLNtwWByDcopNpo_NWALH",
  "https://drive.google.com/uc?export=download&id=1ZhW9yxTNzxI4vBhjhEdm1P_wrkkxUobp",
  "https://drive.google.com/uc?export=download&id=1mOSAlJhqk1oeKyItal-zGFvKyj2FauIR",
  "https://drive.google.com/uc?export=download&id=131aBGlen6uAZjzXuEjYeCwr4GZa3GclE",
  "https://drive.google.com/uc?export=download&id=1FXbLzI8C0xvX0bV36HvlV6S20g_XXS3q",
  "https://drive.google.com/uc?export=download&id=15NyXHCHVCSyLaWiUDojzeFGwLKzHssyJ",
  "https://drive.google.com/uc?export=download&id=1zJc5DddW2eZtWt-y4yRlznFQPmCHL4tY",
  "https://drive.google.com/uc?export=download&id=1G0BqDeheW6CaeZCyI89DjwxAbQkHxG9_",
  "https://drive.google.com/uc?export=download&id=1l3PZ33p579iU_R1dl1vGrfxMqYqN5UZP",
  "https://drive.google.com/uc?export=download&id=1lV9uw-65bewhZK-1jWo9-JLnL9zE5ZSe",
  "https://drive.google.com/uc?export=download&id=1GavRPMG55biTLXOB4TyAv9tdXJfR3JfM",
  "https://drive.google.com/uc?export=download&id=1AZEPVEKw3kCvrODiFaqzDh5FJ1BFquSi",
  "https://drive.google.com/uc?export=download&id=12nj96aSfULl-PW-peVryd7_g8qCJpDts",
  "https://drive.google.com/uc?export=download&id=15QLhbeS8a0glUX9JdsxuQvD9syp2eLK2",
  "https://drive.google.com/uc?export=download&id=14VTKZz0AC3YHg3lgKj3noNE77qStEUBi",
  "https://drive.google.com/uc?export=download&id=1r3EtDk441acneQc8LhYXlqJ4YKVPD-Zn",
];