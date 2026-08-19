import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";

import { formatTourMoney } from "@/lib/tours/pricing";

export type FixedDepartureItem = {
  id: string;
  routeName: string;
  departureDate: Date;
  departureTime: string | null;
  seatsTotal: number;
  seatsBooked: number;
  pricePerSeat: number | null;
  currency: string;
  note: string | null;
  tour: { slug: string; title: string } | null;
};

/**
 * Departure dates are stored as UTC midnight, so they are formatted in UTC too.
 * Formatting in server-local time would shift the displayed day whenever the
 * host runs behind UTC.
 */
function formatDay(date: Date) {
  const options = { timeZone: "UTC" } as const;
  return {
    day: date.toLocaleDateString("en-GB", { ...options, day: "2-digit" }),
    month: date.toLocaleDateString("en-GB", { ...options, month: "short" }).toUpperCase(),
    weekday: date.toLocaleDateString("en-GB", { ...options, weekday: "short" })
  };
}

/**
 * Scheduled shared-seat departures travellers can join. Renders nothing when
 * there are no upcoming dates, so the homepage never advertises availability
 * that has not been entered.
 */
export function HomeFixedDepartures({ departures }: { departures: FixedDepartureItem[] }) {
  if (!departures.length) return null;

  return (
    <section className="band-tight band-white border-b border-sand">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Fixed departures
            </p>
            <h2 className="mt-4 font-display text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.01em] text-navy sm:text-[2.2rem]">
              Join a scheduled shared flight
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.8] text-[var(--muted)]">
            Per-seat departures on set dates. Join an existing group instead of chartering the whole aircraft.
          </p>
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {departures.map((departure) => {
            const { day, month, weekday } = formatDay(departure.departureDate);
            const seatsLeft = Math.max(departure.seatsTotal - departure.seatsBooked, 0);
            const isFull = seatsLeft === 0;

            const params = new URLSearchParams();
            if (departure.tour?.slug) params.set("tour", departure.tour.slug);
            params.set("date", departure.departureDate.toISOString().slice(0, 10));
            const joinHref = `/check-availability?${params.toString()}`;

            return (
              <li key={departure.id} className="surface-card flex min-h-full flex-col p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-card border border-sand bg-cream px-3 py-2 text-center">
                    <p className="font-display text-xl font-semibold leading-none text-navy">{day}</p>
                    <p className="mt-1 font-display text-[10px] font-semibold tracking-[0.14em] text-accentstrong">{month}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      {weekday}
                      {departure.departureTime ? ` · ${departure.departureTime}` : ""}
                    </p>
                    <h3 className="mt-1.5 font-display text-base font-semibold leading-tight text-navy">
                      {departure.tour?.title || departure.routeName}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-sand pt-4 text-[13px] text-[var(--muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={14} className="text-accent" />
                    {isFull ? "Fully booked" : `${seatsLeft} of ${departure.seatsTotal} seats left`}
                  </span>
                  {departure.pricePerSeat != null ? (
                    <span className="font-semibold text-navy">
                      {formatTourMoney(departure.pricePerSeat, departure.currency)} / seat
                    </span>
                  ) : null}
                </div>

                {departure.note ? (
                  <p className="mt-3 text-[13px] leading-[1.7] text-[var(--muted)]">{departure.note}</p>
                ) : null}

                <div className="mt-auto pt-5">
                  {isFull ? (
                    <Link href="/contact" className="outline-button w-full">
                      Join the waitlist
                    </Link>
                  ) : (
                    <Link href={joinHref} className="accent-button w-full">
                      Join now <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/tours" className="editorial-link">
            <CalendarDays size={15} /> See all routes
          </Link>
        </div>
      </div>
    </section>
  );
}
