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
          caption: `Nih *${name}* tingyun cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['tingyun']
handler.tags = ['premium']
handler.command = /^(tingyun)$/i

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
  "https://drive.google.com/uc?export=download&id=1-gaiMiUpZdhCOYrE1zT375P8ETnEVlYu",
  "https://drive.google.com/uc?export=download&id=1ELy-dxWo5394p_O8XQBNBdGADqy10TZx",
  "https://drive.google.com/uc?export=download&id=1JPE2ObZQ4lSp4cLp7W0HFGuyt6khCBjf",
  "https://drive.google.com/uc?export=download&id=1OjvLRv8X3w0ObquuvZnceIkbz2Am1mCg",
  "https://drive.google.com/uc?export=download&id=1f4YO8Q12z_2Om5qSgLSykpgQVFGu6EBf",
  "https://drive.google.com/uc?export=download&id=1DXznHMWX358pyIL_cYfUT5HHHo2LsRpp",
  "https://drive.google.com/uc?export=download&id=1k1OQ0-MN_zQ8cY8PUs4trN7sjlr3JoNZ",
  "https://drive.google.com/uc?export=download&id=1ahpb-JiHf5jn0iOHL_NXYIoV_4gWKeVQ",
  "https://drive.google.com/uc?export=download&id=1rMXh512EmLEr_cBces0JAlo7nItaRL-_",
  "https://drive.google.com/uc?export=download&id=1bv1kWoL1Fh9EyJxPQbMJbnjOdZFoLR4M",
  "https://drive.google.com/uc?export=download&id=18DtM3IAibh0LzRPoVhsmeYEOZ1YekU3r",
  "https://drive.google.com/uc?export=download&id=1hEBHHYSJi8tyMMTLS60a5bJw82laDwAY",
  "https://drive.google.com/uc?export=download&id=1BUi3FzT0X71fZX_qRcmwXs-xOzQ6yJVw",
  "https://drive.google.com/uc?export=download&id=1aeJH6DUg9XxJonikE40r4UnJ2mRgcKWK",
  "https://drive.google.com/uc?export=download&id=1OCcFrMcaeQx4UCC5kqgkvwKAPstDW-98",
  "https://drive.google.com/uc?export=download&id=1AD8YAOgeDUv2NEQ9_-ogAiz1VRGx4IIz",
  "https://drive.google.com/uc?export=download&id=1AcxW4R4qs195cR2yZ0lJZbCZz12ur0H3",
  "https://drive.google.com/uc?export=download&id=1In30fa-E0xfPFfXmTIQxo5P73WfiK3Li",
  "https://drive.google.com/uc?export=download&id=1KgBeoUcJ5Qc_c7r3vNkYi09HifMr4GTT",
  "https://drive.google.com/uc?export=download&id=1k34CYrq_ydmX2XSRuSKnG3XjHmZFvkFk",
  "https://drive.google.com/uc?export=download&id=1NJljg5EDTMVd3K_NX0R_j67jOUkkaSxa",
  "https://drive.google.com/uc?export=download&id=1kti_tX-4X28nZPxr3jYkEwDF4YQOrYF7",
  "https://drive.google.com/uc?export=download&id=1sZyLzhDfDepdCyqqwtypd1Y5L2jUIFPF",
  "https://drive.google.com/uc?export=download&id=1QyqV_Qx6lv4BZJ1gQ_I68W6guwkHPWbn",
  "https://drive.google.com/uc?export=download&id=1jNXbCX-6_ujKtRl_xUujfbVCNpkYCwN7",
  "https://drive.google.com/uc?export=download&id=1TBCkx70B8DSgQv13piosG3hJiokPrVfo",
  "https://drive.google.com/uc?export=download&id=1GaGGSzFGbrWRXWVLFisSjB3ip58ul07z",
  "https://drive.google.com/uc?export=download&id=1ZSx90Is08CbX8eJQBBOhAhEDCUEB3Rcs",
  "https://drive.google.com/uc?export=download&id=1_LpQINeqb9ss6d4lSLzrn2kUqunNQBqd",
  "https://drive.google.com/uc?export=download&id=1YNb5NHGDdeXhQRYUiXuGUd5M5C9yjuFP",
  "https://drive.google.com/uc?export=download&id=14pgGUHU_ysuX4dTI0r7CT3spmMaARHxK",
  "https://drive.google.com/uc?export=download&id=1nBjZhrSISPV9eFSfsQW_2nkGFyGCtu3P",
  "https://drive.google.com/uc?export=download&id=1u_IlqDf0gkedktVIY-XoucOXqiVPSAl9",
  "https://drive.google.com/uc?export=download&id=1vhjnF29AoJcb8dHu-AIezIJ3Fmr9uFEu",
  "https://drive.google.com/uc?export=download&id=1YgbUsvb7I7GLxTdU5B8evhQQ8R9TqV-q",
  "https://drive.google.com/uc?export=download&id=1mMCrODWDrXa733talaaAl6i5ZeBaXbeJ",
  "https://drive.google.com/uc?export=download&id=1twAJilb1yT3uSl7qe_rd-Z_KTpWIdQ_k",
  "https://drive.google.com/uc?export=download&id=1j-2NP6OsMZi99wlOh8OKMIkk9NGyQIaX",
  "https://drive.google.com/uc?export=download&id=1Ogl84LErg5GkOUdEJWSoVaHOuo7VYxiV",
  "https://drive.google.com/uc?export=download&id=1IMobywlHLnQ_CsRxVxtjPrgMUbUcw4K2",
  "https://drive.google.com/uc?export=download&id=1CBPwULfKR6MkYrelcWhPXS8ZJVkWaEaW",
  "https://drive.google.com/uc?export=download&id=1W7ltzo4UyThmZZnChObiTG_YtBzhhpHR",
  "https://drive.google.com/uc?export=download&id=1u9vGx8Y7M5wclFhEOeaX02YVJ6L6q2M-",
  "https://drive.google.com/uc?export=download&id=1JYGZqPagfFMogJYdFC1R93ckdqM4_G-5",
  "https://drive.google.com/uc?export=download&id=1i18ZpDABFHOeN5uQ32CuOFH8kzG75XxR",
  "https://drive.google.com/uc?export=download&id=15dQAZbJssJkOe1yqeYELSqxlAcCzF6B4",
  "https://drive.google.com/uc?export=download&id=1rtzEgAPM6kFeAeeXU_L2cPE8UkkMTabu",
  "https://drive.google.com/uc?export=download&id=1f9fz9GEicCMnIGpGBCLLJvKzFqSJfO5m",
  "https://drive.google.com/uc?export=download&id=1pHzuED70EbLalXoEPsvR-0w593O8vNNc",
  "https://drive.google.com/uc?export=download&id=1bpLNhLH9BtAZbTeCyHbYKHj9RqqPlQNx",
  "https://drive.google.com/uc?export=download&id=1K-aXxuB1IV1qKkbtQmPuJ0UH0jH5rV9N",
  "https://drive.google.com/uc?export=download&id=1sLzAdYkbWM0rRUAg7PYbz2y1Q2_8j20T",
  "https://drive.google.com/uc?export=download&id=14CPZmADpaI-WlvvYO0-LDwf8sVXrfT8i",
  "https://drive.google.com/uc?export=download&id=1ZiRrC9nCxtEaP733MVsie1QuyY1gZOij",
  "https://drive.google.com/uc?export=download&id=1Uh65PnehY6_JkqzWyEbcbyqvfgJdPN2a",
  "https://drive.google.com/uc?export=download&id=1La3z8GDEm_xYX-7M5wRP7JeRxS3VF5nQ",
  "https://drive.google.com/uc?export=download&id=1YJm24DmvUbjZqeNx_8DDa5t0O81L9SO1",
  "https://drive.google.com/uc?export=download&id=1GLJaJvcftzNrvke14avPMZU6FindRkxE",
  "https://drive.google.com/uc?export=download&id=12A6Hlw0Z5u8cq4Q2MkhGjfeDMHVK0Hn0",
  "https://drive.google.com/uc?export=download&id=1bJPFwrPDc0QH56D5KlQ7sV2wLhF4IUtA",
];