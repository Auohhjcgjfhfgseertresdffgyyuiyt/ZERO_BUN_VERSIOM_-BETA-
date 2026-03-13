// geminiRotator.mjs
import { Low, JSONFile } from '../../modules/lowdb.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from "path";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, '../../database/gemini_usage.json');

const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

export class GeminiRotator {
  constructor(apiKeys = []) {
    if (!Array.isArray(apiKeys) || apiKeys.length === 0)
      throw new Error('API keys harus array tidak kosong!');
    
    this.apiKeys = [...new Set(apiKeys.filter(k => k.trim()))];
    this.dailyLimit = 15;
    this.db = db;
  }

  async init() {
    await this.db.read();
    this.db.data ||= { usage: {}, lastReset: null };
    await this.autoReset();
    await this.db.write();
  }

  getToday() {
    return new Date().toISOString().slice(0, 10);
  }

  async autoReset() {
    const today = this.getToday();
    if (this.db.data.lastReset !== today) {
      this.db.data.usage = {};
      this.db.data.lastReset = today;
     // console.log('Hari baru! Semua key di-reset');
    }
  }

  async getNextKey() {
    await this.init();

    for (const key of this.apiKeys) {
      if (!(key in this.db.data.usage)) {
        this.db.data.usage[key] = 0;
      }
    }

    // PEMAKAIAN SAMA RATA 100%
    const available = this.apiKeys
      .filter(k => this.db.data.usage[k] < this.dailyLimit)
      .sort((a, b) => this.db.data.usage[a] - this.db.data.usage[b]);

    if (available.length === 0) {
      throw new Error('SEMUA KEY HABIS (15/15)! Tunggu besok atau tambah key!');
    }

    const key = available[0]; // selalu ambil yang paling sedikit dipakai
    this.db.data.usage[key]++;
    await this.db.write();

    console.log(`Key: ${key.slice(0,10)}... → ${this.db.data.usage[key]}/15 (rata)`);
    return key;
  }

  async getStats() {
    await this.init();
    return this.apiKeys.map(key => ({
      key: key.slice(0, 10) + '...',
      used: this.db.data.usage[key] || 0,
      remaining: this.dailyLimit - (this.db.data.usage[key] || 0),
      percent: Math.round(((this.db.data.usage[key] || 0) / this.dailyLimit) * 100)
    }));
  }

  async reset() {
    this.db.data = { usage: {}, lastReset: null };
    await this.db.write();
    console.log('Rotator di-reset manual!');
  }
}