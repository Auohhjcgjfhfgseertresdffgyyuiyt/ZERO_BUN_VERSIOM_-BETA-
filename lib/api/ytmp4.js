export async function ytmp4(url) {
    const encoded = encodeURIComponent(url.trim());

    const endpoints = [
        `https://api.nekolabs.web.id/downloader/youtube/v1?url=${encoded}&format=360`,
        `https://api-faa.my.id/faa/ytmp4?url=${encoded}&quality=360`,
        `https://api.kyyokatsu.my.id/api/downloader/ytmp4?url=${encoded}`,
        `https://api.rikishop.my.id/download/ytmp4?url=${encoded}`,
        // Fallback paling aman: Itag H.264
        `https://api.nekolabs.web.id/downloader/yt?url=${encoded}&itag=18`
    ];

    // Cek codec aman
    const isSafe = codecs => {
        if (!codecs) return true;
        codecs = codecs.toLowerCase();
        return codecs.includes("avc1") || codecs.includes("h264");
    };

    for (const endpoint of endpoints) {
        try {
            const res = await fetch(endpoint).catch(() => null);
            if (!res) continue;

            const json = await Bun.readableStreamToJSON(res.body).catch(() => null);
            if (!json || (!json.success && !json.status)) continue;

            const result = json.result || json.data || json;

            const downloadUrl =
                result.downloadUrl ||
                result.download_url ||
                result.mp4 ||
                result.url;

            const codecs =
                result.codecs ||
                result.codec ||
                result.mimeType ||
                result.mime ||
                "";

            // Filter AV1 / VP9
            if (!isSafe(codecs)) {
                continue; // cari API lain
            }

            if (downloadUrl) {
                return {
                    success: true,
                    downloadUrl,
                    codecs,
                };
            }
        } catch {}
    }

    return {
        success: false,
        error: "Semua API mengembalikan format AV1, gunakan .ytmp3 atau kirim link lain."
    };
}