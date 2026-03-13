 import { load } from "cheerio";
import { fileTypeFromBuffer } from "file-type";

// Bun sudah punya semua ini built-in
// const fetch = globalThis.fetch; // sudah default
// FormData, Blob, File sudah ada

// Helper: baca file jadi Buffer (sync karena Bun cepat)
const readFile = (path) => Bun.file(path).arrayBuffer().then(arr => Buffer.from(arr));

// ====================== UPLOADERS ======================

export async function AnonFiles(path) {
  const form = new FormData();
  form.append("file", new Blob([await readFile(path)]));
  const res = await fetch("https://anonfiles.com/upload", { method: "POST", body: form });
  return await res.json();
}

export async function FileIo(path) {
  const form = new FormData();
  form.append("file", new Blob([await readFile(path)]));
  const res = await fetch("https://file.io", { method: "POST", body: form });
  return await res.json();
}

export async function Uguu(path) {
  const form = new FormData();
  form.append("files[]", new Blob([await readFile(path)]));
  const res = await fetch("https://uguu.se/upload.php", { method: "POST", body: form });
  return await res.json();
}

export async function UguuBuffer(buffer) {
  const form = new FormData();
  form.append("files[]", new Blob([buffer]));
  const res = await fetch("https://uguu.se/upload.php", { method: "POST", body: form });
  const json = await res.json();
  return json.files?.[0]?.url;
}

export async function FileDitch(path) {
  const form = new FormData();
  form.append("files[]", new Blob([await readFile(path)]));
  const res = await fetch("https://up1.fileditch.com/upload.php", { method: "POST", body: form });
  return await res.json();
}

export async function Pomf2(path) {
  const form = new FormData();
  form.append("files[]", new Blob([await readFile(path)]));
  const res = await fetch("https://pomf2.lain.la/upload.php", { method: "POST", body: form });
  return await res.json();
}

export async function tmpFiles(buffer) {
  const type = await fileTypeFromBuffer(buffer);
  if (!type) throw new Error("Unknown file type");

  const form = new FormData();
  form.append("file", new Blob([buffer], { type: type.mime }), `file.${type.ext}`);

  const res = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: form,
  });

  const data = await res.json();
  if (!data?.data?.url) throw new Error("Upload failed: " + JSON.stringify(data));

  const url = new URL(data.data.url);
  return `https://tmpfiles.org/dl${url.pathname}`;
}

export async function top4top(buffer) {
  const type = await fileTypeFromBuffer(buffer) || { ext: "bin", mime: "application/octet-stream" };

  const form = new FormData();
  form.append("file_1_", new Blob([buffer], { type: type.mime }), `${Date.now()}.${type.ext}`);
  form.append("submitr", "[ رفع الملفات ]");

  const res = await fetch("https://top4top.io/index.php", {
    method: "POST",
    body: form,
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36"
    }
  });

  const html = await res.text();
  const $ = load(html);
  const link = $("div.alert.alert-warning a").attr("href");

  return link ? { status: "success", result: link } : { status: "error", msg: "Upload failed or file not allowed" };
}

export async function catbox(input, filename = "file") {
  const form = new FormData();
  form.append("reqtype", "fileupload");

  let blob;

  // 1. Path lokal
  if (typeof input === "string" && Bun.file(input).size !== undefined) {
    const buffer = await readFile(input);
    const type = await fileTypeFromBuffer(buffer) || { mime: "application/octet-stream" };
    blob = new Blob([buffer], { type: type.mime });
    filename = filename || input.split("/").pop();
  }
  // 2. Buffer
  else if (Buffer.isBuffer(input)) {
    const type = await fileTypeFromBuffer(input) || { mime: "application/octet-stream" };
    blob = new Blob([input], { type: type.mime });
  }
  // 3. Data URL base64
  else if (typeof input === "string" && input.startsWith("data:")) {
    const [, mime = "application/octet-stream", data] = input.match(/^data:([^;]*);base64,(.*)$/) || [];
    blob = new Blob([Buffer.from(data, "base64")], { type: mime });
  }
  // 4. URL
  else if (typeof input === "string" && /^https?:\/\//i.test(input)) {
    const res = await fetch(input);
    const arr = await res.arrayBuffer();
    const mime = res.headers.get("content-type") || "application/octet-stream";
    blob = new Blob([arr], { type: mime });
  } else {
    throw new Error("Unsupported input type");
  }

  form.append("fileToUpload", new Blob([blob], { type: blob.type }), filename);

  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: form
  });

  const text = await res.text();
  if (!res.ok || !text.startsWith("https://")) throw new Error("Catbox error: " + text);
  return text.trim();
}