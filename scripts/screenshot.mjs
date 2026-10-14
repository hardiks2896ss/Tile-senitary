// Full-page scroll screenshots for visual review.
// Usage: npm run dev (or npm start) in another terminal, then:
//   node scripts/screenshot.mjs [url] [outDir]
// First time only: npx playwright install chromium
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "screenshots";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const [name, viewport, shots] of [
  ["desktop", { width: 1440, height: 900 }, 14],
  ["mobile", { width: 390, height: 844 }, 8],
]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500); // let the intro animation finish
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i < shots; i++) {
    const y = Math.round(((height - viewport.height) * i) / (shots - 1));
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `${out}/${name}-${String(i).padStart(2, "0")}.png` });
  }
  console.log(`${name}: ${shots} shots, page height ${height}px, errors:`, errors);
  await page.close();
}
await browser.close();
