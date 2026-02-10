"use client";

import { MessageCircleMore } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

export function FloatingWhatsApp({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <a
      href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("whatsapp_click", { placement: "floating_button" })}
      className="floating-whatsapp fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_20px_40px_rgba(16,185,129,0.35)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      aria-label={`Chat on WhatsApp ${whatsappNumber}`}
      title={`WhatsApp ${whatsappNumber}`}
    >
      <MessageCircleMore size={24} />
    </a>
  );
}
