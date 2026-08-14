import assert from "node:assert/strict";
import test from "node:test";

import { getNepalDateInput, isValidDateInput } from "@/lib/date";
import { inquirySchema, reservationSchema, sanitizeInquiry } from "@/lib/validation";

test("date inputs reject impossible calendar dates", () => {
  assert.equal(isValidDateInput("2028-02-29"), true);
  assert.equal(isValidDateInput("2027-02-29"), false);
  assert.equal(isValidDateInput("2026-04-31"), false);
  assert.equal(isValidDateInput("13-08-2026"), false);
});

test("Nepal date uses the Asia/Kathmandu calendar day", () => {
  assert.equal(getNepalDateInput(new Date("2026-08-13T18:30:00.000Z")), "2026-08-14");
});

test("reservation validation rejects an alternate date before the preferred date", () => {
  const parsed = reservationSchema.safeParse({
    customerName: "Test Customer",
    customerEmail: "customer@example.com",
    customerPhone: "+977 9856028155",
    routeName: "Pokhara to Annapurna",
    flightType: "PRIVATE",
    preferredDate: "2026-09-15",
    alternateDate: "2026-09-14",
    passengers: 2,
    companyWebsite: ""
  });

  assert.equal(parsed.success, false);
  if (!parsed.success) assert.ok(parsed.error.flatten().fieldErrors.alternateDate);
});

test("reservation validation rejects impossible dates and passenger overflow", () => {
  const parsed = reservationSchema.safeParse({
    customerName: "Test Customer",
    customerEmail: "customer@example.com",
    customerPhone: "+977 9856028155",
    routeName: "Pokhara to Annapurna",
    flightType: "FLEXIBLE",
    preferredDate: "2026-02-31",
    passengers: 21,
    companyWebsite: ""
  });

  assert.equal(parsed.success, false);
});

test("reservation requires an international WhatsApp number", () => {
  const base = {
    customerName: "Test Customer",
    customerEmail: "customer@example.com",
    routeName: "Pokhara to Annapurna",
    flightType: "FLEXIBLE",
    preferredDate: "2026-09-15",
    passengers: 2,
    companyWebsite: ""
  };

  const valid = reservationSchema.safeParse({ ...base, customerPhone: "+977 985-602-8155" });
  assert.equal(valid.success, true);
  if (valid.success) assert.equal(valid.data.customerPhone, "+9779856028155");

  assert.equal(reservationSchema.safeParse({ ...base, customerPhone: "9856028155" }).success, false);
  assert.equal(reservationSchema.safeParse({ ...base, customerPhone: "009779856028155" }).success, false);
});

test("inquiry validation and sanitization normalize customer input", () => {
  const parsed = inquirySchema.parse({
    name: "  Jane <b>Doe</b>  ",
    email: "JANE@EXAMPLE.COM",
    phone: "+977 9856028155",
    service: "Private Charter",
    message: "Please arrange a private flight for two people.",
    companyWebsite: ""
  });
  const sanitized = sanitizeInquiry(parsed);

  assert.equal(sanitized.name, "Jane Doe");
  assert.equal(sanitized.email, "jane@example.com");
});
