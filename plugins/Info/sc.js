const handler = async (m, { conn }) => {
  const message = {
    requestPaymentMessage: {
      currencyCodeIso4217: 'IDR', // Ubah ke Rupiah
      amount1000: 50000, // 25.000 x 1000 = 25.000.000 (Rp25.000)
      requestFrom: m.sender,
      noteMessage: {
        extendedTextMessage: {
          text: `
╭─「 Nyari Sc? 」
╰────
Tanya Ke +6285701414272
`,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true
            }
          }
        }
      }
    }
  }

  await conn.relayMessage(m.chat, message, {})
}

handler.help = ['sc', 'script']
handler.tags = ['info']
handler.command = /^(sc|script)$/i

export default handler