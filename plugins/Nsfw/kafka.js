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
          caption: `Nih *${name}* kafka cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['kafka']
handler.tags = ['premium']
handler.command = /^(kafka)$/i

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
  "https://drive.google.com/uc?export=download&id=1vW4WE7iU0DuTvWwPTZom7-cEOvJhs77X",
  "https://drive.google.com/uc?export=download&id=1acJid0axxyQ8C9ANINWglRVE_Kn7RzXZ",
  "https://drive.google.com/uc?export=download&id=1YLgBICyNewBgQAQdz_uUpBghTbRhADc-",
  "https://drive.google.com/uc?export=download&id=1qgwX7S8A2vgkSsNjSAx-x1-NltdbI6aW",
  "https://drive.google.com/uc?export=download&id=19hcaf9ovtXWutmk-EOIlmvb-rugYlnrz",
  "https://drive.google.com/uc?export=download&id=1Bbb-gJwp2dTVRH9pxCNSRPhngZkB7wgH",
  "https://drive.google.com/uc?export=download&id=1xEzdbVBc2sX-aQyc8JQaU9Q8oSjQLi1G",
  "https://drive.google.com/uc?export=download&id=1ZGAz-QwfjbhCoWuFTDHU0aQm14b6gUEZ",
  "https://drive.google.com/uc?export=download&id=1P58M0rEC2ZC3rFsBFiEY7WfKSFnFWzpf",
  "https://drive.google.com/uc?export=download&id=1nWVe4LZLmxut4ApcpQse1BPf9Lmo2LE9",
  "https://drive.google.com/uc?export=download&id=1LSQmLbUeP9A439IUKRSjBKQ2LZdd2tc_",
  "https://drive.google.com/uc?export=download&id=1LeHnTLURv_jATvuswwpeL5B-q5jzpQxT",
  "https://drive.google.com/uc?export=download&id=1XVPUZrunTF2llOmz859mIMPzWctlcZQR",
  "https://drive.google.com/uc?export=download&id=1JupONSqkDxfBGa4ldIabdKiuKb1WHcEX",
  "https://drive.google.com/uc?export=download&id=1XuHHcwimmj873G52VT2kCxhzSACErzfM",
  "https://drive.google.com/uc?export=download&id=1z6Yo-AsTRWLkuUxhJXqF5lXHWUTP9XGe",
  "https://drive.google.com/uc?export=download&id=1jiszqupjI6hcvdVw5jvlBKyuzban4O7-",
  "https://drive.google.com/uc?export=download&id=1V6Z2_vZUjke14RGmvUOUdPcAB96ocv5y",
  "https://drive.google.com/uc?export=download&id=1UGDDWDUurV0ZdWrGuMA9ad0MLQVLe1oc",
  "https://drive.google.com/uc?export=download&id=1HZhCY3HnFUClxhOYFUheOcTYtPx5nZEp",
  "https://drive.google.com/uc?export=download&id=10dVjxXzdg1kF4EWNQBflNis5U1Ede2JU",
  "https://drive.google.com/uc?export=download&id=1f6lCn3LzeKvNZBQ_CXZcIQB1ZqW73CVg",
  "https://drive.google.com/uc?export=download&id=1zzZvalaeqfnLBYaxC3EmOsanr5l07TvA",
  "https://drive.google.com/uc?export=download&id=1Ae67Z8XJD28Lukq--6QJhT_vlYbo9riy",
  "https://drive.google.com/uc?export=download&id=1RR_Am84K3gO_j2q-86FBREvZ70LY1H4K",
  "https://drive.google.com/uc?export=download&id=1u4pPODBHiDHcseN2IvGMAOoi43wgfPzr",
  "https://drive.google.com/uc?export=download&id=1MB8YyzZL-2US52ZGXO0pPS5mUwITr1zb",
  "https://drive.google.com/uc?export=download&id=1_mHW01xk5W1bvDwgx1UIPGDT9wQD1Aqv",
  "https://drive.google.com/uc?export=download&id=1_gTlahS4wi1Q00rb1GdQI4_Rn8WKd8IB",
  "https://drive.google.com/uc?export=download&id=10Y-HJUtwX6xu68Znn3eoIZqLNuYIxTea",
  "https://drive.google.com/uc?export=download&id=1-7EaARcibRWMlFMuMzPHe6jUEBEY2qp9",
  "https://drive.google.com/uc?export=download&id=1tYpJauaVrjS9hivRTBIIp1gmdd_aP0Tu",
  "https://drive.google.com/uc?export=download&id=1DatlnFfZzo1ECQ2te5bBuYFPqBs7c-SU",
  "https://drive.google.com/uc?export=download&id=1WYJqgTfY9_MLZrx0Wi_3D2G5PNn1iYud",
  "https://drive.google.com/uc?export=download&id=1dwkk08yQaD9KKbtpPWPLCicNPAxR2LoU",
  "https://drive.google.com/uc?export=download&id=1cSaHKrUeNvlg_cqBU0u7JU7L6UOLRKDy",
  "https://drive.google.com/uc?export=download&id=19ScanMLLUT5EkT2L6wz--E3IyClNc91T",
  "https://drive.google.com/uc?export=download&id=1lLUl0Ifyj_oKzuWZl1jo85rOnG1E01xF",
  "https://drive.google.com/uc?export=download&id=1r7X9cwX_Uw-U4itejuoV4lS989p9AS5U",
  "https://drive.google.com/uc?export=download&id=1v63jrCbrp02rEK_YiLVKrbklib4PqMFG",
  "https://drive.google.com/uc?export=download&id=1xlBq8g78oKP9APiz1pnpsf6rZm6m6kv5",
  "https://drive.google.com/uc?export=download&id=1vBl7Jnrkg7_75-1SU8XY1sNzURNon-aF",
  "https://drive.google.com/uc?export=download&id=1rUFghLoSgtKx7311UXffvzXhqWIWbltr",
  "https://drive.google.com/uc?export=download&id=1GOVMSLI1LhBzC6O9eMKZxbik9-J9CctY",
  "https://drive.google.com/uc?export=download&id=10Ft9v8B4jojCTgi_J99u_ugC22g9Y2ff",
  "https://drive.google.com/uc?export=download&id=1jEJ_cY6OyhPtldpcOxJS3ctcDrFk_oWr",
  "https://drive.google.com/uc?export=download&id=1mqrvrr1qFLFzC4HvUwgET8BXU9w-IToK",
  "https://drive.google.com/uc?export=download&id=1iubI2O_FIOUZQO7VdBAVDWrtxkoYF5AP",
  "https://drive.google.com/uc?export=download&id=1gNNqj9DTVb31cJW7ejGPdf1wvZEQMCnJ",
  "https://drive.google.com/uc?export=download&id=10weTG6qQlDAHQ3z8YyCyqOyIH4I9LABx",
  "https://drive.google.com/uc?export=download&id=1eHOpqi1tUxTFiST0RqQiCxszWLWO6pXV",
  "https://drive.google.com/uc?export=download&id=1Ww3j7mf3hg9o-UakO1Ksd1sVcimKYnyu",
  "https://drive.google.com/uc?export=download&id=10YP2PTYX86G19chfjtHawUy0vK7dKPmE",
  "https://drive.google.com/uc?export=download&id=12Oxw7ZL9Co0s05I39a3JHLRjrY9sNlWo",
  "https://drive.google.com/uc?export=download&id=1IaH9L8o6HvDF93dbaPsSpzX6Pbvy-eeC",
  "https://drive.google.com/uc?export=download&id=1owmauDjnYlLmLo9K3PRBYEtpl63Vg1e7",
  "https://drive.google.com/uc?export=download&id=17PicTzxR5boZSRHyYaWRHhkjUAqUANXP",
  "https://drive.google.com/uc?export=download&id=1k7TGtNz_OysAFvUSZPvpudHSJ098S0EN",
  "https://drive.google.com/uc?export=download&id=1QTW-G0donWtxgsluJKE-3dhibW7YgxVN",
  "https://drive.google.com/uc?export=download&id=1wp-thjQioItsIjpog3A7lNcuwdWfrEOy",
  "https://drive.google.com/uc?export=download&id=12-yy16C3hHEnboOwRAWFT3hiS3eMvD2D",
  "https://drive.google.com/uc?export=download&id=13geXo_KU3o_Ml0zF2rJqnhTPywuVffBA",
  "https://drive.google.com/uc?export=download&id=1j_3cJ2ParCSedybYqLW49T5BKATVopMV",
  "https://drive.google.com/uc?export=download&id=1-u1O39N5HEy9uP2ruSU-8Z8TRviGiKsA",
  "https://drive.google.com/uc?export=download&id=1IXFICr8ihgOBoA0KLs2CQoYhL2mincYk",
  "https://drive.google.com/uc?export=download&id=1EoD8tK_G5ddRUGnLdv5fOsT7zNYWDW4f",
  "https://drive.google.com/uc?export=download&id=14uyN4MMm3g_lcBP_EmdmtyYi9oJ5xyfw",
  "https://drive.google.com/uc?export=download&id=1uhP-vuHd6KcAu8f5beTtwqtMfw5pThLV",
  "https://drive.google.com/uc?export=download&id=1hAXul6H1F3l-Pz5jy5Ypj8i27M3hnnNX",
  "https://drive.google.com/uc?export=download&id=14SzYOCuKY-qHEMrKbHTQNtaWmE6pwKab",
  "https://drive.google.com/uc?export=download&id=1yIbry6gyAcK7BI8ZoY0amrvkHp9oQYIR",
  "https://drive.google.com/uc?export=download&id=1qeuIwekOTntndsgeAG1JGsYOib-UAQGc",
  "https://drive.google.com/uc?export=download&id=1WCOMRgcNrhW3VqIeeU_CEP4PcLAo_5dx",
  "https://drive.google.com/uc?export=download&id=1BNkUk4YqxxbKncLjPMIW0W2Uqtv3a83x",
  "https://drive.google.com/uc?export=download&id=1eXYhjixE2-PEBtcnpt-gPttCidCCjgOW",
  "https://drive.google.com/uc?export=download&id=1nXmQ6mn0sQ6Z3ltwW6a64d5HnPDvB65L",
  "https://drive.google.com/uc?export=download&id=1baa6XeYmzYCYPi9HfHIVGyj0-w4KaEyz",
  "https://drive.google.com/uc?export=download&id=1au0GINfo6TKiEdNGTzVRN27_s-uIqA04",
  "https://drive.google.com/uc?export=download&id=1M2PnG2HTRzysgY6NyOAYLjOSfdewVjLP",
  "https://drive.google.com/uc?export=download&id=1FiRKrqk51pnda0bdHTdwQbrMWD6V9YG-",
  "https://drive.google.com/uc?export=download&id=1McgXknsNbH5JpJFoIauS1-WqHmhrPrK4",
  "https://drive.google.com/uc?export=download&id=133gLkF18rFpqOOJHzxPJMoI8zGgCS3FA",
  "https://drive.google.com/uc?export=download&id=1MNC1FKi-Aju_UMBxJPNNRFafmTOD5vBW",
  "https://drive.google.com/uc?export=download&id=1_1xFYjkRmlRQiFAPHnZpYlPeBInPlmB_",
  "https://drive.google.com/uc?export=download&id=1GeSkxtvHofmGo73sOmyZkAImSq5OvW36",
  "https://drive.google.com/uc?export=download&id=1vcVo6occWqxcWaOv2no7PR7465NQwgzi",
  "https://drive.google.com/uc?export=download&id=1RWxX-lmDWzW298lU3AAT4e-ZhQ9R4s8X",
  "https://drive.google.com/uc?export=download&id=1Vi1t47azPHpfXPhFBysxqPlO1ScrVfUe",
  "https://drive.google.com/uc?export=download&id=1o8up6FZU-irlrc_0VoNinZYv_5_pDN13",
  "https://drive.google.com/uc?export=download&id=1G8qObBJ6L0IldT_ZHLJ29msdEIBlP7Li",
  "https://drive.google.com/uc?export=download&id=1SkI_uOQ-1qMK7EklQ6vUMaAEp-uV74ia",
  "https://drive.google.com/uc?export=download&id=1twg2Be38gV-bv3PYnd0_vksDnYevJLtp",
  "https://drive.google.com/uc?export=download&id=14s9Dg02xg8u7GL9JHsONY8gMkhm3L_Rx",
];