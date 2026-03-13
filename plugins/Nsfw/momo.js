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
          caption: `Nih *${name}* momo cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['momo']
handler.tags = ['premium']
handler.command = /^(momo)$/i

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
  "https://drive.google.com/uc?export=download&id=1m7LeLIdwiGciaNumNz5ZTK9exCZDqjfz",
  "https://drive.google.com/uc?export=download&id=1rs2PzawHeKMm4ruiJIzYkNB6Kt5zAhFW",
  "https://drive.google.com/uc?export=download&id=1nv9A4EHSeg6g22noeahCW_YhE24otWsP",
  "https://drive.google.com/uc?export=download&id=1fLqZLVHy3nEZxyZ_-z17D04QUm5aRtun",
  "https://drive.google.com/uc?export=download&id=1t-RiK3pwK_a0MKEF_L3C_hqLOswc7t6R",
  "https://drive.google.com/uc?export=download&id=15YvF321_Cc5T3FVlHzkrW9slySNOXlEk",
  "https://drive.google.com/uc?export=download&id=1C9wTJB73hX0M0xYZKqJVyQw1JYcaWbqg",
  "https://drive.google.com/uc?export=download&id=1JVnUux28VvSGpPwq7gzkB7egZdhf2fnL",
  "https://drive.google.com/uc?export=download&id=1LnkMoB9JqcUWcNZhoGwTlFOZmsclSKnV",
  "https://drive.google.com/uc?export=download&id=1Q9RYuj3sCoY-AhafhS1g1mBrMp-BV8IE",
  "https://drive.google.com/uc?export=download&id=1pfaf7fajJgqX2YtF423M9nD2_Svfjgnb",
  "https://drive.google.com/uc?export=download&id=1f3FncF5FVFoGllIzxsJL_0rWixzql0Hc",
  "https://drive.google.com/uc?export=download&id=1GGDjYWlXm24HHJe6XWOR5N5DBYMM8eRg",
  "https://drive.google.com/uc?export=download&id=1s4H245XfNWz0YK16NIeZxJfILmabaq45",
  "https://drive.google.com/uc?export=download&id=16DVbwGFUBga8RNEwr0ogZKnOe4P_mPvU",
  "https://drive.google.com/uc?export=download&id=1PssvyHMzHaDEcEXF3BIA8bAjQ8LThOTT",
  "https://drive.google.com/uc?export=download&id=1EMPYbuVasOFhnppLF_PyXRfV6SmGk5zm",
  "https://drive.google.com/uc?export=download&id=1uum3L5wMpm0J0zGLJmUXZxkwBG8Na96x",
  "https://drive.google.com/uc?export=download&id=1ecuvG1xQOYUTZnB8Am8kTAwYQpd-F7a0",
  "https://drive.google.com/uc?export=download&id=1DYMlDoSTWxBM0eaD8WZnQimSYkhSw4l7",
  "https://drive.google.com/uc?export=download&id=17qix3hHiEDcDWYDx4QE2sDPW-QQBDJJG",
  "https://drive.google.com/uc?export=download&id=1CDYFwyE_l314BEqwDepvborfTBNe-Cuq",
  "https://drive.google.com/uc?export=download&id=1eQ03uOwe_CH25oPCX8XZLDa-HzHDFbvQ",
  "https://drive.google.com/uc?export=download&id=17KCchXd6E2m-8-43mHZM_y53VUZyEZn6",
  "https://drive.google.com/uc?export=download&id=1crJUDfaXxukdRN7SAcTMJ1Wti_aSW_JV",
  "https://drive.google.com/uc?export=download&id=1VnqqpvPy6DQxAU0Nkq2a83xr2-8DmH9f",
  "https://drive.google.com/uc?export=download&id=1pgJhjEDaisuTadQ_i5SB0oy6lRfvAlvh",
  "https://drive.google.com/uc?export=download&id=1aMi3lj-DeTuBTDffFk6wTCAExpn0fj12",
  "https://drive.google.com/uc?export=download&id=1qFmz0eYrSFJ-NW46WzgYJ-r_QjH4oma7",
  "https://drive.google.com/uc?export=download&id=1iVAlakCQg9KxRAeuCrU8eNTAL4lyiXqf",
  "https://drive.google.com/uc?export=download&id=14Y0lt0x_udNGK7YWBUHPFrVj5T581iYj",
  "https://drive.google.com/uc?export=download&id=1_3OgSJYWTib9z2zBZQxoHlxFL-ht_0al",
  "https://drive.google.com/uc?export=download&id=1j3WKh8xn_ol4HZ-_xNH4IzfxqnMnh2tb",
  "https://drive.google.com/uc?export=download&id=16x2oM3nwfwbZIxRkZ68qjhLY_fIqUgbH",
  "https://drive.google.com/uc?export=download&id=148zAo08mXtldSIXpBtvcClNMPgxtDcWW",
  "https://drive.google.com/uc?export=download&id=1Tpie6-n_4mj_DaVCvmh16VoZoFuXAN-G",
  "https://drive.google.com/uc?export=download&id=1Qs14GXeMR3UKGJ5XoSEd7vTgP77Z4_1D",
  "https://drive.google.com/uc?export=download&id=1RLUGFu2LgxwBIbREs8G1pqoonDXDJwg9",
  "https://drive.google.com/uc?export=download&id=1WOqoMGAo_IPYot17RX4ckmWQQaI_gNQn",
  "https://drive.google.com/uc?export=download&id=18DtTt1g84TB-Rm93SvnkRhPpxfVXGXUr",
  "https://drive.google.com/uc?export=download&id=1svJGVNNFur-LVxqY4UCPkHIXOxhSwMn0",
  "https://drive.google.com/uc?export=download&id=1PbutB-1MedWDNVQcvMfTcamQlc9_BCxW",
  "https://drive.google.com/uc?export=download&id=13XKAKcUUaRt4zPebLzdeMJDrr0HApy6v",
  "https://drive.google.com/uc?export=download&id=1k3CzdTMUdwxLAzr2w_AsooSOL-8jvIFh",
  "https://drive.google.com/uc?export=download&id=1UE4-Wp2aJ2nI6bI7eB8yWVGzqj3trGiS",
  "https://drive.google.com/uc?export=download&id=1P9HS467o-rdcoUvl0Wg2tDp_945iCDPt",
];