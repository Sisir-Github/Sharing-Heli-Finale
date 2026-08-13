const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);

const sitemapXml = await sitemapResponse.text();
const sitemapPaths = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => new URL(match[1]).pathname);
const internalLinks = new Set();
const canonicalUrls = new Set();
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) throw new Error(message);
}

for (const path of sitemapPaths) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  const html = await response.text();
  assert(response.status === 200, `${path}: expected 200, received ${response.status}`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert(Boolean(canonical), `${path}: missing canonical URL`);
  assert(!canonicalUrls.has(canonical), `${path}: duplicate canonical URL ${canonical}`);
  canonicalUrls.add(canonical);

  for (const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;

    const url = new URL(href, baseUrl);
    if (url.origin !== baseUrl) continue;
    if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/api/") || url.pathname.startsWith("/invoice/")) continue;
    internalLinks.add(`${url.pathname}${url.search}`);
  }
}

for (const path of internalLinks) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  assert(response.status === 200, `${path}: internal link returned ${response.status}`);
}

assert(sitemapPaths.length >= 30, `Expected at least 30 sitemap pages, found ${sitemapPaths.length}`);
assert(!sitemapPaths.some((path) => path.startsWith("/admin") || path.startsWith("/login") || path.startsWith("/invoice")), "Sitemap contains a private URL");

console.log(`Crawl audit passed: ${checks} checks across ${sitemapPaths.length} sitemap pages and ${internalLinks.size} unique internal links.`);
