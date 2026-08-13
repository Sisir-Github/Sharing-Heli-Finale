import assert from "node:assert/strict";
import test from "node:test";

import { rowsToCsv } from "@/lib/csv";
import { safeAdminCallback, safeLocalImageSource, safePublicHref } from "@/lib/safe-url";
import { checkRateLimit } from "@/lib/rate-limit";
import { getTourImage } from "@/lib/tours/images";

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

test("rate limiter rejects the sixth request in a window", () => {
  const key = `test:${crypto.randomUUID()}`;
  for (let index = 0; index < 5; index += 1) {
    assert.equal(checkRateLimit(key).allowed, true);
  }
  assert.equal(checkRateLimit(key).allowed, false);
});
