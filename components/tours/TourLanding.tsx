import Image from "next/image";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { TourDetail } from "@/components/tours/TourDetail";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { buildBreadcrumbSchema, buildFaqSchema, buildProductSchema } from "@/lib/seo/schema";
import { getTourPricePresentation, type TourPricing } from "@/lib/tours/pricing";
import { safeLocalImageSource } from "@/lib/safe-url";

type ContactSettings = {
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  operatingUnder: string;
};

type Tour = TourPricing & {
  title: string;
  duration: string;
  currency: string;
  images?: string[];
  departureCity?: string | null;
  excerpt?: string | null;
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
  faqs?: unknown;
  highlights: string;
  itinerary: string;
  inclusions: string;
  exclusions: string;
  operationalNotice?: string | null;
  seoDescription?: string | null;
};

function resolveFaqs(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is { question: string; answer: string } => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Record<string, unknown>;
    return typeof candidate.question === "string" && typeof candidate.answer === "string";
  });
}

export function TourLanding({
  tour,
  path
}: {
  tour: Tour;
  path: string;
  contactSettings: ContactSettings;
}) {
  const isEverestRegion = path.includes("everest-base-camp-helicopter-tour-nepal");
  const displayTour = isEverestRegion
    ? {
        ...tour,
        title: "Everest Region Helicopter Tour",
        highlights: "Everest region aerial views with routing selected for the day's weather, aircraft performance, and permissions.",
        itinerary: "Departure and return points are confirmed before the flight. Routing and any landing stop are determined by current conditions and the operating crew.",
        operationalNotice: "A landing at Everest Base Camp or Kala Patthar is not guaranteed. Landing options can change with weather, passenger weight, permissions, and the operating pilot's decision."
      }
    : tour;
  const price = getTourPricePresentation(displayTour);
  const faqs = resolveFaqs(displayTour.faqs);
  const fallbackHeroImage = (
    path.includes("everest")
      ? "/images/campaign/everest-helicopter.jpg"
      : path.includes("muktinath")
        ? "/images/campaign/muktinath-helicopter.jpg"
        : "/images/campaign/annapurna-helicopter.jpg"
  );
  const heroImage = safeLocalImageSource(displayTour.images?.[0], fallbackHeroImage);
  const reservationHref = `/check-availability?tour=${encodeURIComponent(path.split("/").filter(Boolean).pop() || "")}`;
  const schemaPrice =
    price.isVerified && tour.priceMode === "SHARED_PER_PERSON"
      ? tour.sharedPriceFrom
      : price.isVerified
        ? tour.privateCharterPrice
        : undefined;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: displayTour.title, path }
  ];

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildProductSchema({
            name: displayTour.title,
            description: displayTour.seoDescription || displayTour.highlights,
            path,
            price: schemaPrice ?? undefined,
            currency: tour.currency,
            priceValidUntil: tour.priceValidUntil,
            duration: tour.duration
          }),
          ...(faqs.length ? [buildFaqSchema(faqs)] : [])
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />
      <section className="relative isolate min-h-[470px] overflow-hidden bg-ink text-white sm:min-h-[520px]">
        <Image
          src={heroImage}
          alt={`${displayTour.title} route in Nepal`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
        <div className="shell relative z-10 flex min-h-[470px] items-end py-12 sm:min-h-[520px] sm:py-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Signature tour</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              {displayTour.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              {displayTour.seoDescription || displayTour.excerpt || displayTour.highlights}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/20 pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Duration</p>
                <p className="mt-1 text-sm font-semibold text-white">{displayTour.duration}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Departure</p>
                <p className="mt-1 text-sm font-semibold text-white">{displayTour.departureCity || "Confirmed with quote"}</p>
              </div>
              <ReservationButton label="Reserve this route" href={reservationHref} className="home-primary-cta min-h-12 px-5 sm:ml-auto" />
            </div>
          </div>
        </div>
      </section>
      <TourDetail
        title={displayTour.title}
        duration={displayTour.duration}
        currency={displayTour.currency}
        departureCity={displayTour.departureCity}
        overview={displayTour.overview}
        route={displayTour.route}
        altitude={displayTour.altitude}
        bestTime={displayTour.bestTime}
        weatherNotes={displayTour.weatherNotes}
        cancellationPolicy={displayTour.cancellationPolicy}
        passengerRequirements={displayTour.passengerRequirements}
        weightSeating={displayTour.weightSeating}
        whatToBring={displayTour.whatToBring}
        photographyInfo={displayTour.photographyInfo}
        safetyNotes={displayTour.safetyNotes}
        priceMode={displayTour.priceMode}
        sharedPriceFrom={displayTour.sharedPriceFrom}
        privateCharterPrice={displayTour.privateCharterPrice}
        priceValidFrom={displayTour.priceValidFrom}
        priceValidUntil={displayTour.priceValidUntil}
        lastVerifiedAt={displayTour.lastVerifiedAt}
        pricingNote={displayTour.pricingNote}
        highlights={displayTour.highlights}
        itinerary={displayTour.itinerary}
        inclusions={displayTour.inclusions}
        exclusions={displayTour.exclusions}
        operationalNotice={displayTour.operationalNotice}
      />
      {faqs.length ? <FaqSection items={faqs} /> : null}
    </>
  );
}
