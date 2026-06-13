// Dev helper: captures every page section at desktop and mobile sizes.
// Usage: node scripts/screenshot.mjs [outDir]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.argv[2] ?? join(process.env.TEMP ?? "/tmp", "squiggle-shots");
mkdirSync(outDir, { recursive: true });

const SECTIONS = ["top", "hero", "roll", "work", "about", "services", "contact"];
const VIEWPORTS = [
  { tag: "d", width: 1440, height: 900 },
  { tag: "m", width: 390, height: 844 },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  for (const section of SECTIONS) {
    if (section !== "top") {
      await page.evaluate((id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
      }, section);
    }
    await page.waitForTimeout(1500); // let GSAP scroll-triggered reveals finish
    await page.screenshot({ path: join(outDir, `${vp.tag}-${section}.png`) });
    console.log(`${vp.tag}-${section}.png`);
  }
  await page.close();
}
await browser.close();
