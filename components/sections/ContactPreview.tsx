"use client";

import Link from "next/link";

import { InquiryButton } from "@/components/ui/InquiryButton";
import { Reveal } from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics";

type ContactSettings = {
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  operatingUnder: string;
};

export function ContactPreview({ settings }: { settings: ContactSettings }) {
  return (
    <section className="section-space pt-8">
      <Reveal className="shell">
        <div className="glass rounded-[2rem] p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="label">Instant Coordination</span>
              <h2 className="font-display text-3xl text-white sm:text-4xl">Plan Your Next Flight With Sharing Heli</h2>
              <p className="copy mt-4 max-w-2xl">
                Fast response for charter, tour, pilgrimage, rescue, photo, and cargo missions. Our operations team is
                available 24/7.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <InquiryButton />
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="outline-button"
                  onClick={() => trackEvent("whatsapp_click", { placement: "contact_preview" })}
                >
                  WhatsApp {settings.whatsappNumber}
                </a>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Direct Channels</p>
              <p className="text-sm text-white">Phone: {settings.primaryPhone}</p>
              <p className="text-sm text-white">Email: {settings.email}</p>
              <p className="text-sm text-white">WhatsApp: {settings.whatsappNumber}</p>
              <p className="text-sm text-haze">{settings.operatingUnder}</p>
              <Link href="/contact" className="outline-button mt-2">
                Open Contact Desk
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
