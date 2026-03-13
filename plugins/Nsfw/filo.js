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
          caption: `Nih *${name}* filo cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['filo']
handler.tags = ['premium']
handler.command = /^(filo)$/i

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
  "https://drive.google.com/uc?export=download&id=1ci9Lgwdk4z48VjGwt0UXGmHhGdH3u_o7",
  "https://drive.google.com/uc?export=download&id=1zEvbhzwfHYdppv_TAf2eOKTyT66W0vgw",
  "https://drive.google.com/uc?export=download&id=1hjY1I9YSQJG_VzvQclf1bvNHSfKrD6K0",
  "https://drive.google.com/uc?export=download&id=1T3ttzNWj1wLP4B98Q6yKn9Po5_cxPETW",
  "https://drive.google.com/uc?export=download&id=1TT0tu1JO3rydZ3qrxyN5HRdU9nLtm7Bc",
  "https://drive.google.com/uc?export=download&id=1a2Y2zc5wlXFGzjMpkdquu_SyahlNkvDO",
  "https://drive.google.com/uc?export=download&id=1V5yiB5_Aq-U5yi7A75i4exzjlb421XDV",
  "https://drive.google.com/uc?export=download&id=1PmjPRu_eNvK9A_RGz3KYpR6dWEAr84bd",
  "https://drive.google.com/uc?export=download&id=1Ir6Aap6c51wl__J2P4di8FpB48k2va78",
  "https://drive.google.com/uc?export=download&id=1wdlCMSSB0ZPcovqfXVzYVvgKeVKcsG2h",
  "https://drive.google.com/uc?export=download&id=1naUyVS1-ekS8a74-Gv3OV4Kvy_VnGecl",
  "https://drive.google.com/uc?export=download&id=1K4R4XkZfSB2JRLfclXf2vrLI4W03CFxX",
  "https://drive.google.com/uc?export=download&id=1OVQtAg_bUtyWVbU0KyYPWuleGekhb48p",
  "https://drive.google.com/uc?export=download&id=1EN6F_8uq20YozQtYUE_wdoPo39mZzhXy",
  "https://drive.google.com/uc?export=download&id=1qZEDmQLb71fnrs1Pivd-IYcqgLlI9Hb8",
  "https://drive.google.com/uc?export=download&id=1FUNGTY0XnGIqUewha5N9bd51XK19Ip0Z",
  "https://drive.google.com/uc?export=download&id=15ehxUWF51mbOGBJPnOgR1ZEh3w1fqQ5S",
  "https://drive.google.com/uc?export=download&id=1k81hTZWuheCaI3u2XEbbuznSO7sOLBNY",
  "https://drive.google.com/uc?export=download&id=1hFp38hafabuRBHoyhKHcQRfRJRL7YB3b",
];