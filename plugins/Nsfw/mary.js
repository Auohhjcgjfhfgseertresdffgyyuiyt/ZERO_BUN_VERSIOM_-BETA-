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
          caption: `Nih *${name}* mary cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['mary']
handler.tags = ['premium']
handler.command = /^(mary)$/i

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
  "https://drive.google.com/uc?export=download&id=1iKl4OVpFck_k82_TCIOjfJKOxIjPG6AB",
  "https://drive.google.com/uc?export=download&id=1kX59cgPBx7cXpgnkykT7MIMABxnifgWc",
  "https://drive.google.com/uc?export=download&id=1zHkZCg8WI2c9bLlrcChLmMbnjcbgAx-e",
  "https://drive.google.com/uc?export=download&id=1NPWLRlean79neBWpygiUfvWPe7qWBpFi",
  "https://drive.google.com/uc?export=download&id=1FnNlS8HhbxupyDSA7eVzooJxropbqgQb",
  "https://drive.google.com/uc?export=download&id=1yn8VPp4PJ7ugpOAnI0aI4szPFS9zOkqb",
  "https://drive.google.com/uc?export=download&id=1wUGHXmrNgvMFzRTg_PkDctdafk0nmqoe",
  "https://drive.google.com/uc?export=download&id=1EsZ-IJDQNt32Tlk1K4rg1Bj35_CH2uA2",
  "https://drive.google.com/uc?export=download&id=1X3YawiEK219RYXKE-Gf9KoJNqTUXaaLY",
  "https://drive.google.com/uc?export=download&id=1PGnZQEcdeziLbMqTyFKkbCJQRpYlJNEk",
  "https://drive.google.com/uc?export=download&id=1yVliHYOIjFKZmHentgfCj1fP-V2UU2i4",
  "https://drive.google.com/uc?export=download&id=1ubhtCH38G88LPP2Z0vULMOeu902i7XVE",
  "https://drive.google.com/uc?export=download&id=18JVzEAsLB84WW53KqYJsld0ENJaIzwYh",
  "https://drive.google.com/uc?export=download&id=1HT3yv5TxUykqIOC9x3q5seQoNclFrDoT",
  "https://drive.google.com/uc?export=download&id=18kSytIBg_s8bwtKnh1NxF4pOnK2b8r7r",
  "https://drive.google.com/uc?export=download&id=1M6V9_9eYa27JWCoXFQO6f_n6C3ZKXEaR",
  "https://drive.google.com/uc?export=download&id=1vz7i3GssWxX-quQ2jmhICTwPMxpX8VCw",
  "https://drive.google.com/uc?export=download&id=1IqY7vUb959ywMBhUIUDHv7vexZkHrkb3",
  "https://drive.google.com/uc?export=download&id=153PY_V_3DQ_-aj2BcUgNTamOfTYGSrri",
  "https://drive.google.com/uc?export=download&id=1o5RkYdmqSaCYcLqGsQme9dsX0QOeuTCK",
  "https://drive.google.com/uc?export=download&id=14NicWkC8FcRHlbTpJ4pcdfg84HJrnqF0",
  "https://drive.google.com/uc?export=download&id=11bEdSuHwvow8JTlEVMxfi385BhqVj7he",
  "https://drive.google.com/uc?export=download&id=15sdmcdvRtHzqkVZrjQnrjmenFj8DEQ-N",
  "https://drive.google.com/uc?export=download&id=1q3AUqvi8WvAgbqr2T2pgWxVUtpPNL0Fr",
  "https://drive.google.com/uc?export=download&id=1XWaOJIaHpBpm7ciYZCmEaDhgyykvhuqa",
  "https://drive.google.com/uc?export=download&id=1ynYeDPThumEINvinDcl1rR0iThvRwpQN",
  "https://drive.google.com/uc?export=download&id=1ZAbSDVoZjlf1wT7AYZyhEfRNLPdrEhCN",
  "https://drive.google.com/uc?export=download&id=1xJB2LzlSoSNlXAn_URC2J06vO7_bcSAb",
  "https://drive.google.com/uc?export=download&id=1Mf5Nh8QzXLLBO1o2_RiV6iAsxPobThnv",
  "https://drive.google.com/uc?export=download&id=1OvpJKTNlfpzeGk-pJx74sZfQ9XsONVER",
  "https://drive.google.com/uc?export=download&id=1fSlqfMWCi-YZMX-0PQkTG8AJ4cCaFgcX",
  "https://drive.google.com/uc?export=download&id=1GadUQCBayrLNb8jmHSPV1tGhandFenNy",
  "https://drive.google.com/uc?export=download&id=1M6MHGdSXL69sHJsC1BN1EOz86igo9u-v",
  "https://drive.google.com/uc?export=download&id=1djOTI2GFCLVDyU7bhFKO8PQN3s4bLQTB",
  "https://drive.google.com/uc?export=download&id=11s8fxJxEDOVFn4ogfQWf5aIUsGBdgmdV",
  "https://drive.google.com/uc?export=download&id=11jsNzM6obJlwQf77b-r_h8LbHG8Q0w5g",
  "https://drive.google.com/uc?export=download&id=1bdGzIGNsxUbMTnZHTbUtC8WLjDB_rxPe",
  "https://drive.google.com/uc?export=download&id=1TS0nb9M77jfZRKfz8u7lyLPIpuT7aiaF",
  "https://drive.google.com/uc?export=download&id=1c3e73537Q9U5AlMvrIqQcdSp39hQAQoN",
  "https://drive.google.com/uc?export=download&id=163q1Y3CTwdXRGygsvImYJ_CBFs1cF2ST",
  "https://drive.google.com/uc?export=download&id=1PeJAJJLrIOW6fNYKudGWvmzqbGyh2hmA",
  "https://drive.google.com/uc?export=download&id=1lY6JpRklOtDME5GtE91wFGiuMwC2qEmU",
  "https://drive.google.com/uc?export=download&id=1TGlzoKXdhf4YaIOiG6WqWBLYZcgFe1x5",
  "https://drive.google.com/uc?export=download&id=1ZrOEfTrvOtwWY3HM6Fj7cY54jOK0sng3",
  "https://drive.google.com/uc?export=download&id=1CT9XPxu9HNnvMiOsI0ryE5zq_fzpqvdo",
  "https://drive.google.com/uc?export=download&id=1ZASGlN_Q3Vza70tD6YIfoE8_zs8AnLH_",
  "https://drive.google.com/uc?export=download&id=18OoroojBQ5EzuuLQWFtLfpRiNAZlnu0W",
  "https://drive.google.com/uc?export=download&id=1cMyuwOZbyunIVgcSwjl_NmIY5J_exeQi",
  "https://drive.google.com/uc?export=download&id=19tQL4tObzbcuYIGFI7u2Da5ltGRa1fRS",
  "https://drive.google.com/uc?export=download&id=1fRTyipR6U_hW4Zkksraj0hgRDV4ItLHP",
  "https://drive.google.com/uc?export=download&id=1cmvd0mg1FkQ-4erKlT5fm6k8AjJRfLcy",
  "https://drive.google.com/uc?export=download&id=14vQEYqieBVVF71hWvb8hRts8_p51Vkad",
  "https://drive.google.com/uc?export=download&id=1ZAxpuMZYDxxUrEcGQ_tfyks9Q1997sfz",
  "https://drive.google.com/uc?export=download&id=1OwDMGM-pc_2Rn7OknpdwlhpEb1oFMycx",
  "https://drive.google.com/uc?export=download&id=1UYJTlFETbesePxwhb_78FU2LU7BMvBDL",
  "https://drive.google.com/uc?export=download&id=1GfPjaQ_z0Irj0PmlJipwCvwf-KU-KOiV",
  "https://drive.google.com/uc?export=download&id=19DMADaxHkxHe8fwHqC7m8jlAtnyLt_s3",
  "https://drive.google.com/uc?export=download&id=1hQOz7QhW0zoZS9QjCVaHarcgDW7BIYEA",
  "https://drive.google.com/uc?export=download&id=15cT_radFpNW2VGpNZl3kj82UjqX-fDVU",
  "https://drive.google.com/uc?export=download&id=1yKAQ70yeyHulnJW6EVN0XT6tAgOInWLm",
  "https://drive.google.com/uc?export=download&id=1NsB04fDCVluH7SJLI2jx26e0DT3fhB3l",
  "https://drive.google.com/uc?export=download&id=1U6DxTngeikXC9Q4aFnnx8wPpn4jA3kZs",
  "https://drive.google.com/uc?export=download&id=1LpU3Ed9W8Sqc-sJmAU9ZWXJG31FJ9H7E",
  "https://drive.google.com/uc?export=download&id=1fbVzHvBiwmwr0_z372jKBV6sH7QONKcp",
  "https://drive.google.com/uc?export=download&id=1pJGKrWmjDMvn2z6WXGlZQgwKL5bPyCqO",
  "https://drive.google.com/uc?export=download&id=1Bxa1bM8rTSusb5kcgvgcIzIwXJfEVnK0",
  "https://drive.google.com/uc?export=download&id=1YQ6nsxgh7Oa3qh8HF00fT-Z9qHIO_wgk",
  "https://drive.google.com/uc?export=download&id=1AKm_Gu-g2DeZVR6xc7gUJa2Hy6QyXTvB",
  "https://drive.google.com/uc?export=download&id=1oN6kx6ChLcBSPaT9itZehAz7ygAjUEej",
  "https://drive.google.com/uc?export=download&id=1NaFON0LkEW2HkdMDRuanOmpq0EC1PZjn",
  "https://drive.google.com/uc?export=download&id=1pEYYklgenVaLxSBTqRjlZINfvR8oqZSB",
  "https://drive.google.com/uc?export=download&id=1qGvz4vK9a5_URaFoGpcbwGHTQN0lexQs",
  "https://drive.google.com/uc?export=download&id=1W7H3YSVdUQwSDQ5JqmZwIusJhooF-BLH",
  "https://drive.google.com/uc?export=download&id=1QNRCCOZjEFuWxK1hcX4O8ekmY8Sch2gh",
  "https://drive.google.com/uc?export=download&id=1sWV4AWxZIOyNx23hAbMheHf3wFKJB5_C",
  "https://drive.google.com/uc?export=download&id=1dl8l1zbkfibyaLwiHgIH4rP4-FwDjQfF",
  "https://drive.google.com/uc?export=download&id=181aSab-10WkzIPa2KwOBfQ1VyEFTBPMZ",
  "https://drive.google.com/uc?export=download&id=1lBQzYvI42RJ9I8asJn8YNwBabsE2ri0Y",
  "https://drive.google.com/uc?export=download&id=1w7wOmlu6B4SygDTE54_xOt0wtLzLO02_",
  "https://drive.google.com/uc?export=download&id=1tPTES0i7yVwJIK3HATH_2GMyomYu0ZC8",
  "https://drive.google.com/uc?export=download&id=1on_O9Zq_19JGbD0kUj3vN1CTaPH9D_-c",
];