import { instagram } from "#instagram";

const delynLinks = [
  "https://www.instagram.com/reel/DKUh6pgSzyU/?igsh=MWowMmprMnhra3NsZg==",
  "https://www.instagram.com/reel/DKSNwC7y5rJ/?igsh=MTVjamVzamF5MjVsNw==",
  "https://www.instagram.com/reel/DKZQnk0hQAm/?igsh=MXJuNmhiZ3pvbzdjYQ==",
  "https://www.instagram.com/reel/DKekn5by5gp/?igsh=djRmbjRlcTB2b2Fk",
  "https://www.instagram.com/reel/DISDD9Az5KE/?igsh=MWpvcG1rbWlxOTNxaw==",
  "https://www.instagram.com/reel/DKg6kJ2hObe/?igsh=MTV6ZXVxNHI4cnR3Nw==",
  "https://www.instagram.com/reel/DKeZinDvAiE/?igsh=MWxwa3g3c25icmlrYw==",
  "https://www.instagram.com/reel/DK1TrUrRorX/?igsh=N3UwMGFhcDMwbXpn"
];




  
  
  // Langsung shuffle pertama kali
  let shuffledAsupan = shuffle([...delynLinks])
  
  let handler = async (m, { conn,setReply }) => {
    setReply(mess.wait)
    if (shuffledAsupan.length === 0) shuffledAsupan = shuffle([...delynLinks])
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
  handler.command = ['delyn']
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
  