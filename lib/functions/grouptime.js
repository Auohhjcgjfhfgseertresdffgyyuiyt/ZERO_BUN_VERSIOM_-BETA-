import moment from '../../modules/moment.js';

// Fungsi membuka grup pada waktu tertentu (atau update data jika sudah ada)
const open = (name, id, clock, _dir) => {
  const position = _dir.findIndex(item => item.id === id);
  if (position !== -1) {
    // Update data
    _dir[position].opened = false; // Reset dulu kalau sebelumnya sudah terbuka
    _dir[position].timeOpen = clock;
    _dir[position].id = id;
  } else {
    // Tambah data baru
    _dir.push({
      name,
      id,
      opened: false,
      closed: false,
      timeOpen: clock,
      timeClose: ''
    });
  }
};

// Fungsi menutup grup pada waktu tertentu (atau update data jika sudah ada)
const close = (name, id, clock, _dir) => {
  const position = _dir.findIndex(item => item.id === id);
  if (position !== -1) {
    // Update data
    _dir[position].closed = false; // Reset dulu kalau sebelumnya sudah ditutup
    _dir[position].timeClose = clock;
    _dir[position].id = id;
  } else {
    // Tambah data baru
    _dir.push({
      name,
      id,
      opened: false,
      closed: false,
      timeOpen: '',
      timeClose: clock
    });
  }
};

// Fungsi loop otomatis menjalankan open/close grup sesuai waktu yang diatur
const running = async (_dir) => {
  let setTime = db.data.others['setTime'];
  if (!setTime) db.data.others['setTime'] = [];

  // Cache grup agar tidak fetch terus-menerus
  let groupCache = [];
  const refreshGroups = async () => {
    try {
      const data = await conn.groupFetchAllParticipating();
      groupCache = Object.values(data).map(v => ({ id: v.id, name: v.subject }));
      console.log('[INFO] Sinkronisasi grup sukses, total:', groupCache.length);
    } catch (err) {
      if (String(err).includes('rate-overlimit')) {
        console.log('[WARN] Terlalu banyak request ke server WhatsApp, skip refresh grup');
      } else {
        console.error('[ERROR] Gagal refresh grup:', err);
      }
    }
  };

  // Refresh grup setiap 10 menit
  await refreshGroups();
  setInterval(refreshGroups, 10 * 60 * 1000);

  // Loop pengecekan waktu setiap 2 detik, pakai cache grup
  if (setTime.length > 0) {
    setInterval(async () => {
      const time = moment().tz('Asia/Jakarta').format('HH:mm');
      const groupIds = groupCache.map(g => g.id);

      for (let i = setTime.length - 1; i >= 0; i--) {
        const group = setTime[i];
        if (!group) continue;

        // OPEN group
        if (!group.opened && group.timeOpen && time === group.timeOpen) {
          if (!groupIds.includes(group.id)) {
            setTime.splice(i, 1);
            console.log("Menghapus data auto time untuk grup yang sudah tidak ada");
            continue;
          }

          group.opened = true;
          group.closed = false;

          await conn.groupSettingUpdate(group.id, 'not_announcement');
          await conn.sendMessage(group.id, {
            text: `Grup dibuka otomatis pada ${group.timeOpen} WIB.\nAkan ditutup kembali pada ${group.timeClose}.`
          });

        // CLOSE group
        } else if (!group.closed && group.timeClose && time === group.timeClose) {
          if (!groupIds.includes(group.id)) {
            setTime.splice(i, 1);
            console.log("Menghapus data auto time untuk grup yang sudah tidak ada");
            continue;
          }

          group.closed = true;
          group.opened = false;

          await conn.groupSettingUpdate(group.id, 'announcement');
          await conn.sendMessage(group.id, {
            text: `Grup ditutup otomatis pada ${group.timeClose} WIB.\nAkan dibuka kembali pada ${group.timeOpen}.`
          });

        } else {
          // Reset status agar bisa aktif lagi di jam berikutnya
          if (group.opened && time !== group.timeOpen) group.opened = false;
          if (group.closed && time !== group.timeClose) group.closed = false;
        }
      }
    }, 2000);
  }
};


// Hapus data grup dari _data berdasarkan id
const del = (userId, _data) => {
  const position = _data.findIndex(item => item.id === userId);
  if (position !== -1) {
    _data.splice(position, 1);
    return true;
  }
  return false;
};

// Ambil data grup berdasarkan id
const getIndex = (userId, _dir) => {
  return _dir.find(item => item.id === userId) || null;
};

// Ambil waktu buka grup berdasarkan id
const getOpen = (userId, _dir) => {
  const group = _dir.find(item => item.id === userId);
  return group ? group.timeOpen : null;
};

// Ambil waktu tutup grup berdasarkan id
const getClose = (userId, _dir) => {
  const group = _dir.find(item => item.id === userId);
  return group ? group.timeClose : null;
};

// Cek apakah grup dengan id tertentu ada di _dir
const check = (userId, _dir) => {
  return _dir.some(item => item.id === userId);
};

export default {
  open,
  close,
  getOpen,
  getClose,
  running,
  check,
  getIndex,
  del
};
