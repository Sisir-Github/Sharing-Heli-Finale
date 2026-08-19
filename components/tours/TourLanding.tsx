import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { TourDetail } from "@/components/tours/TourDetail";
import { PageHero } from "@/components/ui/PageHero";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { buildBreadcrumbSchema, buildFaqSchema, buildProductSchema } from "@/lib/seo/schema";
import { normalizeTourCategory } from "@/lib/tours/categories";
import { getTourImage } from "@/lib/tours/images";
import { getTourPricePresentation, type TourPricing } from "@/lib/tours/pricing";

type ContactSettings = {
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  operatingUnder: string;
};

type Tour = TourPricing & {
  title: string;
  category?: string | null;
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
  const slug = path.split("/").filter(Boolean).pop() || "";
  const heroImage = getTourImage(slug, displayTour.images?.[0]);
  const category = normalizeTourCategory(displayTour.category, slug);
  const reservationHref = `/check-availability?tour=${encodeURIComponent(slug)}`;
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
      <PageHero
        eyebrow={category === "PILGRIMAGE" ? "Pilgrimage tour" : "Signature tour"}
        title={displayTour.title}
        description={displayTour.seoDescription || displayTour.excerpt || displayTour.highlights}
        image={heroImage}
        imageAlt={`${displayTour.title} route in Nepal`}
        width="wide"
        priority
        meta={
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Duration</dt>
              <dd className="mt-1.5 font-display text-sm font-semibold text-navy">{displayTour.duration}</dd>
            </div>
            <div>
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Departure</dt>
              <dd className="mt-1.5 font-display text-sm font-semibold text-navy">{displayTour.departureCity || "Confirmed with quote"}</dd>
            </div>
            {price.label ? (
              <div>
                <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Fare</dt>
                <dd className="mt-1.5 font-display text-sm font-semibold text-navy">{price.label}</dd>
              </div>
            ) : null}
          </dl>
        }
        actions={<ReservationButton label="Reserve this route" href={reservationHref} />}
        secondaryAction={{ label: "All heli tours", href: "/tours" }}
      />
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
