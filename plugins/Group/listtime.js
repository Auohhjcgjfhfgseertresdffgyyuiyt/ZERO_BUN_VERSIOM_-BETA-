import _time from "../../lib/functions/grouptime.js";
let handler = async (m, { q, conn, isOwner, command, setReply }) => {
const setTime = db.data.others["setTime"];

let teks = "\n\n––––––『 *List Group* 』––––––\n\n";
for (let i of db.data.others["setTime"]) {
teks += `• Group: ${i.name}
Open: ${i.timeOpen}
Close: ${i.timeClose}
\n`;
}
teks += `\n*Total ada : ${Object.keys(db.data.others["setTime"]).length}*`;
teks += `\n\n📮 *Note:* ↓
• Setclose untuk mengatur waktu group di tutup
• Setopen untuk mengatur waktu group di buka
• Deltime untuk menonaktifkan opeb/close group
• Contoh setopen 21.00\n`;
  setReply(teks);
};
handler.tags = ["admin"];
handler.command = ["listtime"];
handler.group = true;
handler.admin = true;
export default handler;
