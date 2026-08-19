import { getTourPricePresentation, type TourPricing } from "@/lib/tours/pricing";

type TourDetailProps = TourPricing & {
  title: string;
  duration: string;
  currency: string;
  departureCity?: string | null;
  overview?: string | null;
  route?: string | null;
  altitude?: string | null;
  bestTime?: string | null;
  weatherNotes?: string | null;
  cancellationPolicy?: string | null;
  passengerRequirements?: string | null;
  weightSeating?: string | null;
  whatToBring?: string | null;
  photographyInfo?: string | null;
  safetyNotes?: string | null;
  highlights: string;
  itinerary: string;
  inclusions: string;
  exclusions: string;
  operationalNotice?: string | null;
};

export function TourDetail(props: TourDetailProps) {
  const { duration, departureCity, overview, highlights, itinerary, inclusions, exclusions, operationalNotice } = props;
  const price = getTourPricePresentation(props);
  const detailCards = [
    ["Highlights", highlights],
    ["Itinerary", itinerary],
    ["Inclusions", inclusions],
    ["Exclusions", exclusions]
  ] as const;
  const planningSections = [
    ["Route", props.route],
    ["Best time", props.bestTime],
    ["Weather", props.weatherNotes],
    ["Cancellation and rescheduling", props.cancellationPolicy],
    ["Passenger requirements", props.passengerRequirements],
    ["Weight and seating", props.weightSeating],
    ["What to wear and bring", props.whatToBring],
    ["Photography", props.photographyInfo],
    ["Safety", props.safetyNotes]
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <>
      <section className="band band-cream">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Tour overview
            </p>
            <h2 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.01em] text-navy sm:text-[2.5rem]">
              Flight details
            </h2>
            {overview ? <p className="mt-6 text-[15px] leading-[1.9] text-[var(--muted)]">{overview}</p> : null}
          </div>

          <dl className="mt-10 grid gap-px border-y border-sand sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-sand">
            <div className="border-b border-sand py-6 lg:border-b-0 lg:px-6 lg:first:pl-0">
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Duration</dt>
              <dd className="mt-2 font-display text-lg font-semibold text-navy">{duration}</dd>
            </div>
            <div className="border-b border-sand py-6 lg:border-b-0 lg:px-6">
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Departure</dt>
              <dd className="mt-2 font-display text-lg font-semibold text-navy">{departureCity || "Confirmed with your quote"}</dd>
            </div>
            <div className="border-b border-sand py-6 sm:border-b-0 lg:px-6">
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Altitude</dt>
              <dd className="mt-2 font-display text-lg font-semibold text-navy">{props.altitude || "Route-dependent"}</dd>
            </div>
            <div className="py-6 lg:px-6 lg:last:pr-0">
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Fare</dt>
              <dd className="mt-2 font-display text-lg font-semibold text-navy">{price.label || "Quoted per request"}</dd>
            </div>
          </dl>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {detailCards.map(([heading, body]) => (
              <article key={heading} className="surface-card p-6 sm:p-8">
                <h3 className="font-display text-base font-semibold uppercase tracking-[0.12em] text-navy">{heading}</h3>
                <span className="rule-accent mt-4" aria-hidden="true" />
                <p className="mt-4 whitespace-pre-line text-sm leading-[1.9] text-[var(--muted)]">{body}</p>
              </article>
            ))}
          </div>

          {operationalNotice ? (
            <div className="mt-8 border-l-[3px] border-accent bg-white p-6">
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-navy">Operational note</h3>
              <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{operationalNotice}</p>
            </div>
          ) : null}

          {price.detail ? (
            <p className="mt-8 border-t border-sand pt-6 text-sm leading-[1.85] text-[var(--muted)]">{price.detail}</p>
          ) : null}
        </div>
      </section>

      {planningSections.length ? (
        <section className="band band-cream-deep">
          <div className="shell">
            <div className="max-w-3xl">
              <p className="eyebrow">
                <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
                Before you fly
              </p>
              <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.01em] text-navy sm:text-[2.3rem]">
                Flight planning details
              </h2>
            </div>
            <div className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-2">
              {planningSections.map(([heading, copy]) => (
                <article key={heading} className="border-t border-sand pt-6">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-navy">{heading}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-[1.9] text-[var(--muted)]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
