 let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `Contoh: ${usedPrefix + command} 081234567890 dana`;

    let [rekening, bankType] = text.split(" ");
    if (!rekening || !bankType)
        return m.reply("Format salah! Contoh:\n.bankstalk 081234567890 dana");

    try {
        let data = await stalkBank(rekening, bankType);

        if (!data || !data.data) throw new Error("No Rek nya ga ada Wkwkwk.");

        let acc = data.data;

        let cap = `
*Stalker Bank*

*No Rekening:* ${acc.account_number}
*Atas Nama:* ${acc.name}
*Rekening Bank:* ${acc.bank_code}
`;

        conn.reply(m.chat, cap.trim(), m);
    } catch (e) {
        console.log(e);
        m.reply("lagi error bang fitur nya :)");
    }
};

handler.help = ["bankstalk"];
handler.tags = ["stalker"];
handler.command = /^(bankstalk)$/i;

export default handler;


async function stalkBank(rekening, bankType) {
    if (!rekening) throw new Error("Mohon masukkan rekening atau nomor bank");

    // 🟦 Fetch daftar bank
    const resList = await fetch("https://cek-rekening-three.vercel.app/api/list-bank");
    if (!resList.ok) throw new Error("Gagal mengambil daftar bank");

    const list = await resList.json();
    const listBank = list.data || [];

    const bank = listBank.find(b => b.bank_code === bankType);
    if (!bank) {
        const bankListText = listBank.map(b => `${b.bank_code} - ${b.name}`).join("\n");
        throw new Error(`Bank Type tidak valid! Daftar bank:\n${bankListText}`);
    }

    // 🟩 Fetch cek rekening
    const url = `https://cek-rekening-three.vercel.app/api/cek-rekening?bank_code=${bankType}&number=${rekening}`;
    const resCek = await fetch(url);

    if (!resCek.ok) throw new Error("Terjadi kesalahan saat memeriksa rekening");

    const cek = await resCek.json();
    return cek;
}
