import assert from "node:assert/strict";
import test from "node:test";

import { rowsToCsv } from "@/lib/csv";
import { safeAdminCallback, safeLocalImageSource, safePublicHref } from "@/lib/safe-url";
import { checkRateLimit } from "@/lib/rate-limit";
import { getTourImage } from "@/lib/tours/images";
import { COMPANY } from "@/lib/constants";
import { buildLocalBusinessSchema } from "@/lib/seo/schema";

test("CSV export neutralizes spreadsheet formulas and escapes quotes", () => {
  const csv = rowsToCsv([["name", "note"], ["=HYPERLINK(\"https://bad.example\")", "A \"quote\""]]);

  assert.match(csv, /^"name","note"/);
  assert.match(csv, /"'=HYPERLINK\(""https:\/\/bad\.example""\)"/);
  assert.match(csv, /"A ""quote"""/);
});

test("public link guards reject executable and protocol-relative URLs", () => {
  assert.equal(safePublicHref("javascript:alert(1)", "/contact"), "/contact");
  assert.equal(safePublicHref("//evil.example", "/contact"), "/contact");
  assert.equal(safePublicHref("https://example.com/path", "/contact"), "https://example.com/path");
  assert.equal(safePublicHref("/tours", "/contact"), "/tours");
});

test("admin callbacks stay inside the admin area", () => {
  assert.equal(safeAdminCallback("https://evil.example"), "/admin");
  assert.equal(safeAdminCallback("//evil.example"), "/admin");
  assert.equal(safeAdminCallback("/contact"), "/admin");
  assert.equal(safeAdminCallback("/admin/reservations?status=PENDING"), "/admin/reservations?status=PENDING");
});

test("image sources fall back when a CMS value is external or malformed", () => {
  assert.equal(safeLocalImageSource("https://evil.example/image.jpg", "/images/fallback.jpg"), "/images/fallback.jpg");
  assert.equal(safeLocalImageSource("/uploads/photo.webp", "/images/fallback.jpg"), "/uploads/photo.webp");
  assert.equal(safeLocalImageSource("/images/../secret", "/images/fallback.jpg"), "/images/fallback.jpg");
});

test("tour image resolver replaces legacy illustrations and preserves uploaded photos", () => {
  assert.equal(
    getTourImage("muktinath-helicopter-tour-nepal", "/images/muktinath-tour.svg"),
    "/images/campaign/muktinath-helicopter.jpg"
  );
  assert.equal(
    getTourImage("annapurna-base-camp-helicopter-tour-nepal", "/uploads/annapurna.webp"),
    "/uploads/annapurna.webp"
  );
});

test("company map details use the verified Pokhara Flight Centre listing", () => {
  assert.equal(COMPANY.googleMapsUrl, "https://maps.app.goo.gl/16jqdvkPbzSqX3PC7");
  assert.match(COMPANY.googleMapsEmbedUrl, /28\.2103132%2C83\.9570783/);
  assert.deepEqual(COMPANY.geo, { latitude: 28.2103132, longitude: 83.9570783 });

  const businessSchema = buildLocalBusinessSchema();
  assert.equal(businessSchema.hasMap, COMPANY.googleMapsUrl);
  assert.deepEqual(businessSchema.geo, {
    "@type": "GeoCoordinates",
    latitude: COMPANY.geo.latitude,
    longitude: COMPANY.geo.longitude
  });
});

test("rate limiter rejects the sixth request in a window", () => {
  const key = `test:${crypto.randomUUID()}`;
  for (let index = 0; index < 5; index += 1) {
    assert.equal(checkRateLimit(key).allowed, true);
  }
  assert.equal(checkRateLimit(key).allowed, false);
});
