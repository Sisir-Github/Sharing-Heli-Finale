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
      className="floating-whatsapp fixed bottom-5 right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-lg bg-aurora text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#159bd0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora focus-visible:ring-offset-2 md:inline-flex"
      aria-label={`Chat on WhatsApp ${whatsappNumber}`}
      title={`WhatsApp ${whatsappNumber}`}
    >
      <MessageCircleMore size={24} />
    </a>
  );
}
