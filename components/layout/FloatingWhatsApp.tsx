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
      className="floating-whatsapp fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center shadow-luxe transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:inline-flex"
      aria-label={`Chat on WhatsApp ${whatsappNumber}`}
      title={`WhatsApp ${whatsappNumber}`}
    >
      <MessageCircleMore size={24} />
    </a>
  );
}
