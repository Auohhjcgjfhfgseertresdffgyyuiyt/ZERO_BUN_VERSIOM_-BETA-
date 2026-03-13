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

handler.help = ['arty']
handler.tags = ['premium']
handler.command = /^(arty)$/i

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
  "https://drive.google.com/uc?export=download&id=132U95KuknkBk49TGwjX2VOXs6C6dSCOE",
  "https://drive.google.com/uc?export=download&id=10hq16FaKr_NocXLnNQJtrDeT9tJ0VuPb",
  "https://drive.google.com/uc?export=download&id=1r3x87jXR0juUAXX9tovGpjGt8raJhEVc",
  "https://drive.google.com/uc?export=download&id=1LlSwgTzQlm3LhlgXc6gxqG1gNTYQ0L1u",
  "https://drive.google.com/uc?export=download&id=1o2adovJtelICvrgGgeC01RcQuVvLtfVX",
  "https://drive.google.com/uc?export=download&id=1EScZ_E5mNkRTFxBkXCgVncWs3vrbTHlu",
  "https://drive.google.com/uc?export=download&id=1xJa3_AU21-Xyu4LW9NZpOBI16vpJVQF4",
  "https://drive.google.com/uc?export=download&id=1xj8EJgSxGD68YjHpLWZ-8nPqiZX4SwB9",
  "https://drive.google.com/uc?export=download&id=1SC4VB2maCsx1rdfD-XxMxMSvrzN527yT",
  "https://drive.google.com/uc?export=download&id=1fJf2lbQ8Xttt0U6kjxfR9yp5Vj17Vh15",
  "https://drive.google.com/uc?export=download&id=1HvzhsOBh76uKr-zKkdRB4n6e5KZlrwPp",
  "https://drive.google.com/uc?export=download&id=1MT4SvAb2wQcM82VdphE78HcRfHFRDjrt",
  "https://drive.google.com/uc?export=download&id=1fmI9a2UXh1LcN99wpw-95hQ7PfvBZ5vr",
  "https://drive.google.com/uc?export=download&id=1Gt9yX2bSO7vNNQ5xz3gJqmXvPPK1NktP",
  "https://drive.google.com/uc?export=download&id=1WYa0a5b58tsFa8vDR1VKZFPDkmDxKj1s",
  "https://drive.google.com/uc?export=download&id=1Dd38oj0dOpx9cMsntJUtYGow5PK1EJDn",
  "https://drive.google.com/uc?export=download&id=1zgvKv81_3wVQYrBA2HqB5gpFBr1CCCc3",
  "https://drive.google.com/uc?export=download&id=1sD0HOelr9aMXtVJbuyLN4A073ZD7wfc2",
  "https://drive.google.com/uc?export=download&id=1Bm_mEkZE_qAwLc7CFXuf0jppLS6ofj78",
  "https://drive.google.com/uc?export=download&id=1SUj0RfFEMTqOakvqaQ2ptBQdtDSibEp9",
  "https://drive.google.com/uc?export=download&id=1lAOPsbZXhi2bRWc44a6ND5w0fwhrN_vS",
  "https://drive.google.com/uc?export=download&id=1lyc3uPrTdqMul3vILAAvkqG_AtWXct-B",
  "https://drive.google.com/uc?export=download&id=107EPqG8n16k4vtYcJh6t4TRc355lYRYh",
  "https://drive.google.com/uc?export=download&id=1dVdsditHJFC_3FbE9hCkIBPxIAnEQXq7",
  "https://drive.google.com/uc?export=download&id=1w5s4zj_OcJutp48hidzcJhvKivSTNgMv",
  "https://drive.google.com/uc?export=download&id=12_ZeG-D61pgDqc-9z5ydLyWGUwmKozW0",
  "https://drive.google.com/uc?export=download&id=1nJAKaIFIPOHt2rAFqGKKHwZyeOf00SOq",
  "https://drive.google.com/uc?export=download&id=1j3yEZVNZSXq6yXJTjPXzaUWV0WFabaZ_",
  "https://drive.google.com/uc?export=download&id=1QMnbPpKDSec2ks1dy9-VZ2XTEOgjuAib",
  "https://drive.google.com/uc?export=download&id=1wznA-bohYI-ptA1Vr34oBGQZQ_rNhOQd",
  "https://drive.google.com/uc?export=download&id=1RhGOztlz2EpTDvZAo-2RfEoeIrLBmYdH",
  "https://drive.google.com/uc?export=download&id=1hx1tRxfJzqnjV5Q_I6Zl5Fn0oImxomFW",
  "https://drive.google.com/uc?export=download&id=1X6SNhYdxFLnk9mKAQovhCkS1HUlOSmom",
  "https://drive.google.com/uc?export=download&id=11LcMX08bXxulHQAp6OGz6bYvBdbSGFhR",
  "https://drive.google.com/uc?export=download&id=1xHBv52boh7dFWC_MBWI19CiA_bG8b3nG",
  "https://drive.google.com/uc?export=download&id=1ER3b6O7fybDc9m-BsS_PcIRQve7PV3l2",
  "https://drive.google.com/uc?export=download&id=1yD6Go3qOzNPzB7WgCc1DCzjUEoakkKWz",
  "https://drive.google.com/uc?export=download&id=1sM4dmQpaekj5l8JCv0h-kHbi21gXVt0k",
  "https://drive.google.com/uc?export=download&id=1XCUD7doJCsj8nWzmcxcRYRMrTLUjJ9q6",
  "https://drive.google.com/uc?export=download&id=1vwqGWI_UobX7BBjOFN23kgfq2g6cgDj6",
  "https://drive.google.com/uc?export=download&id=1JUkypY8x9BXJxcmJ4Nm8KIU4LpgSl0bE",
  "https://drive.google.com/uc?export=download&id=1mgY8GOS8AK22IoOzBgpYwEpRd8mQEuwl",
  "https://drive.google.com/uc?export=download&id=1CLHUKONSoGtLsEBe4WF1zjTZ9ZoSWkOG",
  "https://drive.google.com/uc?export=download&id=1e0-ShnTSXO7n-n79siJ9zlmcFgdkLXY7",
  "https://drive.google.com/uc?export=download&id=1DVahEtwah3c4hDH8QkY2yvdPAJoIYKWs",
  "https://drive.google.com/uc?export=download&id=1bWSQHJUBo1rj9st58lb_oMg2ZPu_xZfV",
  "https://drive.google.com/uc?export=download&id=1-5B9NeLMVWneYCQvPFGVLz7_FLb8cclo",
  "https://drive.google.com/uc?export=download&id=1XB90n_JtacBGs7h-dR7QelMdQV0ZVr0i",
  "https://drive.google.com/uc?export=download&id=1HKsXrXBZt3sDzqh_gP2eGivD3_ieZ1FR",
  "https://drive.google.com/uc?export=download&id=1VU04YAZyHWc0dHpNPuOgrpxm_kDqe4_b",
  "https://drive.google.com/uc?export=download&id=1mKZF60W4ZLFycjJUrXXHCTxWhXovocLz",
  "https://drive.google.com/uc?export=download&id=1nTmquG0a8kjsFqxDOn0jb7-sRNCmdJuE",
  "https://drive.google.com/uc?export=download&id=1EvMr6rWFpfrA7FuzM5IqHes8xKo5Z-na",
  "https://drive.google.com/uc?export=download&id=119HM_guuZOaZUSo5jBa9l72_OUl-lfyy",
  "https://drive.google.com/uc?export=download&id=1ZQHYV5DXZI_Xd-pKFyQVBKudjg4V8Jdy",
  "https://drive.google.com/uc?export=download&id=1Mhxf61rbK-wacc_3DNd5g-afHux9_IIE",
  "https://drive.google.com/uc?export=download&id=1XsVx-EaF3aoaXtFz6OkHGnfPn4P7egT9",
  "https://drive.google.com/uc?export=download&id=1qwJeYcPakeZMaIiMvpXX5WXUG2By3fnG",
  "https://drive.google.com/uc?export=download&id=1nJUfjXsbvjW5RKTSQn382reb0PnCOEzt",
  "https://drive.google.com/uc?export=download&id=1ykUzAlHn2DCgqQjF_k6jH7M_swJZqw1p",
  "https://drive.google.com/uc?export=download&id=1DPzU-uuk-hKkA8lMLOYXNd5Ak-sI93Kj",
  "https://drive.google.com/uc?export=download&id=1B5WpKFG9as3yJLwgBKruY9_FRnDWZL7X",
  "https://drive.google.com/uc?export=download&id=1mGRL5EJzcV0ZZP4tcBYHL0pe3UH9FXHt",
  "https://drive.google.com/uc?export=download&id=1DaM4ItRnQS7XMZC9vfexYliw7KQpiuwJ",
  "https://drive.google.com/uc?export=download&id=1IcDwlOKi9A2lZITaKk1J9FqFBEoxlqJD",
  "https://drive.google.com/uc?export=download&id=1HSfwgDEpEHqAWDSqI4uiOePgC87Fgpqq",
  "https://drive.google.com/uc?export=download&id=19GLv4J7Jsu2J8DWgFc_rOICngZASGm12",
  "https://drive.google.com/uc?export=download&id=10b5p3xc_mHNnjygj-8K-2rLzAudQY3Ps",
  "https://drive.google.com/uc?export=download&id=1VO2RDGPLdjQTbSiR1eV3SZiOefPrqmu1",
  "https://drive.google.com/uc?export=download&id=1nKuAkFaINBBD2aaXpRgFEO-CK2vndhQr",
  "https://drive.google.com/uc?export=download&id=10_RVGhnc87ZkPb4LB9Tnxo2py7zUgZTc",
];