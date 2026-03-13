import moment from '../../modules/moment.js'

let handler = async (m, { conn, isOwner, setReply }) => {
  if (!isOwner) return await setReply(mess.only.owner)

  let getGroups = await conn.groupFetchAllParticipating()
  let groups = Object.values(getGroups)

  let groupReguler = groups.filter(g => !g.isCommunity && !g.isCommunityAnnounce)
  let groupCommunity = groups.filter(g => g.isCommunity)

  let teks = `
––––––[ *LIST SEMUA GRUP* ]––––––

📌 Total Grup Reguler: ${groupReguler.length}
📌 Total Komunitas: ${groupCommunity.length}

`

  // REGULER
  teks += `\n–––––––[ *GRUP REGULER* ]–––––––\n\n`

  for (let metadata of groupReguler) {
    let chat = db.data.chats[metadata.id]

    // Aman untuk owner
    let owner = metadata.owner || null

    // Jika owner pakai LID (@lid)
    if (owner && owner.includes('@lid')) {
      try {
        owner = '@' + conn.lidToJid(metadata.owner, metadata.id).split("@")[0]
      } catch {
        owner = metadata.owner
      }
    }

    // Fallback jika tetap tidak ada
    if (!owner) owner = "Tidak diketahui"

    teks += `◉ Nama : ${metadata.subject} ${
      chat
        ? chat.expired !== 0
          ? ""
          : "\n◉ Warning : Grup ini tidak ada dalam database order"
        : "\n◉ Warning : Grup ini tidak terdaftar dalam database bot"
    }
◉ Owner : ${owner}
◉ ID : ${metadata.id}
◉ Dibuat : ${moment(metadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}
◉ Member : ${metadata.participants.length}

•·–––––––––––––––––––––––––·•\n\n`
  }

  // KOMUNITAS
  teks += `\n–––––––[ *GRUP KOMUNITAS* ]–––––––\n\n`

  for (let metadata of groupCommunity) {
    teks += `◉ Nama : ${metadata.subject}
◉ ID : ${metadata.id}
◉ Dibuat : ${moment(metadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}
◉ Member : ${metadata.participants.length}

•·–––––––––––––––––––––––––·•\n\n`
  }

  await conn.sendTextWithMentions(m.chat, teks.trim(), m)
}

handler.help = ["listgroupall"]
handler.tags = ["owner"]
handler.command = /^(listgroupall|listsemuagrup|listgc|listcommunity)$/i
handler.owner = true

export default handler