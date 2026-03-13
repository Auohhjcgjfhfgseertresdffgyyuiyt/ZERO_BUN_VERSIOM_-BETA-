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
          caption: `Nih *${name}* hinataa cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['hinataa']
handler.tags = ['premium']
handler.command = /^(hinataa)$/i

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
  "https://drive.google.com/uc?export=download&id=1d2duY4pDZlt8GZLeER1sVivCPcvyLDPa",
  "https://drive.google.com/uc?export=download&id=1qR1bb-sCVlgdUlfrWBIWpGmKCfdZtD5n",
  "https://drive.google.com/uc?export=download&id=1sNHzKfYgzy1pjC_sBAHiCzscuEJwTRdC",
  "https://drive.google.com/uc?export=download&id=1NxM_-C11xc06RAv4NBmnJH9BgJ6657rr",
  "https://drive.google.com/uc?export=download&id=1whSMUtmAwQLI6FP-63OH3QnUGBA0lM1C",
  "https://drive.google.com/uc?export=download&id=1utjIQcXOatBng-Vg1wzx0EMBNHXF50Kf",
  "https://drive.google.com/uc?export=download&id=1KkDI9Nqr8wco0Gf96sCO82l441XVNCfH",
  "https://drive.google.com/uc?export=download&id=1smjm2qi06mB5E9OxDPS31AER_NqPL-S0",
  "https://drive.google.com/uc?export=download&id=1qOnyFzLkRlclgneyQgpcuTGL2c9YxVuz",
  "https://drive.google.com/uc?export=download&id=1BNlSv9EgOEZ-de2geji-nWcj1PMAlYfh",
  "https://drive.google.com/uc?export=download&id=1vL7rTrKsbKb57ZDdTxU5J5NmOz7E1h0C",
  "https://drive.google.com/uc?export=download&id=1yA8hBHLfcP3mo83ZrHzbT9Vc8sPFvz2C",
  "https://drive.google.com/uc?export=download&id=1QMMsCHzDZARXgqAZSdL8cd90-yHbndcC",
  "https://drive.google.com/uc?export=download&id=1Md4aLpHVII53vIDF3OwvL44Tchk07LTX",
  "https://drive.google.com/uc?export=download&id=1TDBQt7-lECBmT5y4lB_UVg6PFP_KynVr",
  "https://drive.google.com/uc?export=download&id=1redk9gMYxD7XMln0MacxG4TP0PU6Puff",
  "https://drive.google.com/uc?export=download&id=1U4CeWUl5lTPMKwv6r3zKyrldqjB_jFv5",
  "https://drive.google.com/uc?export=download&id=1bKVrDM1XrFbhdx8sz1wvzuoMJzOf0c8T",
  "https://drive.google.com/uc?export=download&id=1M0Wu9HX6MdyxFtGSVJXoHZSGkCWWIh5C",
  "https://drive.google.com/uc?export=download&id=1b8rULf1EnqGQP1J5mqrzhV-OWE4BsQNT",
  "https://drive.google.com/uc?export=download&id=1nzfTtNFKrBDGBzCxflk_NpyTbqs_b7tu",
  "https://drive.google.com/uc?export=download&id=1xIA8RUn9t1VUQnm8HPctv_GnuyPrVrXf",
  "https://drive.google.com/uc?export=download&id=1U86eVlGKfbXF5HjtIz6r5BFepy9_Y2Xb",
  "https://drive.google.com/uc?export=download&id=1nRU_9nlW6egT5htpWXmXAls6GziaJraI",
  "https://drive.google.com/uc?export=download&id=1K8C4B73iTIHZIvp6VkJ89g6-l1tgmZ1a",
  "https://drive.google.com/uc?export=download&id=1NbPDfiKVv50F0Eg6ClZlQ33atiCWmgVP",
  "https://drive.google.com/uc?export=download&id=1kSIl4m6ldKau_KfJ2x3FsgyxK9N-7_uK",
  "https://drive.google.com/uc?export=download&id=1uNDqu3b66MZgcyfY5hqL_PlOhYC0UMvM",
  "https://drive.google.com/uc?export=download&id=18lXgJA9MEuDkDPpyug8g625EcL8rbJyS",
  "https://drive.google.com/uc?export=download&id=1_puvw3iEyP4UMjiToemYdGxz1ATv4bWi",
  "https://drive.google.com/uc?export=download&id=1C09nqS7JFjlEW5F-s6MNGf07y_Ci2DDW",
  "https://drive.google.com/uc?export=download&id=17CgpdiG8MEQF5u0X0MaKp-k37ZLI-0v2",
  "https://drive.google.com/uc?export=download&id=1zjo_sSazZx_iO7RV-l_XljN5HJ3Y1erL",
  "https://drive.google.com/uc?export=download&id=1HA0SGQeUAWkz_FuCRyL4io7_80d_HVys",
  "https://drive.google.com/uc?export=download&id=1EZLA1kjro33-c5QEXOJyQIzHN-sDArbd",
  "https://drive.google.com/uc?export=download&id=1qssTAXuge9DGWECPBxKPepKTmccEKLMT",
  "https://drive.google.com/uc?export=download&id=1WZNERfq1WfTFgsj7U9Gd4WAm7FM8NuVY",
  "https://drive.google.com/uc?export=download&id=1NN_LguthnilrkZDieZWimjzFPhL3aMb8",
  "https://drive.google.com/uc?export=download&id=17iwqpzwFKD8iboVRvmAKQSxYDQBUd0NH",
  "https://drive.google.com/uc?export=download&id=1-08Uy2TjQUi6JSrj_iVUOzbbhNDK-erZ",
  "https://drive.google.com/uc?export=download&id=17SCcpniq5sS2cmf9kA8tiPFK_ROsvxr-",
  "https://drive.google.com/uc?export=download&id=1ttGuYqMWU7F6sSlNVWMuJPJi8VadrEhS",
  "https://drive.google.com/uc?export=download&id=1cK8HChd8WzJJ18r28J2FwGe8L0Et4wyP",
  "https://drive.google.com/uc?export=download&id=1bGMVBRiTlwK0p3D4iMg54h3Qfss8Vj-f",
  "https://drive.google.com/uc?export=download&id=1sJzJHd9TszPLvpaf-oSsGYR2gvwg_lSZ",
  "https://drive.google.com/uc?export=download&id=1yuvpNSMNdreAzSX_qPLl2R3coCKGZwgI",
  "https://drive.google.com/uc?export=download&id=1Yb7-JeJGMFwa9wZeMo6XGeMRuAUVCi65",
  "https://drive.google.com/uc?export=download&id=1loAUdkBjUn87wnclTapivWBy9xlCPeww",
  "https://drive.google.com/uc?export=download&id=1K9iSNmrjbVnx0D4iZlh9p5d-FycDTsDa",
  "https://drive.google.com/uc?export=download&id=1UG0qbvmVVlcsCvI-I8zUWb63Z5j2GnMp",
  "https://drive.google.com/uc?export=download&id=1oBcjiXZwyrjUsUHZN0CuxYttGo7rQvQU",
  "https://drive.google.com/uc?export=download&id=1UGdt8j2_D4cheadUscgUA0g2lMYlwjgV",
  "https://drive.google.com/uc?export=download&id=1SAeJ_82h0qbm2aSNUwEICDQaASJKFM0n",
  "https://drive.google.com/uc?export=download&id=1YRH17FCLlscWJGbcV4p53GdacufO1873",
  "https://drive.google.com/uc?export=download&id=1XMG6fxCAWoUVuLpXMiDHe_REEiXFmQKe",
  "https://drive.google.com/uc?export=download&id=1cL-gVsUCfZ2eA52SlgINKfarFnfmLAnJ",
  "https://drive.google.com/uc?export=download&id=1kwn2K3Jn98QGN_woakNGB-s3KTZdfLY5",
  "https://drive.google.com/uc?export=download&id=1oGD-w1dQUzed4Hi8z7QdPK2bzHDts2Xl",
  "https://drive.google.com/uc?export=download&id=1PlR6KP0NRHPsA0x3QJR0UALCp30KzGk_",
  "https://drive.google.com/uc?export=download&id=1pxRrPCevd0CvRj60OtT20Sd52HGSkjy9",
  "https://drive.google.com/uc?export=download&id=1oTNxQU1xp72uh6kse2kCDWoaOW2kT-oa",
  "https://drive.google.com/uc?export=download&id=1ApGiAYRhAhsXtpF2I5Sy3muYwQgg4x4W",
  "https://drive.google.com/uc?export=download&id=1uA3lc9C1ekjoZzJiSYBMSpZ-UjdrqIIj",
  "https://drive.google.com/uc?export=download&id=1ipmPpbwIgHTBYICPaYgm6DWdFtsUCldA",
  "https://drive.google.com/uc?export=download&id=15rYM6wSgqVzAiOB1o_cR9fL5TsE2sc0d",
  "https://drive.google.com/uc?export=download&id=1Z4TRXbwyuzGD1GqTv1e84vDxeyMJ97E3",
  "https://drive.google.com/uc?export=download&id=1lbhqkn-GydVyWd5ANVNItAJ9r4PfZWhm",
  "https://drive.google.com/uc?export=download&id=17Fb187wNpqbh25YmW0z2647BVOcMigCV",
  "https://drive.google.com/uc?export=download&id=11Mx8iuRb0RUa1GDQRRUVFBQHSN6ZBOYx",
  "https://drive.google.com/uc?export=download&id=1Ph1v2y7uqhOr3Iko3-kFe99uIDoL1KMN",
  "https://drive.google.com/uc?export=download&id=1cw6Nbcg2GJKYc2GTNZs-8ynf3uTf2EGW",
  "https://drive.google.com/uc?export=download&id=1e1kHTXh_tKJz0avvG5lKXmKpXnk0PB0O",
  "https://drive.google.com/uc?export=download&id=18ySBZjeAr_Ua_NfoywbaBASQhr8sECbs",
];