




export default async function autoDetect(conn, m, dariUser = '', dariBot = '') {




function detectIntent(text) {
  const t = text.toLowerCase().trim();

  const keywords = new Set([
    "download", "ambil", "save", "simpan", "donlod", "donload",
    "unduh", "kirim", "donlot", "donwload", "ngambil", "ambilin",
    "jadikan", "ubah"
  ]);

  // Khusus "dl" jangan nabrak kata lain seperti "adalah"
  // Jadi harus berdiri sendiri atau dikelilingi spasi/punctuation
  const dlPattern = /\bdl\b/;

  if (dlPattern.test(t)) return "download";

  // Cek semua keyword dengan includes()
  for (let kw of keywords) {
    if (t.includes(kw)) return "download";
  }

  return "unknown";
}


function detectMediaType(text = '') {
  const lower = text.toLowerCase();

  if (/\b(mp3nya|mp3|music|lagu|sound|audio|suara|backsound)\b/.test(lower))
    return "music";
  else if (/\b(video|mp4|shorts?|reels?|vid(eo)?|clip)\b/.test(lower))
    return "video";
  
  // Default jika tidak terdeteksi
  return "video";
}


function detectPlatform(link) {
  if (!link) return "unknown";
  const domain = new URL(link).hostname;

  if (domain.includes("tiktok") || domain.includes("vm.tiktok") || domain.includes("vt.tiktok")) return "tiktok";
  if (domain.includes("youtube") || domain.includes("youtu.be")) return "youtube";
  if (domain.includes("instagram")) return "instagram";
  if (domain.includes("twitter") || domain.includes("x.com")) return "twitter";
  if (domain.includes("facebook") || domain.includes("fb.watch")) return "facebook";
  if (domain.includes("threads.net")) return "threads";
  return "unknown";
}

  // Ambil hanya 1 link pertama yang valid
  function extractFirstLink(text) {
    const regex = /(https?:\/\/[^\s"'<>]+)/gi
    const links = text.match(regex)
    if (!links) return null
    for (let link of links) {
      try {
        // pastikan bisa di-parse tanpa error
        new URL(link)
        return link.replace(/[.,!?)]*$/, '')
      } catch {
        continue
      }
    }
    return null
  }

 function smartDetector(text) {
  const intent = detectIntent(text);
  const mediaType = detectMediaType(text);
  const link = extractFirstLink(text);
  const platform = detectPlatform(link);

  return { intent, mediaType, link, platform };
}


let {intent,mediaType,link,platform} = smartDetector(dariUser)

  if (intent !== 'download' || !link) return


let lowerBot = dariBot.toLowerCase();

try {
// Timeout helper untuk fetch di Bun
const fetchWithTimeout = async (url, timeoutMs = 30000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

const apiUrl = `https://anabot.my.id/api/download/aio?url=${encodeURIComponent(link)}&apikey=freeApikey`;

let res;
try {
  res = await fetchWithTimeout(apiUrl, 30000);
} catch (e) {
  return m.reply("⚠️ Request timeout atau koneksi lambat.");
}

if (!res.ok) {
  return m.reply(`⚠️ Server error: ${res.status}`);
}

const data = await res.json();

if (!data || data.error || !data.medias) {
  return m.reply("❌ Gagal mengambil data, coba link lain.");
}

    
    // ambil media utama (video dulu, fallback audio)
    const video = data.medias.find(v => v.type === 'video')
    const audio = data.medias.find(v => v.type === 'audio')
    const videoUrl = video?.url  
    const audioUrl = audio?.url
    const mediaUrl = video?.url || audio?.url
    if (!mediaUrl) return m.reply("⚠️ Tidak ada media yang bisa diunduh dari link itu.")


  // deteksi jenis media
    const isVideo = mediaType === 'video'
    const isMusic = mediaType === 'music'


console.log(intent, mediaType, link, platform)



  if (isVideo) {
    conn.sendMessage(m.chat, {  video: {url:videoUrl}}, { quoted: m });
  }
  
  else if (isMusic) {
    await conn.sendPresenceUpdate("recording", m.chat);
    await sleep(5000)
      //conn.sendMessage(m.chat, {audio: {url:audioUrl},mimetype: "audio/mpeg",ptt: false}, { quoted: m });
    await conn.toMp3(m,mediaUrl)
  } 
 


} catch (e) {
  console.error('❌ Gagal download:', e);
   conn.sendMessage(m.chat, { text: 'Gagal download media, coba lagi nanti ya.' }, { quoted: m });
}




}
