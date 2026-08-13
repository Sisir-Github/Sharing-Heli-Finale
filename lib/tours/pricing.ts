export const PRICE_MODES = [
  "LIVE_QUOTE",
  "SHARED_PER_PERSON",
  "PRIVATE_PER_AIRCRAFT",
] as const;

export type PriceMode = (typeof PRICE_MODES)[number];

export type TourPricing = {
  currency?: string | null;
  priceMode?: string | null;
  sharedPriceFrom?: number | null;
  privateCharterPrice?: number | null;
  priceValidFrom?: Date | string | null;
  priceValidUntil?: Date | string | null;
  lastVerifiedAt?: Date | string | null;
  pricingNote?: string | null;
};

export type PricePresentation = {
  isVerified: boolean;
  label: string;
  detail: string;
};

function isDateActive(value: Date | string | null | undefined, comparison: "from" | "until") {
  if (!value) return true;
  const date = new Date(value);
  if (comparison === "until") date.setUTCHours(23, 59, 59, 999);
  const time = date.getTime();
  if (Number.isNaN(time)) return false;
  return comparison === "from" ? time <= Date.now() : time >= Date.now();
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getTourPricePresentation(tour: TourPricing): PricePresentation {
  const mode = tour.priceMode as PriceMode | undefined;
  const currency = tour.currency || "USD";
  const isCurrent =
    Boolean(tour.lastVerifiedAt) &&
    Boolean(tour.priceValidFrom) &&
    Boolean(tour.priceValidUntil) &&
    isDateActive(tour.lastVerifiedAt, "from") &&
    isDateActive(tour.priceValidFrom, "from") &&
    isDateActive(tour.priceValidUntil, "until");

  if (isCurrent && mode === "SHARED_PER_PERSON" && tour.sharedPriceFrom != null) {
    return {
      isVerified: true,
      label: `From ${formatMoney(tour.sharedPriceFrom, currency)} / person`,
      detail: tour.pricingNote || "Shared-flight fare. Final price depends on availability and operating conditions.",
    };
  }

  if (isCurrent && mode === "PRIVATE_PER_AIRCRAFT" && tour.privateCharterPrice != null) {
    return {
      isVerified: true,
      label: `From ${formatMoney(tour.privateCharterPrice, currency)} / aircraft`,
      detail: tour.pricingNote || "Private-charter fare. Final price depends on routing and operating conditions.",
    };
  }

  return {
    isVerified: false,
    label: "",
    detail: "",
  };
}
