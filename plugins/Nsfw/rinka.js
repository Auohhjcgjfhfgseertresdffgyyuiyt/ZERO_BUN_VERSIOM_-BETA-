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
          caption: `Nih *${name}* rinka cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['rinka']
handler.tags = ['premium']
handler.command = /^(rinka)$/i

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
  "https://drive.google.com/uc?export=download&id=1XU1guZde-KGYf63hugPMs-lKHjKJ1sKa",
  "https://drive.google.com/uc?export=download&id=16wivPtRr-mdtxRmFm3faFhFxzT6h5sPT",
  "https://drive.google.com/uc?export=download&id=1lU1VlmdcXAlMdc_90JpWyjqnGD-ZDSfu",
  "https://drive.google.com/uc?export=download&id=1dyzc_gW1Ned8IiUhOCGKCoO1eK9i3deZ",
  "https://drive.google.com/uc?export=download&id=1r7RhK5cXVRttPKeY01Z13wRG0tKyi1nf",
  "https://drive.google.com/uc?export=download&id=16LdLXGD6_k1a0xWvHw2OYFGf9SxqW97x",
  "https://drive.google.com/uc?export=download&id=1Trralas0w9CtNuGfhrMsQrzdA5Y4E0GE",
  "https://drive.google.com/uc?export=download&id=1D5kuqSmVpQwcaK_ljXp6cPU0lKhR2gz3",
  "https://drive.google.com/uc?export=download&id=1NgyUPS3HOdOBO5nC5wrcosEyjo1QcGCw",
  "https://drive.google.com/uc?export=download&id=1PeCb0vNE5ZHGug1-Zj4DtPEjBqcKxB_i",
  "https://drive.google.com/uc?export=download&id=1WWVcQ6Z6JPGwOkcGbpkghuKa7tY99Ht4",
  "https://drive.google.com/uc?export=download&id=1oTpNhTC3RGBhdzJBI1wfG1wYwMnk8iNA",
  "https://drive.google.com/uc?export=download&id=1t7UUL_kif1itjHHCBGqiZb_n0PZ7eAYg",
  "https://drive.google.com/uc?export=download&id=1dsrfwceNJ1-ME7ejGm8bV9Szq0nahHAf",
  "https://drive.google.com/uc?export=download&id=1R1uEFbWug2ktys9w8rW6rwWfKHb2i4CK",
  "https://drive.google.com/uc?export=download&id=1zqEBBEvq8GuIzRn2hXEwH6-jPc6m-ZLx",
  "https://drive.google.com/uc?export=download&id=1dlVdk-62dFbegxyMm0MXsgwmcSyhimGS",
  "https://drive.google.com/uc?export=download&id=1GS8RyF_SVdZ_1LLMTfjCzHwz5iuc48q6",
  "https://drive.google.com/uc?export=download&id=1X-FFFCsL2oMPI-psPt_sYUIFVog-T6na",
  "https://drive.google.com/uc?export=download&id=1CrQxP-xG1Ri1mJxAcccKZoRTGqThoiWL",
  "https://drive.google.com/uc?export=download&id=1rvUNSZE0-0dKx-anYknJ9hE3qc1bg83y",
  "https://drive.google.com/uc?export=download&id=1GaNXACvHYL-1j9K7uJbVtLUte92ykH0i",
  "https://drive.google.com/uc?export=download&id=1IcjjlVnpLSR-Pa9ax47y31s6K6rFOgdF",
  "https://drive.google.com/uc?export=download&id=1dakvZWHx1wQk4wQb80D2mFLvk9KIsZug",
  "https://drive.google.com/uc?export=download&id=1Vj9aOrGA8tte8Z7M3W5cW4XnPCuQZ0nC",
  "https://drive.google.com/uc?export=download&id=1cTDMBPRMUlb8wNzDkLtAgXQ0Z4OP8iex",
  "https://drive.google.com/uc?export=download&id=1nS8_1dPBC7InrIpZADqwxtSNFaYozYXO",
  "https://drive.google.com/uc?export=download&id=1tQN763wT5HFGFvLteKw1Y43dJ3vn7Cch",
  "https://drive.google.com/uc?export=download&id=1WEwFTsic6eexdBK65umsBNCMe4hSkXix",
  "https://drive.google.com/uc?export=download&id=1y5JOBw-pvW05obFElch2UDbtN0-HqpPg",
  "https://drive.google.com/uc?export=download&id=1lYBsE8BHrceY-v28XxQjoIJl_0kfoSR0",
  "https://drive.google.com/uc?export=download&id=1ItrZMPMLsUbOz2UBtXDZ4Jcx_RAzVylU",
  "https://drive.google.com/uc?export=download&id=1Y4-UteuCqvsR3d0_uW7oeLXWtK6vmqj0",
  "https://drive.google.com/uc?export=download&id=1dqntNDQ0f33QdXwspWCmr4zxaM8xYGjw",
  "https://drive.google.com/uc?export=download&id=155fdzqTvbj8UXBg3ec6rl_mzMQvIj2-U",
  "https://drive.google.com/uc?export=download&id=1pKgrLmtBhiGvzY5fSdzQSW-bkS5TqOnJ",
  "https://drive.google.com/uc?export=download&id=171RiIsQWyqQSijPz_0rD9MMCE_XMywzR",
  "https://drive.google.com/uc?export=download&id=1nDYJN6ZRecfcvywIfqPvMNqZVMoPb4xw",
  "https://drive.google.com/uc?export=download&id=1E04hAyQtf4qOMcjOzFlezkYsvJ7NyHNl",
  "https://drive.google.com/uc?export=download&id=1GkX-269ZiSy9NsFKyGuB-ERBottHOQvy",
  "https://drive.google.com/uc?export=download&id=1PjhYx878wfn8fELmNv7fbAApLUQ5_IPe",
  "https://drive.google.com/uc?export=download&id=1XgE1cjPHHvbkTrzYgh8PRM8N02yZSydg",
  "https://drive.google.com/uc?export=download&id=1Zq03i75vGjKiEMJpfmdGcrczrccSXynl",
  "https://drive.google.com/uc?export=download&id=12ytxRBrAli-A73e9K0zUDSxfgCSiym_0",
  "https://drive.google.com/uc?export=download&id=1JFFKfykam96npyffn5WfWVcHiN89iZQw",
  "https://drive.google.com/uc?export=download&id=1VSFpGAR9QspYoDGnQ2mBx6Cii0usu5Xc",
  "https://drive.google.com/uc?export=download&id=1Y5v177S5QTS2wi-By8WEVU_sinpD8Qo1",
  "https://drive.google.com/uc?export=download&id=1Z34YDzVI0dFF1ESPWVs_d0sc-yjjj38w",
  "https://drive.google.com/uc?export=download&id=1V2LE85pnRiftFc2AEX1zR1C1pHPNFLed",
  "https://drive.google.com/uc?export=download&id=1Pt42fajmOO72ExCaRjqqsopOOlyGDR4L",
];