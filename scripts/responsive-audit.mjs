import { chromium } from "playwright-core";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = ["/", "/tours", "/services", "/blog", "/contact", "/check-availability", "/login"];
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 }
];
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "chrome", headless: true });
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) throw new Error(message);
}

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, colorScheme: "light", reducedMotion: "reduce" });
    const page = await context.newPage();

    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      const audit = await page.evaluate(() => ({
        h1Count: document.querySelectorAll("h1").length,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        failedImages: Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.alt || image.src),
        tinyTargets: Array.from(document.querySelectorAll("button, input, select, textarea, a[aria-label]"))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return !element.matches(".sr-only, .hidden, [type='hidden'], [aria-hidden='true']")
              && style.display !== "none"
              && style.visibility !== "hidden"
              && rect.width > 0
              && rect.height > 0
              && (rect.width < 24 || rect.height < 24);
          })
          .map((element) => element.getAttribute("aria-label") || element.textContent?.trim().slice(0, 40) || element.tagName)
      }));

      assert(audit.h1Count === 1, `${viewport.name} ${route}: expected one h1, found ${audit.h1Count}`);
      assert(!audit.horizontalOverflow, `${viewport.name} ${route}: horizontal overflow detected`);
      assert(audit.failedImages.length === 0, `${viewport.name} ${route}: failed images: ${audit.failedImages.join(", ")}`);
      assert(audit.tinyTargets.length === 0, `${viewport.name} ${route}: undersized interactive controls: ${audit.tinyTargets.join(", ")}`);
    }

    await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
    assert(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)), `${viewport.name}: contact page overflow detected`);

    if (viewport.name === "mobile") {
      assert(await page.getByRole("button", { name: "Toggle menu" }).isVisible(), "mobile menu button is not visible");
      await page.getByRole("button", { name: "Toggle menu" }).click();
      assert(await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible(), "mobile navigation did not open");
      assert(await page.getByRole("navigation", { name: "Reservation actions" }).isVisible(), "mobile reservation bar is not visible");
    }

    await context.close();
  }
} finally {
  await browser.close();
}

console.log(`Responsive audit passed: ${checks} checks at ${viewports.length} viewport sizes.`);
