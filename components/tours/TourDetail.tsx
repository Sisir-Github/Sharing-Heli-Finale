import { CalendarRange, Clock3, Gauge, MapPin, Mountain, Users } from "lucide-react";

import { TourBookingCard } from "@/components/tours/TourBookingCard";
import { TourGallery } from "@/components/tours/TourGallery";
import { TourSectionNav, type TourSection } from "@/components/tours/TourSectionNav";
import { getTourPricePresentation, type TourPricing } from "@/lib/tours/pricing";

type TourDetailProps = TourPricing & {
  title: string;
  duration: string;
  currency: string;
  images: string[];
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
  reservationHref: string;
  phone: string;
  whatsapp: string;
  hasFaqs?: boolean;
};

/** Renders "a\nb\nc" as a list, and anything else as a paragraph. */
function Prose({ body }: { body: string }) {
  const lines = body
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);

  if (lines.length < 2) {
    return <p className="text-[15px] leading-[1.9] text-[var(--muted)]">{body}</p>;
  }

  return (
    <ul className="grid gap-3">
      {lines.map((line, index) => (
        <li key={index} className="flex gap-3 text-[15px] leading-[1.8] text-[var(--muted)]">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {line}
        </li>
      ))}
    </ul>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-40 border-t border-sand pt-9">
      <h2 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.01em] text-navy sm:text-[1.7rem]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function TourDetail(props: TourDetailProps) {
  const {
    title,
    duration,
    departureCity,
    images,
    overview,
    highlights,
    itinerary,
    inclusions,
    exclusions,
    operationalNotice,
    reservationHref,
    phone,
    whatsapp,
    hasFaqs
  } = props;

  const price = getTourPricePresentation(props);

  const bookingType =
    props.sharedPriceFrom != null && props.privateCharterPrice != null
      ? "Shared seat or private"
      : props.sharedPriceFrom != null
        ? "Shared seat (per person)"
        : props.privateCharterPrice != null
          ? "Private (per aircraft)"
          : "Shared or private";

  const specs = [
    { icon: Clock3, label: "Duration", value: duration },
    { icon: MapPin, label: "Departure", value: departureCity || "Confirmed with quote" },
    { icon: Mountain, label: "Max altitude", value: props.altitude || "Route-dependent" },
    { icon: CalendarRange, label: "Best season", value: props.bestTime || "Year-round, weather permitting" },
    { icon: Users, label: "Booking type", value: bookingType },
    { icon: Gauge, label: "Difficulty", value: "No trekking required" }
  ];

  const planningSections = [
    ["Route", props.route],
    ["Weather", props.weatherNotes],
    ["Cancellation and rescheduling", props.cancellationPolicy],
    ["Passenger requirements", props.passengerRequirements],
    ["Weight and seating", props.weightSeating],
    ["What to wear and bring", props.whatToBring],
    ["Photography", props.photographyInfo],
    ["Safety", props.safetyNotes]
  ].filter((item): item is [string, string] => Boolean(item[1]));

  const sections: TourSection[] = [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "itinerary", label: "Itinerary" },
    { id: "include-exclude", label: "Include/Exclude" },
    ...(planningSections.length ? [{ id: "before-you-fly", label: "Before you fly" }] : []),
    ...(hasFaqs ? [{ id: "faqs", label: "FAQs" }] : [])
  ];

  return (
    <>
      <TourSectionNav sections={sections} />

      <section className="band-tight band-white">
        <div className="shell grid items-start gap-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-12">
          {/* Main column */}
          <div>
            <TourGallery images={images} title={title} />

            {/* Spec grid, mirroring the reference layout */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-sand py-7 sm:grid-cols-3">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-glacier text-accentstrong" aria-hidden="true">
                    <spec.icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold leading-5 text-navy">{spec.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-9">
              <section id="overview" className="scroll-mt-40">
                <h2 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.01em] text-navy sm:text-[1.7rem]">
                  Overview
                </h2>
                <div className="mt-5">
                  {overview ? (
                    <p className="text-[15px] leading-[1.9] text-[var(--muted)]">{overview}</p>
                  ) : (
                    <Prose body={highlights} />
                  )}
                </div>

                {operationalNotice ? (
                  <div className="mt-6 border-l-[3px] border-accent bg-cream p-5">
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-navy">
                      Operational note
                    </p>
                    <p className="mt-2.5 text-sm leading-[1.85] text-[var(--muted)]">{operationalNotice}</p>
                  </div>
                ) : null}
              </section>

              <Block id="highlights" title="Highlights">
                <Prose body={highlights} />
              </Block>

              <Block id="itinerary" title="Itinerary">
                <Prose body={itinerary} />
              </Block>

              <Block id="include-exclude" title="What's included">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">Included</p>
                    <div className="mt-4">
                      <Prose body={inclusions} />
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">Not included</p>
                    <div className="mt-4">
                      <Prose body={exclusions} />
                    </div>
                  </div>
                </div>
              </Block>

              {planningSections.length ? (
                <Block id="before-you-fly" title="Before you fly">
                  <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                    {planningSections.map(([heading, copy]) => (
                      <article key={heading}>
                        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-navy">{heading}</h3>
                        <p className="mt-2.5 whitespace-pre-line text-sm leading-[1.85] text-[var(--muted)]">{copy}</p>
                      </article>
                    ))}
                  </div>
                </Block>
              ) : null}
            </div>
          </div>

          {/* Sticky booking column */}
          <TourBookingCard
            priceLabel={price.label}
            priceDetail={price.detail}
            isVerified={price.isVerified}
            reservationHref={reservationHref}
            phone={phone}
            whatsapp={whatsapp}
          />
        </div>
      </section>
    </>
  );
}
