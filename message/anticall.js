 import chalk from '#chalk';

/* ==========================================================
   SUPER LIGHT CACHE WITH TTL (NO LRU)
   - menggunakan Map
   - TTL manual
   - auto cleanup via interval
========================================================== */
class TTLMap {
  constructor(ttlMs, onExpire = null) {
    this.ttl = ttlMs;
    this.map = new Map();
    this.onExpire = onExpire;

    // interval cleanup kecil — tidak berat
    setInterval(() => this.cleanup(), 20_000).unref();
  }

  set(key, value) {
    this.map.set(key, { value, expires: Date.now() + this.ttl });
  }

  get(key) {
    const entry = this.map.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expires) {
      this._expire(key, entry);
      return undefined;
    }

    return entry.value;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    this.map.delete(key);
  }

  _expire(key, entry) {
    this.map.delete(key);
    if (this.onExpire) this.onExpire(key, entry.value);
  }

  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.map) {
      if (now > entry.expires) this._expire(key, entry);
    }
  }
}

/* ==========================================================
   INISIALISASI CACHE PENGGANTI LRU
========================================================== */

// Counter panggilan — TTL 1 jam
const callCounter = new TTLMap(1000 * 60 * 60, (key) => {
  console.log(chalk.bgGray.black("[CALLCOUNTER CLEANUP]"), `key: ${key} expired`);
});

// User diblokir — TTL 6 jam → auto unblock
const blockedUsers = new TTLMap(
  1000 * 60 * 60 * 6,
  async (key) => {
    console.log(chalk.bgGray.black("[BLOCKED USERS CLEANUP]"), `key: ${key} expired`);
    await handleUnblock(key);
  }
);

// User baru saja di-unblock — TTL 6 jam
const justUnblocked = new TTLMap(
  1000 * 60 * 60 * 6,
  (key) => {
    console.log(chalk.bgGray.black("[JUSTUNBLOCKED CLEANUP]"), `key: ${key} expired`);
  }
);

/* ==========================================================
   HANDLE AUTO UNBLOCK (dipanggil ketika TTL expired)
========================================================== */
const handleUnblock = async (callerId) => {
  try {
    await conn.updateBlockStatus(callerId, "unblock");
    console.log(
      chalk.bgGreen.black("[AUTO-UNBLOCK]"),
      chalk.white(`Nomor wa.me/${callerId.split("@")[0]} sudah di-unblock.`)
    );

    justUnblocked.set(callerId, true);
    callCounter.delete(callerId);

    await conn.sendMessage(callerId, {
      text: `✅ Kamu sudah di-unblock otomatis.\n\n⚠️ Ingat! Call lagi ➔ blokir permanen!`,
    });
  } catch (e) {
    console.error(chalk.bgRed.black("[UNBLOCK ERROR]"), chalk.white(callerId), e);
  }
};

/* ==========================================================
   FUNGSI UTAMA ANTICALL (tanpa LRU)
========================================================== */

export const antiCall = async (db, node, conn) => {
  if (global.session == 'sessions') return;

  const { from, id, status } = node[0];
  const callerId = from;

  const botNumber = conn.user.id ? conn.user.id.split(":")[0] + "@s.whatsapp.net" : conn.user.id;

  const ownerNumber = [
    `${nomerOwner}@s.whatsapp.net`,
    `${nomerOwner2}@s.whatsapp.net`,
    `6285156137901@s.whatsapp.net`,
    `${conn.user.jid}`
  ];

  const isOwner = ownerNumber.includes(callerId);
  const isPremium = isOwner ? true : db.data.users[callerId]?.premiumTime !== 0;

  if (db.data.settings["settingbot"].antiCall && status === "offer") {

    if (blockedUsers.has(callerId)) {
      console.log(chalk.bgGray.black("[BLOCKED CALL]"), chalk.white(`Ignored call dari wa.me/${callerId.split("@")[0]}`));
      return;
    }

    // Tolak call
    await conn.rejectCall(id, from);

    // Owner / Premium → restart
    if (isPremium) {
      await conn.sendMessage(callerId, { text: "Bot telah di-restart karena dipanggil oleh premium/owner." });
      console.log(chalk.bgYellow.black("[PREMIUM CALL]"), chalk.white(`${callerId.split("@")[0]} memicu restart`));
      return process.exit(1);
    }

    const current = callCounter.get(callerId) || { count: 0 };
    current.count++;
    callCounter.set(callerId, current);

    console.log(chalk.bgRed.black("[CALL DETECTED]"), chalk.white(`wa.me/${callerId.split("@")[0]} (${current.count}x)`));

    if (current.count >= 3) {
      await conn.sendMessage(callerId, {
        text: `🚫 *Kamu melakukan panggilan ke bot sebanyak 3x!*\n\nBot akan memblokirmu selama *6 jam*.\n⚠️ Setelah unblock call lagi = blokir *permanen*!`
      });

      await delay(2000);

      await conn.updateBlockStatus(callerId, "block");

      callCounter.delete(callerId);
      blockedUsers.set(callerId, true);

      console.log(chalk.bgMagenta.black("[BLOCKED 6 JAM]"), chalk.white(`${callerId.split("@")[0]} diblokir.`));

      await conn.sendMessage(`${nomerOwner}@s.whatsapp.net`, {
        text: `🚨 *Blocked 6 Jam*\nNomor: wa.me/${callerId.split("@")[0]} diblokir karena call 3x.`
      });
    }
  }
};

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
