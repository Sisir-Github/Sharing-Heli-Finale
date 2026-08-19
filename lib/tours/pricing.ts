import { getNepalDateInput } from "@/lib/date";

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

export function getAdminPriceMode(tour: Pick<TourPricing, "priceMode" | "sharedPriceFrom" | "privateCharterPrice">): PriceMode {
  if (tour.priceMode === "SHARED_PER_PERSON" || tour.priceMode === "PRIVATE_PER_AIRCRAFT") {
    return tour.priceMode;
  }
  if (tour.sharedPriceFrom != null) return "SHARED_PER_PERSON";
  if (tour.privateCharterPrice != null) return "PRIVATE_PER_AIRCRAFT";
  return "LIVE_QUOTE";
}

export function isPriceDateActive(
  value: Date | string | null | undefined,
  comparison: "from" | "until",
  now = new Date()
) {
  if (!value) return true;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const targetDate = date.toISOString().slice(0, 10);
  const currentDate = getNepalDateInput(now);
  return comparison === "from" ? targetDate <= currentDate : targetDate >= currentDate;
}

export function formatTourMoney(amount: number, currency: string) {
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
    isPriceDateActive(tour.priceValidFrom, "from") &&
    isPriceDateActive(tour.priceValidUntil, "until");

  if (isCurrent && mode === "SHARED_PER_PERSON" && tour.sharedPriceFrom != null) {
    return {
      isVerified: true,
      label: `From ${formatTourMoney(tour.sharedPriceFrom, currency)} / person`,
      detail: tour.pricingNote || "Shared-flight fare. Final price depends on availability and operating conditions.",
    };
  }

  if (isCurrent && mode === "PRIVATE_PER_AIRCRAFT" && tour.privateCharterPrice != null) {
    return {
      isVerified: true,
      label: `From ${formatTourMoney(tour.privateCharterPrice, currency)} / aircraft`,
      detail: tour.pricingNote || "Private-charter fare. Final price depends on routing and operating conditions.",
    };
  }

  return {
    isVerified: false,
    label: "",
    detail: "",
  };
}

export function getTourComparisonRates(tour: TourPricing) {
  const currency = tour.currency || "USD";
  const isCurrent =
    Boolean(tour.lastVerifiedAt) &&
    isPriceDateActive(tour.priceValidFrom, "from") &&
    isPriceDateActive(tour.priceValidUntil, "until");

  return {
    isCurrent,
    shared: isCurrent && tour.sharedPriceFrom != null ? formatTourMoney(tour.sharedPriceFrom, currency) : null,
    privateCharter: isCurrent && tour.privateCharterPrice != null ? formatTourMoney(tour.privateCharterPrice, currency) : null,
    checkedAt: isCurrent && tour.lastVerifiedAt ? new Date(tour.lastVerifiedAt) : null
  };
}
