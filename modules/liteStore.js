 // lightweight MessageStore tanpa dependency 'lru-cache'
// compatible Bun / Node — hanya Map native

class LRUMap {
  constructor({ max = 100, ttl = 0 } = {}) {
    this.max = Math.max(1, max)
    this.ttl = Math.max(0, ttl) // ms, 0 = never expire by time
    this.map = new Map() // maintain insertion order; oldest first
  }

  _now() {
    return Date.now()
  }

  _isExpired(entry) {
    return entry && entry.expiresAt !== null && entry.expiresAt <= this._now()
  }

  has(key) {
    const entry = this.map.get(key)
    if (!entry) return false
    if (this._isExpired(entry)) {
      this.map.delete(key)
      return false
    }
    return true
  }

  get(key) {
    const entry = this.map.get(key)
    if (!entry) return undefined
    if (this._isExpired(entry)) {
      this.map.delete(key)
      return undefined
    }
    // move to end (most recently used)
    this.map.delete(key)
    this.map.set(key, entry)
    return entry.value
  }

  set(key, value) {
    if (this.map.has(key)) this.map.delete(key)
    const expiresAt = this.ttl > 0 ? this._now() + this.ttl : null
    this.map.set(key, { value, expiresAt })
    // evict oldest while over max
    while (this.map.size > this.max) {
      const oldestKey = this.map.keys().next().value
      if (oldestKey === undefined) break
      this.map.delete(oldestKey)
    }
    return this
  }

  delete(key) {
    return this.map.delete(key)
  }

  clear() {
    this.map.clear()
  }

  get size() {
    return this.map.size
  }

  // Improved prune:
  // 1) Remove expired entries
  // 2) If still over max, remove oldest until size <= max
  prune() {
    if (this.map.size === 0) return
    const now = this._now()
    const toDelete = []

    // collect expired keys first
    for (const [k, entry] of this.map.entries()) {
      if (entry.expiresAt !== null && entry.expiresAt <= now) toDelete.push(k)
    }

    // delete expired
    for (const k of toDelete) this.map.delete(k)

    // evict oldest while over max
    while (this.map.size > this.max) {
      const oldestKey = this.map.keys().next().value
      if (oldestKey === undefined) break
      this.map.delete(oldestKey)
    }
  }

  // stats / iteration helpers (return raw values)
  entries() {
    return Array.from(this.map.entries()).map(([k, entry]) => [k, entry.value])
  }

  values() {
    return Array.from(this.map.values()).map(e => e.value)
  }
}

/* MessageStore
   - messagesByJid: LRUMap of jid -> per-jid LRUMap(messageId -> fullMessage)
   - groupMetadataCache: LRUMap jid -> metadata
*/
export class MessageStore {
  constructor(ttl = 3 * 60 * 1000, maxPerJid = 100, maxJids = 100) {
    this.ttl = ttl
    this.maxPerJid = maxPerJid
    this.maxJids = maxJids

    this.messagesByJid = new LRUMap({ max: maxJids, ttl }) // value: LRUMap per jid
    this.groupMetadataCache = new LRUMap({ max: 200, ttl: 10 * 60 * 1000 })

    this.fetchGroupMetadata = async () => null
    this._connected = false

    // Auto-prune tiap 1 menit
    this._pruneInterval = setInterval(() => {
      try {
        for (const [, store] of this.messagesByJid.entries()) {
          if (store && typeof store.prune === 'function') store.prune()
        }
        if (this.groupMetadataCache && typeof this.groupMetadataCache.prune === 'function')
          this.groupMetadataCache.prune()
      } catch (e) {
        if (process.env.DEBUG_MODE) console.error('LiteStore prune error', e)
      }
    }, 60 * 1000)
    if (this._pruneInterval.unref) this._pruneInterval.unref()
  }

  // Add array of WA messages (store the entire msg object)
  add(messages) {
    if (!Array.isArray(messages) || messages.length === 0) return

    for (const msg of messages) {
      try {
        if (!msg?.message || !msg.key?.remoteJid || !msg.key?.id) continue
        const jid = msg.key.remoteJid
        let store = this.messagesByJid.get(jid)
        if (!store) {
          store = new LRUMap({ max: this.maxPerJid, ttl: this.ttl })
          this.messagesByJid.set(jid, store)
        }

        // preserve full message object *as-is*
        // ensure we keep original messageTimestamp if present
        const toStore = Object.assign({}, msg)
        // if messageTimestamp not set, fallback to Date.now() (rare)
        if (typeof toStore.messageTimestamp === 'undefined' || toStore.messageTimestamp === null) {
          toStore.messageTimestamp = Date.now()
        }

        store.set(msg.key.id, toStore)
      } catch (e) {
        if (process.env.DEBUG_MODE) console.error('[LiteStore] add error', e?.message ?? e)
      }
    }
  }

  // return stored message object or null
  loadMessage(jid, id) {
    const store = this.messagesByJid.get(jid)
    if (!store) return null
    const msg = store.get(id)
    return msg || null
  }

  // convenience: get stored message content (like older API)
  // but prefer loadMessage to get full object
  getMessage(jid, id) {
    const stored = this.loadMessage(jid, id)
    return stored ? stored.message : null
  }

  clear(jid) {
    const store = this.messagesByJid.get(jid)
    if (store && typeof store.clear === 'function') store.clear()
    this.messagesByJid.delete(jid)
  }

  clearAll() {
    for (const [, store] of this.messagesByJid.entries()) {
      if (store && typeof store.clear === 'function') store.clear()
    }
    this.messagesByJid.clear()
    this.groupMetadataCache.clear()
  }

  getStats(verbose = false) {
    const stats = {
      totalJids: this.messagesByJid.size,
      totalGroupsCached: this.groupMetadataCache.size,
      memoryMB: (typeof process !== 'undefined' && process.memoryUsage)
        ? (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        : 'n/a',
    }

    if (verbose) {
      stats.perJid = this.messagesByJid.entries().map(([jid, store]) => ({
        jid,
        count: store.size,
      }))
    }

    return stats
  }

  cachedGroupMetadata = async (jid) => {
    try {
      if (this.groupMetadataCache.has(jid)) {
        return this.groupMetadataCache.get(jid)
      }

      const metadata = await this.fetchGroupMetadata(jid)
      if (metadata) {
        this.groupMetadataCache.set(jid, metadata)
        return metadata
      }
    } catch (e) {
      if (process.env.DEBUG_MODE) console.error('Error cachedGroupMetadata:', e?.message ?? e)
    }
    return null
  }

  integrateWithConn(conn) {
    if (this._connected) return
    this._connected = true

    this.fetchGroupMetadata = async (jid) => {
      try {
        return await conn.groupMetadata(jid)
      } catch {
        return null
      }
    }

    conn.ev.on('messages.upsert', (msgUpdate) => {
      try {
        const { messages, type } = msgUpdate
        if (!Array.isArray(messages)) return
        if (type === 'notify' || type === 'append') {
          this.add(messages)
        }
      } catch (err) {
        if (process.env.DEBUG_MODE) console.error('[LiteStore] Error caching message:', err?.message ?? err)
      }
    })
  }

  stopAutoPrune() {
    if (this._pruneInterval) clearInterval(this._pruneInterval)
    this._pruneInterval = null
  }
}

const liteStore = new MessageStore()
export default liteStore
