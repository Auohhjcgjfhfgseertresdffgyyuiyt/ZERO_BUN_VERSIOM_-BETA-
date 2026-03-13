import { instagram } from "#instagram";

const michieLinks = [
  "https://www.instagram.com/reel/DIwfwmYhvz0/?igsh=MWdlZ2Q2czFlMG10Yw==",
  "https://www.instagram.com/reel/DKbxxraBmQB/?igsh=ZnZ5cGJyMnh5dnoz",
  "https://www.instagram.com/reel/DIGeiltB9C_/?igsh=MTJtdGUwaDcxeTdzZA==",
  "https://www.instagram.com/reel/DJ1gK1RhyUJ/?igsh=Y2IwMGliNDloM213",
  "https://www.instagram.com/reel/DI58_GYBFsw/?igsh=MWMzbmllMjY4OWFwYQ==",
  "https://www.instagram.com/reel/DIJF93HhR96/?igsh=MThvc2p6ODR1cTF4",
  "https://www.instagram.com/reel/DJwBoagzQX-/?igsh=ZnpiZThlZ2k3Zjk2",
  "https://www.instagram.com/reel/DJG2R34B6at/?igsh=MXB4MW8zMzc5NWhibw==",
  "https://www.instagram.com/reel/DJgNGjDyPPA/?igsh=MTY1czVlamNqcGIzbA=="
];



  
  
  // Langsung shuffle pertama kali
  let shuffledAsupan = shuffle([...michieLinks])
  
  let handler = async (m, { conn,setReply }) => {
    setReply(mess.wait)
    if (shuffledAsupan.length === 0) shuffledAsupan = shuffle([...michieLinks])
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
  handler.command = ['michie']
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
  