const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) throw new Error(message);
}

async function request(path, init = {}) {
  return fetch(`${baseUrl}${path}`, { redirect: "manual", ...init });
}

const publicPaths = [
  "/",
  "/about-us",
  "/tours",
  "/services",
  "/destinations",
  "/blog",
  "/guides",
  "/faq",
  "/contact",
  "/check-availability",
  "/privacy-policy",
  "/terms-and-conditions",
  "/safety-flight-information",
  "/everest-base-camp-helicopter-tour-nepal",
  "/annapurna-base-camp-helicopter-tour-nepal",
  "/muktinath-helicopter-tour-nepal",
  "/helicopter-charter-nepal",
  "/emergency-helicopter-rescue-nepal",
  "/pokhara-helicopter-service",
  "/luxury-helicopter-tour-nepal",
  "/helicopter-tours/shared-helicopter-flights",
  "/destinations/annapurna-region",
  "/blog/best-helicopter-tours-in-nepal"
];

for (const path of publicPaths) {
  const response = await request(path);
  const body = await response.text();
  assert(response.status === 200, `${path}: expected 200, received ${response.status}`);
  assert(/<title>[^<]+<\/title>/.test(body), `${path}: missing title`);
  assert(/<h1[\s>]/.test(body), `${path}: missing h1`);
  assert(!body.includes("Talk to human"), `${path}: obsolete Talk to human copy found`);
  assert(!body.includes("Request current availability and an operationally confirmed fare"), `${path}: repeated live-quote copy found`);
}

const home = await request("/");
assert(home.headers.get("x-content-type-options") === "nosniff", "missing nosniff header");
assert(home.headers.get("x-frame-options") === "DENY", "missing frame protection header");
assert(home.headers.get("content-security-policy")?.includes("frame-ancestors 'none'"), "missing CSP frame protection");
assert(home.headers.get("strict-transport-security")?.includes("max-age="), "missing HSTS header");

const missing = await request("/production-audit-missing-page");
assert(missing.status === 404, `missing page: expected 404, received ${missing.status}`);

const legacy = await request("/about");
assert(legacy.status === 301, `legacy redirect: expected 301, received ${legacy.status}`);
assert(legacy.headers.get("location") === "/about-us", "legacy redirect target is incorrect");

const admin = await request("/admin");
assert([302, 307].includes(admin.status), `admin: expected auth redirect, received ${admin.status}`);
assert(admin.headers.get("location")?.startsWith("/login?callbackUrl="), "admin redirect target is incorrect");

const login = await request("/login");
const loginBody = await login.text();
assert(login.status === 200, `login: expected 200, received ${login.status}`);
assert(loginBody.includes('name="robots" content="noindex'), "login must be noindex");

const robots = await request("/robots.txt");
const robotsBody = await robots.text();
assert(robots.status === 200, "robots.txt is unavailable");
assert(robotsBody.includes("Disallow: /admin"), "robots.txt does not block admin routes");

const sitemap = await request("/sitemap.xml");
const sitemapBody = await sitemap.text();
assert(sitemap.status === 200, "sitemap.xml is unavailable");
assert((sitemapBody.match(/<url>/g) || []).length >= 30, "sitemap has too few public URLs");
assert(!sitemapBody.includes("/admin"), "sitemap exposes admin routes");

const invalidInquiry = await request("/api/inquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: "{}"
});
assert(invalidInquiry.status === 400, `invalid inquiry: expected 400, received ${invalidInquiry.status}`);

const wrongInquiryType = await request("/api/inquiry", { method: "POST", body: "{}" });
assert(wrongInquiryType.status === 415, `inquiry content type: expected 415, received ${wrongInquiryType.status}`);

const largeInquiry = await request("/api/inquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "x".repeat(17 * 1024) })
});
assert(largeInquiry.status === 413, `large inquiry: expected 413, received ${largeInquiry.status}`);

const invalidReservation = await request("/api/reservations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: "{}"
});
assert(invalidReservation.status === 400, `invalid reservation: expected 400, received ${invalidReservation.status}`);

for (const path of ["/api/invoice/create", "/api/media/upload", "/api/indexnow"]) {
  const response = await request(path, { method: "POST" });
  assert(response.status === 401, `${path}: unauthenticated request was not rejected`);
}

const health = await request("/api/health");
const healthBody = await health.json();
assert([200, 503].includes(health.status), `health: unexpected status ${health.status}`);
assert(healthBody?.checks?.database, "health: missing database check");

console.log(`Smoke tests passed: ${checks} checks across ${publicPaths.length} public pages and protected workflows.`);
