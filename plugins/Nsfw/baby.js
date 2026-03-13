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
          caption: `Nih *${name}* baby cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['baby']
handler.tags = ['premium']
handler.command = /^(baby)$/i

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
  "https://drive.google.com/uc?export=download&id=1W3tRc_SmmNgRhICCweUvn_ERGXGQBKWm",
  "https://drive.google.com/uc?export=download&id=1K_YX_w7h6iyBEtwZYYRAiYiLh-prqiGu",
  "https://drive.google.com/uc?export=download&id=1QqJ72Nwoe3nmt9LEgJwNsNl97t7SYwhd",
  "https://drive.google.com/uc?export=download&id=1zm3pYIvR9b9WI2raQVEV0yoytFUr5rix",
  "https://drive.google.com/uc?export=download&id=1E6_W7YaA5rcviGJZOZeI0K_qwUInobf9",
  "https://drive.google.com/uc?export=download&id=1hy9jm--fQ36lJrZ6ZUcimamgMb8CIx77",
  "https://drive.google.com/uc?export=download&id=1EJbyNz1VcHYLZMTKJx1ngYv03PQIqmIH",
  "https://drive.google.com/uc?export=download&id=1SS6dqu8qVPgvZWONZp_0Whjv99TB_7LX",
  "https://drive.google.com/uc?export=download&id=1sRpYcA1Np2RHhB0grX2zpTSavo1eEeiP",
  "https://drive.google.com/uc?export=download&id=1V96mE9CCaPAtSfPsjl4VLMTiwEo4MNI3",
  "https://drive.google.com/uc?export=download&id=1T-UohYP29T9gRrLjn0rZ5misMxcmmrQ-",
  "https://drive.google.com/uc?export=download&id=1jvGHVUDhaMIscKSp-KZooxljT8gg6Ci9",
  "https://drive.google.com/uc?export=download&id=1t6bso9LQpJDgr8Y9p7aHnCi0hCm8sS66",
  "https://drive.google.com/uc?export=download&id=1cSevDLFMdAhGNwQH0u6pMAR-9xxbPcB8",
  "https://drive.google.com/uc?export=download&id=1foV9jupD11ZXo-vhHr3-eoi5RWlwTiV6",
  "https://drive.google.com/uc?export=download&id=1pNZZfn8ikQ3_Kg-ACzN15M2rWJnwNiAe",
  "https://drive.google.com/uc?export=download&id=1-1I3lvQrNcTIGnCP2XUNnbXQ6i8cXqh7",
  "https://drive.google.com/uc?export=download&id=1nB2tA2pkSg-9JxyQ2kQVXGKdFua056sN",
  "https://drive.google.com/uc?export=download&id=14e1bOzRC_pRZGzRC-7ra07r6TQ0MQ4Nu",
  "https://drive.google.com/uc?export=download&id=13PlvSEUL0WLG0EFbSXn4-dLputa0qRZR",
  "https://drive.google.com/uc?export=download&id=187q_7c6itLaqwbQxQDML0GPApGic17U3",
  "https://drive.google.com/uc?export=download&id=1iaKVt7_BI-aWR0yH5ifNtmmIuj9lem-n",
  "https://drive.google.com/uc?export=download&id=19XmGWzaopCiYD75_z3xS2m3p_ESKo-bP",
  "https://drive.google.com/uc?export=download&id=1DFZqYmnv5bisMwVMcbMSKq0nw0Dp1XBl",
  "https://drive.google.com/uc?export=download&id=1LSwfGv3WT29tbE2jMZZ3UTQpeXbhcXbK",
  "https://drive.google.com/uc?export=download&id=1XPYoHQNgyxqpLIPmfClPZWjBjnjvQCWo",
  "https://drive.google.com/uc?export=download&id=10eid0_g1FqpySiWlppXq7IAjCfhref9h",
  "https://drive.google.com/uc?export=download&id=1codQQw6BstGX3diaxIRjceQ-5gD-XE37",
  "https://drive.google.com/uc?export=download&id=1A5Jv1cHKTyJ9Lrdi7cMot67YLEqs59UX",
  "https://drive.google.com/uc?export=download&id=1yBVvQHScWDTu2DKn4aDIm5louZdwB1_Y",
  "https://drive.google.com/uc?export=download&id=1uzUejYpmrYn5TjuSwYQkhewNjTuukrr9",
  "https://drive.google.com/uc?export=download&id=1bD5u8ZEWCK75U_9YryQcivtB4BNjF68C",
  "https://drive.google.com/uc?export=download&id=1_62weDQYzZhkKL4i6E1bniluZOPf2f2U",
  "https://drive.google.com/uc?export=download&id=1k4lIeM3TtLxFCNFYokekXQKdJFJK0RoP",
  "https://drive.google.com/uc?export=download&id=1PLaYnhFwmHXaNQdW2GsfUXv9CJP8bBzW",
  "https://drive.google.com/uc?export=download&id=1JXKL6uWM8V-MvV0CepYxAHCQ7iIFd6vt",
  "https://drive.google.com/uc?export=download&id=1ecdegej87TEkMD9ggn0XCe-qSp5yHQ6A",
  "https://drive.google.com/uc?export=download&id=1lWuGtkIFPLLUHwELKAj7x1CV5Z5l_e2y",
  "https://drive.google.com/uc?export=download&id=1TsdYZXSpCjWQ_P_692HpXBKAvLNRe8vO",
  "https://drive.google.com/uc?export=download&id=1rj7F69ZS_5RNt_6XMqR0YkX9JZQxPUaV",
  "https://drive.google.com/uc?export=download&id=1WmoUeJoaxbUNjGjDrhfiH6ppKGSgssKl",
  "https://drive.google.com/uc?export=download&id=1ulWPi5owxi3v6xFQTySOXEC9nN7bVPw3",
  "https://drive.google.com/uc?export=download&id=13R8Qqd9AeGLMP5lT3fPbdeomoz-91MGq",
  "https://drive.google.com/uc?export=download&id=1UCjfULFLyBuyhWX4KgmMTF47w1IX5CmQ",
  "https://drive.google.com/uc?export=download&id=1vOA0SoD43jUjRxNasYjzo8pN3UYolbUZ",
  "https://drive.google.com/uc?export=download&id=1NlYwPJEfYYOBbUIKKqNR4NkRiY0xNA4V",
  "https://drive.google.com/uc?export=download&id=18_EufIFQEArdZwvcbw2TPgt2sKRKJ98K",
  "https://drive.google.com/uc?export=download&id=1xakBOjD4teVq5qXLo3WtAnC8PPOTCRdl",
  "https://drive.google.com/uc?export=download&id=1utObkn4SMfjjMOkikdggbE3tDumqnF_p",
  "https://drive.google.com/uc?export=download&id=1BIKbn02ERYTLItgjwk2TbC2_4V5zd_g9",
  "https://drive.google.com/uc?export=download&id=1zXGSsSSDPSX_rVoByj2g3esfsQDxOLaq",
  "https://drive.google.com/uc?export=download&id=1paPGZi7OmBJ1Z2wTq5szMNMIykTasIL5",
  "https://drive.google.com/uc?export=download&id=1_q2ApPHlsm85sBKA_bbVaL4RB9cF0-FL",
  "https://drive.google.com/uc?export=download&id=1ZniW98rGXu_wEpMoT87g8T_wgaFiZEBb",
  "https://drive.google.com/uc?export=download&id=1xfBA9PmSJm7gsAzsGDG-0rqPnbYGRzIH",
  "https://drive.google.com/uc?export=download&id=1ZPTwCZ86f6Ngtb7gHQwww-rATIVCIcm-",
  "https://drive.google.com/uc?export=download&id=1FeyrEYk0padF3pq_SEd4dJpfVaOXyWUS",
  "https://drive.google.com/uc?export=download&id=1TFORW1-RwZcahRgN9n1OKaCjrsnRzirS",
  "https://drive.google.com/uc?export=download&id=1_9R_KnS3BHnljFYq1SLBjHOqslK0oXuv",
  "https://drive.google.com/uc?export=download&id=1rtZ1IDJwCXiz0ZkVekjQQEdOXkxCUrYu",
  "https://drive.google.com/uc?export=download&id=1SBK91CWmrGISDc9s7tCTresyTOs-6uVt",
];