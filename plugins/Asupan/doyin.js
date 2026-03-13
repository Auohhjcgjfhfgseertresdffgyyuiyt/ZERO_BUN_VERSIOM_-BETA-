let handler = async (m, { conn, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = conn.getName(who)
  conn.sendFile(m.chat, pickRandom(vbokep), null, `Nih *${name}* Video doyinnya..`, m)
}
handler.help = ['doyin']
handler.tags = ['premium']
handler.command = /^(doyin)$/i

handler.premium = true
handler.limit = false

handler.register = false

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const vbokep = [

"https://telegra.ph/file/9d70392ce2d6fecc37cf9.mp4",
"https://telegra.ph/file/b5a29a4b57177e7d0971d.mp4",
"https://telegra.ph/file/fee7e17bb4536b7e66c77.mp4",
"https://telegra.ph/file/cce0179f72e396b5d7b4f.mp4",
"https://telegra.ph/file/a93ec60b2fc0755dc1346.mp4",
"https://telegra.ph/file/0940a1e869e8a9c2974f6.mp4",
"https://telegra.ph/file/ac51028a96e316dd652be.mp4",
"https://telegra.ph/file/9683156e1a66e31369b92.mp4",
"https://telegra.ph/file/c0d945ee1f7b5fd8190de.mp4",
"https://telegra.ph/file/489ec4c2e9c30d2bc477a.mp4",
"https://telegra.ph/file/dc446cf1503f527d66e91.mp4",
"https://telegra.ph/file/345a16ec7c00dcdeafc93.mp4",
"https://telegra.ph/file/1baf00fbaa31324c6b319.mp4",
"https://telegra.ph/file/fa71a777936ecc9a848fd.mp4",
"https://telegra.ph/file/8f80eee8ae8450f40d5e8.mp4",
"https://telegra.ph/file/2f4e6059407c94a5e6348.mp4",
"https://telegra.ph/file/79879227a0ff92b31c6e8.mp4",
"https://telegra.ph/file/7758f72535e2a553919b2.mp4",
"https://telegra.ph/file/5858ab7d2d0c861a8cd64.mp4",
"https://telegra.ph/file/a718631a6ecda4009f7dc.mp4",
"https://telegra.ph/file/e8b766cee4c44fb9a5dbf.mp4",
"https://telegra.ph/file/f222dc10a14d8a76833df.mp4",
"https://telegra.ph/file/c15efb1518172c6b6c727.mp4",
"https://telegra.ph/file/3e147cb09835cffd50fa3.mp4",
"https://telegra.ph/file/d9ed3fcacc66c395d3b41.mp4",
"https://telegra.ph/file/b19b633befed80014ce5b.mp4",
"https://telegra.ph/file/c919c6e0f611f6121c680.mp4",
"https://telegra.ph/file/59f63155699d6770c9c3a.mp4",
"https://telegra.ph/file/d96181b41484f22807a83.mp4",
"https://telegra.ph/file/2e788494da45405de86ff.mp4",
"https://telegra.ph/file/2c699b2e266a141a8f82f.mp4",
"https://telegra.ph/file/c47eae57f466978b0d9cc.mp4",
"https://telegra.ph/file/0b3da1d74fde9c1447580.mp4",
"https://telegra.ph/file/d3a2a46963ab7a9c1ea23.mp4",
"https://telegra.ph/file/a20bb96487987fa231592.mp4",
"https://telegra.ph/file/412a396d2e806f9799951.mp4",
"https://telegra.ph/file/4a92d09c46803bff1d172.mp4",
"https://telegra.ph/file/de869788e4fbef4d349fd.mp4",
"https://telegra.ph/file/63af83e0c58b7cb51d248.mp4",
"https://telegra.ph/file/a387bc4f1df048ed67d56.mp4",
"https://telegra.ph/file/d524e3a4125ba8ac75efe.mp4",
"https://telegra.ph/file/700546b729f3f841ad7a9.mp4",
"https://telegra.ph/file/e0baad1a73935b768620a.mp4",
"https://telegra.ph/file/4515004a8eb8cfb7e700c.mp4",
"https://telegra.ph/file/a8f87e01d7923abe31f82.mp4",
"https://telegra.ph/file/d912cdc6e90e18e1e9a04.mp4",
"https://telegra.ph/file/b71045f4c0ab6d6c722c9.mp4",
"https://telegra.ph/file/9c29183addae42912904e.mp4",
"https://telegra.ph/file/63c18e2298d06a2f44215.mp4",
"https://telegra.ph/file/ce1f024779a437f98f5e0.mp4",
"https://telegra.ph/file/fa884793c6fce45ec3936.mp4",
"https://telegra.ph/file/e0c57d3dea9db285b42a5.mp4",
"https://telegra.ph/file/6a81d1ee6d87a9295861b.mp4",
"https://telegra.ph/file/01418eb8f891cf1082300.mp4",
"https://telegra.ph/file/edc0131562df5d5b98ae5.mp4",
]