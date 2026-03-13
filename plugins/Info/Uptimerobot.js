async function postRequest(url, form) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache'
    },
    body: new URLSearchParams(form)
  })

  return await response.json()
}

const handler = async (m, { command, text }) => {
  const apiKey = 'u2327320-bb293a0774d112afd26c033e'

  if (!text) {
    return m.reply('❌ Gunakan:\nnew|url|nama\n\ndel|id\n\nstats')
  }

  const [action, input, inputs] = text.split('|')

  if (action === 'new') {
    try {
      const res = await postRequest(
        'https://api.uptimerobot.com/v2/newMonitor',
        {
          api_key: apiKey,
          format: 'json',
          type: 1,
          url: input,
          friendly_name: inputs || 'My Monitor'
        }
      )

      if (res.stat === 'ok') {
        m.reply(`✅ Monitor dibuat\nID: ${res.monitor.id}`)
      } else {
        m.reply(`❌ Gagal\n${res.error?.message || 'Unknown error'}`)
      }
    } catch (e) {
      console.error(e)
      m.reply('❌ Error saat membuat monitor')
    }

  } else if (action === 'del') {
    try {
      const res = await postRequest(
        'https://api.uptimerobot.com/v2/deleteMonitor',
        {
          api_key: apiKey,
          format: 'json',
          id: input
        }
      )

      if (res.stat === 'ok') {
        m.reply(`✅ Monitor ${input} dihapus`)
      } else {
        m.reply('❌ Gagal menghapus monitor')
      }
    } catch (e) {
      console.error(e)
      m.reply('❌ Error saat menghapus monitor')
    }

  } else if (action === 'stats') {
    try {
      const res = await postRequest(
        'https://api.uptimerobot.com/v2/getMonitors',
        {
          api_key: apiKey,
          format: 'json',
          logs: 1
        }
      )

      let msg = '📊 *UptimeRobot Stats*\n\n'
      for (const mtr of res.monitors) {
        msg += `• ${mtr.friendly_name}\n`
        msg += `URL: ${mtr.url}\n`
        msg += `Status: ${mtr.status === 2 ? '🟢 UP' : '🔴 DOWN'}\n\n`
      }

      m.reply(msg)
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal ambil statistik')
    }
  } else {
    m.reply('❌ Aksi tidak valid')
  }
}

handler.help = ['uptimerobot']
handler.tags = ['tools']
handler.owner = true
handler.command = /^(uptimerobot)$/i

export default handler