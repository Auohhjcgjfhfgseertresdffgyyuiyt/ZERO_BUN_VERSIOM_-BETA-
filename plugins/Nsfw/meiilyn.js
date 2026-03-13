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
          caption: `Nih *${name}* meiilyn cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['meiilyn']
handler.tags = ['premium']
handler.command = /^(meiilyn)$/i

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
  "https://drive.google.com/uc?export=download&id=1V74am1taw-qPCi8EvBZUc7N5UVF9Jmej",
  "https://drive.google.com/uc?export=download&id=1JdkzuBgqHx7ONJ-OLtTBuLEWiQWHpNUZ",
  "https://drive.google.com/uc?export=download&id=1jl1ccAe0kBjZrii3ABzXUsg5kWW0A8hc",
  "https://drive.google.com/uc?export=download&id=1CLleNOSggXV9mndLChyZAmXq0isGLFZ0",
  "https://drive.google.com/uc?export=download&id=10OuOH-PBOSC7faGiRQX1YiHJCs_dFEbW",
  "https://drive.google.com/uc?export=download&id=1ebBdrAysdZxOHnVouHx5T9kHJAFtifiZ",
  "https://drive.google.com/uc?export=download&id=1wB9AKODgLInp4t4zVfoggUkeOVx93n88",
  "https://drive.google.com/uc?export=download&id=12Tv5a2ZHBKbPHV5NNx-jzwEQhCSR00k7",
  "https://drive.google.com/uc?export=download&id=1bHmOZ5kWdfYpnW8xGaA6A8L7_cL36PGm",
  "https://drive.google.com/uc?export=download&id=1AQG-wW952vkEN5mQXcLvWS2guy-OM-gf",
  "https://drive.google.com/uc?export=download&id=1kmakyYN4zlM5QT-7dCqSq-n2MKIM03DQ",
  "https://drive.google.com/uc?export=download&id=1DweiE0kUcmIaYFA4MiMFLklBaU8xkpg0",
  "https://drive.google.com/uc?export=download&id=1gQZdFWBDUVGxOnZ1hWTVlVHNODweaX_-",
  "https://drive.google.com/uc?export=download&id=1wrs9SbpRAZwZGr_H-BwINg2NwcbIsTvr",
  "https://drive.google.com/uc?export=download&id=1XZjN9nvJd0I5PEQ39Dt564X4U5lprka_",
  "https://drive.google.com/uc?export=download&id=16BUPX9Cqyr_sec1QKfLaAe8463Hf6FM2",
  "https://drive.google.com/uc?export=download&id=1rHnPYrclj804JZrcxhX5sGSwF6LO_bH1",
  "https://drive.google.com/uc?export=download&id=13aLXP-8HyTx7-IUHtjrMsitRDkCBAtQg",
  "https://drive.google.com/uc?export=download&id=1w7iCJgNj4bfk-0NWgD_Iprh6kA_2sYjq",
  "https://drive.google.com/uc?export=download&id=1AhqHqR6ig7Omb24KvBlt6n0pRJ0VgHDw",
  "https://drive.google.com/uc?export=download&id=1nGh6H0gPf3zyE6P4jUUWkx4Icksyyp5R",
  "https://drive.google.com/uc?export=download&id=16G_nmF6Z1jkAVHvbFevA-2EBIOnf-ewE",
  "https://drive.google.com/uc?export=download&id=1i7K642xAFfUxTAG525yjDgUcg5ep-sMv",
  "https://drive.google.com/uc?export=download&id=1milwZC-xUWdkpIJjJL98vGaiiBzVtAgO",
  "https://drive.google.com/uc?export=download&id=1S7WHeURUHYg2Q9Minl5WS_vKRaIrBsXY",
  "https://drive.google.com/uc?export=download&id=1_rjO6ttc8T21YuSp7aCxPj9bO1SCzz0Z",
  "https://drive.google.com/uc?export=download&id=1T5PGkfY6mHklzpIkJkh4OmqJV1495epm",
  "https://drive.google.com/uc?export=download&id=1L5ICLugmnAVXuAgynUTPvBF45gKgAZLc",
  "https://drive.google.com/uc?export=download&id=1Mks0VKoAyB0SHziswYr_pJ--ecR5e7_d",
  "https://drive.google.com/uc?export=download&id=1sdUsSUUeoXpT9iguyhVzKUqqmpEkO-UU",
  "https://drive.google.com/uc?export=download&id=1FSkdFFDHErWtGDm1VgVGUlOwv5iuKVOk",
  "https://drive.google.com/uc?export=download&id=1VFuPWG5ay49M4kXvmP2AcLiNQenz8424",
  "https://drive.google.com/uc?export=download&id=1DPUtUFQPcr1miPSvPMwxJM0uCa3xlEDD",
  "https://drive.google.com/uc?export=download&id=1B31gjHbJViOvBuVx8-xCV_ipdHyIh4l-",
  "https://drive.google.com/uc?export=download&id=1_QIhyyehjLDNrLrGA5Qx-NMOeQ1fQnr1",
  "https://drive.google.com/uc?export=download&id=1yezhK2Gz6Jv-bM2YHXG0y_f1-mB0JvVQ",
  "https://drive.google.com/uc?export=download&id=1Hg5fSJ2uov6QZdMV_ua8RzgsoOcXE2AB",
  "https://drive.google.com/uc?export=download&id=1CrYfHXXfL2wyjHOHEz4S5txTHeQKxS_t",
  "https://drive.google.com/uc?export=download&id=1nNuHA0Pk2OyVLRQseDd6YBDq00SLI910",
  "https://drive.google.com/uc?export=download&id=152Wa0OnQHTfC9dKrkvHun1wFbVZOHPv-",
  "https://drive.google.com/uc?export=download&id=157OW-uK0lWh0iMN6p38K4B0zZZp55L2S",
  "https://drive.google.com/uc?export=download&id=18-Mlk1z9y7oel3e1TL5b8ngYSGoPiASi",
  "https://drive.google.com/uc?export=download&id=1e9CWbE5D-gFfwmBoQnXT0y2CS9vHNUj6",
  "https://drive.google.com/uc?export=download&id=1IVjbBjNaDk-sieDllqNE4ZRqfYxj8UF6",
  "https://drive.google.com/uc?export=download&id=1faY9K9rZq_fY5jTEe626EPgu8fvfvwtq",
  "https://drive.google.com/uc?export=download&id=1U7lRL_HQngOsm_9BMYo-TbDyFn28F6Iz",
  "https://drive.google.com/uc?export=download&id=1m1CodRu1b50bpg5gGa09ePV7CeZMtS6y",
  "https://drive.google.com/uc?export=download&id=1WUNWjr2CUDG7Ak6jPElmyBhDgfuJ2b1I",
  "https://drive.google.com/uc?export=download&id=1j1f_ZWsnbXXADj9zUYaW063oVkxHF5IT",
  "https://drive.google.com/uc?export=download&id=1tgZVn1giUZOpWCjKy57wyBd7pAxUAMTw",
];