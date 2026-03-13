import { GoogleGenerativeAI } from "@google/generative-ai";
import { runFFmpeg, ffmpegPath } from "#ffmpeg"

/**
 * PCM → OPUS (Bun-native)
 */
async function pcmToOpus(pcmBuffer) {
  const proc = Bun.spawn({
    cmd: [
      ffmpegPath,
      "-f", "s16le",
      "-ar", "24000",
      "-ac", "1",
      "-i", "pipe:0",
      "-acodec", "libopus",
      "-ar", "16000",
      "-b:a", "32k",
      "-f", "opus",
      "pipe:1"
    ],
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  });

  // kirim PCM
  proc.stdin.write(pcmBuffer);
  proc.stdin.end();

  // ambil output
  const opus = Buffer.from(await new Response(proc.stdout).arrayBuffer());

  const code = await proc.exited;
  if (code !== 0) {
    const errTxt = await new Response(proc.stderr).text();
    throw new Error("FFmpeg error: " + errTxt);
  }

  return opus;
}


export async function geminiVoice(conn, m, text, mood = "normal") {
  const moodStyle = {
    happy: "ceria gembira semangat",
    cute: "imut manja lembut",
    sad: "sedih pelan mau nangis",
    angry: "marah tegas tinggi",
    tsun: "kesal tapi sayang genit",
    normal: "natural jernih cewek 16 tahun"
  }[mood.toLowerCase()] || "natural jernih cewek 16 tahun";

  try {
    const apiKey = await global.geminiRotator.getNextKey();
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-tts",
    });

    const prompt = `[MUSIC/audio] #pcm
Bahasa: Indonesia
Mood: ${moodStyle}
Voice: "${text}"
Note: ucapkan suara sesuai mood dan voice
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "leda" } } }
      }
    });

    // ambil PCM base64
    const base64 = result.response.candidates[0].content.parts[0].inlineData.data;
    const pcm = Buffer.from(base64, "base64");

    // konversi PCM → OPUS via Bun.spawn()
    const opus = await pcmToOpus(pcm);

    await conn.sendMessage(
      m.chat,
      {
        audio: opus,
        mimetype: "audio/ogg; codecs=opus",
        ptt: true
      },
      { quoted: m }
    );

    console.log("✔ Gemini TTS sukses (Bun-native, no child_process)");

  } catch (err) {
    await conn.sendMessage(m.chat, { text: `Error: ${err.message}` }, { quoted: m });
  }
}
