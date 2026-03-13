//import fs from "fs";
import * as fs from 'fs';
import path from "path";
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { execFile } from "bun";
import ffmpegStatic from 'ffmpeg-static';

const tmpDir = "./tmp/";
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const eleven = new ElevenLabsClient({
  apiKey:  global.elevenlabsApi
});

// Mood configuration
const voiceId = "c470sxKWDq6tA74TL3yB"; // ID suara Kennisa
const moodConfig = {
  normal:  { stability: 0.5, similarity: 0.9, voice_id: voiceId }, // Bella
  gokil:   { stability: 0.0, similarity: 0.7, voice_id: voiceId }, // Elli
  lembut:  { stability: 0.0, similarity: 0.95, voice_id: voiceId }, // Josh
  serius:  { stability: 1.0, similarity: 0.8, voice_id: voiceId }  // Adam
};

/**
 * 🔊 Generate atau ambil suara dari cache
 */
export async function violetSpeak(conn, m, text, mood = "normal") {
  if (!text || text.length < 2) throw new Error("Teks kosong.");
  if (!conn.memory) conn.memory = {};
  if (!conn.memory[m.sender]) conn.memory[m.sender] = { messages: [], reasoning: {}, voice: {} };


  // Buat hash unik untuk cache
  const filePath = path.join(tmpDir, `${getRandomFile('.mp3')}`);

  // Cek cache
  if (fs.existsSync(filePath)) return filePath;

  const cfg = moodConfig[mood] || moodConfig.lembut;

  console.log(`🎤 [Violet Voice] Generate suara mood: ${mood}`);

  // Generate voice via ElevenLabs
  const voiceToUse = cfg.voice_id
  const modelId = 'eleven_multilingual_v2'
  const audioStream = await eleven.textToSpeech.stream(voiceToUse,{
    text,
    modelId,
    voiceSettings: {
      stability: cfg.stability,
      similarityBoost: cfg.similarity
    }
  });

   // Simpan stream ke buffer
    const chunks = [];
    for await (const chunk of audioStream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    await fs.promises.writeFile(filePath, buffer);

    const mp3Path = filePath; 
const opusPath = filePath.replace('.mp3', '.ogg'); // Ganti ekstensi

    await fs.promises.writeFile(mp3Path, buffer); // Simpan file MP3

    // 3. Konversi MP3 ke OGG/OPUS menggunakan FFmpeg-static
    await new Promise((resolve, reject) => {
        // Argumen FFmpeg untuk konversi ke OPUS
        const ffmpegArgs = [
            '-i', mp3Path, // Input file
            '-c:a', 'libopus', // Audio Codec: OPUS
            '-b:a', '64k',     // Bitrate (direkomendasikan untuk WA)
            '-vbr', 'on',      // Variable Bitrate
            '-f', 'ogg',       // Format Kontainer: OGG
            opusPath           // Output file
        ];

        // Jalankan binary FFmpeg
        execFile(ffmpegStatic, ffmpegArgs, (error, stdout, stderr) => {
            if (error) {
                console.error(`FFmpeg Error: ${stderr}`);
                return reject(new Error(`Konversi FFmpeg Gagal: ${error.message}`));
            }
            
            // Hapus file MP3 sementara setelah konversi berhasil
            fs.unlinkSync(mp3Path); 
            resolve();
        });
    });;

// Kembalikan path file OPUS yang baru
return opusPath;



}

/**
 * 🎙️ Kirim VN langsung ke chat WhatsApp
 */
export async function elevenLabsVoice(conn, m, text, mood = "normal") {
  try {
    const file = await violetSpeak(conn, m, text, mood);
    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(file),
      mimetype: "audio/mpeg",
      ptt: true
    }, { quoted:m });
  } catch (err) {
    console.error("❌ Gagal kirim suara Violet:", err);
    await conn.sendMessage(m.chat, { text: "Gagal bikin suara Violet." }, { quoted: m });
  }
}
