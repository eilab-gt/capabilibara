/* Deterministic frame capture for SocialTDA animations.
   Steps the GSAP timeline with seek(t, false) so every frame is exact.

   Usage:  node capture-frames.mjs <slug> <16x9|square> [outDir]
           (slug = dev-page basename: signature-bin, aggregation, …)
   Deps:   `npm install playwright-core` (drives the system Chrome; no
           browser download) and `python3 -m http.server 8000` running
           from the repo root. Adjust CHROME below for non-macOS.

   Gotchas (hard-won; see docs/research-animations/qa/*.md):
   - Headless Chrome reports prefers-reduced-motion: reduce, so the URL
     must pass &motion=1 or you will capture the static frame.
   - Never return the GSAP timeline from page.evaluate (it is chainable
     and cyclic; Playwright hangs serializing it) — wrap seeks in braces.
   - page.screenshot/waitForFunction hang on these pages; use raw CDP
     screenshots and evaluate-polling instead. */
import { chromium } from "playwright-core";
import fs from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FPS = 30;

const slug = process.argv[2] || "signature-bin";
const mode = process.argv[3] || "16x9";
const outDir = process.argv[4] || "frames_" + slug + "_" + mode;
fs.mkdirSync(outDir, { recursive: true });

const BASE = "http://localhost:8000/public/animations/dev/" + slug + ".html";
const square = mode === "square";
const viewport = square ? { width: 1080, height: 1080 } : { width: 1920, height: 1080 };
const url = BASE + "?bare=1&noautoplay=1&motion=1" + (square ? "&square=1" : "");

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport, deviceScaleFactor: 1, reducedMotion: "no-preference" });
await page.goto(url, { waitUntil: "networkidle" });
let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  ready = await page.evaluate(() => !!(window.stdaAnim && window.stdaAnim.timeline));
  if (!ready) await page.waitForTimeout(250);
}
if (!ready) throw new Error("animation timeline not available (static fallback engaged?)");
await page.evaluate(() => document.fonts.ready.then(() => true));

const duration = await page.evaluate(() => window.stdaAnim.timeline.duration());
const frames = Math.ceil(duration * FPS) + 1;
console.log(`slug=${slug} mode=${mode} duration=${duration}s frames=${frames}`);

/* Raw CDP screenshots: no Playwright stability heuristics (which hang on
   this page), and much faster per frame. */
const cdp = await page.context().newCDPSession(page);
for (let i = 0; i < frames; i++) {
  const t = Math.min(i / FPS, duration);
  await page.evaluate((tt) => { window.stdaAnim.timeline.pause().seek(tt, false); }, t);
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(`${outDir}/f_${String(i).padStart(4, "0")}.png`, Buffer.from(data, "base64"));
  if (i % 60 === 0) console.log(`frame ${i}/${frames}`);
}
await browser.close();
console.log("done: " + outDir);
