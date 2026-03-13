 "use strict";
import {DisconnectReason} from "baileys";
 import chalk from '#chalk';
import { initPremiumChecker } from '../lib/functions/premium-checker.js'
import { GeminiRotator } from '../lib/gemini/gemini-rotator.js' 


// Fungsi getDisconnectReason diletakkan di luar
function getDisconnectReason(error) {
  if (!error) return null;

  const str = error?.toString?.() || "";
  if (str.includes("bad session")) return DisconnectReason.badSession;
  if (str.includes("connection closed")) return DisconnectReason.connectionClosed;
  if (str.includes("connection lost")) return DisconnectReason.connectionLost;
  if (str.includes("replaced")) return DisconnectReason.connectionReplaced;
  if (str.includes("logged out")) return DisconnectReason.loggedOut;
  if (str.includes("restart required")) return DisconnectReason.restartRequired;
  if (str.includes("timed out")) return DisconnectReason.timedOut;
  if (str.includes("not-authorized")) return DisconnectReason.loggedOut;
  if (str.includes("invalid session")) return DisconnectReason.badSession;

  if (typeof error?.output?.statusCode === "number") return error.output.statusCode;
  if (typeof error?.statusCode === "number") return error.statusCode;

  return null;
}

export const connectionUpdate = async (connectToWhatsApp, conn, update) => {
  
  const { connection, lastDisconnect } = update;

  const errorString = lastDisconnect?.error?.toString() || "";
  const reason = getDisconnectReason(lastDisconnect?.error);

  if (connection === "close") {
    console.log(chalk.red(lastDisconnect.error));

    if (errorString.includes("Connection Terminated")) {
      console.log(chalk.red("❌ Detected: Connection Terminated"));
      process.exit(1);
    } else if (lastDisconnect.error == "Error: Stream Errored (ack)") {
      process.exit(1);
    } else if (lastDisconnect.error == "Error: Stream Errored (unknown)") {
      process.exit(1);
    } else if (reason === DisconnectReason.badSession) {
      console.log(`Bad Session File, Please Delete Session and Scan Again`);
      process.exit(1);
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log("[SYSTEM]", chalk.red("Connection closed, reconnecting..."));
      process.exit(1);
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(
        chalk.red("[SYSTEM]", "white"),
        chalk.green("Connection lost, trying to reconnect")
      );
      process.exit(1);
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(chalk.red("Connection Replaced, Please Close Other Session"));
      conn.logout();
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.red(`Device Logged Out, Please Scan Again And Run.`));
      conn.logout();
    } else if (reason === DisconnectReason.restartRequired) {
      process.exit(1);
    } else if (reason === DisconnectReason.timedOut) {
      console.log(chalk.red("Connection TimedOut, Reconnecting..."));
      connectToWhatsApp();
    }
  } else if (connection === "connecting") {
    console.log(chalk.blue("🔄 Connecting to Bot WhatsApp"))
    // optional log
  } else if (connection === "open") {
    global.geminiRotator = new GeminiRotator(global.geminiApiKeys);
    await global.geminiRotator.init();
    if (!global.pairingCode) console.log("✅ Bot WhatsApp is Connected");
    if (global.pairingCode) console.log("✅ Bot WhatsApp is Connected");

    const bot = db.data.others["restart"];
    if (bot) {
      const m = bot.m;
      const from = bot.from;
      await conn.sendMessage(from, { text: "Bot is connected" }, { quoted: m });
      delete db.data.others["restart"];
    }

 async function bunSpawnCheck(cmd, args = []) {
  try {
    const proc = Bun.spawn({
      cmd: [cmd, ...args],
      stdout: "pipe",
      stderr: "pipe"
    });

    const exitCode = await proc.exited;
    return exitCode !== 127; // 127 = command not found (Linux)
  } catch {
    return false;
  }
}

async function _quickTest() {
  let [
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  ] = await Promise.all([
    bunSpawnCheck("ffmpeg"),
    bunSpawnCheck("ffprobe"),
    bunSpawnCheck("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-filter_complex",
      "color",
      "-frames:v",
      "1",
      "-f",
      "webp",
      "-"
    ]),
    bunSpawnCheck("convert"),
    bunSpawnCheck("magick"),
    bunSpawnCheck("gm"),
    bunSpawnCheck("find", ["--version"]),
  ]);

  let s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find,
  });

  Object.freeze(global.support);

  if (!s.ffmpeg) console.log("❌ ffmpeg is not installed");
  if (s.ffmpeg && !s.ffmpegWebp) console.log("❌ libwebp is not installed");
  if (!s.convert && !s.magick && !s.gm) console.log("❌ imagemagick is not installed");
}

await conn.refreshAllGroups()
    initPremiumChecker(conn, db)
    _quickTest()
      .then(() => {
        console.log('✅ Gemini Rotator SIAP! Total key:', global.geminiApiKeys.length);
        console.log("✅ Quick Test System Done");
        console.log(chalk.red("•·–––––––––––––––––––––––––·•"));
        console.log("");
      })
      .catch(console.error);
  }
};
