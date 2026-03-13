import { execSync } from "bun";
import { FileSize } from "../../lib/functions/myfunc.js";

let handler = async (m, { conn, setReply }) => {
  try {
    const os = require('os');
    const totalMemory = Number(process.env.WEB_MEMORY) || 512;
    const usedMemoryMB = process.memoryUsage().heapUsed / 1024 / 1024;
    const usedMemoryPercent = ((usedMemoryMB / totalMemory) * 100).toFixed(0);

    const uptime = process.uptime();
    const uptimeFormatted = formatUptime(uptime);

    const platform = os.platform();
    const arch = os.arch();
    const nodeVersion = process.version;
    const cpuModel = os.cpus()[0].model.trim();
    const cpuCore = os.cpus().length;
    const loadAvg = os.loadavg().map(n => n.toFixed(2)).join(' ');

    const pid = process.pid;
    const cwd = process.cwd();

    const storageBytes = await conn.getDirSize?.(cwd) || 0;
    const totalStorageMB = 1000;
    const usedStorageMB = parseFloat(FileSize(storageBytes).split(" ")[0]) || 0;
    const storagePercent = ((usedStorageMB / totalStorageMB) * 100).toFixed(0);

    // Ambil versi npm via child_process execSync
    let npmVersion = 'Unknown';
    try {
      npmVersion = execSync('npm -v').toString().trim();
    } catch {
      // Kalau gagal, biarkan npmVersion tetap 'Unknown'
    }

    setReply(`
┏━━━━━━━━━━━━━━━━━━━
┃ 📊 *STATUS BOT*
┗━━━━━━━━━━━━━━━━━━━

🕒 *Uptime*     : ${uptimeFormatted}
🧠 *Node.js*    : ${nodeVersion}
📦 *npm*        : v${npmVersion}
💻 *OS*         : ${platform} (${arch})
🧬 *CPU*        : ${cpuModel} × ${cpuCore}
📈 *Load Avg*   : ${loadAvg}

🪫 *RAM*        : ${usedMemoryMB.toFixed(0)} MB / ${totalMemory} MB (${usedMemoryPercent}%)
💾 *Storage*    : ${usedStorageMB} MB / ${totalStorageMB} MB (${storagePercent}%)

🔢 *PID*        : ${pid}
📂 *Dir kerja*  : ${cwd}

🚀 *BOT AMAN & SIAP TEMPUR!*
`);
  } catch (err) {
    console.error('BOT STATUS Error:', err);
    m.reply('💥 Waduh, bot kepleset pas cek status. Coba lagi ya bosskuh!');
  }
};

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [
    h ? `${h} jam` : '',
    m ? `${m} menit` : '',
    s ? `${s} detik` : ''
  ].filter(Boolean).join(' ');
}

handler.tags = ["info"];
handler.command = ["statusbot", "status", "botstat", "ram"];
export default handler;
