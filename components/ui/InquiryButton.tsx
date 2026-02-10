"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type InquiryButtonProps = {
  href?: string;
  className?: string;
  label?: string;
};

export function InquiryButton({ href = "/contact#inquiry", className, label = "Inquiry Now" }: InquiryButtonProps) {
  return (
    <Link
      href={href}
      className={cn("inquiry-button", className)}
      onClick={() => trackEvent("inquiry_cta_click", { destination: href })}
    >
      {label}
    </Link>
  );
}
