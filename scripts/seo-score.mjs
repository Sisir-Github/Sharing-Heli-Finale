/**
 * SEO scorecard.
 *
 * Crawls every URL in the sitemap against a fixed rubric and prints a score.
 * This measures on-site technical SEO only — the half you control in code.
 * Rankings also depend on indexation, reviews, listings and backlinks, none of
 * which can be measured from here. See docs/SEO.md section 2.
 *
 * Usage:
 *   npm run build && npx next start -p 3000 &
 *   node scripts/seo-score.mjs [baseUrl]
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] || process.env.SEO_AUDIT_URL || "http://127.0.0.1:3000";
const EXEC = process.env.PLAYWRIGHT_CHROMIUM || undefined;

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/");
if (!paths.length) {
  console.error("No URLs found in sitemap. Is the server running at", BASE, "?");
  process.exit(1);
}

const browser = await chromium.launch(EXEC ? { executablePath: EXEC } : {});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const checks = {};
const rec = (cat, key, pass, path) => {
  const k = `${cat}|${key}`;
  checks[k] = checks[k] || { cat, key, pass: 0, fail: 0, failures: [] };
  if (pass) checks[k].pass++;
  else {
    checks[k].fail++;
    if (checks[k].failures.length < 5) checks[k].failures.push(path);
  }
};

for (const path of paths) {
  const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(110);
  const d = await page.evaluate(() => {
    const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.getAttribute("content") || "";
    const prop = (p) => document.querySelector(`meta[property="${p}"]`)?.getAttribute("content") || "";
    let types = [];
    let ldValid = true;
    let ldCount = 0;
    for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
      ldCount++;
      try {
        const j = JSON.parse(s.textContent);
        for (const i of Array.isArray(j) ? j : [j]) {
          const t = i["@type"];
          types.push(...(Array.isArray(t) ? t : [t]));
        }
      } catch {
        ldValid = false;
      }
    }
    const text = document.body.innerText.trim();
    // Lighthouse exempts inline text links inside prose; only standalone controls count.
    const small = [...document.querySelectorAll("a,button")].filter((el) => {
      if (getComputedStyle(el).display === "inline") return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24);
    }).length;
    return {
      title: document.title,
      desc: meta("description"),
      robots: meta("robots"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
      alt: [...document.querySelectorAll('link[rel="alternate"]')].map((l) => l.getAttribute("hreflang")),
      og: !!(prop("og:title") && prop("og:image") && prop("og:type")),
      tw: !!meta("twitter:card"),
      h1: document.querySelectorAll("h1").length,
      h2: document.querySelectorAll("h2").length,
      types,
      ldValid,
      ldCount,
      imgNoAlt: [...document.images].filter((i) => !i.getAttribute("alt")).length,
      links: new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href"))).size,
      words: text.split(/\s+/).length,
      cjk: (text.match(/[一-鿿]/g) || []).length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      viewport: !!document.querySelector('meta[name="viewport"]'),
      crumbVisible: !!document.querySelector('nav[aria-label="Breadcrumb"]'),
      small
    };
  });

  const zh = path.startsWith("/zh");
  // Baidu truncates around 30 Chinese characters of title and 110 of description.
  const titleOk = zh ? d.title.length >= 12 && d.title.length <= 32 : d.title.length >= 25 && d.title.length <= 65;
  const descOk = zh ? d.desc.length >= 40 && d.desc.length <= 112 : d.desc.length >= 70 && d.desc.length <= 165;
  const depthOk = (zh ? d.cjk : d.words) >= (zh ? 600 : 300);
  const isLocaleHome = path === "/" || path === "/zh";

  rec("Crawlability", "HTTP 200", res.status() === 200, path);
  rec("Crawlability", "Indexable (no noindex)", !/noindex/.test(d.robots), path);
  rec("Crawlability", "Canonical present", d.canonical.length > 0, path);
  rec("Crawlability", "Internal links (>=15, >=8 in /zh)", d.links >= (zh ? 8 : 15), path);

  rec("Metadata", "Title present", d.title.length > 0, path);
  rec("Metadata", "Title within display limit", titleOk, path);
  rec("Metadata", "Description present", d.desc.length > 0, path);
  rec("Metadata", "Description within limit", descOk, path);
  rec("Metadata", "Open Graph complete", d.og, path);
  rec("Metadata", "Twitter card", d.tw, path);
  rec("Metadata", "hreflang on bilingual pages", !isLocaleHome && !zh ? true : d.alt.some((a) => a && a.startsWith("zh")), path);

  rec("Structured data", "JSON-LD present", d.ldCount > 0, path);
  rec("Structured data", "JSON-LD parses", d.ldValid, path);
  rec("Structured data", "Entity graph (Org + WebSite)", d.types.includes("Organization") && d.types.includes("WebSite"), path);
  rec("Structured data", "WebPage or Article node", d.types.includes("WebPage") || d.types.includes("Article"), path);
  rec("Structured data", "BreadcrumbList (non-home)", path === "/" || d.types.includes("BreadcrumbList"), path);

  rec("Content", "Exactly one H1", d.h1 === 1, path);
  rec("Content", "Subheading structure", d.h2 >= 2, path);
  rec("Content", "Depth threshold", depthOk, path);
  rec("Content", "All images have alt text", d.imgNoAlt === 0, path);

  rec("Mobile & UX", "No horizontal overflow", !d.overflow, path);
  rec("Mobile & UX", "Viewport meta", d.viewport, path);
  rec("Mobile & UX", "Tap targets >= 24px", d.small === 0, path);
  rec("Mobile & UX", "Visible breadcrumbs (non-home)", isLocaleHome || d.crumbVisible, path);
}
await browser.close();

const robots = await (await fetch(`${BASE}/robots.txt`)).text();
const baiduSitemap = await (await fetch(`${BASE}/sitemap-baidu.xml`)).text();
const site = {
  "robots.txt permits crawling": /Allow: \//.test(robots),
  "AI crawlers named explicitly": /GPTBot/.test(robots) && /ClaudeBot/.test(robots) && /PerplexityBot/.test(robots),
  "Chinese crawlers named explicitly": /Baiduspider/.test(robots) && /Sogou/.test(robots),
  "Sitemaps declared in robots.txt": /Sitemap:/.test(robots),
  "XML sitemap valid": /<urlset/.test(sitemapXml),
  "Sitemap carries hreflang": /rel="alternate"/.test(sitemapXml),
  "Sitemap carries images": /<image:loc>/.test(sitemapXml),
  "Baidu sitemap with mobile tags": /mobile:mobile/.test(baiduSitemap),
  "llms.txt served": (await fetch(`${BASE}/llms.txt`)).ok,
  "llms-full.txt served": (await fetch(`${BASE}/llms-full.txt`)).ok,
  "404 returns HTTP 404": (await fetch(`${BASE}/no-such-page-xyz`)).status === 404
};

const cats = {};
for (const c of Object.values(checks)) {
  cats[c.cat] = cats[c.cat] || { pass: 0, total: 0, fails: [] };
  cats[c.cat].pass += c.pass;
  cats[c.cat].total += c.pass + c.fail;
  if (c.fail) cats[c.cat].fails.push(`${c.key}: ${c.fail} page(s) — ${c.failures.join(", ")}`);
}
cats["Site-wide files"] = {
  pass: Object.values(site).filter(Boolean).length,
  total: Object.keys(site).length,
  fails: Object.entries(site).filter(([, v]) => !v).map(([k]) => k)
};

console.log(`\nPages audited: ${paths.length}\n`);
let tp = 0;
let tt = 0;
for (const [name, v] of Object.entries(cats)) {
  tp += v.pass;
  tt += v.total;
  console.log(`${name.padEnd(20)} ${String(v.pass).padStart(4)}/${String(v.total).padEnd(4)}  ${((100 * v.pass) / v.total).toFixed(1)}%`);
  for (const f of v.fails) console.log(`   ! ${f}`);
}
console.log(`\nON-SITE SCORE: ${tp}/${tt} = ${((100 * tp) / tt).toFixed(1)}%`);
console.log("\nThis covers on-site technical SEO only. Indexation, reviews, listings");
console.log("and backlinks are measured in Search Console, not here.");
