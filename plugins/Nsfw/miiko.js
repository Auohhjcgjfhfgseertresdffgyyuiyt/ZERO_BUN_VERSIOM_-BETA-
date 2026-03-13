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
          caption: `Nih *${name}* miiko cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['miiko']
handler.tags = ['premium']
handler.command = /^(miiko)$/i

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
  "https://drive.google.com/uc?export=download&id=1rbmw1WgYZtcqKwMJojS_JuRkGLyB5Izb",
  "https://drive.google.com/uc?export=download&id=1ojAbtkCNeYj26hd1TpopLyGftG8rrKAj",
  "https://drive.google.com/uc?export=download&id=1AOQ-Ry0t6Eo383PXbOQkmu5ZkED9Wdf_",
  "https://drive.google.com/uc?export=download&id=1ha5-7xNs2nANf3nOM0UAMYASvuqXF-eA",
  "https://drive.google.com/uc?export=download&id=1JZG-2A0-cLvMDHBWvTgLGb3CmFMudrv_",
  "https://drive.google.com/uc?export=download&id=1aMuukMOUwvrwZj9lJZmRdY84-tTsNqdV",
  "https://drive.google.com/uc?export=download&id=172v3sDUoOuehRXHO4KcARub332wD3kSG",
  "https://drive.google.com/uc?export=download&id=1zUNR4HzUANTcFn-26ZsJGfG_Ne4sQVkn",
  "https://drive.google.com/uc?export=download&id=13flSlFGc-bX7V0jIACYirUK1LMuBf19j",
  "https://drive.google.com/uc?export=download&id=17-UurAAYeF4xLBc3cursALWj3zpyr_ik",
  "https://drive.google.com/uc?export=download&id=193R2TYZJyVzjLQ3pyzCvLhhrV5OpE7Py",
  "https://drive.google.com/uc?export=download&id=153pKbDLiCBy6aKZULAmUy2Mn7hQMeZrr",
  "https://drive.google.com/uc?export=download&id=16SImnZ13RUoDWf33Wpgg7Ya6WEP_sQyg",
  "https://drive.google.com/uc?export=download&id=17ctSysJtLbFNg37ntyRBl1UAcOAJWNyS",
  "https://drive.google.com/uc?export=download&id=1lpWDd8kQDsq0YQOrzOSeHpKdvVDs56oy",
  "https://drive.google.com/uc?export=download&id=1lVDTVeJXWv4hqnCN6v_eUQ7SZBuAILAN",
  "https://drive.google.com/uc?export=download&id=1KdpsM5bbaXUaDxgEDxL-bgdcCy6dy8NG",
  "https://drive.google.com/uc?export=download&id=18OUi-Wmx4beODHlZ1d8muvhVxblbP9EF",
  "https://drive.google.com/uc?export=download&id=13zZeZ0U5SUCCLAsXW7eGqsqFTSq9Bq5j",
  "https://drive.google.com/uc?export=download&id=16JYx3KlP9IghLl_WLcDZnWBX6unwj5xX",
  "https://drive.google.com/uc?export=download&id=1PIhMvTT7Rd1L9joMUC-Sia2zZd0v_DlS",
  "https://drive.google.com/uc?export=download&id=1KG4DhodaM_tXGzedK6A47cHo81aAMeWB",
  "https://drive.google.com/uc?export=download&id=1seq4UCUxnRPsgQGQ4kus9E7RGAwaSvy3",
  "https://drive.google.com/uc?export=download&id=1xSmMVEMkliKRv5vb88Tp4Q9I7tGLdigh",
  "https://drive.google.com/uc?export=download&id=1MwAZ-_6oqTr7VyP57dQy93FfwIw1WyvV",
  "https://drive.google.com/uc?export=download&id=11-ba-m4Oj27O7ihKcE_JGR2poEpWaO3S",
  "https://drive.google.com/uc?export=download&id=1Fk0kbRQAwWjA0_bRtQqKmpS0zNnSYpjJ",
  "https://drive.google.com/uc?export=download&id=1kT68MCOxUw5YfrSyszc1jSKPipyAH0ui",
  "https://drive.google.com/uc?export=download&id=1GMpGoC2L-gXyZwx23I8IgF1UR6HPJCa_",
  "https://drive.google.com/uc?export=download&id=16v0glWZZaEzL3OShksP30_5laLfpkv-W",
  "https://drive.google.com/uc?export=download&id=17mMLGj2zYryI7KKde-kNkV6GIGKEv4IC",
  "https://drive.google.com/uc?export=download&id=13Tk-iJD46K5RfpYiDvVNrAQcDxPQ6Jgt",
  "https://drive.google.com/uc?export=download&id=116E7BhYP16h73cuv_5DsE2VDv-xr0_F-",
  "https://drive.google.com/uc?export=download&id=1JO29NTo-UPOVALan3qjf6-acgAzeSYqa",
  "https://drive.google.com/uc?export=download&id=1MH7pKUeuIyDpa1YXi7AzmsHFA3re4IwQ",
  "https://drive.google.com/uc?export=download&id=1cW8M5906w1tWZca9sBlR2rZUI5kbn2Jx",
  "https://drive.google.com/uc?export=download&id=1RZrPn-I9oT674ekgod3y28sBA7gFZvlI",
  "https://drive.google.com/uc?export=download&id=1lSj_x3KRFp8eChZC8Tmzx9Xg1y6QWtpV",
  "https://drive.google.com/uc?export=download&id=1rze7tsYijG0EQL16p56bX7VGPMo_LKEL",
  "https://drive.google.com/uc?export=download&id=1LGV5gRGLT8xYyoY28kD_VMUpAKxyg3kz",
  "https://drive.google.com/uc?export=download&id=1C6AyyLPEVzT2hIhHrydRgIBBVlPc8-b8",
  "https://drive.google.com/uc?export=download&id=118InBHbxzbiuvFl22f7H-t-vFoaaUhjD",
  "https://drive.google.com/uc?export=download&id=1lCa1WZQdzCPQ2lyon0-3_973zAP4BIos",
  "https://drive.google.com/uc?export=download&id=1DuqL3K4Ui2m18-DjmY-VsFls6eU8jvmi",
  "https://drive.google.com/uc?export=download&id=1cU3lu4XhDKd-eEvE2nJHi-GuGJ9Q0Ck-",
  "https://drive.google.com/uc?export=download&id=1DuSVFPeS13TlMthu1rl0TFKt0Xzx9-dF",
  "https://drive.google.com/uc?export=download&id=1EU9mYDU7WSUdo58JskwMmMhIxhiI5t18",
  "https://drive.google.com/uc?export=download&id=1juUVT7lirhNq39peyWGlkAhKmVVMp37W",
  "https://drive.google.com/uc?export=download&id=1chDcJKxXGv3i8xsCRaZ8-FY1j7g_bH44",
  "https://drive.google.com/uc?export=download&id=1CHcyxoO0NtTH5wvTT7-wdBo5dXKYdysX",
  "https://drive.google.com/uc?export=download&id=1hKbnhBTAvWzd-0H5X2NTl5KIhLqC_IqZ",
  "https://drive.google.com/uc?export=download&id=1dcnJ6zwtwHLDGOosK8mlFQ-QVNq-34c6",
  "https://drive.google.com/uc?export=download&id=1DfibC9l01j3HAPUgDH0oqoAui-sqdIB8",
  "https://drive.google.com/uc?export=download&id=1E5AIClUTFEIPiEREjFRGjWdn7CITxTXw",
  "https://drive.google.com/uc?export=download&id=1eBHwX3x1JADVvW0JA1a7imv75tCeHmPt",
  "https://drive.google.com/uc?export=download&id=1v0GARVmP0s0DavOH3yQUtj6vZ1KjoULf",
  "https://drive.google.com/uc?export=download&id=1IixsHEgvNlKEdglanCTsYZ7uUvNRHhGO",
  "https://drive.google.com/uc?export=download&id=1ZXA_frL-x0QcjgTq3svgVaD0qTJZSUd_",
  "https://drive.google.com/uc?export=download&id=1ICbvWYOocPB6X5wVWXNgWxi5aqK-l2II",
  "https://drive.google.com/uc?export=download&id=1aW7gJqgorWbCSUboEWKiCVZA4V3TTBsz",
];