#!/usr/bin/env node
// Tiny dependency-free static server for local preview. Serves ./public.
// Usage: npm run dev -- --port 7100 --host 127.0.0.1
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./public", import.meta.url));

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.split("=")[1];
  return fallback;
}

const port = Number(arg("port", process.env.PORT || 7100));
const host = arg("host", process.env.HOST || "0.0.0.0");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".map": "application/json",
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = normalize(join(root, path));
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let target = file;
    let info = await stat(target).catch(() => null);
    if (info && info.isDirectory()) {
      target = join(target, "index.html");
      info = await stat(target).catch(() => null);
    }
    if (!info) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("404 not found");
      return;
    }
    const body = await readFile(target);
    res.writeHead(200, {
      "content-type": MIME[extname(target).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end();
  }
}).listen(port, host, () => console.log(`preview: http://localhost:${port}/`));
