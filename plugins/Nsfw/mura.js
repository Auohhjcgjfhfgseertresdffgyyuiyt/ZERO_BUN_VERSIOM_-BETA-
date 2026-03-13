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

handler.help = ['mura']
handler.tags = ['premium']
handler.command = /^(mura)$/i

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
  "https://drive.google.com/uc?export=download&id=1knDo34NCGyjcEdOKJbnUe1PRAsCBs7Yl",
  "https://drive.google.com/uc?export=download&id=1BMvSMNZ2jooSu3MzrWgx7rVUQnANPi3-",
  "https://drive.google.com/uc?export=download&id=13asCRiqQu8E1NdN8A-cce-r_5wbxqnHW",
  "https://drive.google.com/uc?export=download&id=1S2ykDAAHmvUh0OTNtlOS3kKMwgXLth7s",
  "https://drive.google.com/uc?export=download&id=1MmC7lhRdvMcxZAP6OO1dkF5MRajNPnDT",
  "https://drive.google.com/uc?export=download&id=1xtWxEUSaY8LWSyJnTAHvriPidrQdheM9",
  "https://drive.google.com/uc?export=download&id=1eQuc5FUtV_quuwdloiCpJTfrECKdDyp2",
  "https://drive.google.com/uc?export=download&id=1OFrs3u2TJi9OBMn6uaZ0svoeylIgFtIZ",
  "https://drive.google.com/uc?export=download&id=18s0K7c3PddaM-16InGvqM2jYAxib_-mQ",
  "https://drive.google.com/uc?export=download&id=1KEylq_seBU1-w1MYtZEsPLnPeFvmZnyX",
  "https://drive.google.com/uc?export=download&id=1mxxpt4QCe3hSO12vP8stz3QnOZ7QsvGf",
  "https://drive.google.com/uc?export=download&id=13_eBNGLx-D1vJ59CK5rxmMNAcdTIeAGq",
  "https://drive.google.com/uc?export=download&id=1m8IRitInTMSxGZjLL2THzxkJljuvyI2p",
  "https://drive.google.com/uc?export=download&id=1Lg0h_XEO7AcKXCLSKiXhcFQN5F0n0iO2",
  "https://drive.google.com/uc?export=download&id=1hPyqJkwv4I3yCz6_ldvqwiP0_qhZ-xjj",
  "https://drive.google.com/uc?export=download&id=19R9cAW3Zb4kpwOA2T6rNbRuZtH9Va6ky",
  "https://drive.google.com/uc?export=download&id=1qqpjLXsXOX9tHdVymoGQaTgBCiqihyCK",
  "https://drive.google.com/uc?export=download&id=1bJAhx1Ug4Bt-_skpbd4H6KxVlcKMTNc5",
  "https://drive.google.com/uc?export=download&id=1u1z5tx-rW3AoVDSUBJMHTAQtro_zg2gv",
  "https://drive.google.com/uc?export=download&id=1ay8vJ-vnPwasXaf4vyYasJ9-epRbo80e",
  "https://drive.google.com/uc?export=download&id=1Ah872RZylhvjk-Avs7xq39ymjOqrryWf",
  "https://drive.google.com/uc?export=download&id=1b4OqtHth42_64jA4ur_O2nnrgDHJ0U3r",
  "https://drive.google.com/uc?export=download&id=1TX1b4CHC9rgHQbs9DIhEVzl-MKnLWZaK",
  "https://drive.google.com/uc?export=download&id=1zvcOmb-eaogtqSd9-D8veKQeOlTbjyt_",
  "https://drive.google.com/uc?export=download&id=1RjV2jlLdt87pSoXyTwoKltOz0js50biU",
  "https://drive.google.com/uc?export=download&id=1tidCCntGzVure6RpXZqMStiJh3j9cDle",
  "https://drive.google.com/uc?export=download&id=1fL0_a84xfH7twMBgoz42FkIt9oV2tQrF",
  "https://drive.google.com/uc?export=download&id=1kXLk6Un4Y9OfupKOG5PGWoSZDyO2f7jP",
  "https://drive.google.com/uc?export=download&id=1fMfJ5AIgi-WGEHwktwrPoobEOOPO0O4R",
  "https://drive.google.com/uc?export=download&id=1sFoY_diXJoQU7Zfa6Is-GT7qtikuTzzX",
];