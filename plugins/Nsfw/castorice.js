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
          caption: `Nih *${name}* mura cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['castorice']
handler.tags = ['premium']
handler.command = /^(castorice)$/i

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
  "https://drive.google.com/uc?export=download&id=13SZ6OMoJRmyVrI3InUnbKx0s3x054uXG",
  "https://drive.google.com/uc?export=download&id=13R0Lq4WECWLefBkwUCbJhx9Vd6b-4CLe",
  "https://drive.google.com/uc?export=download&id=13J8kqlrR06n4Jin2WsF7PkxAojHScMIm",
  "https://drive.google.com/uc?export=download&id=13IeYO8MVZZi0CqgSgaVXu31Ke1P11y5N",
  "https://drive.google.com/uc?export=download&id=13HbTbEZX4S-kdRMcJNmMrfL7Opl8cDyp",
  "https://drive.google.com/uc?export=download&id=13GO5WATpKCMIhPnxl0QNUmjrSuhMHFjC",
  "https://drive.google.com/uc?export=download&id=13DjbncQb1Zj_axTXrjA12M0zSt95JydG",
  "https://drive.google.com/uc?export=download&id=13BwVuWXvHRh0Dylv16y2QDceUoUn1jJQ",
  "https://drive.google.com/uc?export=download&id=13BsLUHnjZi2qvsUTj4P9opZpRvOF-jb3",
  "https://drive.google.com/uc?export=download&id=134ZE8kPv6qf_23kSyLMV0bK65mDVnt3j",
  "https://drive.google.com/uc?export=download&id=12wfV2JQhQWLd1PZ2ii5-dPn_vHqobNXg",
  "https://drive.google.com/uc?export=download&id=12umxAIla_D8rHqqQbYaey3RPPBGb7QtR",
  "https://drive.google.com/uc?export=download&id=12rmU7Wnt3vKkq-owlJ0Rc1elftcPAGh5",
  "https://drive.google.com/uc?export=download&id=12rFRETugxSHZbZvB89fLy92Zxw3MhRvG",
  "https://drive.google.com/uc?export=download&id=12m1ibMYGxoaEhXSy0yDfJ-Y-Wuv7rUY7",
  "https://drive.google.com/uc?export=download&id=12ayho3VgnV8EyssokaUEnXq9sWRnYr2q",
  "https://drive.google.com/uc?export=download&id=12_ZKDVfR5Ut7yL3YI7eRC2QyMMINriqY",
  "https://drive.google.com/uc?export=download&id=12XoEcX9MGM8yncAo4zWyyHZbdS8LUXTX",
  "https://drive.google.com/uc?export=download&id=12R8OZXzYu5Djf8HH1RJPVZl5j6f8PK1s",
  "https://drive.google.com/uc?export=download&id=12Chwxy2AD-X9jAqEHT3yPK1Z2OpaImTN",
  "https://drive.google.com/uc?export=download&id=12ABaXFZn1EKV2d4q1NDeZPGiaRCELJ8d",
  "https://drive.google.com/uc?export=download&id=126McAA5_84Kod50E_SBSomnPij5JsuWz",
  "https://drive.google.com/uc?export=download&id=1268mF285OXbteS7hq8Tly0EbJbbnjA4R",
  "https://drive.google.com/uc?export=download&id=120LvicadHR03SSgiPUf0i8J2MeQY-CmZ",
  "https://drive.google.com/uc?export=download&id=11uLqjhRzLScGECzKX3qGKs33LciwySnq",
  "https://drive.google.com/uc?export=download&id=11su60ucAMVYW_XBEmb_SxDA_2Q4EOO5i",
  "https://drive.google.com/uc?export=download&id=11siIYpsQRAhXzDSgiZntlxzqKJ3bZhu7",
  "https://drive.google.com/uc?export=download&id=11o-DnAqEz3uEOkfcR_oB6bX-RDSEUVG3",
  "https://drive.google.com/uc?export=download&id=11h29ZCPd3x6p04xRuTMCmk8pbvpeIIIm",
  "https://drive.google.com/uc?export=download&id=11gzFW-U4qauEP5AMzJ45EZZf78ah9XOm",
  "https://drive.google.com/uc?export=download&id=11eJDiCGYq7O9-pTk2PR_Rasb_HlVL2y0",
  "https://drive.google.com/uc?export=download&id=11chVKLRLAw0pCYfHCj3a2foSRlkHRSo8",
  "https://drive.google.com/uc?export=download&id=11a4ELuX3uWkYPOticKFajf3PQL4M1ay3",
  "https://drive.google.com/uc?export=download&id=11QIt7LyBWEQsLMs6Jimz2sJQAbqAqagc",
  "https://drive.google.com/uc?export=download&id=11HJKqaQK3BkXjk7pITKSfpARoWca5rmf",
  "https://drive.google.com/uc?export=download&id=11Fi4PYm_5l7hFsAskC8LJk6_sg3m2oaM",
  "https://drive.google.com/uc?export=download&id=11ALE81FZcpoFxGhBFxniWZyC3Xb8hGVp",
  "https://drive.google.com/uc?export=download&id=117ZRf3cDrD5IdqzjbA6oCehJ6ct_exnE",
  "https://drive.google.com/uc?export=download&id=11696BeLO7l8l3U4C6GHSaOOMh2gNAsaz",
  "https://drive.google.com/uc?export=download&id=113U0jJ9A3uNO41u-X_JiUDgGizldXTfU",
  "https://drive.google.com/uc?export=download&id=10yY6w1lCC7Q0tVtgakkxNyHtjzxha6Qx",
  "https://drive.google.com/uc?export=download&id=10sNW8pv1gPumPgJM6L-Upzaj--cfvWwa",
  "https://drive.google.com/uc?export=download&id=10pLDwZ11HgWQjnFTz9NGB45byC59dTjY",
  "https://drive.google.com/uc?export=download&id=10jzraSvq6ABn_vzj-xYxFSgSEq1bzAn4",
  "https://drive.google.com/uc?export=download&id=10fv6DWzSHOHsAdE0Bl8xcZ4dXQFG1BpE",
  "https://drive.google.com/uc?export=download&id=10cje5Kj13Y7mQluT61Vu08gJ27OQV7W8",
  "https://drive.google.com/uc?export=download&id=10VENQgp0Tp4DkU27-g02fqgLkrVXyUsF",
  "https://drive.google.com/uc?export=download&id=10VDWJ1iQ5U_MC7s2Hs4wnubsrzuw-Vyq",
  "https://drive.google.com/uc?export=download&id=10T-pnzTxjJGvx6e5D0PQR_0yGzXNV2nA",
  "https://drive.google.com/uc?export=download&id=10Slw8yH4fm1--f8P13nNt5ramzBjXv5v",
  "https://drive.google.com/uc?export=download&id=10QxXnncg5rCGm4dOGJX_0L7XtXAlsm6M",
  "https://drive.google.com/uc?export=download&id=10PWsdnPuI--teYT9DAXF6PejjM-6NLRQ",
  "https://drive.google.com/uc?export=download&id=10LH_10Qiemb-4KybL6VaFoodHx9v_C1x",
  "https://drive.google.com/uc?export=download&id=10Jdkio0wIMlWm5G01QzHA09Km26HdsFd",
  "https://drive.google.com/uc?export=download&id=10Ilema1TjtkOJKSpCp_MdfhjHSoNUvpP",
  "https://drive.google.com/uc?export=download&id=10DL1LW2NTxSbEYFVJh2CBWtNxxS59deu",
  "https://drive.google.com/uc?export=download&id=108qBdXOl0COooHZSpl4QsMCnmux4P7YX",
  "https://drive.google.com/uc?export=download&id=108a_mP8MywtVULjHH9MZn_WwRKCjfeDs",
  "https://drive.google.com/uc?export=download&id=104PoVkus5dK-1-irYiGf7EswpcOj6vSQ",
  "https://drive.google.com/uc?export=download&id=102u6nyiZUSMx-s2ougTYs91Vuz64RslV",
  "https://drive.google.com/uc?export=download&id=1-wrpShtEKvOpHk9NAbWSuuM0xrxWeSi6",
  "https://drive.google.com/uc?export=download&id=1-rBLhOO1if3Y0WT4U2bwEUsOu9-Pe4Gj",
  "https://drive.google.com/uc?export=download&id=1-mC22_cLg-ZftyFAxDyTvnHWNw6KxfSu",
  "https://drive.google.com/uc?export=download&id=1-k27o720G8l26p7TaUa764X9Y6Fuxbc0",
  "https://drive.google.com/uc?export=download&id=1-ix0QKrZ7vBJzKz5lajNeT6z1grmJWGA",
  "https://drive.google.com/uc?export=download&id=1-i-Yh_PCGXveiMPWXSuDzVUPbnH5VfrB",
  "https://drive.google.com/uc?export=download&id=1-fOU-ovWczSeZVot3u9j_Xj5OggDwa3_",
  "https://drive.google.com/uc?export=download&id=1-dDIiM2NtBe3TgX6dzwZtnSCnlqf91Ul",
  "https://drive.google.com/uc?export=download&id=1-_rjpnioyPvOPWuepkB-Y68JzpRyPV-J",
  "https://drive.google.com/uc?export=download&id=1-T6pSKgEgg-BGe3aC-BDfdBcs_uyjPN9",
  "https://drive.google.com/uc?export=download&id=1-SbqTWHR8qAVed9ZzoXWhHsG9eNCI8yb",
  "https://drive.google.com/uc?export=download&id=1-Q-oQsInlz0t0XqU1RWzFh3yjAhPc1T-",
  "https://drive.google.com/uc?export=download&id=1-PbTH1xb5M3PQ-xvKbwEpnPyj9ceYFjk",
  "https://drive.google.com/uc?export=download&id=1-OFG3ZdrNHoEl_Xq84c1d11rMwq7pSiu",
  "https://drive.google.com/uc?export=download&id=1-Cy2cZhrwU_USKTPROjG-Rs1HCzwt5L8",
  "https://drive.google.com/uc?export=download&id=1-ChRqsx5UQqRZ0EdR_ox0AR5MEGm21BH",
  "https://drive.google.com/uc?export=download&id=1-BUNek6f6IqcBVp91ilp0c-LisVLlUV5",
  "https://drive.google.com/uc?export=download&id=1-9u1TSVd37PHSG2Z66lkkd9UOyeRFouX",
  "https://drive.google.com/uc?export=download&id=1-9GeWZzm7EebRj38IClnmvx8QGZ32ixt",
  "https://drive.google.com/uc?export=download&id=1-8X8kx75U_EQJybEInKXNo94zxfVTBY4",
  "https://drive.google.com/uc?export=download&id=1-74CoIinQDMvtcx4XtJOT--w4vQJgGKw",
];