import os from "os";

let handler = async (m) => {
  try {
    const res = await fetch("http://ip-api.com/json/");
    const serverInfo = await res.json();

    const osInfo = os.platform();
    const totalRAM = Math.floor(os.totalmem() / 1024 / 1024);
    const freeRAM = Math.floor(os.freemem() / 1024 / 1024);
    const uptimeFormatted = formatUptime(os.uptime());
    const cpuModel = os.cpus()[0].model;

    let msg = `•  S E R V E R\n\n`;

    msg += `┌  ◦  OS : ${osInfo}\n`;
    msg += `│  ◦  RAM : ${freeRAM} MB / ${totalRAM} MB\n`;
    msg += `│  ◦  Country : ${serverInfo.country}\n`;
    msg += `│  ◦  CountryCode : ${serverInfo.countryCode}\n`;
    msg += `│  ◦  Region : ${serverInfo.region}\n`;
    msg += `│  ◦  RegionName : ${serverInfo.regionName}\n`;
    msg += `│  ◦  City : ${serverInfo.city}\n`;
    msg += `│  ◦  Zip : ${serverInfo.zip}\n`;
    msg += `│  ◦  Lat : ${serverInfo.lat}\n`;
    msg += `│  ◦  Lon : ${serverInfo.lon}\n`;
    msg += `│  ◦  Timezone : ${serverInfo.timezone}\n`;
    msg += `│  ◦  Isp : ${serverInfo.isp}\n`;
    msg += `│  ◦  Org : ${serverInfo.org}\n`;
    msg += `│  ◦  As : ${serverInfo.as}\n`;
    msg += `│  ◦  Query : ${serverInfo.query}\n`;
    msg += `│  ◦  Uptime : ${uptimeFormatted}\n`;
    msg += `└  ◦  Processor : ${cpuModel}`;

    await m.reply(msg);

  } catch (e) {
    console.log("Server info error:", e);
    await m.reply("Gagal mengambil informasi server!");
  }
};

function formatUptime(sec) {
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

handler.command = ["server"];
handler.tags = ["info"];
handler.help = ["server"];

export default handler;