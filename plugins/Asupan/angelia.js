import { instagram } from "#instagram";

const asupan = [
    "https://www.instagram.com/reel/DI0_YWLSi3d/?igsh=MW1hanhwbzMxaWdpeg==",
    "https://www.instagram.com/reel/DIlgh6KS29d/?igsh=MXkwa3E3NGdvdXZpNg==",
    "https://www.instagram.com/reel/DIbDA1WSQQp/?igsh=YXU0cjd3bmMxOWly",
    "https://www.instagram.com/reel/DITY2BTyO-n/?igsh=MW52ZHpubGltNzdyNA==",
    "https://www.instagram.com/reel/DILuinJSpTg/?igsh=aW8yYWh6NGRjajdz",
    "https://www.instagram.com/reel/DH0uF29ykBz/?igsh=aWVnbnA3d2tndjlj",
    "https://www.instagram.com/reel/DHtEqshyczl/?igsh=MWhhZ2NneTJjZXFtcw==",
    "https://www.instagram.com/reel/DHdRBFDy1Of/?igsh=MXI2azhtNGV6MTgxMw==",
    "https://www.instagram.com/reel/DHaxJErykXr/?igsh=bHUwOWdmMDgwcHlj",
    "https://www.instagram.com/reel/DGnVIY5SCha/?igsh=aTVvMXNsNmRoeTNr",
    "https://www.instagram.com/reel/DFFiFeDyH6G/?igsh=MW0zb252aTJpeHI1OA==",
    "https://www.instagram.com/reel/DEHulHzS1xc/?igsh=MWd5MGlqb3Y4eDluag=="
  ];
  
  
  // Langsung shuffle pertama kali
  let shuffledAsupan = shuffle([...asupan])
  
  let handler = async (m, { conn,setReply }) => {
    setReply(mess.wait)
    if (shuffledAsupan.length === 0) shuffledAsupan = shuffle([...asupan])
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
  handler.command = ['angelia']
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
  