import { fileTypeFromBuffer } from 'file-type';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (!/webp|image|viewOnce/.test(mime)) {
    return m.reply(`Balas gambar / sticker / viewonce dengan caption:\n${usedPrefix + command}`);
  }

  let media = await q.download?.();
  if (!media) return m.reply('Gagal mendownload media');

  await m.reply('_Sedang membaca teks dari gambar..._');

  try {
    const imageUrl = await uploadCatbox(media);
    const type = await fileTypeFromBuffer(media) || { ext: 'jpg' };

    const ocr = await fetch(
      `https://api.ocr.space/parse/imageurl?apikey=helloworld&url=${encodeURIComponent(imageUrl)}&language=eng&OCREngine=2&filetype=${type.ext}`
    ).then(res => res.json());

    if (ocr.IsErroredOnProcessing) {
      return m.reply(`❌ OCR gagal:\n${ocr.ErrorMessage?.join('\n') || 'Unknown error'}`);
    }

    let text = ocr.ParsedResults?.[0]?.ParsedText?.trim();

    if (!text) {
      return m.reply('Tidak ada teks yang terdeteksi di gambar tersebut.');
    }

    m.reply(`*Hasil OCR:*\n\n${text}`);
  } catch (e) {
    console.error('OCR Error:', e);
    m.reply(`Terjadi kesalahan:\n${e.message || e}`);
  }
};

handler.help = ['ocr'];
handler.tags = ['tools'];
handler.command = /^ocr$/i;

export default handler;

// ================================================
// Upload ke Catbox.moe PAKAI BUN NATIVE
async function uploadCatbox(buffer) {
  const type = await fileTypeFromBuffer(buffer) || { ext: 'bin', mime: 'application/octet-stream' };

  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', new Blob([buffer], { type: type.mime }), `tmp_${Date.now()}.${type.ext}`);

  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form
  });

  const text = await res.text();

  if (!res.ok || !text.startsWith('https://')) {
    throw new Error(`Upload ke Catbox gagal: ${text.trim() || res.status}`);
  }

  return text.trim();
}