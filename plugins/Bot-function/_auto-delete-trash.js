 // launcher.js by officialdittaz – Memory Leak Safe & Reload Safe

import fs from "fs-extra";
import path from "path";

let intervalId = null;

let handler = (m) => m;

handler.before = async function (m, { conn }) {
  if (!db?.data?.settings?.["settingbot"]?.autoDelTrash) return;

  // Gunakan flag global agar tidak dobel saat plugin reload
  if (global._trashCleanerRunning) return;
  global._trashCleanerRunning = true;

  // --- Folder yang mau dibersihkan ---
  const folders = [
    path.resolve('./'),
    path.resolve('./tmp')
  ];

  // Pastikan folder tmp ada
  if (!await fs.pathExists(folders[1])) await fs.mkdir(folders[1], { recursive: true });

  intervalId = setInterval(async () => {
    try {
      for (const directoryPath of folders) {
        const files = await fs.readdir(directoryPath);

        const sampah = files.filter(file =>
          /\.(gif|png|mp3|mp4|jpg|jpeg|webp|webm|zip)$/i.test(file)
        );

        if (sampah.length > 0) {
          console.log(`🧹 Terdeteksi ${sampah.length} file sampah di ${directoryPath}.`);

          for (const file of sampah) {
            const filePath = path.join(directoryPath, file);
            if (await fs.pathExists(filePath)) {
              await fs.unlink(filePath);
              console.log(`🗑️ Dihapus: ${file}`);
            }
          }
        }
      }
    } catch (err) {
      console.error("❌ Error saat pembersihan:", err);
    }
  }, 10 * 60 * 1000); // setiap 10 menit
};

// 🧯 Bersihkan interval saat proses dihentikan
const stopCleaning = () => {
  if (intervalId) {
    clearInterval(intervalId);
    // console.log("🛑 Pembersih otomatis dihentikan. Auto Delete Trash");
  }
};

// Tangani berbagai sinyal keluar dari proses
["SIGINT", "SIGTERM", "exit", "uncaughtException"].forEach(signal => {
  process.on(signal, stopCleaning);
});

export default handler;
