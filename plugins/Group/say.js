let handler = async (m, { text, command }) => {
  try {
    if (!text) return m.reply(`*Example:* .${command} halo`)
    m.reply(text)
  } catch (e) {
    m.reply(e.message)
  }
}

handler.help = ["say"]
handler.tags = ["tools"]
handler.command = ["say"]

export default handler