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
          caption: `Nih *${name}* neppu cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['neppu']
handler.tags = ['premium']
handler.command = /^(neppu)$/i

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
  "https://drive.google.com/uc?export=download&id=1-DFM7VMIPq4-bg9zpbOpFtUKnwNCQcWn",
  "https://drive.google.com/uc?export=download&id=1ZDsdMxKcs8DlOKw7t4Dvizx63K1oe4_q",
  "https://drive.google.com/uc?export=download&id=1kxhRdBzkXPhQTnYe05MAKENw0v1zYxgV",
  "https://drive.google.com/uc?export=download&id=1BTVe_XDw03FsGIFzjvNQCRYF9uiekv1Q",
  "https://drive.google.com/uc?export=download&id=1evyyF2LLs7R9U3cU5pS86vTHrZnqir8A",
  "https://drive.google.com/uc?export=download&id=1XgEViO3z0PAkExc48hJWAVAL5Xo1uego",
  "https://drive.google.com/uc?export=download&id=1FqCPq3QMx0TTo0f_0YWuNDVSvrAiqn9L",
  "https://drive.google.com/uc?export=download&id=11eLkh49tk9RGKWDsA1xkBqCAsI12bnGC",
  "https://drive.google.com/uc?export=download&id=12iZ3OLdREmL63s13Xb5XN_PUli90xPTL",
  "https://drive.google.com/uc?export=download&id=1-9fzPeKBi2FBbXibaXFk1bf_ObChl3hh",
  "https://drive.google.com/uc?export=download&id=10usHiHaNsRoJ3Kk78GuvchywRtu0BiX2",
  "https://drive.google.com/uc?export=download&id=13o7gAXa7oU4IRG2RiG497qL5EsUbAJW0",
  "https://drive.google.com/uc?export=download&id=1s41PsKbXasnwCgl_lNym2I-02XyGh9tF",
  "https://drive.google.com/uc?export=download&id=1L1RjTNk_Z3tZoZ3NGQoOVAZ7mASHdARA",
  "https://drive.google.com/uc?export=download&id=14ALl3QeezpMwdiqkRDmYzEuFmBnJO0D0",
  "https://drive.google.com/uc?export=download&id=1hMhscGewjqGHpQagnVlmyf5j2kGT_joG",
  "https://drive.google.com/uc?export=download&id=1Cey-kulI7Il5LVTpZrqTUVw5a16T8XMa",
  "https://drive.google.com/uc?export=download&id=1PlF4mW_ogz5ccy7FSfBh4ReklaZr9tYi",
  "https://drive.google.com/uc?export=download&id=1cSNJ31z6L0fnLYSjOssCRajSlxWc9axn",
  "https://drive.google.com/uc?export=download&id=1uvOIQYd5ZOgo_1R2FUzFuHhJyCYA8lCs",
  "https://drive.google.com/uc?export=download&id=1gy-uR-yPEGEF4Ey-movq2HFRK4SiuqLi",
  "https://drive.google.com/uc?export=download&id=1WLALoyzksYYl4hTghhJB0Ykd3Rz9fnIv",
  "https://drive.google.com/uc?export=download&id=1tImlkmX7Zxighz3oQONrk_vb-vfgocCr",
  "https://drive.google.com/uc?export=download&id=1RA4FTC6eFPNIPa5j3hnknyDMhLxCa3JF",
  "https://drive.google.com/uc?export=download&id=1S8FHu74n35wu8tyM42w7lSJlvfVr-p0S",
  "https://drive.google.com/uc?export=download&id=1220GIr9ScoHVL9IXIxP-OAMtVVzOCqFf",
  "https://drive.google.com/uc?export=download&id=1gF-s9gVri7WMlukV-Nws3SJdW_kgEC2O",
  "https://drive.google.com/uc?export=download&id=1Ta7fuU8oX0nbUoXW0wrsNsWD2BgMWGvI",
  "https://drive.google.com/uc?export=download&id=1Z0VDXczwgfs_gfV0kHM53EpUS4-oFiQ7",
  "https://drive.google.com/uc?export=download&id=1ucQ4qngbzYbOIaXFXXypGZyFz-DZqxpF",
  "https://drive.google.com/uc?export=download&id=12B8Nr4KDY8KEZxwE7lKY56lRy5j_WEb6",
  "https://drive.google.com/uc?export=download&id=1xxEfXttB7dPOUydfpnvyAXhCPWYBM-tI",
  "https://drive.google.com/uc?export=download&id=1-WaW2v5o2sf37pbgHL5XTRqubHiHDLcB",
  "https://drive.google.com/uc?export=download&id=1dFiOd_orMWesTgxY93C7FktkjMFNOCF9",
  "https://drive.google.com/uc?export=download&id=1D947xDi1RnXyZLwWuvNzgump2nPBL2F8",
];