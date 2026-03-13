let handler = async (m, { conn }) => {
  let res = await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json')
  let data = await res.json()
  let cita = data[Math.floor(Math.random() * data.length)]

  // Ambil buffer cowo
  let cowoRes = await fetch(cita.cowo)
  let cowi = Buffer.from(await cowoRes.arrayBuffer())
  await conn.sendFile(m.chat, cowi, '', 'Cowo', m)

  // Ambil buffer cewe
  let ceweRes = await fetch(cita.cewe)
  let ciwi = Buffer.from(await ceweRes.arrayBuffer())
  await conn.sendFile(m.chat, ciwi, '', 'Cewe', m)
}

handler.help = ['ppcp']
handler.tags = ['anime']
handler.command = /^ppcp$/i
handler.limit = true

export default handler