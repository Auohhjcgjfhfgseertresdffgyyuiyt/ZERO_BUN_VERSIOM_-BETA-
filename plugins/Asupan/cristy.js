import { instagram } from "#instagram";

const cristyLinks = [
  "https://www.instagram.com/reel/DH9c61fzh0p/?igsh=MXB2bmY0ZGZ0NWdxdg==",
  "https://www.instagram.com/reel/DJfje73zoYB/?igsh=MTM1dWVrZHQ2MjJpZQ==",
  "https://www.instagram.com/reel/DKMdhB2RK6x/?igsh=eW95d3R0ZDRvZTY4",
  "https://www.instagram.com/reel/DI8Bo9Ly9zv/?igsh=MTFnNWs1Mzg0NmNmeg==",
  "https://www.instagram.com/reel/DIGSvIERcFB/?igsh=YmNzNXF4MWVqdW9m",
  "https://www.instagram.com/reel/DKMr_Pxzjcu/?igsh=MWQ1a3p0dWt5bjZ1aw==",
  "https://www.instagram.com/reel/DH-kEYkRKHN/?igsh=MWhyd3hvMXplaHNwbA==",
  "https://www.instagram.com/reel/DKGpLVXR2TN/?igsh=MXk5bjdrODB3ZjZz",
  "https://www.instagram.com/reel/DIJhaV1z7gu/?igsh=MWV6cGFqbG54ZnQ1eg==",
  "https://www.instagram.com/reel/DKgtD27vDkn/?igsh=M2x2bWhwY3lvczdi",
  "https://www.instagram.com/reel/DKjOLQATLbS/?igsh=dnppdXIxcXQyZ2I5",
  "https://www.instagram.com/reel/DKl5vpiSZ8-/?igsh=MTljZmFrdHJ2ODV5MA==",
  "https://www.instagram.com/reel/DKzUutzzU0H/?igsh=cXY4cm1tajZ3ZGlm",
  "https://www.instagram.com/reel/DK2E2JhyoJc/?igsh=MWRjeDFoY3FpZmdpbg=="
];



  
  
  // Langsung shuffle pertama kali
  let shuffledAsupan = shuffle([...cristyLinks])
  
  let handler = async (m, { conn,setReply }) => {
    setReply(mess.wait)
    if (shuffledAsupan.length === 0) shuffledAsupan = shuffle([...cristyLinks])
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
  handler.command = ['cristy']
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
  