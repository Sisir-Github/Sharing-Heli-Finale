import type { InvoiceItem, InvoiceTotals } from "@/lib/invoice/types";

export function formatCurrency(value: number) {
  return value.toFixed(2);
}

export function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

export function computeItems(items: { description: string; unitPrice: number; quantity: number; lineTotal?: number }[]) {
  return items.map((item) => {
    const unitPrice = roundCurrency(item.unitPrice);
    const quantity = roundCurrency(item.quantity);
    const lineTotal = roundCurrency(unitPrice * quantity);
    return {
      description: item.description,
      unitPrice,
      quantity,
      lineTotal
    };
  });
}

export function computeTotals(
  items: InvoiceItem[],
  overrides?: Partial<InvoiceTotals>
): InvoiceTotals {
  const subtotal = roundCurrency(items.reduce((sum, item) => sum + item.lineTotal, 0));
  const tax = roundCurrency(overrides?.tax ?? 0);
  const discount = roundCurrency(overrides?.discount ?? 0);
  const grandTotal = roundCurrency(subtotal + tax - discount);

  return {
    subtotal,
    tax: tax > 0 ? tax : undefined,
    discount: discount > 0 ? discount : undefined,
    grandTotal
  };
}

export function formatDateSafe(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
}
