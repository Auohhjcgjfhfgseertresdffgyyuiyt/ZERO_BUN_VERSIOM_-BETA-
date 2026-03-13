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
          caption: `Nih *${name}* monaa cosplay nya.`
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
}

handler.help = ['mina']
handler.tags = ['premium']
handler.command = /^(mina)$/i

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
  "https://drive.google.com/uc?export=download&id=1LAXuK4UFxo4uQxw-BFDxpkkby0mbYcBd",
  "https://drive.google.com/uc?export=download&id=1UiVtvPDnuLiCbUQBgG8kL8janboiAUHv",
  "https://drive.google.com/uc?export=download&id=1ZW2Ekm7ZTTK0W5JXl9RW3mDAs3PvS9z4",
  "https://drive.google.com/uc?export=download&id=1UnNxEK6tHuUSMbNRZP1ErWtfXHU0dqUn",
  "https://drive.google.com/uc?export=download&id=1b8Bf5d-Eryu2xUhAnfnQ1xpAd6Tm-7l9",
  "https://drive.google.com/uc?export=download&id=1CfbGrGi_-HeTyBFqT48H2v9VIfHwCf-C",
  "https://drive.google.com/uc?export=download&id=1a83k7oBAJjCnjDtUNUc15ucEZ3ixl6Pq",
  "https://drive.google.com/uc?export=download&id=1dP7eaqtaOCgo9rhfxdH32l8oyG2m854Z",
  "https://drive.google.com/uc?export=download&id=1a5xGA7d8DFZ3UhIolmBWsINBRDjz1eIT",
  "https://drive.google.com/uc?export=download&id=12Lk3RZXxr1wzmtkpM5RLMaQv_WtXE-g1",
  "https://drive.google.com/uc?export=download&id=14gQ-QnVjrgux3MSXt-DryHvgJ8grAVC9",
  "https://drive.google.com/uc?export=download&id=1RujuPEZ00yz0z9tOrGJXXaPYmpo6sr1C",
  "https://drive.google.com/uc?export=download&id=12kCsAf6QDRx1dGRlXQ1WcskHiup6LTjK",
  "https://drive.google.com/uc?export=download&id=1s2BMRQYLBihxJ0DjQLyoFCWVPjGLBSyq",
  "https://drive.google.com/uc?export=download&id=1OJx8qjIFW10w-aD60uQlUD3s-1T__2QS",
  "https://drive.google.com/uc?export=download&id=1GyfZigXepO6BidP9J-JRPVbkL6Zhjto5",
  "https://drive.google.com/uc?export=download&id=1W4OhApSNp8oNzYCtu0CUkW5Bz_CEu9fx",
  "https://drive.google.com/uc?export=download&id=1jzojpRmv5G0_N_NnVEzXd1ueMpXTcsVb",
  "https://drive.google.com/uc?export=download&id=1NqoWBLSoFkKSFxPU3V2N6Pl5kTRiupns",
  "https://drive.google.com/uc?export=download&id=1AeFDZHsKWrHlx10FJYBRO-iQGukzIw-o",
  "https://drive.google.com/uc?export=download&id=1S7y9Pfctst-RSiDtJOebCO5fPS8Dd0HK",
  "https://drive.google.com/uc?export=download&id=1LJi_MYW9CpWRX35-lE5bn0u6AFKQ9tyO",
  "https://drive.google.com/uc?export=download&id=1IhF_nC5FHHJRzhy1oliyerFf8HGlV-3a",
  "https://drive.google.com/uc?export=download&id=1fE0ohub7B2VZgixKFDctrBYt4OS3-Foa",
  "https://drive.google.com/uc?export=download&id=1tBtMtZbO5c1XhhEAXwh26pnkaMDhqwsp",
  "https://drive.google.com/uc?export=download&id=1ifchU7lhuD9zpvZLN0hBaBJ6RSBwfei9",
  "https://drive.google.com/uc?export=download&id=1I0LEsFiRbHvsXmR5ic2iKlzRbLTrme3-",
  "https://drive.google.com/uc?export=download&id=1n_Y3jx_rdy4c8ncW_rR_dFoHV-955RJg",
  "https://drive.google.com/uc?export=download&id=1g32ubyRcHup7lINUuk_q6RCANeT9jsZC",
  "https://drive.google.com/uc?export=download&id=1_sCtmqabf6ppTupCRk2eOioky88DY1QJ",
  "https://drive.google.com/uc?export=download&id=1t_zIuc5-TnHhughkKj4WHu4Yw_EvJzur",
  "https://drive.google.com/uc?export=download&id=1VF0pqRoXc-IgqTxarRW0Fx-FH6n8tGeH",
  "https://drive.google.com/uc?export=download&id=1WlCugxffzTfxH9PcN3FUe2P6AbmLIRyD",
  "https://drive.google.com/uc?export=download&id=1ia3fs4OIuFoWkLNMRN3iRlQa74AzEk-Y",
  "https://drive.google.com/uc?export=download&id=1yowxVE-Ko9xc_Zc3xsOJ7TlwZLkuUcyd",
  "https://drive.google.com/uc?export=download&id=1UDdS4Zp3BtWcJaxBV7YsRUNB6fZJPWIG",
  "https://drive.google.com/uc?export=download&id=1Zc7a01EijRlMorwUJn-SwMbm6RE4Td-q",
  "https://drive.google.com/uc?export=download&id=139X9HqBqAp_abu9yeTMDdV5atpEEb8rF",
  "https://drive.google.com/uc?export=download&id=1j2VIIrRIBTJVbdqZVTb_fNXmmVj1Bp-N",
  "https://drive.google.com/uc?export=download&id=1N3Ro_yz_QFXqU_rymDH7PE4VdtMVtOoK",
  "https://drive.google.com/uc?export=download&id=1Gj9Cgu0vZuXZjxoFwCpF7JbL1otNqN3f",
  "https://drive.google.com/uc?export=download&id=19mgUK5eh9cMLeufYRmuK3keRr1VKJLXb",
  "https://drive.google.com/uc?export=download&id=1DOaPOCi054dPBVjAZezTc1s_lVQRVZu-",
  "https://drive.google.com/uc?export=download&id=1HyC0Bz5wRZXqPvVFgTIobAmQ56y8eikt",
  "https://drive.google.com/uc?export=download&id=11UAMp4SqwSx0TAt339pS-5llDxw13-8t",
  "https://drive.google.com/uc?export=download&id=1_ZOyzK88fbcIgEfprgIp-VcBdZQh6e5F",
  "https://drive.google.com/uc?export=download&id=1J3pidKYSYO1VEWdGRiCd8degAawiHNQY",
  "https://drive.google.com/uc?export=download&id=1XCrzMyqle8VX8Ht--cxmNuEUG8euFlxa",
  "https://drive.google.com/uc?export=download&id=1LJhreQlOktQLaVIiRv7zLj7YeufbZUeo",
  "https://drive.google.com/uc?export=download&id=1116U7qzufrPeuAxC6GRF6CUd2uFTJrMl",
];