"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { safePublicHref } from "@/lib/safe-url";

type ReservationButtonProps = {
  href?: string;
  className?: string;
  label?: string;
};

export function ReservationButton({ href = "/check-availability", className, label = "Reserve a flight" }: ReservationButtonProps) {
  const safeHref = safePublicHref(href, "/check-availability");
  return (
    <Link
      href={safeHref}
      className={cn("inquiry-button", className)}
      onClick={() => trackEvent("reservation_cta_click", { destination: safeHref })}
    >
      {label}
    </Link>
  );
}
