 import { spawn } from "bun";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from '#chalk';
import fs from "fs-extra";
import net from "net";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

let restartCount = 0;
let isStarting = false;
let lastErrorDetail = null;
let child; // worker bot

// ----------------------
// CEK PORT
// ----------------------
function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(true));
    server.once("listening", () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}

// ----------------------
// BUN KEEP-ALIVE (mengganti Express)
// ----------------------
async function launchKeepAlive() {
  const inUse = await checkPort(PORT);
  if (inUse) {
    console.log(chalk.yellow(`⚠ Port ${PORT} sudah terpakai. Keep-alive dilewati.`));
    return;
  }

  try {
    // Bun.serve lebih ringan daripada Express dan cocok untuk keep-alive sederhana
    const server = Bun.serve({
      hostname: HOST,
      port: Number(PORT),
      // fetch dapat berupa async; kita handle route /health dan /
      async fetch(req) {
        try {
          const url = new URL(req.url);
          if (url.pathname === "/health") {
            // return 200 OK
            return new Response(null, { status: 200 });
          }

          if (url.pathname === "/") {
            // Baca file index.html dari disk (async)
            try {
              const indexPath = join(__dirname, "index.html");
              // prefer Bun.file if tersedia (lebih efisien), fallback ke fs
              if (typeof Bun !== "undefined" && Bun.file) {
                const html = await Bun.file(indexPath).text();
                return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
              } else {
                const html = await fs.readFile(indexPath, "utf8");
                return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
              }
            } catch (e) {
              return new Response("Not Found", { status: 404 });
            }
          }

          // Default 404
          return new Response("Not Found", { status: 404 });
        } catch (e) {
          if (process.env.DEBUG_MODE) console.error("KeepAlive fetch error:", e);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    });

    console.log(chalk.green(`🚀 Bun Keep-Alive on ${PORT}`));
    // unref agar tidak mencegah proses utama exit (mirip behavior server.unref)
    if (server && typeof server.unref === "function") server.unref();
  } catch (err) {
    console.log(chalk.red(`❌ Gagal menjalankan Bun.serve: ${err?.message ?? err}`));
  }
}

// ----------------------
// START WORKER (main.js)
// ----------------------
function startWorker() {
  if (isStarting) return;
  isStarting = true;

  child = spawn(["bun", join(__dirname, "main.js")], {
    stdout: "inherit",
    stderr: "pipe",
    stdin: "pipe",
  });
  console.log(chalk.red("•·–––––––––––––––––––––––––·•"));
  console.log(chalk.cyan("🔄 Worker bot started..."));

  // Tangkap error di stderr
  (async () => {
    try {
      const reader = child.stderr.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const msg = decoder.decode(value);
        if (msg.trim()) {
          console.log(chalk.red("❌ Worker Error =>"), msg);
          lastErrorDetail = msg;
        }
      }
    } catch (err) {
      console.log(chalk.red("❌ Error reading stderr:"), err.message);
    }
  })();

  // Worker mati
  child.exited.then(async (exitCode) => {
    isStarting = false;
    restartCount++;

    const reason = lastErrorDetail || `Exit code: ${exitCode}`;
    console.log(chalk.blue(`\n⚠ Worker mati. Alasan: ${reason}`));

    if (restartCount > 4) {
      console.log(chalk.yellow("⏳ Error lebih dari 5x. Delay 10 menit..."));

      const filePath = join(__dirname, "../database", "error5x.json");
      const log = {
        time: new Date().toISOString(),
        restartCount,
        reason,
      };

      try {
        let exist = [];
        if (fs.existsSync(filePath)) {
          exist = await fs.readJson(filePath).catch(() => []);
        }
        exist.push(log);
        await fs.outputJson(filePath, exist, { spaces: 2 });
        console.log(chalk.green("✅ Log error ditulis ke error5x.json"));
      } catch (e) {
        console.log(chalk.red("❌ Gagal menulis log:"), e.message);
      }

      await Bun.sleep(10 * 60 * 1000);
      restartCount = 0;
      lastErrorDetail = null;
    }

    console.log(chalk.magenta("♻ Restarting worker...\n"));
    await Bun.sleep(2000);
    startWorker();
  });
}

// ----------------------
// START
// ----------------------
launchKeepAlive();
startWorker();
