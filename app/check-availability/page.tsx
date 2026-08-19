import { ReservationForm } from "@/components/reservations/ReservationForm";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedTours } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { getTourPricePresentation } from "@/lib/tours/pricing";

export const metadata = buildPageMetadata("/check-availability");

export default async function CheckAvailabilityPage({
  searchParams
}: {
  searchParams: Promise<{ tour?: string; date?: string }>;
}) {
  const [{ tour, date }, publishedTours] = await Promise.all([searchParams, getPublishedTours()]);
  // Only accept a plain YYYY-MM-DD so the value can be trusted as a date input.
  const selectedDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
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
      <PageHero
        eyebrow="Reservation request"
        title="Reserve your preferred flight date"
        description="Choose a route and send the essential passenger details. The operations desk will return the available aircraft, current fare and confirmation steps."
        image="/images/campaign/sharing-heli-hero.jpg"
        imageAlt="Helicopter ready for departure in Nepal"
        size="sm"
        priority
      />

      <section className="band band-cream">
        <div className="shell max-w-4xl">
          <div className="availability-panel p-5 sm:p-8 lg:p-10">
            <ReservationForm tours={tours} selectedTourSlug={tour} selectedDate={selectedDate} />
          </div>
          <p className="mt-6 text-center text-xs leading-6 text-[var(--muted)]">
            Submitting this form starts a request. A booking exists only once availability, route, operating details and
            commercial terms are confirmed in writing.
          </p>
        </div>
      </section>
    </>
  );
}
