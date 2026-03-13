// lowdb-custom.js — Bun-optimized lightweight JSON DB
import { readFile, writeFile, mkdir, rename } from "fs/promises";
import path from "path";

class JSONFile {
  constructor(filename) {
    if (!filename) throw new Error("Filename is required");
    this.filename = path.resolve(filename);
  }

  async read() {
    try {
      const text = await readFile(this.filename, "utf8");
      return JSON.parse(text);
    } catch (err) {
      if (err.code === "ENOENT") return null;
      if (err instanceof SyntaxError) {
        throw new Error(`Invalid JSON in ${this.filename}: ${err.message}`);
      }
      throw err;
    }
  }

  async write(data) {
    const dir = path.dirname(this.filename);
    await mkdir(dir, { recursive: true });

    const tmp = this.filename + ".tmp";

    const json = JSON.stringify(data, null, 2) + "\n";

    // atomic write
    await writeFile(tmp, json);
    await rename(tmp, this.filename);
  }
}

class Low {
  constructor(adapter, defaultData = {}) {
    this.adapter = adapter;
    this.defaultData = defaultData;
    this.data = structuredClone(defaultData);
  }

  async read() {
    const fileData = await this.adapter.read();

    if (fileData === null) {
      // file tidak ada → pakai default
      this.data = structuredClone(this.defaultData);
      return;
    }

    this.data = fileData;
  }

  async write() {
    await this.adapter.write(this.data);
  }
}

export { Low, JSONFile };
