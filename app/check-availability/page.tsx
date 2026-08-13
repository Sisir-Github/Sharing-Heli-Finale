import { ReservationForm } from "@/components/reservations/ReservationForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getPublishedTours } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { getTourPricePresentation } from "@/lib/tours/pricing";

export const metadata = buildPageMetadata("/check-availability");

export default async function CheckAvailabilityPage({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const [{ tour }, publishedTours] = await Promise.all([searchParams, getPublishedTours()]);
  const tours = publishedTours.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    priceLabel: getTourPricePresentation(item).label,
    sharedAvailable: item.sharedAvailable,
    privateAvailable: item.privateAvailable
  }));

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reserve a Flight", path: "/check-availability" }]} />
      <section className="section-space pt-10">
        <div className="shell max-w-4xl">
          <div className="max-w-3xl">
            <p className="eyebrow">Reservation request</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">Reserve your preferred flight date.</h1>
            <p className="copy mt-5">Choose a route and send the essential passenger details. The operations desk will return the available aircraft, current fare, and confirmation steps.</p>
          </div>
          <div className="surface-card mt-10 p-5 sm:p-8 lg:p-10">
            <ReservationForm tours={tours} selectedTourSlug={tour} />
          </div>
        </div>
      </section>
    </>
  );
}
