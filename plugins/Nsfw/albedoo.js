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

handler.help = ['albedoo']
handler.tags = ['premium']
handler.command = /^(albedoo)$/i

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
  "https://drive.google.com/uc?export=download&id=1uDOl7blHeX9W-CYBm4WEoLDOX4X-KQhr",
  "https://drive.google.com/uc?export=download&id=11AvAku2ceDZiQh3VyTjdPrM1-BpYE5QY",
  "https://drive.google.com/uc?export=download&id=1VI_hcmgrjXaVZ6TMXhcHGDKqVuhkLzpP",
  "https://drive.google.com/uc?export=download&id=1vbRa3J9u5hAs-vRJqyRZyhJGOHVnQuFm",
  "https://drive.google.com/uc?export=download&id=1Tnr6cPIfscGbMbL7wFg9Z1guh1vFbbz6",
  "https://drive.google.com/uc?export=download&id=1tMRxtvarxGvKNR2vTbz4VO_6jassy8e9",
  "https://drive.google.com/uc?export=download&id=13HxsT_6bF6z66XrTBB_S6iIUppyykOeU",
  "https://drive.google.com/uc?export=download&id=14mszeGaKg_PKd9DHZuWYhOldLDImc2RP",
  "https://drive.google.com/uc?export=download&id=1ftyxsASjyDhiMsTjLa5u8B6EMyvJSrqX",
  "https://drive.google.com/uc?export=download&id=1qrs1VusA7gKX2hwrzRRyU_CiCo47hVqG",
  "https://drive.google.com/uc?export=download&id=17cP0HEsr9ML9HBmPgt8J-Ek6y7bxLEao",
  "https://drive.google.com/uc?export=download&id=1IPn1Rex9FXjBuJb99ByhtwNUmU_H0iX-",
  "https://drive.google.com/uc?export=download&id=1LjXZqkmBEo4JejGTHjkhUeAmXiJWv4F7",
  "https://drive.google.com/uc?export=download&id=1cE4-vjkMpr3cvMbEOoE5eXtlSDamvHfO",
  "https://drive.google.com/uc?export=download&id=1dI1XdyUlF4K0EeML-Qydyc2fgQB6lKUC",
  "https://drive.google.com/uc?export=download&id=1SYonpwBMs891ZPyK68aMEwN62W6rDrA2",
  "https://drive.google.com/uc?export=download&id=1Sw46ZaH8_KOYeGJpaJnhD_g9BXkE6ZWv",
  "https://drive.google.com/uc?export=download&id=1W-UhAV13BwU2PXbP0kgIKueGRyLZ8Oe2",
  "https://drive.google.com/uc?export=download&id=1wnjiRL8J2CvxyfeXwIWL6yKkTWe0D9hG",
  "https://drive.google.com/uc?export=download&id=1o5xnM0s2xtpXr2c00REABa3w6SIfItkQ",
  "https://drive.google.com/uc?export=download&id=1Gk5jBsZLKVyyFxxJNfSMvTEEV93f_hAE",
  "https://drive.google.com/uc?export=download&id=1V9II39adqwdVbMnXcjTVXLKZ_s7gXX2e",
  "https://drive.google.com/uc?export=download&id=1Bf5upMvavumatRKkIevu4vsVrqSfqNka",
  "https://drive.google.com/uc?export=download&id=1sSYVy0Se7BRmthFWJpy8UFqREvsyr5Vs",
  "https://drive.google.com/uc?export=download&id=1E08k04YgrDJYG_DP766hEZ98A6gn_Lpi",
  "https://drive.google.com/uc?export=download&id=18vIUDy9W5muJgb04u0r1wpIM6Wcb9uv1",
  "https://drive.google.com/uc?export=download&id=1DGhGCil_pV2Ybmykt31FfHW2OyOstxzV",
  "https://drive.google.com/uc?export=download&id=1FVyu0xPl7Z-niXuv9Jn_iA7zQ4b9raQx",
  "https://drive.google.com/uc?export=download&id=1QyxRoE4QKtYHaTEsKXudnXwtfVCvhRGT",
  "https://drive.google.com/uc?export=download&id=1pB8Y2f1dOZnxm-s2qONrUL-u8UFVzXC4",
  "https://drive.google.com/uc?export=download&id=1qnPlNVJWHZfomQ9FmRCnng4ymAWG12B2",
  "https://drive.google.com/uc?export=download&id=1NHPRNpB89ie5VEpj5b2NtlYygz3AmlUz",
  "https://drive.google.com/uc?export=download&id=1irqrGClQ5_1LH5fMX0aOQMznenT-wZGN",
  "https://drive.google.com/uc?export=download&id=1VsBBNPq-B9fiHzl7D6vAYHNRl07V3qum",
  "https://drive.google.com/uc?export=download&id=1YBw1XQGgK5ndkfUimCPt42VRIg_olVaF",
  "https://drive.google.com/uc?export=download&id=19lRQU2orCQiQNAVQyF1A03XkjI8fK-Fe",
  "https://drive.google.com/uc?export=download&id=1ZveX7557ZoZ86FZFE5KpXvQc3Nquksh5",
  "https://drive.google.com/uc?export=download&id=12jiFSwNdIQDOxl9jrUr82ElOeVFSDcrk",
  "https://drive.google.com/uc?export=download&id=1TufSSQYSKn1U2msEqS8o5vTx3jFusELq",
  "https://drive.google.com/uc?export=download&id=1HxL484yqwLQEZmf_hoT0v4Sqhl_ki1J9",
  "https://drive.google.com/uc?export=download&id=11vr1n7dc9NjqJFww6JWZCF9gWe6m9xj_",
  "https://drive.google.com/uc?export=download&id=1m4xzEZVcYIMdmHYro2ifOgX_DNIFLcLD",
  "https://drive.google.com/uc?export=download&id=1xupCblsL28PhXmwbdEqmiRuliudnTsHJ",
  "https://drive.google.com/uc?export=download&id=1jOZC36g9OJ7ttzcAej4MA_4vshwjvOyB",
  "https://drive.google.com/uc?export=download&id=1ElrRpRy4vY5i5dOVMTNH7FxGx-F81H0a",
  "https://drive.google.com/uc?export=download&id=1KZc7j0OfPWCodY_eTTX6pmjkyMkuocZz",
  "https://drive.google.com/uc?export=download&id=1CHluC--INDCcYUtPM3kpMDSXwml82JVh",
  "https://drive.google.com/uc?export=download&id=18hmGlEGGpEe-YhMseU06ZTaDovox1PEQ",
  "https://drive.google.com/uc?export=download&id=1F7UfH2TTL2tEo9C7dHM9qVXEfW0AHSsT",
  "https://drive.google.com/uc?export=download&id=1_nhOH87HGtcWApCIgQU4Wx4ILxMuli0r",
  "https://drive.google.com/uc?export=download&id=11CDuNH2MRvh9Ldc_TQYcmuJEtq5AbFci",
  "https://drive.google.com/uc?export=download&id=1CsAu7fahAD6ZZEDmucluQLV_xfGBlI_t",
  "https://drive.google.com/uc?export=download&id=1v1tDf1wcwx70D_yQ657eTswBophwuLue",
  "https://drive.google.com/uc?export=download&id=1Uir2Gdk-PqD2fwqL5mKaMzarr5uAq8wu",
  "https://drive.google.com/uc?export=download&id=16tAG1oLReGbE-Catl2y__HAgUC_5RLpO",
  "https://drive.google.com/uc?export=download&id=1W-9A06ieMHu7S4HH381AWf3ne0H92mVp",
  "https://drive.google.com/uc?export=download&id=1aX7tU7orufHIpz6s2z6kwafPqF7rcyAL",
  "https://drive.google.com/uc?export=download&id=1cG8ESrRDB72g2QEVTKlW9b1zUIh7-EWU",
  "https://drive.google.com/uc?export=download&id=151YBBSwjs9aHtx5r57VmXldgkIFodn0A",
  "https://drive.google.com/uc?export=download&id=1-2YIWZ-q1TM06zgpxzf4ikf7_G9uOix6",
  "https://drive.google.com/uc?export=download&id=1gsqAjcXzIyfijUZnhwpRJcpaiiFlgtKO",
  "https://drive.google.com/uc?export=download&id=1CL7G46a35HBX7MfRCukT7wUQCn3-uFWI",
  "https://drive.google.com/uc?export=download&id=1xtlftbFAJDc5ZKdtk_zRyyPT2fLKB9Lz",
  "https://drive.google.com/uc?export=download&id=1f2RP0KsS-tScc6sy6yswST8xQ1IUEXmc",
  "https://drive.google.com/uc?export=download&id=1769Kg0UL3JxkF8ixmSkG347DiAmhYIbg",
  "https://drive.google.com/uc?export=download&id=19zdgHm-vJUbIMtnLEDpcE6REUmGQlj4a",
  "https://drive.google.com/uc?export=download&id=1pHf1R68NqkpraKBRp6u2kaM0NRQL__fq",
];