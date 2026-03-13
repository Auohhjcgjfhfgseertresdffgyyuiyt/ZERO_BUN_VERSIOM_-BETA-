import { downloadMediaMessage, generateWAMessageFromContent } from 'baileys'

import fs from 'node:fs'
import path from 'node:path'
import Stream from 'node:stream'
import os from 'node:os'

/** @param {import('../../core/type/plugin.js').HandlerParams} */
async function handler({ conn, sock, jid, m, q }) {

    // pakai koneksi yang tersedia
    const client = conn || sock
    if (!client) return

    // pastikan message ada
    const wam = q?.message ? q : m
    if (!wam || !wam.message) {
        return client.sendMessage(jid, { text: 'no media detected' })
    }

    const TEMP_PATH = path.join(os.tmpdir(), 'catbox-upload')

    const reply = (text) =>
        client.sendMessage(jid, { text }, { quoted: wam })

    const safeWriteStream = async (filePath, inputStream) => {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
        const writeStream = fs.createWriteStream(filePath)
        await Stream.promises.pipeline(inputStream, writeStream)
    }

    // ambil tipe konten
    const contentType = Object.keys(wam.message)[0]
    const content = wam.message[contentType]

    if (!content?.mediaKey) {
        return reply('media tidak ditemukan')
    }

    let mimetype = content.mimetype
    if (!mimetype && contentType === 'extendedTextMessage') {
        mimetype = 'image/jpeg'
    }
    if (!mimetype) return reply('mimetype tidak ditemukan')

    const ext = mimetype.split('/')[1] || 'bin'
    const fileName = Buffer.from(content.mediaKey).toString('base64url')
    const filePath = path.join(TEMP_PATH, `${fileName}.${ext}`)

    // download media
    const mediaStream = await downloadMediaMessage(wam, 'stream')
    await safeWriteStream(filePath, mediaStream)

    // upload Catbox (Bun native)
    const form = new FormData()
    form.append('reqtype', 'fileupload')
    form.append('fileToUpload', fs.createReadStream(filePath))

    const res = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: form
    })

    const url = (await res.text()).trim()
    if (!url.startsWith('https://')) {
        return reply('upload gagal')
    }

    // kirim button
    const wmc = generateWAMessageFromContent(jid, {
        interactiveMessage: {
            header: { title: 'file uploaded' },
            body: { text: `url : ${url}\nmime : ${mimetype}` },
            footer: { text: 'thanks to catbox.moe' },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'cta_copy',
                        buttonParamsJson: JSON.stringify({
                            display_text: 'copy url',
                            copy_code: url
                        })
                    },
                    {
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: 'visit url',
                            url
                        })
                    }
                ]
            }
        }
    }, { quoted: wam })

    await client.relayMessage(
        jid,
        wmc.message,
        {
            additionalNodes: [
                {
                    tag: 'biz',
                    attrs: {},
                    content: [
                        {
                            tag: 'interactive',
                            attrs: { type: 'native_flow', v: '1' },
                            content: [
                                {
                                    tag: 'native_flow',
                                    attrs: { v: '9', name: 'mixed' }
                                }
                            ]
                        }
                    ]
                }
            ],
            messageId: wmc.key.id
        }
    )

    // cleanup
    fs.unlink(filePath, () => {})
}

handler.command = ['upcat']
handler.category = ['uploader']
handler.description = 'upload file ke catbox (bun native)'

export default handler