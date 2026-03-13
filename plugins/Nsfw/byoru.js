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
          caption: `Nih *${name}* byoru cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['byoru']
handler.tags = ['premium']
handler.command = /^(byoru)$/i

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
  "https://drive.google.com/uc?export=download&id=1b4avp6sVvAAwCH4_Jvw917YnPWzlhlFL",
  "https://drive.google.com/uc?export=download&id=1v06iZueay7qdBAHHfml9IzM0UhXisdQ3",
  "https://drive.google.com/uc?export=download&id=17jJZikNQuDBa7wWySgmeb48ooGxU-TEy",
  "https://drive.google.com/uc?export=download&id=1GVb0fyxfZePDTaFcfhNkaqmCotfPUiBe",
  "https://drive.google.com/uc?export=download&id=1RHDEzISTeZSSnTVy4DZY5bB4R-Qh6PrP",
  "https://drive.google.com/uc?export=download&id=1F6zc0a7_cLy6Drx49Pp_7ZsO9k3OukZV",
  "https://drive.google.com/uc?export=download&id=1sLYHH1pi4syXId12Z16-nMCpLhp_Ljya",
  "https://drive.google.com/uc?export=download&id=1VsVi5-UFZb7Yw67DgmXilJwJgB0PsE83",
  "https://drive.google.com/uc?export=download&id=1GCzcbyKzd7MwznMzD60fVrKBb2W0JHbe",
  "https://drive.google.com/uc?export=download&id=1aCbQ2Z1np5GV5-ObXRWReNvkt8s5Mfxe",
  "https://drive.google.com/uc?export=download&id=1A8TDw2kl8sH8skiHUSKG4Ulia8GhauRG",
  "https://drive.google.com/uc?export=download&id=1vb3kkGL9_E36U_v6e-zM17gdcQFig9GU",
  "https://drive.google.com/uc?export=download&id=1cZ1Ml1K5-YT7zIvyZa03zqouKOtVC7Gc",
  "https://drive.google.com/uc?export=download&id=1tDHYpklPp7LNSivcHp6mZYSrCYeXJ3RO",
  "https://drive.google.com/uc?export=download&id=1ACa5OP3ZKiFzBTcb1KU-jG4opH7I-XGv",
  "https://drive.google.com/uc?export=download&id=1i_rCxASx8O5RYj2P2xHWttf5f7sIb_1T",
  "https://drive.google.com/uc?export=download&id=1_Az8oSNsN50c3ykf5xZJkchw7w_Yqri6",
  "https://drive.google.com/uc?export=download&id=1W6b1wHUR9PO2qbIGa16Z3X1yjeGsGgBg",
  "https://drive.google.com/uc?export=download&id=1X5pjcsV6cT9VVtGEgcZq1LAeBR5XGrSs",
  "https://drive.google.com/uc?export=download&id=16eR5E4SNtVTGatVZ1AHBKjpwb-lSJDgq",
  "https://drive.google.com/uc?export=download&id=1fVv_yJth-IvOVNjmiJGtARQSw_KP2l4_",
  "https://drive.google.com/uc?export=download&id=14MVDlh6n3a9d1g4U6RfspLVhtF3K0HyW",
  "https://drive.google.com/uc?export=download&id=1enmNV9pu-A-qWj30KC4WffR5ZatJLxk1",
  "https://drive.google.com/uc?export=download&id=1ILMgHtRLyYc9BH8aJQ94I03aW5pZ-dRv",
  "https://drive.google.com/uc?export=download&id=1JDMML4J1jWz6kp7fbYpsntn56UE4g4VL",
  "https://drive.google.com/uc?export=download&id=1wxeBleeRV5gMB9cS0Q5rXzNY_Wmu0uMn",
  "https://drive.google.com/uc?export=download&id=1Nrzc0sGiTuIRfFxGvQYWo3h-VRiN7JcS",
  "https://drive.google.com/uc?export=download&id=1_8quOBtvYOjJZYweXCK3gPGqqH4rMgeN",
  "https://drive.google.com/uc?export=download&id=1JmiHLWBo0mH5b9AVBMAKHOiAMk3R-Pz8",
  "https://drive.google.com/uc?export=download&id=1ESuOGn5mIBQyqkjT_ADEsNPyLADas3N6",
  "https://drive.google.com/uc?export=download&id=1myTY9-ky_VYB7XlT7af1fCuVZsgxAqbj",
  "https://drive.google.com/uc?export=download&id=1MHnmxGoZ_DloXA-zDUcIIG6yeH-_w7pj",
];