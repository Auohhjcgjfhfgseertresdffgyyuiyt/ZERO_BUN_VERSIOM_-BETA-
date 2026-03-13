import { exec } from "child_process"
import fs from "fs"

let handler = async (m, { conn }) => {

  if (!m.quoted) return m.reply("Reply audio!")

  const buffer = await m.quoted.download()
  const input = './tmp/' + Date.now() + '.mp3'
  const output = './tmp/' + Date.now() + '.opus'

  fs.writeFileSync(input, buffer)

  exec(`ffmpeg -y -i "${input}" -vn -ar 48000 -ac 1 -c:a libopus -b:a 128k "${output}"`, async () => {

    await conn.sendFile(m.chat, output, '', m, {
      ptt: true
    })

    fs.unlinkSync(input)
    fs.unlinkSync(output)

  })

}

handler.command = ['tovn']

export default handler