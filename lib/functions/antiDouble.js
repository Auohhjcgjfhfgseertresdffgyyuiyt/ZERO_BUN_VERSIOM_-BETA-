 import chalk from '#chalk';

const ENABLE_LOG = true
const EXTRA_DETAIL_LOG = true

function logMessage(msg) {
  if (ENABLE_LOG) console.log(msg)
}

function timeNow() {
  const d = new Date()
  return chalk.gray(d.toLocaleTimeString('id-ID') + '.' + d.getMilliseconds().toString().padStart(3, '0'))
}

/* ===========
  FAST HASH (FNV-1a 32-bit)
  Mengubah string ID → integer 0..2^32
=========== */
function hash32(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = (h >>> 0) * 0x01000193
  }
  return h >>> 0
}

/* ===========
  FIXED BUCKET TABLE (tanpa LRU)
  2048 bucket → sangat kecil RAM + cepat
=========== */
const BUCKET_SIZE = 2048
const keys = new Uint32Array(BUCKET_SIZE)   // hash
const times = new Uint32Array(BUCKET_SIZE)  // timestamp detik UNIX
const labels = new Array(BUCKET_SIZE)       // label + meta

const TTL = 10 // detik

/**
 * Anti-double super cepat tanpa LRU
 */
export function antiDouble(id, label = 'global', meta = null) {
  if (!id) return true

  const h = hash32(id)
  const idx = h & (BUCKET_SIZE - 1)  // super cepat modulo

  const nowSec = (Date.now() / 1000) | 0

  // Jika hash sama & belum expired → DUPLIKAT
  if (keys[idx] === h) {
    const t = times[idx]
    if (nowSec - t <= TTL) {
      const info = labels[idx]
      logMessage(
        chalk.yellow(`[⚠️ DUPLIKAT][${label}]`) +
        ` Hash: ${h}` +
        (EXTRA_DETAIL_LOG && info ? ` | From: ${info.label}` : '')
      )
      return true
    }
  }

  // Tulis ulang slot
  keys[idx] = h
  times[idx] = nowSec
  labels[idx] = { label, meta }

  return false
}
