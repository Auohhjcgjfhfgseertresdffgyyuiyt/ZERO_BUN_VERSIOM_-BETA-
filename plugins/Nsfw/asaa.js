let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender

  let name = conn.getName(who)
  let img = pickRandom(gambar)

  // PAKSA jadi IMAGE walau webp (ANTI STICKER)
  await conn.sendMessage(
    m.chat,
    {
      image: { url: img },
      caption: `Nih *${name}* asaa cosplay nya.`
    },
    { quoted: m }
  )
}

handler.help = ['asaa']
handler.tags = ['premium']
handler.command = /^(asaa)$/i

handler.premium = true
handler.limit = false
handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const gambar = [
  "https://drive.google.com/uc?export=download&id=18_Bg__E-RWa-4sfbtmVzL-AEpBd8Br1W",
  "https://drive.google.com/uc?export=download&id=1A65gua2xqcBniopLvnEJYmdhqU8qQLKX",
  "https://drive.google.com/uc?export=download&id=1a5KsBPbkaa0dh0UjQMjGGdNSKUaGm0F6",
  "https://drive.google.com/uc?export=download&id=1Mp6c0bPxbCZX_OGlV9cdyUV4bjtTVk_5",
  "https://drive.google.com/uc?export=download&id=1PQVIf76JzlQqmBcaybTrphdPAEyCsF8v",
  "https://drive.google.com/uc?export=download&id=17vS2_Nejus0IicSQoJ6a_B_MTRB8uRmU",
  "https://drive.google.com/uc?export=download&id=14F9i-7rkFdsTaZTp9h6z32b7AQPdZFay",
  "https://drive.google.com/uc?export=download&id=1pr-sbCEeoOzHn5BABlb8-hUGffcfjMlw",
  "https://drive.google.com/uc?export=download&id=1jHX_5fQ2cW0-GdmcWXQpy5KEkxgg89CR",
  "https://drive.google.com/uc?export=download&id=1j1tcX5LJhRf0W8EAIQCQ40g5wNbICDik",
  "https://drive.google.com/uc?export=download&id=1UZYaK51ogvZjqEDKCSHupsjoqDUPmy4S",
  "https://drive.google.com/uc?export=download&id=1rpxAxVlwiGwrzGneOWOuUfXrpVfX2aWq",
  "https://drive.google.com/uc?export=download&id=14bbLtR8uW4aribhWH0hgrHMP9o_Lvh2I",
  "https://drive.google.com/uc?export=download&id=13zy81waHwH1CueKKvOoKxFcqUgTeBvbq",
  "https://drive.google.com/uc?export=download&id=1p70kzS8y07OpUlAwWMR8dwZKym-PW9pk",
  "https://drive.google.com/uc?export=download&id=1Srn4X1ADmA6b-fYI3kjx4ZLDY9ompBn6",
  "https://drive.google.com/uc?export=download&id=1mU7dEtCEKgY79sw_F1NHdPGCYk1XR0Hd",
  "https://drive.google.com/uc?export=download&id=1sdW9x7KR2wNHmU4_f7xTi8uKRDFFoYgL",
  "https://drive.google.com/uc?export=download&id=1buYFJBy41uBKpggkc8R2bGUBoV-u8T-l",
  "https://drive.google.com/uc?export=download&id=1kpecveZxykBmamgx-JqwT85OZZhg14s4",
  "https://drive.google.com/uc?export=download&id=1tCLb34i5tkASLO8TbJriK5HzaeZ8hwwg",
  "https://drive.google.com/uc?export=download&id=1H2y7KuTIJIb6UPrXKDveTs4q6dF1Y_Vg",
  "https://drive.google.com/uc?export=download&id=1HEDLqMKPr1ujlC8O9a_Fs1x725FHuvhR",
  "https://drive.google.com/uc?export=download&id=1czVzgBwjnGNGM0npuOthocMaMCxPtUpb",
  "https://drive.google.com/uc?export=download&id=1i8cu3Oh8Y_DQIkIm0tWcnoZnzrmueAUV",
  "https://drive.google.com/uc?export=download&id=1dWQmRA59IBcWMXOOVksY0-fAv-BexusD",
  "https://drive.google.com/uc?export=download&id=1WjBLtacWNQFfmLOQ6Q1C7a38zMo0uTDn",
  "https://drive.google.com/uc?export=download&id=1jCHKFjbgaHRxcCn46XPNMomexejqEEE-",
  "https://drive.google.com/uc?export=download&id=1p0LByJUrhsCJiF6uO0H7QnIImcFXo8qm",
  "https://drive.google.com/uc?export=download&id=1BoNj71NOkxF2IpFoxpxfFQBqU8IlVz9Q",
];