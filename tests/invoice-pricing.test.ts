import assert from "node:assert/strict";
import test from "node:test";

import { computeItems, computeTotals } from "@/lib/invoice/utils";
import { invoiceSchema } from "@/lib/invoice/validation";
import { getTourComparisonRates, getTourPricePresentation, isPriceDateActive } from "@/lib/tours/pricing";

const invoicePayload = {
  issueDate: "2026-08-13",
  paymentDueDate: "2026-08-20",
  sender: { name: "Sharing Heli", addressLines: ["Pokhara, Nepal"] },
  receiver: { name: "Customer", addressLines: ["Kathmandu, Nepal"] },
  items: [{ description: "Private charter", unitPrice: 1250.125, quantity: 2 }],
  paymentInfo: {
    bankName: "Example Bank",
    accountName: "Sharing Heli",
    accountNumber: "123",
    swiftBic: "EXAMPLENP",
    instructions: "Use the invoice number as the payment reference."
  }
};

test("invoice dates and quantities are validated", () => {
  assert.equal(invoiceSchema.safeParse(invoicePayload).success, true);
  assert.equal(invoiceSchema.safeParse({ ...invoicePayload, paymentDueDate: "2026-08-12" }).success, false);
  assert.equal(invoiceSchema.safeParse({ ...invoicePayload, issueDate: "2026-02-31" }).success, false);
  assert.equal(invoiceSchema.safeParse({ ...invoicePayload, items: [{ description: "Flight", unitPrice: 100, quantity: 0 }] }).success, false);
});

test("invoice totals are calculated from unit prices and quantities", () => {
  const items = computeItems([{ description: "Flight", unitPrice: 1250.125, quantity: 2, lineTotal: 1 }]);
  const totals = computeTotals(items, { tax: 100, discount: 50 });

  assert.equal(items[0].unitPrice, 1250.13);
  assert.equal(items[0].lineTotal, 2500.26);
  assert.deepEqual(totals, { subtotal: 2500.26, tax: 100, discount: 50, grandTotal: 2550.26 });
});

test("tour pricing is shown after verification with optional validity dates", () => {
  const active = getTourPricePresentation({
    currency: "USD",
    priceMode: "SHARED_PER_PERSON",
    sharedPriceFrom: 500,
    lastVerifiedAt: "2026-08-01",
    priceValidFrom: "2026-08-01",
    priceValidUntil: "2999-08-31"
  });
  const expired = getTourPricePresentation({
    currency: "USD",
    priceMode: "SHARED_PER_PERSON",
    sharedPriceFrom: 500,
    lastVerifiedAt: "2020-01-01",
    priceValidFrom: "2020-01-01",
    priceValidUntil: "2020-01-02"
  });
  const noValidityWindow = getTourPricePresentation({
    currency: "USD",
    priceMode: "PRIVATE_PER_AIRCRAFT",
    privateCharterPrice: 1900,
    lastVerifiedAt: "2026-08-01"
  });

  assert.equal(active.isVerified, true);
  assert.match(active.label, /\$500/);
  assert.equal(noValidityWindow.isVerified, true);
  assert.match(noValidityWindow.label, /\$1,900/);
  assert.equal(expired.isVerified, false);
  assert.equal(expired.label, "");
});

test("tour price validity uses the Nepal calendar date", () => {
  const lateUtcOnAugust13 = new Date("2026-08-13T19:00:00.000Z");

  assert.equal(isPriceDateActive("2026-08-14", "from", lateUtcOnAugust13), true);
  assert.equal(isPriceDateActive("2026-08-13", "until", lateUtcOnAugust13), false);
});

test("tour comparison exposes current shared and private rates together", () => {
  const rates = getTourComparisonRates({
    currency: "USD",
    sharedPriceFrom: 500,
    privateCharterPrice: 1900,
    lastVerifiedAt: "2026-08-18",
    priceValidUntil: "2999-12-31"
  });
  const expired = getTourComparisonRates({
    currency: "USD",
    sharedPriceFrom: 500,
    privateCharterPrice: 1900,
    lastVerifiedAt: "2020-01-01",
    priceValidUntil: "2020-01-02"
  });

  assert.equal(rates.shared, "$500");
  assert.equal(rates.privateCharter, "$1,900");
  assert.equal(expired.shared, null);
  assert.equal(expired.privateCharter, null);
});
