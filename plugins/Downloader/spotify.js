//source: https://whatsapp.com/channel/0029VacFb8kLNSZwwiUfq62b
// Spotify button

import axios from 'axios'

const SPOTIFY_CLIENT_ID = '4c4fc8c3496243cbba99b39826e2841f'
const SPOTIFY_CLIENT_SECRET = 'd598f89aba0946e2b85fb8aefa9ae4c8'

const convert = async (ms) => {
    let minutes = Math.floor(ms / 60000)
    let seconds = ((ms % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

const spotifyCreds = async () => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        const json = response.data
        if (!json.access_token) {
            return { status: false, msg: "Can't generate token!" }
        }
        return { status: true, data: json }
    } catch (error) {
        return { status: false, msg: error.message }
    }
}

const searching = async (query, type = 'track', limit = 20) => {
    try {
        const creds = await spotifyCreds()
        if (!creds.status) return creds

        const response = await axios.get(
            `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=${type}&offset=0&limit=${limit}`,
            {
                headers: { Authorization: `Bearer ${creds.data.access_token}` },
            }
        )

        const json = response.data
        if (!json.tracks.items.length) return { status: false, msg: 'Music not found!' }

        const data = await Promise.all(json.tracks.items.map(async (v) => ({
            title: `${v.album.artists[0].name} - ${v.name}`,
            duration: await convert(v.duration_ms),
            popularity: `${v.popularity}%`,
            preview: v.preview_url,
            url: v.external_urls.spotify,
            cover: v.album.images[0]?.url || null,
        })))

        return { status: true, data }
    } catch (error) {
        return { status: false, msg: error.message }
    }
}

const spotifydl = async (url) => {
    try {
        const { data: yanzzData } = await axios.get(
            `https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
            {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    Referer: 'https://spotifydownload.org/',
                },
            }
        )

        const { data: yanzData } = await axios.get(
            `https://api.fabdl.com/spotify/mp3-convert-task/${yanzzData.result.gid}/${yanzzData.result.id}`,
            {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    Referer: 'https://spotifydownload.org/',
                },
            }
        )

        let artists = yanzzData.result.artists
        if (Array.isArray(artists)) artists = artists.map(a => a.name || a).join(', ')

        return {
            status: true,
            title: yanzzData.result.name,
            type: yanzzData.result.type,
            artis: artists,
            durasi: yanzzData.result.duration_ms,
            image: yanzzData.result.image,
            download: `https://api.fabdl.com${yanzData.result.download_url}`,
        }
    } catch (error) {
        return { status: false, msg: error.message }
    }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`🎵 *Cara penggunaan:*\n${usedPrefix + command} <judul lagu atau link Spotify>\nContoh:\n${usedPrefix + command} night changes\n${usedPrefix + command} https://open.spotify.com/track/5O2P9iiztwhomNh8xkR9lJ`)

    const input = args.join(' ')
    const isTrackUrl = /open\.spotify\.com\/track\//i.test(input)

    try {
        if (isTrackUrl) {
            await m.reply('⏳ Mengunduh lagu...')

            const result = await spotifydl(input)
            if (!result.status) throw new Error(result.msg)

            const audioBuffer = await axios.get(result.download, {
                responseType: 'arraybuffer',
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            }).then(res => Buffer.from(res.data))

            let thumbBuffer = null
            if (result.image) {
                try {
                    thumbBuffer = await axios.get(result.image, { responseType: 'arraybuffer' }).then(res => res.data)
                } catch (e) {
                    console.log('Gagal ambil thumbnail:', e)
                }
            }

            await conn.sendMessage(m.chat, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                fileName: `${result.title} - ${result.artis}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: result.title || 'Spotify Track',
                        body: result.artis || 'Unknown Artist',
                        thumbnail: thumbBuffer ? Buffer.from(thumbBuffer) : null,
                        mediaType: 2,
                        renderLargerThumbnail: true,
                        sourceUrl: input
                    }
                }
            }, { quoted: m })

            return
        }

        await m.reply('⏳ Mencari...')

        const search = await searching(input)
        if (!search.status) return m.reply(`❌ ${search.msg}`)

        const tracks = search.data.slice(0, 10)

        const rows = tracks.map((t, i) => ({
            header: `#${i + 1}`,
            title: `🎵 ${t.title.length > 40 ? t.title.slice(0, 37) + '...' : t.title}`,
            description: `⏱️ ${t.duration}  🔥 ${t.popularity}`,
            id: `${usedPrefix + command} ${t.url}`
        }))

        const thumbUrl = tracks[0]?.cover || 'https://via.placeholder.com/300'
        let thumbBuffer
        try {
            thumbBuffer = await axios.get(thumbUrl, { responseType: 'arraybuffer' }).then(res => res.data)
        } catch {
            thumbBuffer = null
        }

        await conn.sendMessage(
            m.chat,
            {
                image: thumbBuffer ? Buffer.from(thumbBuffer) : { url: 'https://via.placeholder.com/300' },
                caption: `🎵 *Hasil pencarian Spotify*\nQuery: *${input}*`,
                footer: 'Pilih lagu yang ingin diunduh',
                buttons: [
                    {
                        buttonId: 'spotify_select',
                        buttonText: { displayText: '📥 Pilih Lagu' },
                        type: 4,
                        nativeFlowInfo: {
                            name: 'single_select',
                            paramsJson: JSON.stringify({
                                title: 'Daftar Lagu',
                                sections: [
                                    {
                                        title: 'Hasil Pencarian',
                                        rows: rows
                                    }
                                ]
                            })
                        }
                    }
                ],
                headerType: 1,
                viewOnce: true
            },
            { quoted: m }
        )

    } catch (e) {
        conn.logger?.error?.(e) || console.error(e)
        m.reply(`❌ Terjadi error: ${e.message}`)
    }
}

handler.command = /^(spotify|sp)$/i
handler.tags = ['downloader']
handler.help = ['spotify <query/link>']

export default handler