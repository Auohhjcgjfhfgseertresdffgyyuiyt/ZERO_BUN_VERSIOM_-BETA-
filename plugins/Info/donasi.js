import fetch from 'node-fetch'
let handler = async (m, { conn, command, usedPrefix }) => {
let str = `${conn.getName(m.sender)}
Want Support Bot?

*[ PAYMENT METHOD ]*

- Pulsa/Smartfren: *088215204772*
- Dana/: *088215204772*
- Sociabuzz: *https://sociabuzz.com/devtiro/donate*

Setelah melakukan donasi kirim bukti pembayaran ke owner
`
await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'JPY',
      amount1000: '1000',
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: str,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler