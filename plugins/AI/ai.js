/**
   • Fitur: Gpt Ai
   • Sumber: https://whatsapp.com/channel/0029VbBS8ys0G0XnmJFRiV2v
   • Sumber Scrape: https://whatsapp.com/channel/0029VbANq6v0VycMue9vPs3u/578
**/
import axios from 'axios'

const MODELS = [
  'gpt-3.5-turbo',
  'gpt-4o-mini',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-5-mini',
  'gpt-5-nano'
]

const UA =
  'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'

async function chatgpt(question, { model = 'gpt-3.5-turbo' } = {}) {
  if (!question) throw 'Masukkan pertanyaan!'
  if (!MODELS.includes(model))
    throw `Model tersedia:\n${MODELS.map(v => `• ${v}`).join('\n')}`

  const page = await axios.get('https://minitoolai.com/chatGPT/', {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html'
    }
  })

  const cookie = page.headers['set-cookie']?.join('; ')
  if (!cookie) throw 'Cookie gagal didapat'

  const html = page.data
  const safety = html.match(/safety_identifier\s*=\s*"([^"]+)"/)?.[1]
  const utoken = html.match(/utoken\s*=\s*"([^"]+)"/)?.[1]

  if (!safety || !utoken) throw 'Token tidak ditemukan'

  const { data: cf } = await axios.post(
    'https://api.nekolabs.web.id/tls/bypass/cf-turnstile',
    {
      url: 'https://minitoolai.com/chatGPT/',
      siteKey: '0x4AAAAAABjI2cBIeVpBYEFi'
    },
    {
      headers: {
        'User-Agent': UA,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!cf?.result) throw 'CF token gagal'

  const { data: task } = await axios.post(
    'https://minitoolai.com/chatGPT/chatgpt_stream.php',
    new URLSearchParams({
      safety_identifier: safety,
      utoken,
      select_model: model,
      temperature: '0.7',
      message: question,
      cft: encodeURIComponent(cf.result)
    }).toString(),
    {
      headers: {
        'User-Agent': UA,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Origin: 'https://minitoolai.com',
        Referer: 'https://minitoolai.com/chatGPT/',
        Cookie: cookie,
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )

  if (!task) throw 'Task token gagal'

  const { data: stream } = await axios.get(
    'https://minitoolai.com/chatGPT/chatgpt_stream.php',
    {
      params: { streamtoken: task },
      headers: {
        'User-Agent': UA,
        Origin: 'https://minitoolai.com',
        Referer: 'https://minitoolai.com/chatGPT/',
        Cookie: cookie,
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )

  let answer = ''

  for (const chunk of stream.split('\n\n')) {
    if (!chunk.includes('data: ')) continue
    try {
      const json = JSON.parse(chunk.split('data: ')[1])
      if (json.type === 'response.output_text.delta') {
        answer += json.delta
      }
    } catch {}
  }

  return answer.trim()
}

let handler = async (m, { text }) => {
  if (!text)
    return m.reply(
`💡*Gpt Chat Help!*
📌 *How to Use*
.gpt halo
.gpt --model gpt-4o-mini jelaskan AI
📍 *List Model*
${MODELS.map(v => `• ${v}`).join('\n')}`
    )

  let model = 'gpt-3.5-turbo'
  let query = text

  if (text.startsWith('--model')) {
    const sp = text.split(' ')
    model = sp[1]
    query = sp.slice(2).join(' ')
    if (!query) return m.reply('❌ Pertanyaan tidak boleh kosong')
  }

  await m.reply(loading.wait)
  try {
    const res = await chatgpt(query, { model })
    await m.reply(` GPT *(${model})*\n\n${res}`)
  } catch (e) {
    await m.reply(`❌ *Error*\n${e}`)
  }
}

handler.command = /^ai$/i
handler.tags = ['ai']
handler.help = ['ai <pertanyaan>', 'ai --model <model> <pertanyaan>']

export default handler