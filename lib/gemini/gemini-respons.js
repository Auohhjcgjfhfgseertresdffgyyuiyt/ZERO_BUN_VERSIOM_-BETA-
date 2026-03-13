import { GoogleGenAI } from "@google/genai";
import { generatePrompt } from "./gemini-prompt.js";

// --- Fungsi deteksi sederhana (contoh reasoning) ---
// --- Fungsi deteksi reasoning level ringan ---
function detectReasoning(text) {
  text = text.toLowerCase().trim();
  let intent = "general";
  let mood = "neutral";
  let topic = "none";
  let confidence = 0.8;

  // --- Deteksi intent (apa tujuan user) ---
  if (/(download|link|save|dl)/.test(text)) intent = "request_download";
  else if (/(cuaca|panas|dingin|hujan|cerah)/.test(text))
    intent = "ask_weather";
  else if (/(siapa|dimana|kapan|berapa|apa itu)/.test(text))
    intent = "ask_information";
  else if (/(halo|hai|hey|pagi|malam)/.test(text)) intent = "greeting";
  else if (/(terima kasih|makasih|thanks)/.test(text)) intent = "appreciation";
  else if (/(bye|dadah|sampai jumpa)/.test(text)) intent = "farewell";

  // --- Deteksi mood (nada atau emosi user) ---
  if (/(makasih|thank|hehe|haha|wkwk)/.test(text)) mood = "happy";
  else if (/(kesel|marah|anjir|bangsat)/.test(text)) mood = "angry";
  else if (/(sedih|kecewa|huh|hiks)/.test(text)) mood = "sad";
  else if (/(halo|hai|apa kabar)/.test(text)) mood = "friendly";

  // --- Deteksi topic (topik yang sedang dibahas) ---
  if (/(cuaca|hujan|panas)/.test(text)) topic = "weather";
  else if (/(bot|whatsapp|ai| gemini|gemini)/.test(text)) topic = "tech";
  else if (/(musik|lagu|nyanyi|spotify)/.test(text)) topic = "music";
  else if (/(tiktok|video|reels|shorts)/.test(text)) topic = "social_media";

  // Confidence menyesuaikan seberapa spesifik input
  const matchCount = [intent, mood, topic].filter(
    (v) => v !== "general" && v !== "neutral" && v !== "none"
  ).length;
  confidence = 0.6 + matchCount * 0.15;
  if (confidence > 1) confidence = 1;

  return { intent, mood, lastTopic: topic, confidence };
}

const ai = new GoogleGenAI({
  apiKey: global.geminiApi,
  vertexai: false,
});

// --- Fungsi kirim pesan ke Gemini ---
async function  geminiAi(conn, m, teks) {
  if (!conn.memory[m.chat])
    conn.memory[m.chat] = { history: [], reasoning: {} };

  // === DETEKSI PESAN ===
  let messageText = "";
  let quotedText = "";
  let quotedName = "Unknown";
  let quotedPhone = "";

  const msg = m.message;

  // Teks
  if (m.type === "conversation") messageText = teks;
  else if (m.type === "extendedTextMessage") messageText = teks;
  // Gambar
  else if (m.type === "imageMessage") {
    messageText = `[Photo] ${teks}`;
  }

  // Video
  else if (m.type === "videoMessage") {
    messageText = `[Video] ${teks}`;
  }

  // Voice
  else if (m.type === "audioMessage") {
    const sec = msg.audioMessage.seconds || 0;
    const ptt = msg.audioMessage.ptt ? " (PTT)" : "";
    const cap = msg.audioMessage.caption || "";
    messageText = `[Voice ${sec}s]${ptt}${cap ? " " + cap : ""}`;
  }

  // Sticker
  else if (m.type == "stickerMessage") {
    messageText = "[Sticker]";
  }

  // === DETEKSI QUOTED ===
  if (m.quoted) {
    quotedPhone = m.quoted.senderNumber;
    quotedName =
      m.quoted.senderNumber == m.botNumber ? global.botName : m.quoted.name;

    if (m.quoted.type === "imageMessage") {
      quotedText = `[Photo] ${m.quoted.text}`;
    } else if (m.quoted.type === "videoMessage") {
      quotedText = `[Video] ${m.quoted.text}`;
    } else if (m.quoted.type === "audioMessage") {
      quotedText = `[Voice ${m.quoted.seconds || 0}s]`;
    } else if (m.quoted.type === "stickerMessage") {
      quotedText = "[Sticker]";
    } else if (m.quoted.type === "conversation") {
      quotedText = m.quoted.text;
    } else if (m.quoted.type === "extendedTextMessage") {
      quotedText = m.quoted.text;
    } else {
      quotedText = "[Media]";
    }
  }

  const userMemory = conn.memory[m.chat];

  let userText = {
    role: "user",
    name: m.pushName,
    phone: m.senderNumber,
    text: messageText,
    quoted: m.quoted
      ? {
          name: quotedName,
          phone: quotedPhone,
          text: quotedText,
        }
      : null,
  };
  userMemory.history.push(userText);

  const context = generatePrompt(conn, m);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: context }] },
      { role: "user", parts: [{ text: teks }] },
    ],
  });

  const reply = response.text;

  let aiText = {
    role: "assistant",
    name: global.botName,
    phone: m.botNumber,
    text: reply,
    quoted: {
      name: m.pushName,
      phone: m.senderNumber,
      text: messageText,
    },
  };

  userMemory.history.push(aiText);

  // === BATASI HISTORY (opsional) ===
  const MAX_HISTORY = 10;
  if (userMemory.history.length > MAX_HISTORY) {
    userMemory.history = userMemory.history.slice(-MAX_HISTORY);
  }

  return reply;
}

export default  geminiAi;
