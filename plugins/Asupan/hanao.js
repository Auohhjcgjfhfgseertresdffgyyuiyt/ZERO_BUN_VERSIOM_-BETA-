import { instagram } from "#instagram";

const hanaoLinks = [
  "https://www.instagram.com/reel/DJ6hdd5SK9L/?igsh=NGV5bG0yYjl0ZQ==",
  "https://www.instagram.com/reel/DKhqlGZSLcH/?igsh=bjF0aGRteHM1bHRh",
  "https://www.instagram.com/reel/DD0tMH4z7YX/?igsh=c3dwdzV5eTI0Mm5h",
  "https://www.instagram.com/reel/DLYs5SQyf1G/?igsh=MTdpYTVoMmp2dzk0YQ=="
];




  
  
  // Langsung shuffle pertama kali
  let shuffledAsupan = shuffle([...hanaoLinks])
  
  let handler = async (m, { conn,setReply }) => {
    setReply(mess.wait)
    if (shuffledAsupan.length === 0) shuffledAsupan = shuffle([...hanaoLinks])
    let selected = shuffledAsupan.shift()
    const { success, type, urls, error } = await instagram(selected);
    if (!success) throw new Error(error || "Failed to fetch media.");

    if (type === "video") {
      await conn.sendMessage(
        m.chat,
        { video: { url: urls[0] }, mimetype: "video/mp4" },
        { quoted: m }
      );
    }

  }
  
  handler.help = ['asupan']
  handler.tags = ['random']
  handler.command = ['hanao']
  handler.limit = true
 
  
  export default handler
  
  // Fisher-Yates Shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  