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

handler.help = ['moona']
handler.tags = ['premium']
handler.command = /^(moona)$/i

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
  "https://drive.google.com/uc?export=download&id=1F711ZoUUXPYoehZJmCQmnmAhlBtlfeI3",
  "https://drive.google.com/uc?export=download&id=1ExdPRv1fPoWGf0n2amQ_HRjiqU5avq5E",
  "https://drive.google.com/uc?export=download&id=1EweNLEcsY3k6J327DN3rJqx32So0fFBY",
  "https://drive.google.com/uc?export=download&id=1EwCCjRBElr5RGbFlBquEXdc7vVQGXz9b",
  "https://drive.google.com/uc?export=download&id=1EvpR-borRM40TaGMnyAtmSRFjMocKG-E",
  "https://drive.google.com/uc?export=download&id=1EvgrJvkDX2ODViDJ0Qjq_HTSlUrt6BE8",
  "https://drive.google.com/uc?export=download&id=1EuYsdn-AX5CHryWkp2_nK7kGe3R-KH59",
  "https://drive.google.com/uc?export=download&id=1En9deq8QoRjyoMmPf3ptcLg-xaW1xsxh",
  "https://drive.google.com/uc?export=download&id=1EmQuEYKyp_j1lRWlzFdx2KAr6xlO4Vac",
  "https://drive.google.com/uc?export=download&id=1ElxM7LYDYBNefpeBWq19qrfi5MVvN2lg",
  "https://drive.google.com/uc?export=download&id=1EkIozHIvQOkMkXb_8hdtB_xqS8uYFucf",
  "https://drive.google.com/uc?export=download&id=1EkIbXpyVTnW84PZpUgHKwT46nmDDop5Z",
  "https://drive.google.com/uc?export=download&id=1EiD6UokSt7NBzxNXJsVrub-z5B0tHrww",
  "https://drive.google.com/uc?export=download&id=1EbYHYIWR3wZRtw4sINyT5P6-EOCvH9Z9",
  "https://drive.google.com/uc?export=download&id=1EVKnC3ZQk9hBmasO6WwTYdRh9SeGf5cu",
  "https://drive.google.com/uc?export=download&id=1ES5LQHDcxaWFv9HJ9jeTZrQ6BvebCEPl",
  "https://drive.google.com/uc?export=download&id=1EPS200-g0PZFnHIBzoCI4zQbBOrPHIgD",
  "https://drive.google.com/uc?export=download&id=1ELAwc7KHSb9P5bkk7uJxXFKomZQO2kRD",
  "https://drive.google.com/uc?export=download&id=1EL0f5AUWCT0tNTcyK35-u-Fa-tf1DF3Z",
  "https://drive.google.com/uc?export=download&id=1EIpHhcuWeUdL2dpGRUU9nNen5oLyOdOV",
  "https://drive.google.com/uc?export=download&id=1EFBJGyGtJTQqiycce1qwojQDWUQfvIMj",
  "https://drive.google.com/uc?export=download&id=1EE68l_6vjXwia_aRJuHlc0ZxLRKVjOAS",
  "https://drive.google.com/uc?export=download&id=1EDNqMHz4q2I_4u5sy9kJjM3pcVLQu_Pk",
  "https://drive.google.com/uc?export=download&id=1EBqXvzmWWFHzfiKedYoGNd5Ql4tW0D8-",
  "https://drive.google.com/uc?export=download&id=1E8luS4TyZRrim7ojVNguN5vsEZa11rds",
  "https://drive.google.com/uc?export=download&id=1E62bm_Wtyb4okhg_A8ljD_nXX6B3A8qN",
  "https://drive.google.com/uc?export=download&id=1E5XGwmaIiV6XejcNNa7YcN1Tq0yiUymc",
  "https://drive.google.com/uc?export=download&id=1E3whSZ6gKI-2_QOjZBUOe_J_me4E3Hoa",
  "https://drive.google.com/uc?export=download&id=1E2y8SpJo9Tpx8l1HETOQQV6kCaoI92gY",
  "https://drive.google.com/uc?export=download&id=1E1uHRe5Ge4LH9wcLrBXc_r0Ro6Z17Z_Z",
  "https://drive.google.com/uc?export=download&id=1DujffsZOkK97ab9J3CA9MFtxwDuuqYMT",
  "https://drive.google.com/uc?export=download&id=1DsM5WCbq2saUU-VBtx_I6WCLedpCc2Ry",
  "https://drive.google.com/uc?export=download&id=1DqQJCeNSrUq4SzluJ2HM6REkg784C9vo",
  "https://drive.google.com/uc?export=download&id=1DmoqYVUMZSh3OiW97Dg_57zL-NWCXeHV",
  "https://drive.google.com/uc?export=download&id=1Dmf-gUSaQZcMF5sTnrup6dQLAwp-i6BM",
  "https://drive.google.com/uc?export=download&id=1DlUwQ51pyWV1_O0F10YxZwa5Ud0OB6S4",
  "https://drive.google.com/uc?export=download&id=1DgSqVZfuyvmjVFI0UIj_9x2NCujjmewE",
  "https://drive.google.com/uc?export=download&id=1DZgfZ54BUlwRvu-luI4eXJn3xuJcZJkV",
  "https://drive.google.com/uc?export=download&id=1DZD5CO-806dBVpDfvcEeKo7h9CMdIPxF",
  "https://drive.google.com/uc?export=download&id=1DYhe9f3yHs1O2uagZLor9bwJdrKDUXbI",
  "https://drive.google.com/uc?export=download&id=1DXb0F8j0ju4d1IpBMiyFEBcKhKRH96fZ",
  "https://drive.google.com/uc?export=download&id=1DX6HaKiV2tB2sQDv8d6OZL7zQHPMrl_k",
  "https://drive.google.com/uc?export=download&id=1DVgdwUMSIg8T9xRr4QvXmzH3akMpk3rs",
  "https://drive.google.com/uc?export=download&id=1DSVNmBDl9_-RwpjkMx3LJj6VVBBimSeB",
  "https://drive.google.com/uc?export=download&id=1DQfx3FWKgCm8NG1TG_8ZtA09q4nIGzvg",
  "https://drive.google.com/uc?export=download&id=1DOFqJn2v7pKmzrZXUDaMpWiH0nTzxOb6",
  "https://drive.google.com/uc?export=download&id=1DKDGv2M5GLNb8-fU0rAleZuyusLNTvrG",
  "https://drive.google.com/uc?export=download&id=1DJdegEjr_3B0ih8iaQjUGvof5Vysomsi",
  "https://drive.google.com/uc?export=download&id=1DBVdKMjmClzx7UTuV7V0CAvZOGtjLOEB",
  "https://drive.google.com/uc?export=download&id=1DAAK44nZ0h2-CoANDx-EY5f9tZkBLjvw",
];