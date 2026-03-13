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
          caption: `Nih *${name}* beefboo cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['beefboo']
handler.tags = ['premium']
handler.command = /^(beefboo)$/i

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
  "https://drive.google.com/uc?export=download&id=1UNLraixsjR7TC7racEsub5_jaMTzsUOR",
  "https://drive.google.com/uc?export=download&id=1M-qpBPXFOLYvTbvFGzssSov-ZxGZVl4N",
  "https://drive.google.com/uc?export=download&id=10NqlAOA2w6rOn7Fu59SHNSMvmBRHscpH",
  "https://drive.google.com/uc?export=download&id=1jjkGb20hh-7SAfFaMxLz1Cz4cCTKbs26",
  "https://drive.google.com/uc?export=download&id=1fIyIGUDDLZXxwHU9cnHBP7_r2aceU6cS",
  "https://drive.google.com/uc?export=download&id=1C3cNcbt2tLJKKyY_hSbhG1X-PB_UAtcp",
  "https://drive.google.com/uc?export=download&id=1baI9GOGUbga22EV674UGSo66vPAtGxOb",
  "https://drive.google.com/uc?export=download&id=1j3mekfXyOSAJUv3lJ7I6nqpVe7ZFRuP6",
  "https://drive.google.com/uc?export=download&id=1RFqGIQdn8Uj-jNpX8q_i5y-vnHgYF7C9",
  "https://drive.google.com/uc?export=download&id=1ORVHEUvo6UhOTi47T9N1Zg70QWPOTRVU",
  "https://drive.google.com/uc?export=download&id=1MSHrUAEigT-lLlZa2ZTx1fMWgCxtCsBh",
  "https://drive.google.com/uc?export=download&id=107Pvmicu0O4l-M1uBRmAK6nw_6mrsRae",
  "https://drive.google.com/uc?export=download&id=11pyA-nGgrrhVC5xXVjoycRvHCF-PnRWP",
  "https://drive.google.com/uc?export=download&id=1sMtpU_WgVHje6qInh6KNNdq673blHimh",
  "https://drive.google.com/uc?export=download&id=1Lidc-9AErGL172w4JO4p_3Ew-m830J0F",
  "https://drive.google.com/uc?export=download&id=1UF-5fuUa0Z3niCnjpF4lH-ucyjIJjRTk",
  "https://drive.google.com/uc?export=download&id=1qCUlkYQRMRL4ZYmF1OzSqu1elt9XKu9M",
  "https://drive.google.com/uc?export=download&id=1jHex7moQcNimf-T9cryj2Yskh4w_lnE4",
  "https://drive.google.com/uc?export=download&id=12Hd_ixbN2-DhWEMWZdqtBHVOz_OXgL9a",
  "https://drive.google.com/uc?export=download&id=1hLFakH4zaxxYDYDaee3PRZKxRx314OkH",
  "https://drive.google.com/uc?export=download&id=1gX6K3aASTxD7vpwQNoxP1ZyoCZ9h_cCJ",
  "https://drive.google.com/uc?export=download&id=1oC58oxhkCocBK_bXTSvpHejchhHZRXoX",
  "https://drive.google.com/uc?export=download&id=1lv4hRMGOKoIlGFhSyGnw9mECZ6FgWwZX",
  "https://drive.google.com/uc?export=download&id=1heAcZ95JrPlY7ya7eKjDwDhFdcDuFKaU",
  "https://drive.google.com/uc?export=download&id=1Yaqs9WZOoVRhoLusKkokigfzA4GKz5uf",
  "https://drive.google.com/uc?export=download&id=143spEDnF5wXsEJyXEJ-P3O1OIqu9tzNH",
  "https://drive.google.com/uc?export=download&id=12wPWCSVuMUOn4shqVmzuWcdccoSBRRE2",
  "https://drive.google.com/uc?export=download&id=1MF8M5aLGlzD6baOlPl_4quIWAf3Jg_xB",
  "https://drive.google.com/uc?export=download&id=1WOTK5qTOg25D2VI731DD8hk6clZsjV4F",
  "https://drive.google.com/uc?export=download&id=1rCtpbLVKoM4y5IpKfUzB4YTHzP4Df7d6",
  "https://drive.google.com/uc?export=download&id=1_CPaLwcXaF0FshJBLbZebKk433fivlpC",
  "https://drive.google.com/uc?export=download&id=1oFUptk5rBgBOb2KmWyLNHuoa6gA4Mar3",
  "https://drive.google.com/uc?export=download&id=13dAQkKUOR8TavuBQ0ei6XkPoO1UkzkZT",
  "https://drive.google.com/uc?export=download&id=1VmTO9fEJXV6yARung5NtvyRAjPIDcrRT",
  "https://drive.google.com/uc?export=download&id=1tYFiKED4VdEO3Osk5FpGFUGrl7cFE3_8",
  "https://drive.google.com/uc?export=download&id=1u9y4PkzFBxMWIi-yI7e5uW5RzFMbG-9p",
  "https://drive.google.com/uc?export=download&id=1UYvZXrD0P2wQmyGf4bMuukHxYzvIjEoZ",
  "https://drive.google.com/uc?export=download&id=17GxZ-raWgP7rEfm91sAuEiwjcjTha8Dh",
  "https://drive.google.com/uc?export=download&id=1zAdHFcWmVmQ1nbFGng-i53b6t3gOx7HA",
];