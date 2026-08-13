export const RESERVATION_STATUSES = [
  "PENDING",
  "QUOTED",
  "AWAITING_PAYMENT",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED"
] as const;

export const PAYMENT_STATUSES = ["UNPAID", "DEPOSIT_PAID", "PAID", "REFUNDED"] as const;
export const FLIGHT_TYPES = ["SHARED", "PRIVATE", "FLEXIBLE"] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export function formatReservationStatus(value: string) {
  return value.toLowerCase().replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase());
}

export function formatFlightType(value: string) {
  if (value === "SHARED") return "Shared seat";
  if (value === "PRIVATE") return "Private charter";
  return "Best available option";
}

export function toDateInput(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}
