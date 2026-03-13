import fs from "fs"
import path from "path"
import os from "os"
import moment from "../../modules/moment.js"

let handler = async (m, { conn, text }) => {
  try {

    /* ================= JIKA PILIH MENU ================= */
    if (text) return sendFolderMenu(m, text)

    /* ================= TIME ================= */
    moment.tz.setDefault("Asia/Jakarta")
    moment.locale("id")

    const timeWib = moment().format("HH:mm:ss")
    const week = moment().format("dddd")
    const calender = moment().format("DD MMMM YYYY")

    const dateIslamic = Intl.DateTimeFormat("id-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date())

    /* ================= INFO ================= */
    const data = global.db.data.others?.newinfo
    const info = data?.info ?? "-"
    const timeInfo = data
      ? clockString(new Date() - data.lastinfo)
      : "tidak ada"

    const block = await conn.fetchBlocklist()

    /* ================= UPTIME ================= */
    const uptimePanel = formatUptime(os.uptime())

    /* ================= FILTER FOLDER ================= */
    const pluginsDir = "./plugins"
    const excludedFolders = ["bot-function", "case", "game-answer"]

    const iconMap = {
      ai: "🤖",
      anime: "🎌",
      downloader: "⬇️",
      game: "🎮",
      fun: "🎉",
      rpg: "🧙",
      tools: "🛠",
      owner: "👑",
      nsfw: "🔞",
      search: "🔍",
      stickers: "🖼",
      store: "🏪",
      uploader: "📤",
      islamic: "🕌",
      info: "ℹ️",
      mongodb: "🗄",
      others: "📦",
      anonymous: "👤",
      asupan: "🍑",
      quotes: "💬",
      converter: "🔄",
      "short-url": "🔗",
      "order-bot": "🛒",
    }

    const rows = fs
      .readdirSync(pluginsDir)
      .filter(f =>
        fs.statSync(path.join(pluginsDir, f)).isDirectory() &&
        !excludedFolders.includes(f.toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b))
      .map(name => ({
        header: "Category",
        title: `${iconMap[name.toLowerCase()] ?? "📂"} ${name}`,
        description: `Menu ${name}`,
        id: `.menuui ${name}`
      }))

    /* ================= CAPTION (TIDAK DIHAPUS) ================= */
    const caption = `
📊 *Stats :*
▸ Running on: ${runWith}
▸ Hits Today: ${thisHit ?? 0}
▸ Errors: ${db.data.listerror.length}
▸ Users: ${Object.keys(db.data.users).length}
▸ Banned: ${db.data.banned.length}
▸ Blocked: ${block.length}
▸ Premium: ${Object.values(db.data.users).filter(u => u.premiumTime !== 0).length}

🕒 *Date & Time :*
▸ ${week}, ${calender}
▸ ${timeWib} WIB
▸ ${dateIslamic}

🆕 *Latest Update :*
▸ ${info}
▸ di update ${timeInfo} yang lalu

🖥 *Uptime Panel :*
▸ Server Uptime : ${uptimePanel}

⏱ *Bot Aktif Selama*
▸ Runtime ${transformText(runTime)}

📁 *Silakan pilih kategori menu*
`.trim()

    /* ================= SEND MENU ================= */
    await conn.sendButton(
      m.chat,
      {
        image: {
          url: "https://telegra.ph/file/a1cb2a23a2c8d6b445ea8.jpg"
        },
        caption,
        footer: "📂 Menu Navigation",
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "📂 Select Menu",
              sections: [
                {
                  title: "All Menus",
                  rows
                }
              ]
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "👑 Owner",
              url: "https://wa.me/6285701414272",
              merchant_url: "https://wa.me/6285701414272"
            })
          },
          {
            buttonId: ".sewa",
            buttonText: { displayText: "🛒 Order Bot" },
            type: 1
          }
        ],
        hasMediaAttachment: true
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    m.reply("❌ Menu UI error")
  }
}

handler.help = ["menuui"]
handler.tags = ["main"]
handler.command = ["menuui"]

export default handler

/* ================= ISI FOLDER ================= */
function sendFolderMenu(m, name) {
  const pluginsDir = "./plugins"
  const folderPath = path.join(pluginsDir, name)

  if (!fs.existsSync(folderPath)) return m.reply("❌ Menu tidak ditemukan")

  const files = fs
    .readdirSync(folderPath)
    .filter(f => f.endsWith(".js"))
    .map(f => path.parse(f).name)
    .sort()

  let text = `╭─「 📂 *MENU ${name.toUpperCase()}* 」\n│\n`
  for (let f of files) text += `│ ✦ ${f}\n`
  text += `│\n╰─「 Total : ${files.length} Commands 」`

  m.reply(text)
}

/* ================= HELPER ================= */
function formatUptime(sec) {
  const d = Math.floor(sec / 86400)
  const h = Math.floor((sec % 86400) / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = Math.floor(sec % 60)
  return `${d}d ${h}h ${m}m ${s}s`
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":")
}