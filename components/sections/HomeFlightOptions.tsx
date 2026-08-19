import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { getTourPricePresentation, type TourPricing } from "@/lib/tours/pricing";

type TourItem = TourPricing & { id: string; title: string };

const flightFormats = [
  "Shared helicopter flights (per seat)",
  "Private helicopter charter (per aircraft)",
  "Muktinath & pilgrimage routes",
  "Everest region scenic flights",
  "Annapurna & Mustang mountain flights",
  "Mountain transfers & custom routing"
];

/**
 * Editorial split: the flight formats we coordinate, plus a fare-basis panel.
 * Fare labels come from verified CMS pricing; anything unverified falls back to
 * "quoted per request" so nothing on the page overstates a price.
 */
export function HomeFlightOptions({ tours }: { tours: TourItem[] }) {
  const verified = tours
    .map((tour) => ({ tour, price: getTourPricePresentation(tour) }))
    .filter((entry) => entry.price.isVerified)
    .slice(0, 2);

  return (
    <section className="band band-cream">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
        <div>
          <p className="eyebrow">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            What we coordinate
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.7rem]">
            Flight Options Available
          </h2>

          <ul className="mt-7 space-y-3">
            {flightFormats.map((format) => (
              <li key={format} className="flex items-start gap-3 text-[15px] leading-7 text-[var(--muted)]">
                <Check size={16} className="mt-1.5 shrink-0 text-accent" aria-hidden="true" />
                {format}
              </li>
            ))}
          </ul>

          <div className="mt-9 border-t border-sand pt-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-navy">Investment</p>
            {verified.length ? (
              <dl className="mt-4 space-y-2">
                {verified.map(({ tour, price }) => (
                  <div key={tour.id} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-sand/70 pb-2">
                    <dt className="text-sm text-[var(--muted)]">{tour.title}</dt>
                    <dd className="font-display text-base font-semibold text-navy">{price.label}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 font-display text-xl font-semibold text-navy">Quoted per request</p>
            )}
            <p className="mt-4 max-w-md text-xs leading-6 text-[var(--muted)]">
              *Fares are confirmed in writing for your route, date and passenger details. Timing, landings and final
              commercial terms remain subject to weather, aircraft availability and operator approval.
            </p>
          </div>

          <Link href="/tours" className="inquiry-button mt-8">
            View all routes
          </Link>
        </div>

        <figure className="m-0">
          <div className="media-frame aspect-[4/5]">
            <Image
              src="/images/campaign/muktinath-helicopter.jpg"
              alt="Helicopter on a Himalayan landing pad in Nepal"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
