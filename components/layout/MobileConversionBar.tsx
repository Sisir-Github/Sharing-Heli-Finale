"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircleMore, Phone } from "lucide-react";

export function MobileConversionBar({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  const whatsappHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <nav
      className="mobile-conversion-bar fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-3 border-t border-white/15 px-2 md:hidden"
      aria-label="Reservation actions"
    >
      <a
        href={`tel:${phone}`}
        className="flex flex-col items-center justify-center gap-1 font-display text-[9px] font-semibold uppercase tracking-[0.18em]"
      >
        <Phone size={17} />
        Call
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center gap-1 font-display text-[9px] font-semibold uppercase tracking-[0.18em]"
      >
        <MessageCircleMore size={17} />
        WhatsApp
      </a>
      <Link
        href="/check-availability"
        className="mobile-reservation-action my-2 flex flex-col items-center justify-center gap-1 font-display text-[9px] font-semibold uppercase tracking-[0.18em]"
      >
        <CalendarCheck size={17} />
        Reserve
      </Link>
    </nav>
  );
}
