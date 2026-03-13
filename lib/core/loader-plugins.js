 import { readdirSync, statSync, readFileSync, existsSync,watch } from "fs";
import { join } from "path";
import syntaxerror from "syntax-error";
import chokidar from "chokidar";
import chalk from "#chalk";
 

const pluginFolder = join(__dirname, "../../plugins");
const pluginFilter = (filename) => /\.js$/.test(filename);

global.plugins = {};
if (!global.pluginsErrorReported) global.pluginsErrorReported = new Set();

/**
 * Recursive init semua plugin di folder plugins
 */
async function filesInit(folderPath) {
  const files = readdirSync(folderPath);

  for (let file of files) {
    const filePath = join(folderPath, file);
    const fileStat = statSync(filePath);

    if (fileStat.isDirectory()) {
      await filesInit(filePath);
    } else if (pluginFilter(file)) {
      try {
        const module = await import("file://" + filePath);
        global.plugins[file] = module.default || module;
      } catch (e) {
        conn.logger.error(e);
        delete global.plugins[file];
      }
    }
  }
}

filesInit(pluginFolder);

/**
 * Fungsi reload plugin saat file berubah
 */
global.reload = async (_ev, filename) => {
  if (!pluginFilter(filename)) return;

  const dir = global.__filename(join(filename), true); // Bun-safe path

  // Jika plugin sudah ada
  if (filename in global.plugins) {
    if (existsSync(dir)) {
      console.log(
        chalk.bgGreen.black("[ UPDATE ]"),
        chalk.white(filename)
      );
    } else {
      conn.logger.warn(`deleted plugin '${filename}'`);
      return delete global.plugins[filename];
    }
  } else {
    console.log(
      chalk.bgGreen.black("[ UPDATE ]"),
      chalk.white(filename)
    );
  }

  // Cek syntax
  const code = readFileSync(dir, "utf8");
  let err = syntaxerror(code, filename, {
    sourceType: "module",
    allowAwaitOutsideFunction: true,
  });

  if (err) {
    if (!global.pluginsErrorReported.has(filename)) {
      global.pluginsErrorReported.add(filename);

      conn.logger.error(
        `syntax error while loading '${filename}'\n${err}`
      );

      if (global.ownerBot) {
        const pesanError = `❌ *Plugin Error Detected*

📂 *File:* \`${filename}\`

⚠️ *Syntax Error:*
\`\`\`
${err}
\`\`\`

⏰ *Time:* ${new Date().toLocaleString("id-ID", {
  timeZone: "Asia/Jakarta",
})}
`;
        // await conn.sendMessage(global.ownerBot, { text: pesanError })
      }
    }
    return;
  }

  // Import module plugin
  try {
    const module = await import(
      `${global.__filename(dir)}?update=${Date.now()}`
    );

    global.plugins[filename] = module.default || module;

    // Berhasil reload: hapus dari error list
    global.pluginsErrorReported.delete(filename);
  } catch (e) {
    if (!global.pluginsErrorReported.has(filename)) {
      global.pluginsErrorReported.add(filename);

      conn.logger.error(
        `error require plugin '${filename}'\n${e.stack || e.message}`
      );

      if (global.ownerBot) {
        const pesanError = `❌ *Plugin Import Error*

📂 *File:* \`${filename}\`

⚠️ *Error:*
\`\`\`
${e.message}
\`\`\`

⏰ *Time:* ${new Date().toLocaleString("id-ID", {
  timeZone: "Asia/Jakarta",
})}
`;
        // await conn.sendMessage(global.ownerBot, { text: pesanError })
      }
    }
  } finally {
    // Sort plugin biar rapi
    global.plugins = Object.fromEntries(
      Object.entries(global.plugins).sort(([a], [b]) =>
        a.localeCompare(b)
      )
    );
  }
};

// ========== WATCHER SYSTEM ==========
const watcher = chokidar.watch(pluginFolder, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 500,
    pollInterval: 100,
  },
});

// Trigger reload
watcher.on("all", (event, filePath) => {
  if (event === "change" && filePath.endsWith(".js")) {
    const filename = filePath.split("/").pop();
    global.reload(null, filename);
  }
});

// Freeze fungsi reload
Object.freeze(global.reload);

// Support for old `watch()` system (optional)
watch(pluginFolder, global.reload);
