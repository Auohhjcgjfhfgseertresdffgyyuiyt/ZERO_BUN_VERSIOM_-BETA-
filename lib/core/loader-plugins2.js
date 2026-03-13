import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

global.plugins = Object.create(null);

// ===============================
//  AUTO-DETECT PLUGINS DIR
// ===============================
function resolvePluginDir() {
  const root = path.resolve(__dirname, "../../");
  const possible = [
    path.join(root, "plugins"),
    path.join(root, "lib", "plugins"),
    path.join(root, "src", "plugins"),
    path.join(root, "build", "plugins"),
  ];

  for (const p of possible) {
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
      return p;
    }
  }
  throw new Error("Folder 'plugins' tidak ditemukan di proyek ini!");
}

const PLUGIN_DIR = resolvePluginDir();

// ===============================
//  LOAD / UNLOAD PLUGIN
// ===============================
async function loadPlugin(filePath, eventType = "change") {
  if (!filePath.endsWith(".js")) return;

  const rel = path.relative(PLUGIN_DIR, filePath).replace(/\\/g, "/");

  try {
    const cacheBust = `?v=${Date.now()}_${Math.random()}`;
    const fileUrl = pathToFileURL(filePath).href + cacheBust;

    // Hapus Node require cache (jika ada) — safe to call even di Bun
    try {
      delete require.cache[filePath];
    } catch (e) {
      // ignore if require not available
    }

    const pluginModule = await import(fileUrl);
    global.plugins[rel] = pluginModule.default || pluginModule;

    if (eventType === "add") {
      console.log("Added plugin:", rel);
    } else if (eventType === "change") {
      console.log("Reloaded plugin:", rel);
    }
    // eventType "initial" tidak log → anti spam
  } catch (err) {
    console.error(`Failed to load plugin: ${rel}`, err?.message ?? err);
  }
}

function unloadPlugin(filePath) {
  const rel = path.relative(PLUGIN_DIR, filePath).replace(/\\/g, "/");
  if (global.plugins[rel]) {
    delete global.plugins[rel];
    console.log("Removed plugin:", rel);
  }
  try {
    delete require.cache[filePath];
  } catch (e) {
    // ignore
  }
}

// ===============================
//  LOAD ALL PLUGINS (INITIAL LOAD - TANPA SPAM LOG)
// ===============================
async function loadAllPlugins(dir = PLUGIN_DIR) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const promises = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      promises.push(loadAllPlugins(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      // eventType = "initial" → tidak ada console.log di loadPlugin
      promises.push(loadPlugin(fullPath, "initial"));
    }
  }
  await Promise.all(promises);
}

// ===============================
//  SIMPLE POLLING WATCHER (tanpa chokidar)
//  - Cross-platform (Linux/Windows/macOS)
//  - Debounce untuk awaitWriteFinish
// ===============================
function createPollingWatcher({
  dir = PLUGIN_DIR,
  pollInterval = 500, // ms
  stabilityThreshold = 200, // ms (awaitWriteFinish)
  ignored = /(^|[\/\\])\../, // ignore dotfiles/dirs
} = {}) {
  const fileMap = new Map(); // filePath -> { mtimeMs }
  const timers = new Map(); // filePath -> timeoutId
  let stopped = false;

  async function scanDirRecursive(d, out) {
    const entries = await fs.promises.readdir(d, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const full = path.join(d, entry.name);
      if (ignored && ignored.test(entry.name)) continue;
      if (entry.isDirectory()) {
        await scanDirRecursive(full, out);
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        out.push(full);
      }
    }
  }

  async function initialScan() {
    const files = [];
    await scanDirRecursive(dir, files);
    for (const f of files) {
      try {
        const st = await fs.promises.stat(f);
        fileMap.set(f, { mtimeMs: st.mtimeMs });
      } catch (e) {
        // ignore stat errors for initial load
      }
    }
  }

  async function poll() {
    if (stopped) return;
    try {
      const currentFiles = [];
      await scanDirRecursive(dir, currentFiles);
      const currentSet = new Set(currentFiles);

      // detect added or changed
      for (const f of currentFiles) {
        if (ignored && ignored.test(path.basename(f))) continue;
        let st;
        try {
          st = await fs.promises.stat(f);
        } catch (e) {
          continue;
        }
        const prev = fileMap.get(f);
        if (!prev) {
          // new file
          fileMap.set(f, { mtimeMs: st.mtimeMs });
          scheduleLoad(f, "add");
        } else if (st.mtimeMs > prev.mtimeMs) {
          // changed
          fileMap.set(f, { mtimeMs: st.mtimeMs });
          scheduleLoad(f, "change");
        }
      }

      // detect removed
      for (const existing of Array.from(fileMap.keys())) {
        if (!currentSet.has(existing)) {
          // removed
          fileMap.delete(existing);
          clearTimer(existing);
          unloadPlugin(existing);
        }
      }
    } catch (e) {
      console.error("Plugin watcher poll error:", e?.message ?? e);
    } finally {
      if (!stopped) {
        setTimeout(poll, pollInterval);
      }
    }
  }

  function scheduleLoad(filePath, eventType) {
    clearTimer(filePath);
    const id = setTimeout(async () => {
      timers.delete(filePath);
      await loadPlugin(filePath, eventType);
    }, stabilityThreshold);
    timers.set(filePath, id);
  }

  function clearTimer(filePath) {
    const id = timers.get(filePath);
    if (id) {
      clearTimeout(id);
      timers.delete(filePath);
    }
  }

  return {
    async start() {
      await initialScan();
      // start polling loop
      setTimeout(poll, pollInterval);
      console.log("🔥 Plugin Hot-Reload ACTIVE");
    },
    stop() {
      stopped = true;
      for (const id of timers.values()) clearTimeout(id);
      timers.clear();
      fileMap.clear();
    },
  };
}

// ===============================
//  START LOADER
// ===============================
async function startPluginLoader() {
  try {
    console.log("⚙️  Loading all plugins...");
    await loadAllPlugins(); // initial load tanpa spam

    const total = Object.keys(global.plugins).length;
    console.log(`✅ Total plugins loaded: ${total}`);

    // Mulai polling watcher (ganti chokidar)
    const watcher = createPollingWatcher({
      dir: PLUGIN_DIR,
      pollInterval: 600, // tweak sesuai kebutuhan
      stabilityThreshold: 250,
      ignored: /(^|[\/\\])\../,
    });
    await watcher.start();

    // optional: expose watcher for stopping later
    global.__plugin_watcher = watcher;
  } catch (err) {
    console.error("Plugin loader gagal:", err);
  }
}

await startPluginLoader();