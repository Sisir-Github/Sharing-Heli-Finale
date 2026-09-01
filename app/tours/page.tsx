import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TourCatalog, type TourCatalogItem } from "@/components/tours/TourCatalog";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedTours } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { getCanonicalTourPath } from "@/lib/seo/canonical";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { normalizeTourCategory } from "@/lib/tours/categories";
import { normalizeTourRegion } from "@/lib/tours/regions";

export const metadata = buildPageMetadata("/tours");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" }
];

export const revalidate = 900;

function serializeDate(value: Date | string | null | undefined) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

export default async function ToursPage() {
  const tours = await getPublishedTours();
  const catalogTours: TourCatalogItem[] = tours.map((tour, index) => ({
    id: tour.id,
    title: tour.title,
    slug: tour.slug,
    region: normalizeTourRegion("region" in tour ? tour.region : null, tour.slug),
    category: normalizeTourCategory("category" in tour ? tour.category : null, tour.slug),
    sortOrder: "sortOrder" in tour && typeof tour.sortOrder === "number" ? tour.sortOrder : index,
    duration: tour.duration,
    departureCity: "departureCity" in tour && typeof tour.departureCity === "string" ? tour.departureCity : null,
    excerpt:
      "excerpt" in tour && typeof tour.excerpt === "string"
        ? tour.excerpt
        : "seoDescription" in tour && typeof tour.seoDescription === "string"
          ? tour.seoDescription
          : null,
    route: "route" in tour && typeof tour.route === "string" ? tour.route : null,
    images: tour.images,
    currency: tour.currency,
    priceMode: tour.priceMode,
    sharedPriceFrom: tour.sharedPriceFrom,
    privateCharterPrice: tour.privateCharterPrice,
    priceValidFrom: serializeDate(tour.priceValidFrom),
    priceValidUntil: serializeDate(tour.priceValidUntil),
    lastVerifiedAt: serializeDate(tour.lastVerifiedAt),
    pricingNote: tour.pricingNote
  }));

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema({
            name: "Nepal helicopter tours",
            path: "/tours",
            items: catalogTours.map((tour) => ({
              name: tour.title,
              path: getCanonicalTourPath(tour.slug),
              description: tour.excerpt || undefined
            }))
          }),
          buildWebPageSchema({
            name: "Nepal helicopter tours",
            description:
              "Every published helicopter route in Nepal by region, departure point and fare type.",
            path: "/tours",
            about: ["Nepal", "Helicopter tour", "Everest", "Annapurna", "Muktinath"],
            dateModified: new Date()
          })
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />
      <PageHero
        eyebrow={`${catalogTours.length} routes across Nepal`}
        title="Heli Tours"
        description="Browse scenic flights, mountain transfers and pilgrimage routes by region, departure point and fare type."
        image="/images/campaign/sharing-heli-hero.jpg"
        imageAlt="Helicopter flying beside the Himalayas in Nepal"
        primaryAction={{ label: "Reserve a flight", href: "/check-availability" }}
        secondaryAction={{ label: "Talk to the desk", href: "/contact" }}
        priority
      />

      <section className="band-tight band-cream">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Choose with confidence
            </p>
            <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.01em] text-navy sm:text-[2.3rem]">
              A clearer way to compare Nepal helicopter tours
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-[var(--muted)]">
              Every published route in one place. Each package shows its region, typical duration, departure point and
              the available shared-seat and private-aircraft rates.
            </p>
            <p className="mt-4 text-sm leading-[1.8] text-[var(--muted)]">
              Flight timing, landings and final commercial terms remain subject to weather, aircraft availability,
              passenger load and operator approval.
            </p>
          </div>
        </div>
      </section>

      <TourCatalog tours={catalogTours} />
    </>
  );
}
