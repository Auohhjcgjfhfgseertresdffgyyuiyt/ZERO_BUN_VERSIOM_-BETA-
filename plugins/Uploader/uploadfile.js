const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

async function uploadFile(filePath) {
  const formData = new FormData()
  formData.append('file', fs.createReadStream(filePath))

  const headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8',
    'Origin': 'https://uploadf.com',
    'Referer': 'https://uploadf.com/id/',
    'X-Requested-With': 'XMLHttpRequest',
    ...formData.getHeaders()
  }

  const res = await axios.post(
    'https://uploadf.com/fileup.php',
    formData,
    { headers }
  )

  return {
    success: res.data.FLG,
    url: 'https://uploadf.com/s/' + res.data.NAME,
    originalName: res.data.NRF
  }
}

let handler = async (m, { conn, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (!mime) return m.reply('Reply file yang ingin di upload')

    await m.reply('Uploading file...')

    let media = await q.download()
    let path = './tmp_upload'

    fs.writeFileSync(path, media)

    let result = await uploadFile(path)

    fs.unlinkSync(path)

    if (!result.success) return m.reply('Upload gagal')

    let teks = `
*「 UPLOAD FILE 」*

📁 Nama : ${result.originalName}
🔗 Link : ${result.url}
`

    conn.reply(m.chat, teks, m)

  } catch (e) {
    console.log(e)
    m.reply('Upload error')
  }
}

handler.help = ['uploadfile']
handler.tags = ['tools']
handler.command = /^uploadf|uploadfile$/i

module.exports = handler