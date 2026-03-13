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
          caption: `Nih *${name}* slutty cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['slutty']
handler.tags = ['premium']
handler.command = /^(slutty)$/i

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
  "https://drive.google.com/uc?export=download&id=1wgEAQ15VEUME9373qDRb9BmGwv_Tld-w",
  "https://drive.google.com/uc?export=download&id=10RKt1AgWXPaJtz7F0bFMafAdtc34kVSg",
  "https://drive.google.com/uc?export=download&id=1CTUo0ypH29PGl1jUCamgtoIuNOVgy9Go",
  "https://drive.google.com/uc?export=download&id=1-keScwmEvTT44d6JcGQbsKAsLVAFPaB6",
  "https://drive.google.com/uc?export=download&id=1v64L9EjS-ePAI2xX0TNrTzpnMIIZ9QGQ",
  "https://drive.google.com/uc?export=download&id=1yB7cMpTl43LgNB4wfidRfWLprxvXf5OB",
  "https://drive.google.com/uc?export=download&id=1l0T2DxBUsXVrV-u1JjuSluTdlF7xKrj9",
  "https://drive.google.com/uc?export=download&id=1IBpJ17dQLf9hPtPWMR-MZm1KSAp8qy2a",
  "https://drive.google.com/uc?export=download&id=19tcgRkB1CqHQKCddrA3WDXXawThuf7Ap",
  "https://drive.google.com/uc?export=download&id=1AbAET-xIYGV-ciUitoBMLwRoCZ9xog70",
  "https://drive.google.com/uc?export=download&id=1yDjk2Ms8Gc0O7xggwc08sk0KGChtB5Pr",
  "https://drive.google.com/uc?export=download&id=1DhvaFJgVz2w5-9w9vU9OnPTqe4mwX5xl",
  "https://drive.google.com/uc?export=download&id=1vBMg_KCzkfD0xNG7Qai5FT00lU5YwP3a",
  "https://drive.google.com/uc?export=download&id=1sfj2ymCbJpLlriIK19xeRlh5Jw5AxcSu",
  "https://drive.google.com/uc?export=download&id=1SiFBcfR0XUK4nPEn3En1pbxI5tyyrFTS",
  "https://drive.google.com/uc?export=download&id=1buul1G2xW-LqGoqm_25DYAKdA3_VX-vt",
  "https://drive.google.com/uc?export=download&id=1QZCRwKr1ac6wNle2aQ4yTUa091qQeWrY",
  "https://drive.google.com/uc?export=download&id=1B6Qa7DhDe4D0wDhfU8n6ozitgFHFP4UF",
  "https://drive.google.com/uc?export=download&id=1rtITWTDw7l7nWtnUY0cz0KAeBOHjsqK5",
  "https://drive.google.com/uc?export=download&id=1LPskf1Xhn2oeRWjRLI5FoTz6gSGIzeFk",
  "https://drive.google.com/uc?export=download&id=1kR1jCxKC4uISj-1w-UON9KcgeeQyhnji",
  "https://drive.google.com/uc?export=download&id=13aTbR05HA2WPPzd9uU7XJOwuihfExGFw",
  "https://drive.google.com/uc?export=download&id=1gzvp1mWn9bf6bhKzz_37U5KFjJJhWGGK",
  "https://drive.google.com/uc?export=download&id=1rap5aWwChi3A2kn7Ps0eOlfQuIbr4nkq",
  "https://drive.google.com/uc?export=download&id=1ZM9x1OPzCrhqvFR3tdE11jwoIhI-egls",
  "https://drive.google.com/uc?export=download&id=194YB23ofCsm8n3S3Q3OoTor_zWibl67f",
  "https://drive.google.com/uc?export=download&id=1dUvGsGB3i0-gbr-zQtSGXWwnep4mnMgk",
  "https://drive.google.com/uc?export=download&id=1vVEeL6JLK1wYfr36QFaFduSRRl05z3VW",
  "https://drive.google.com/uc?export=download&id=1J5yxy3GfCcK6UTi10t8W8l1uLAubEdvH",
  "https://drive.google.com/uc?export=download&id=1KrSVeFt3MzTZpQFG7ZSqxahHQuY3hwGN",
  "https://drive.google.com/uc?export=download&id=1qcpvMSj81qJ5zLFXl773iBIw1ndfBBNh",
  "https://drive.google.com/uc?export=download&id=1I468Gq9phpDOjF_xg-SmjKPRUvFA8YZu",
  "https://drive.google.com/uc?export=download&id=1WFTf81VvTXY-V3_O0w3-U9Dk3tiI4D2K",
];