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
          caption: `Nih *${name}* haruno cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['haruno']
handler.tags = ['premium']
handler.command = /^(haruno)$/i

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
  "https://drive.google.com/uc?export=download&id=1KAQMZTgIcLhBeF2Og3oc3aR0eoQDVPsA",
  "https://drive.google.com/uc?export=download&id=1aqFlkT5MN6zB3YumVzMY_fp6Gs0t7cDc",
  "https://drive.google.com/uc?export=download&id=1GXHOVWvTktQCfna94uUKzBOOxdmapjee",
  "https://drive.google.com/uc?export=download&id=1s40LwLbVZpHGMPR8biZeqZZSdy2booOB",
  "https://drive.google.com/uc?export=download&id=1wcDml-SRuLEZfjXDdDJZ3-9hNl-oL6og",
  "https://drive.google.com/uc?export=download&id=1ZeVUAYt4dpMvSy2Eui4MPZDKvnuxUts-",
  "https://drive.google.com/uc?export=download&id=13649fAOBL5rzp3xzOXy4uNNvCelyknyd",
  "https://drive.google.com/uc?export=download&id=1oY_l5MrALuBJ8TJu6TRs3gzttgwc-cYz",
  "https://drive.google.com/uc?export=download&id=1di5wNI8lYrCldrVVDSVpEgxkfdf-p7We",
  "https://drive.google.com/uc?export=download&id=1UfqDAU_b38T1ToJPsop9aCmI_JBymrOW",
  "https://drive.google.com/uc?export=download&id=1qKpVddSfSIj620vVXfBY2PaMRnwxQCbr",
  "https://drive.google.com/uc?export=download&id=1fZpY3FLNRJlxBYL1_xgIsetF5zjKvULX",
  "https://drive.google.com/uc?export=download&id=1cqz9kYZQpW3WbJvE3bFrdRFg2E72VOe4",
  "https://drive.google.com/uc?export=download&id=1pg602L1DZ9HMndbyPQdpIPoZXSK3ufq0",
  "https://drive.google.com/uc?export=download&id=1oKjXrIA5z3UBM3wOZagOMvoM_d8D8Dw9",
  "https://drive.google.com/uc?export=download&id=1ldvdweCDgHsuw86-vkCjJyRWwClsMnui",
  "https://drive.google.com/uc?export=download&id=1lL-69s4AGEuJVRg4tWEPQ7G416lYlB3E",
  "https://drive.google.com/uc?export=download&id=10kszexsDlvWMeysPQErb-wbSDbmfqiTO",
  "https://drive.google.com/uc?export=download&id=1cfbr3zBSWsMs_FfWCfxLEoAqv2X1AH1r",
  "https://drive.google.com/uc?export=download&id=11KvRA9arexxzkwz0cK3JWQKDjugNj-5p",
  "https://drive.google.com/uc?export=download&id=1fmIZRLSQW1Pkn0zzOloTJPWHNuT_KcUJ",
  "https://drive.google.com/uc?export=download&id=1CDEzkldY6U90eJQ8rUpxPy7fRqPemjZZ",
  "https://drive.google.com/uc?export=download&id=12ycrJGj1fYt7z9H-AIRv0MVQzqHnLgUX",
  "https://drive.google.com/uc?export=download&id=1pssjdK82Cd1EwlgUWF5m-HXrrxStYnz0",
  "https://drive.google.com/uc?export=download&id=1TAaT28GalaZ4sFPjJQ8RBImblxtWIZqb",
  "https://drive.google.com/uc?export=download&id=1JZsZcbVoBSdEYHnSURKxfUXWHgkIWUnX",
  "https://drive.google.com/uc?export=download&id=1xoB9uCKQDmY1cJfIjzQG_HsFtMfE6soy",
  "https://drive.google.com/uc?export=download&id=1w9wO8VbF9tQmqSHAS4hH4zPpWfUpIQ-K",
  "https://drive.google.com/uc?export=download&id=106WfE6o16LUOi7uilqF1ToWEC9jZh736",
  "https://drive.google.com/uc?export=download&id=1gxurOUawX7POFWc2_lgTFvMTboc-_hv1",
];