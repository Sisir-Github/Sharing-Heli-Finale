"use client";

import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";

export function MobileConversionBar({ phone }: { phone: string; whatsapp: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-2 border-t border-white/15 bg-ink/95 px-2 text-white backdrop-blur-xl md:hidden" aria-label="Reservation actions">
      <a href={`tel:${phone}`} className="flex flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em]"><Phone size={18} />Call</a>
      <Link href="/check-availability" className="mobile-reservation-action my-2 flex flex-col items-center justify-center gap-1 rounded-lg bg-copper text-[10px] font-semibold uppercase tracking-[0.1em]"><CalendarCheck size={18} />Reserve</Link>
    </nav>
  );
}
