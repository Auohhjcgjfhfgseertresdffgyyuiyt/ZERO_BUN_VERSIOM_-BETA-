import fs from "fs-extra"
import { spawn } from "child_process"

let handler = async (m, { conn, setReply }) => {

const q = m.quoted ? m.quoted : m
const mime = (q.msg || q).mimetype || ""

if (!/audio/.test(mime)) {
return setReply("Reply audionya")
}

setReply("Tunggu sebentar...")

try {

let media = await q.download()

let input = "./tmp/" + Date.now() + ".ogg"
let output = "./tmp/" + Date.now() + "_ghost.mp3"

fs.writeFileSync(input, media)

const ff = spawn("ffmpeg", [
"-y",
"-i", input,
"-af", "atempo=1.6,asetrate=3486",
"-b:a", "128k",
output
])

ff.on("close", async (code) => {

if (code !== 0) {
fs.unlinkSync(input)
return setReply("Gagal convert audio")
}

let buff = fs.readFileSync(output)

await conn.sendMessage(
m.chat,
{
audio: buff,
mimetype: "audio/mpeg",
fileName: "ghost.mp3"
},
{ quoted: m }
)

fs.unlinkSync(input)
fs.unlinkSync(output)

})

ff.on("error", err => {
fs.unlinkSync(input)
setReply("Error: " + err.message)
})

} catch (err) {
setReply("Terjadi error saat memproses audio")
}

}

handler.help = ["ghost"]
handler.tags = ["audio"]
handler.command = ["ghost"]

export default handler