import { execSync } from 'child_process';
import { FileSize } from "../../lib/functions/myfunc.js";

const handler = async (m, { conn, setReply }) => {
  try {
    const os = require('os');
    const used = process.memoryUsage();
    const timestamp = Date.now();
    const latensi = Date.now() - timestamp;
    const uptime = process.uptime();
    const uptimeFormatted = formatUptime(uptime);

    const totalMemory = Number(process.env.WEB_MEMORY) || 512;
    const usedMemoryMB = used.heapUsed / 1024 / 1024;
    const usedMemoryPercent = ((usedMemoryMB / totalMemory) * 100).toFixed(0);
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

    let npmVersion = 'Unknown';
    try {
      npmVersion = execSync('npm -v').toString().trim();
    } catch {}

    const formatBytes = (bytes) => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
    };

    const status = `
📶 *PING & STATUS BOT*

⚡ *Respon*: ${latensi} ms
🕒 *Uptime*: ${uptimeFormatted}

🧠 *Node.js*: ${nodeVersion}
📦 *npm*: v${npmVersion}
💻 *OS*: ${platform} (${arch})
🧬 *CPU*: ${cpuModel} × ${cpuCore}
📈 *Load Avg*: ${loadAvg}

🪫 *RAM*: ${usedMemoryMB.toFixed(0)} MB / ${totalMemory} MB (${usedMemoryPercent}%)
💾 *Storage*: ${usedStorageMB} MB / ${totalStorageMB} MB (${storagePercent}%)

📊 *Memory Usage Detail*:
${Object.keys(used).map((k) => `- ${k.toUpperCase()}: ${formatBytes(used[k])}`).join('\n')}

🔢 *PID*: ${pid}
📂 *Dir*: ${cwd}

🚀 *BOT AKTIF & SIAP TEMPUR!*
`.trim();

    setReply(status);

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '❌ Terjadi kesalahan saat memproses informasi bot.', m);
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

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^(ping|info|status(bot)?|ram)$/i;

export default handler;