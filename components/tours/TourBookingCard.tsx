import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, MessageCircleMore, Phone, ShieldCheck, Wallet } from "lucide-react";

type TourBookingCardProps = {
  priceLabel: string;
  priceDetail?: string;
  isVerified: boolean;
  reservationHref: string;
  phone: string;
  whatsapp: string;
};

const assurances = [
  { icon: BadgeCheck, label: "Fare confirmed in writing" },
  { icon: ShieldCheck, label: "Licensed operating carrier" },
  { icon: Wallet, label: "No payment taken online" },
  { icon: CalendarCheck, label: "Weather reschedule policy" }
];

/**
 * Sticky booking panel for the tour page. Deliberately states that the fare is
 * indicative and no payment is taken here — the desk quotes in writing.
 */
export function TourBookingCard({ priceLabel, priceDetail, isVerified, reservationHref, phone, whatsapp }: TourBookingCardProps) {
  const whatsappHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="surface-card overflow-hidden">
        <div className="border-b border-sand bg-cream-deep px-6 py-5">
          <h2 className="font-display text-lg font-semibold tracking-[0.02em] text-navy">Request this flight</h2>
        </div>

        <div className="px-6 py-6">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {isVerified ? "Starting fare" : "Fare"}
          </p>
          <p className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-[-0.01em] text-navy">
            {priceLabel || "On request"}
          </p>
          {priceDetail ? <p className="mt-3 text-[13px] leading-[1.7] text-[var(--muted)]">{priceDetail}</p> : null}

          <Link href={reservationHref} className="accent-button mt-6 w-full">
            Reserve this flight <ArrowRight size={16} />
          </Link>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={`tel:${phone}`} className="outline-button w-full px-3 text-[10px]">
              <Phone size={14} /> Call
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="outline-button w-full px-3 text-[10px]">
              <MessageCircleMore size={14} /> WhatsApp
            </a>
          </div>

          <ul className="mt-6 grid gap-3 border-t border-sand pt-5">
            {assurances.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-[13px] leading-5 text-[var(--muted)]">
                <item.icon size={16} className="shrink-0 text-accent" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
