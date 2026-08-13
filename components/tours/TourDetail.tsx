import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section className="section-space bg-canvas">
      <div className="shell space-y-10">
        <SectionHeading
          eyebrow="Tour Overview"
          title="Flight details"
          description={price.label ? `Duration: ${duration} · ${price.label}` : `Duration: ${duration}`}
        />

        {overview ? <p className="copy max-w-4xl text-base leading-8">{overview}</p> : null}

        <dl className="grid gap-5 border-y border-ink/15 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="text-xs font-semibold uppercase text-slate-500">Duration</dt><dd className="mt-1 font-semibold text-ink">{duration}</dd></div>
          <div><dt className="text-xs font-semibold uppercase text-slate-500">Departure</dt><dd className="mt-1 font-semibold text-ink">{departureCity || "Confirmed with your quote"}</dd></div>
          <div><dt className="text-xs font-semibold uppercase text-slate-500">Altitude</dt><dd className="mt-1 font-semibold text-ink">{props.altitude || "Route-dependent"}</dd></div>
          {price.label ? <div><dt className="text-xs font-semibold uppercase text-slate-500">Price</dt><dd className="mt-1 font-semibold text-ink">{price.label}</dd></div> : null}
        </dl>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Highlights</h3>
            <p className="copy mt-3 whitespace-pre-line">{highlights}</p>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Itinerary</h3>
            <p className="copy mt-3 whitespace-pre-line">{itinerary}</p>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Inclusions</h3>
            <p className="copy mt-3 whitespace-pre-line">{inclusions}</p>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Exclusions</h3>
            <p className="copy mt-3 whitespace-pre-line">{exclusions}</p>
          </div>
        </div>

        {planningSections.length ? (
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-normal text-ink">Flight planning details</h2>
            <div className="mt-6 grid gap-x-10 gap-y-7 md:grid-cols-2">
              {planningSections.map(([heading, copy]) => (
                <article key={heading} className="border-t border-ink/15 pt-5">
                  <h3 className="text-base font-semibold text-ink">{heading}</h3>
                  <p className="copy mt-2 text-sm whitespace-pre-line">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {operationalNotice ? (
          <div className="rounded-lg border border-brass/40 bg-brass/10 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">Operational note</h3>
            <p className="copy mt-2 text-sm">{operationalNotice}</p>
          </div>
        ) : null}

        {price.detail ? <p className="border-t border-ink/10 pt-6 text-sm text-haze">{price.detail}</p> : null}
      </div>
    </section>
  );
}
