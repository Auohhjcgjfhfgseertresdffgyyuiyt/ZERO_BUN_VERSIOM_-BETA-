

let chalk;

try {
  chalk  = await import('chalk');
} catch (err) {
  //console.warn("[chalk] Tidak ditemukan, memakai fallback.");

  // Fungsi passthrough
  const passthrough = (...args) => args.join(" ");

  const styleHandler = {
    apply(target, thisArg, args) {
      return args.join(" ");
    },
    get(target, prop) {
      // Setiap chain style mengembalikan function baru (bukan undefined)
      return new Proxy(passthrough, styleHandler);
    }
  };

  chalk = new Proxy({}, {
    get(target, prop) {
      // chalk.red -> function
      // chalk.blue.bold -> function
      return new Proxy(passthrough, styleHandler);
    }
  });
}

export default chalk;
