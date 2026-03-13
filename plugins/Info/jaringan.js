import os from "os"

function formatBytes(bytes) {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`
}

let handler = async (m, { conn }) => {
  // Bun tidak mendukung process.send
  let muptime = clockString(process.uptime() * 1000)

  // Hitung chat & grup
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith("@g.us"))

  // Memory
  const used = process.memoryUsage()

  // CPU
  const cpus = os.cpus().map(cpu => {
    cpu.total = Object.values(cpu.times).reduce((a, b) => a + b, 0)
    return cpu
  })

  const cpu = cpus.reduce(
    (acc, cpu, _, { length }) => {
      acc.speed += cpu.speed / length
      acc.total += cpu.total
      for (let type in cpu.times) acc.times[type] += cpu.times[type]
      return acc
    },
    {
      speed: 0,
      total: 0,
      times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 },
    }
  )

  // Speed test
  let old = performance.now()
  await m.reply("Loading Network...")
  let neww = performance.now()
  let speed = (neww - old).toFixed(2)

  // Memory Usage Text
  let memText =
    "```" +
    Object.keys(used)
      .map(k => `${k.padEnd(12, " ")}: ${formatBytes(used[k])}`)
      .join("\n") +
    "```"

  let msg = `🚩 Responds in *${speed} ms*

*📡 Server Status*
• Uptime: ${muptime}
• OS: ${os.platform()} (${os.arch()})
• CPU: ${cpu.speed.toFixed(2)} MHz × ${cpus.length} Core
• RAM: ${formatBytes(os.totalmem() - os.freemem())} / ${formatBytes(os.totalmem())}

*📦 Memory Usage*
${memText}

*💬 WhatsApp Stats*
• Total Chats: ${chats.length}
• Groups: ${groupsIn.length}
• Private: ${chats.length - groupsIn.length}
`

  await m.reply(msg)
}

handler.help = ["jaringan"]
handler.tags = ["info"]
handler.command = /^(jaringan|tester)$/i

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(":")
}