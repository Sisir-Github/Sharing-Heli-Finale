"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { safePublicHref } from "@/lib/safe-url";

type ReservationButtonProps = {
  href?: string;
  className?: string;
  label?: string;
  variant?: "solid" | "light" | "accent" | "outline";
};

const variantClass = {
  solid: "inquiry-button",
  light: "light-button",
  accent: "accent-button",
  outline: "outline-button"
} as const;

export function ReservationButton({
  href = "/check-availability",
  className,
  label = "Reserve a flight",
  variant = "solid"
}: ReservationButtonProps) {
  const safeHref = safePublicHref(href, "/check-availability");
  return (
    <Link
      href={safeHref}
      className={cn(variantClass[variant], className)}
      onClick={() => trackEvent("reservation_cta_click", { destination: safeHref })}
    >
      {label}
    </Link>
  );
}
