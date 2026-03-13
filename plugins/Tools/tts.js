import { load } from "cheerio";

// =============================
//  Ondoku TTS (NO axios)
// =============================

async function ondoku(text, {
  voice = "en-US-AdamMultilingualNeural",
  speed = 1,
  pitch = 0
} = {}) {
  
  if (!text) throw new Error("Text is required");

  // Ambil list voice dari GitHub RAW
  const voiceListURL = "https://raw.githubusercontent.com/rynn-k/idk/refs/heads/main/json/ondoku-voice.json";
  const voiceRes = await fetch(voiceListURL);
  const voices = await voiceRes.json();

  if (!voices.includes(voice)) {
    throw new Error(`Voice tidak tersedia.\nVoice tersedia:\n${voices.join(", ")}`);
  }
  if (speed < 0.3 || speed > 4) throw new Error("Min speed: 0.3, Max speed: 4");
  if (pitch < -20 || pitch > 20) throw new Error("Min pitch: -20, Max pitch: 20");

  // GET halaman utama (ambil CSRF)
  const home = await fetch("https://ondoku3.com/en/", {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const html = await home.text();
  const $ = load(html);
  const token = $("input[name=csrfmiddlewaretoken]").val();

  if (!token) throw new Error("Gagal mengambil CSRF token.");

  const cookie = home.headers.get("set-cookie");

  // POST request text-to-speech
  const form = new URLSearchParams();
  form.append("text", text);
  form.append("voice", voice);
  form.append("speed", String(speed));
  form.append("pitch", String(pitch));

  const req = await fetch("https://ondoku3.com/en/text_to_speech/", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0",
      "cookie": cookie,
      "origin": "https://ondoku3.com",
      "referer": "https://ondoku3.com/en/",
      "x-csrftoken": token,
      "x-requested-with": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  const json = await req.json();

  if (!json.url) throw new Error("Gagal generate audio: " + JSON.stringify(json));

  // Download mp3 valid
  const audio = await downloadMp3(json.url);

  return audio;
}


// =============================
//  Downloader MP3 (ANTI KORUP)
// =============================

async function downloadMp3(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
      "Referer": "https://ondoku3.com/"
    }
  });

  const type = res.headers.get("content-type") || "";

  if (!type.includes("audio")) {
    const t = await res.text();
    throw new Error("Server tidak mengirim audio. Respon:\n" + t.slice(0, 150));
  }

  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}



// ==========================================
//  WHATSAPP HANDLER FINAL (command: /tts)
// ==========================================

let handler = async (m, { args, setReply, prefix, command, conn }) => {

  if (!args.length) {
    return setReply(
      `Contoh:\n${prefix}${command} id-ID-ArdiNeural halo dunia`
    );
  }

  let voice = args[0];
  let text = args.slice(1).join(" ");

  if (!text) return setReply("Teks tidak boleh kosong.");

  try {
    setReply("⏳ Sedang membuat suara...");

    const audioBuffer = await ondoku(text, {
      voice: voice,
      speed: 1,
      pitch: 0
    });

    // Kirim sebagai dokumen MP3 (anti VN & anti korup)
    await conn.sendMessage(
      m.chat,
      {
        document: audioBuffer,
        mimetype: "audio/mpeg",
        fileName: "tts.mp3"
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    setReply("❌ Error: " + e.message);
  }
};

handler.help = ["tts"];
handler.tags = ["tools"];
handler.command = ["tts"];

export default handler;