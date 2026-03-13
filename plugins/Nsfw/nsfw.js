import fetch from 'node-fetch'

const nsfwCommands = [
  'genshin', 'swimsuit', 'schoolswimsuit', 'white', 'barefoot', 'touhou', 'gamecg', 'hololive', 'uncensored',
  'sunglasses', 'glasses', 'weapon', 'shirtlift', 'chain', 'fingering', 'flatchest', 'torncloth', 'bondage',
  'demon', 'wet', 'pantypull', 'headdress', 'headphone', 'tie', 'anusview', 'shorts', 'stokings', 'topless',
  'beach', 'bunnygirl', 'bunnyear', 'idol', 'vampire', 'gun', 'maid', 'bra', 'nobra', 'bikini', 'whitehair',
  'blonde', 'pinkhair', 'bed', 'ponytail', 'nude', 'dress', 'underwear', 'foxgirl', 'uniform', 'skirt',
  'sex', 'sex2', 'sex3', 'breast', 'twintail', 'spreadpussy', 'tears', 'seethrough', 'breasthold', 'drunk',
  'fateseries', 'spreadlegs', 'openshirt', 'headband', 'food', 'close', 'tree', 'nipples', 'erectnipples',
  'horns', 'greenhair', 'wolfgirl', 'catgirl'
]

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (command === 'nsfw') {
    let list = nsfwCommands.map(cmd => `⭔ ${usedPrefix}${cmd}`).join('\n')
    return m.reply(`📂 *Daftar NSFW Commands:*\n\n${list}`)
  }

  try {
    let res = await fetch(`https://fantox-apis.vercel.app/${command}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw '❎ Gagal mengambil gambar.'
    await m.reply(wait)
    await conn.sendFile(m.chat, json.url, 'nsfw.jpg', `🚩 Random *${command}*`, m)
  } catch (e) {
    m.reply(`❌ Error:\n${e}`)
  }
}

handler.help = ['nsfw', ...nsfwCommands]
handler.tags = ['nsfw']
handler.command = ['nsfw', ...nsfwCommands]
handler.premium = true
handler.group = false

export default handler