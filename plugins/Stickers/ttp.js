import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import os from 'os'

const temp = (name) => path.join(os.tmpdir(), name)

function escapeXML(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function createTTP(text, size = 512) {
  const fontSize = text.length < 6 ? 100 : text.length < 12 ? 80 : 60
  const centerY = size / 2 + fontSize * 0.35

  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="${centerY}" font-size="${fontSize}" fill="white" font-family="sans-serif"
        font-weight="bold" dominant-baseline="middle" text-anchor="middle">
        ${escapeXML(text)}
      </text>
    </svg>
  `
  const buffer = await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toBuffer()

  const output = temp(`ttp_${Date.now()}.png`)
  fs.writeFileSync(output, buffer)
  return output
}

const handler = async (m, { conn, q }) => {
  if (!q) return m.reply('Teksnya mana? Contoh: .ttp halo bang')

  try {
    const image = await createTTP(q)
    await conn.toSticker(m, image)
   // fs.unlinkSync(`ttp_${Date.now()}.png`)
  } catch (e) {
    console.error(e)
   // m.reply('Gagal membuat TTP. Coba lagi nanti.')
  }
}

export default handler
handler.command = ['ttp']
