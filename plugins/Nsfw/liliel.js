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
          caption: `Nih *${name}* liliel cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['liliel']
handler.tags = ['premium']
handler.command = /^(liliel)$/i

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
  "https://drive.google.com/uc?export=download&id=1Qpp_Hd_reKtF4U9rcnU2foYePAgoNM0d",
  "https://drive.google.com/uc?export=download&id=1R0ZbraEjgXupfWMVFHtJyu7ouYFvX5Q5",
  "https://drive.google.com/uc?export=download&id=1jqWsYWDICmtcthVjN4hL6Yc2mCCo7nhc",
  "https://drive.google.com/uc?export=download&id=1PmurxaqgPgeNr0tDubPYKT7uYBLXSvGz",
  "https://drive.google.com/uc?export=download&id=1b87TPwmRJCa1oZbrB-N6EpZxckzXqhoL",
  "https://drive.google.com/uc?export=download&id=10kSZsTAqkP7_NuWAonLx9oACx8UK_nYV",
  "https://drive.google.com/uc?export=download&id=10PTpf4Gi7wH-HzqLzrFKon4xMZfZpv75",
  "https://drive.google.com/uc?export=download&id=1dMrNGsVFQ9abGiB800ff32hMwK7SQOHf",
  "https://drive.google.com/uc?export=download&id=1-gykECKPFNdggp6Jl7P4Mh_l7tNY0XnN",
  "https://drive.google.com/uc?export=download&id=11KnmTCaSDXio6jnBeOZ9MNOLyHpMjsca",
  "https://drive.google.com/uc?export=download&id=1x5n-cIpUf4OBjsiele4FA1s8EdSNszMK",
  "https://drive.google.com/uc?export=download&id=1yie9Sr-WXoXDlAwYVdYLQ9Xrrw9I_b4j",
  "https://drive.google.com/uc?export=download&id=1YSA_uf3fi4P_FpodGws6wXPaUOgqZnpf",
  "https://drive.google.com/uc?export=download&id=1kHvCfH82k0ln0HyvrO_jRnBXcgaRA5KE",
  "https://drive.google.com/uc?export=download&id=1yeAblvQ0hGsb-YVwoyxXRuoLYLnd4fgl",
  "https://drive.google.com/uc?export=download&id=1Vv_nxutvqskYUSMITolUj0GQe4dz7UF9",
  "https://drive.google.com/uc?export=download&id=1mRDbKG9LPIfF5uKHmlHa85-gyfXCNVs_",
  "https://drive.google.com/uc?export=download&id=1tRE9D2ZAtGYo_02TQkksZu34mTIn28Dy",
  "https://drive.google.com/uc?export=download&id=1pIqWivMnB3d5-jzcnuqIn1_gfLNfrs7h",
  "https://drive.google.com/uc?export=download&id=1zRHCknM_voOzqQT8zQ6CyyXNb9UZYQjm",
  "https://drive.google.com/uc?export=download&id=1RDgA0D7v4mOvBMHRcaBvgaQXUg7QdMRd",
  "https://drive.google.com/uc?export=download&id=1m0mo_XENBUner7aEwqIbYqv1JU27KPPA",
  "https://drive.google.com/uc?export=download&id=1OGaaRN6O7qSCLdRfR5uJrBi6c_fed_L7",
  "https://drive.google.com/uc?export=download&id=1xrfi_YECBgcE8EIrF_fD_75Pd-bQEHC2",
  "https://drive.google.com/uc?export=download&id=18eI7Lbp8wA2E-GyC8mrwtIxYv3JU613b",
  "https://drive.google.com/uc?export=download&id=1XzoNoh0LVnUsCWvxpfNVZMEPCb-6dprj",
  "https://drive.google.com/uc?export=download&id=1V_lFiFLBeHZiljF3jeevXhR_Gz2MlPzI",
  "https://drive.google.com/uc?export=download&id=1dG8aBvjltrDsAeYdEofl426DDqZudYSt",
  "https://drive.google.com/uc?export=download&id=1Odt4oysqBvy3KPxiNwgzsZZJH5lWgdHw",
  "https://drive.google.com/uc?export=download&id=1DzDQ3IfNJ90SKZdM7S1N-LoM8dHa0B1P",
  "https://drive.google.com/uc?export=download&id=15E5_75Nj3XQBk0tCYkOCWarkl4NVNVqY",
  "https://drive.google.com/uc?export=download&id=1-TTqgq44JOkJjdSpQTVr647OefuChL9i",
  "https://drive.google.com/uc?export=download&id=1KO8KTh5VY5wMlpOMN0YCT-7aHMAJT8bU",
  "https://drive.google.com/uc?export=download&id=1CDSfkQHKI8PxogJramdA9KwQehjFJWZT",
  "https://drive.google.com/uc?export=download&id=1Qx8vWcX_cZGtieuN4qhZWtuO9sfzwLl0",
  "https://drive.google.com/uc?export=download&id=1c5Ey9PDDD8VztPHySRI0qXhwM2qjpZbs",
  "https://drive.google.com/uc?export=download&id=1DC9ZIaeANisikufSSi8daZvZuP48ZHj6",
  "https://drive.google.com/uc?export=download&id=1vQ42ZYVw4TYP77EUg4DEZE7t0SumD5_A",
  "https://drive.google.com/uc?export=download&id=1kBMik8bttXN9NdMB9wFKCagkaHo29sZ2",
  "https://drive.google.com/uc?export=download&id=1rmWTjObK6HlVqfahXzkPp0jPcAGYbDkV",
  "https://drive.google.com/uc?export=download&id=1PPa9oMGNirnUVVBw5Vl5hphMkEcjLLWg",
  "https://drive.google.com/uc?export=download&id=1Tm5OpfMhb-K9S_abZ-927Ny819DWCrTW",
  "https://drive.google.com/uc?export=download&id=1ElkLJW7IgIRS2nMMG7E7VFEkxqJMVAk3",
  "https://drive.google.com/uc?export=download&id=13f_k_vq1gUcIMXLn7MW0cyNqj00ptm_N",
  "https://drive.google.com/uc?export=download&id=1kFi5ayNsYbbbATbVQ_fM-e7rg6HgET4b",
  "https://drive.google.com/uc?export=download&id=137rxIYaDbBVusSphp3EobGXvdqJNyTm6",
  "https://drive.google.com/uc?export=download&id=1Lgl0XKrEdTgI6slZdfWh2m4aOTyrnbA0",
  "https://drive.google.com/uc?export=download&id=1SIAogytnOSab00JjGF4EMEHBbsyhduxY",
  "https://drive.google.com/uc?export=download&id=1n0g1fRB-5kOQ-4YaXfvsEsJTbZoLK2lm",
  "https://drive.google.com/uc?export=download&id=1JB23l5LruITPzT3koqlJODWrXWyGoRSn",
  "https://drive.google.com/uc?export=download&id=1bPlK2zQsLabJmRWvqqJrIPuMrmmhpT33",
  "https://drive.google.com/uc?export=download&id=1z8X4EBwV2yIbnGzOnDZu7LmIC4eOVWu2",
  "https://drive.google.com/uc?export=download&id=1l5EioRfDIIrbLufZdovjN72ifsSXPZ70",
  "https://drive.google.com/uc?export=download&id=1F5B-Msw9kUyYchwC3TzcAT347lTxrxSE",
  "https://drive.google.com/uc?export=download&id=1yZUzgWZlP6If6UvZG0EmSR7BlfYSXMQn",
  "https://drive.google.com/uc?export=download&id=1VCRObMZU09cTjbcj2vCMPqsqgSv60qtL",
  "https://drive.google.com/uc?export=download&id=1qUdTHglQgcp3Gx7aAMpJRyvbFKiw9ucz",
];