/*
📌 Spotify Music Downloader
👤 Made by AI
*/

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Masukkan URL atau judul Spotify!\n\nContoh:\n${usedPrefix + command} https://open.spotify.com/track/0MnTkIEP4zZN1IUSu8MvIz`);
  }

  const input = args.join(" ");

  try {
    m.reply("⏳ *Processing Spotify...*");

    const result = await spotify(input);

    await conn.sendMessage(
      m.chat,
      {
        audio: result.audio,
        mimetype: "audio/mpeg",
        fileName: `${result.metadata.title}.mp3`,
      },
      { quoted: m }
    );

    await conn.sendMessage(
      m.chat,
      {
        image: { url: result.metadata.cover },
        caption: `🎵 *Spotify Downloaded*\n\n*Title:* ${result.metadata.title}\n*Artist:* ${result.metadata.artist}\n*Duration:* ${result.metadata.duration}\n\n> By SpotDown Scraper`,
      },
      { quoted: m }
    );

  } catch (e) {
    m.reply("❌ Error: " + e.message);
  }
};

handler.help = ["splay <url/judul>", "spotifyplay <url/judul>"];
handler.tags = ["downloader"];
handler.command = /^(splay|spotifyplay)$/i;

export default handler;

// ========================
//     SCRAPER SPOTIFY
// ========================

async function spotify(input) {
  try {
    if (!input) throw new Error("Input is required.");

    // SEARCH / GET SONG DETAIL
    const detail = await fetch(
      `https://spotdown.org/api/song-details?url=${encodeURIComponent(input)}`,
      {
        method: "GET",
        headers: {
          origin: "https://spotdown.org",
          referer: "https://spotdown.org/",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 15; SM-F958 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.86 Mobile Safari/537.36",
        },
      }
    );

    const s = await detail.json();

    const song = s.songs?.[0];
    if (!song) throw new Error("Track not found.");

    // DOWNLOAD AUDIO
    const dl = await fetch(`https://spotdown.org/api/download`, {
      method: "POST",
      headers: {
        origin: "https://spotdown.org",
        referer: "https://spotdown.org/",
        "content-type": "application/json",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 15; SM-F958 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.86 Mobile Safari/537.36",
      },
      body: JSON.stringify({ url: song.url }),
    });

    const buffer = Buffer.from(await dl.arrayBuffer());

    return {
      metadata: {
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        cover: song.thumbnail,
        url: song.url,
      },
      audio: buffer,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}