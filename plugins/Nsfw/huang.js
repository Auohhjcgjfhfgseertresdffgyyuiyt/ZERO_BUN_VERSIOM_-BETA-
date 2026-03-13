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

handler.help = ['huang']
handler.tags = ['premium']
handler.command = /^(huang)$/i

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
  "https://drive.google.com/uc?export=download&id=1XHWEYaN1_4BMJs0OskCihUS8svr7qsgL",
  "https://drive.google.com/uc?export=download&id=1luI8qc57EG7jRD3TLvSK1Yh39x4tart7",
  "https://drive.google.com/uc?export=download&id=1fV3wdpgq0T_wfjJsfYm5tYYPAw3_U9dm",
  "https://drive.google.com/uc?export=download&id=10fi1hEWmq1NKCrZbq7a-YbGSSyzl8Jf7",
  "https://drive.google.com/uc?export=download&id=1MJYUX1HvDwvSaPzq3mYALqTAzCEqXb4k",
  "https://drive.google.com/uc?export=download&id=1_bl2T9G1o9FfbG40hmK8vMpoEJrP1N0Y",
  "https://drive.google.com/uc?export=download&id=1YoIxwW67gkodenntM4i9PhpM_ga1kXza",
  "https://drive.google.com/uc?export=download&id=1MV_K_fRERKezFB0PxEuOyqnvLcgPUBKT",
  "https://drive.google.com/uc?export=download&id=1YTMRt5vTadp0kaFl0Fc42Gfo75kWP0Mm",
  "https://drive.google.com/uc?export=download&id=1SQB70UABIDexyGwFpVsNhiq8dZ7AyiJa",
  "https://drive.google.com/uc?export=download&id=1UQhAaJ5d6jGkO5tT2IeJ4pnGZbOCgOGZ",
  "https://drive.google.com/uc?export=download&id=1rgwYWKullnVnwueWHh36_YcW2og1FTmc",
  "https://drive.google.com/uc?export=download&id=1D7iU63IDt7SMxSSKcaP4bgjxhxRY93mI",
  "https://drive.google.com/uc?export=download&id=13yx-fJY__dc5zDezCaVks6Zr-swh5k9o",
  "https://drive.google.com/uc?export=download&id=1s9MLEgcatcK7uJKic0faFcNJ4FxKgQXG",
  "https://drive.google.com/uc?export=download&id=1wezByVjwQVxMspO6YIP8_i0FD6IZJLoP",
  "https://drive.google.com/uc?export=download&id=1mRqCKYIccymq0cwA5hSr_iyWyxjaXGXg",
  "https://drive.google.com/uc?export=download&id=1v7OhAeig2GloVQRR-OzgZ4TuPlYSA0lS",
  "https://drive.google.com/uc?export=download&id=1p037R33pWiV77hpPa515DW0WVupNVPul",
  "https://drive.google.com/uc?export=download&id=1YsvHMpW9LLeNwNlpVtFomXbeRHbeo2pZ",
  "https://drive.google.com/uc?export=download&id=1Z0nqJLh6XZnNs87NfvArPa7yDRz2EpHk",
  "https://drive.google.com/uc?export=download&id=1MsQAwlD_BAt1ikYA4nqa1jRXl7Szixdl",
  "https://drive.google.com/uc?export=download&id=1ybc3buWDGvhkxaeNIQsh3m5FNqrS4Oy5",
  "https://drive.google.com/uc?export=download&id=1uZMpNaFVoXPtR21qAwOCeCPQDkZuvwl-",
  "https://drive.google.com/uc?export=download&id=17o4547naFcbA6KAGuOBQg4bkfFzvCM0O",
  "https://drive.google.com/uc?export=download&id=1AuRH16F3qbwcZQqRI_rAa4mnoZzBW2q1",
  "https://drive.google.com/uc?export=download&id=18okijpGjbVDNVm-A-Ow-2PJZQDckkQK2",
  "https://drive.google.com/uc?export=download&id=1iUK6EY-tzfkLSzYkR-rcxs85-M1TTQfg",
  "https://drive.google.com/uc?export=download&id=1xNMYPVTmU8hr7Kh50PRMFdJl0axkmONU",
  "https://drive.google.com/uc?export=download&id=1TyggLBXoxn5-zGUyKOI6uCV-nsKvlxeP",
  "https://drive.google.com/uc?export=download&id=15VtNTFhHeyE8n3h5HyMo10M-mQljuPOl",
  "https://drive.google.com/uc?export=download&id=1oDGo5MBuL7yd3Hd-GiRB9fAVh9izRVcu",
  "https://drive.google.com/uc?export=download&id=1V6Gc_zOpPxrTZwWTnkqWZ8kuRgn6sqct",
  "https://drive.google.com/uc?export=download&id=1xl0g18NhyRYagpn2owS7K_BQGNxTj2Xr",
  "https://drive.google.com/uc?export=download&id=16gvHTeiinoiXZvOsGHntVumyPT9rdSxh",
  "https://drive.google.com/uc?export=download&id=1gm4zIQ-y3I20H8AUUvPbXFwGYbIrC5yn",
  "https://drive.google.com/uc?export=download&id=1YLK3W4D5Cl5t1qyX-k10s83OuD4InNlS",
  "https://drive.google.com/uc?export=download&id=1eopjKrXoe3MahGet2BYiQ2I8lGC_r3Fg",
  "https://drive.google.com/uc?export=download&id=1TZqPptduJjh9CBFBVZY9zGYG8WLpYqzF",
  "https://drive.google.com/uc?export=download&id=1a498U6U_OGoC9Piw6N_UZB7ePVnXoAog",
  "https://drive.google.com/uc?export=download&id=1CxDp-SXuvYdvDOF5wAy4YDp3qaoOVyq6",
  "https://drive.google.com/uc?export=download&id=16jpztA8oB_fcA7R7q-Uwi0HvSnlBly4W",
  "https://drive.google.com/uc?export=download&id=1LkmolbhqKcfy0nXW0Mf6F_txLb8UpxCm",
  "https://drive.google.com/uc?export=download&id=1VDuoSxo0v-oz-0GwbKJlhvVLHMGGwSJ0",
  "https://drive.google.com/uc?export=download&id=128undJjD85ABq-WHDLQrH_CY_AUvSL4P",
  "https://drive.google.com/uc?export=download&id=1bFS0wAy1UTk9zlo8BBs_qcPeOXp57CI4",
  "https://drive.google.com/uc?export=download&id=1l5hthlDXcjjDpxJwPwvHCda5NXAdrwaf",
  "https://drive.google.com/uc?export=download&id=1w0OOZX8PQDcGwaKMrlKAk2vujhaibJ7B",
  "https://drive.google.com/uc?export=download&id=1LAhhQDI7Wd_qMQ5xs25p9Vn7I7KJkUvZ",
  "https://drive.google.com/uc?export=download&id=1MUEFr_GYErjeMXx4TIQ3YNRsloE4rRZS",
  "https://drive.google.com/uc?export=download&id=1TaCPiBgp_qen7zJ-58e0MVEi09N6GyG4",
  "https://drive.google.com/uc?export=download&id=1IVh5Cm9E7LfpPs621PqCU7oWHClcsdsS",
  "https://drive.google.com/uc?export=download&id=1zflj8Iid8MkwCZv5x_3WkYjLIowQov1-",
  "https://drive.google.com/uc?export=download&id=1YczwRt0RhP0Vd-UvZwqVA9gc4TOv-Pid",
  "https://drive.google.com/uc?export=download&id=17kvQIKYRHWz_DkYqBjz44J3A-xU3HZtL",
  "https://drive.google.com/uc?export=download&id=1zBwv9LtSaxGXwHboINlMz8TEz_8vAHBp",
  "https://drive.google.com/uc?export=download&id=1TT9NLwPwOlx7xQeAqd3qIO_Q98QJE6W3",
  "https://drive.google.com/uc?export=download&id=1XfcXgF67HiUbyETKfpjnkteG_6MGj8Ye",
  "https://drive.google.com/uc?export=download&id=170RnKOPMONXVS4Ca0wpVe585Es7XhvdC",
  "https://drive.google.com/uc?export=download&id=1LoRggC-RWiXWQOo6C0U6NvFY7hW5fCiu",
  "https://drive.google.com/uc?export=download&id=1YltO_qzc4W9uKqvhyrm_YdnaTMvDd9tw",
  "https://drive.google.com/uc?export=download&id=18d__ewbAc6qaacn566n7oYzpjLoiNCj4",
  "https://drive.google.com/uc?export=download&id=1DlmADktNPZLBacZXz3swgU43SDXswyta",
  "https://drive.google.com/uc?export=download&id=1O9m23j_t5s1e_y_9YPFf_J1eeX1SwPhJ",
];