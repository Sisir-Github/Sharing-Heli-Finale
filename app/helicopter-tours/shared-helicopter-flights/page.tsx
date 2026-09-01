import { CalendarClock, CircleDollarSign, UsersRound } from "lucide-react";
import { PageSchema } from "@/components/seo/PageSchema";

import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SignatureTours } from "@/components/sections/SignatureTours";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedTours } from "@/lib/cms";
import { FALLBACK_TOURS } from "@/lib/home-fallbacks";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/helicopter-tours/shared-helicopter-flights");
export const revalidate = 900;

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Helicopter Tours", path: "/tours" },
  { name: "Shared Helicopter Flights", path: "/helicopter-tours/shared-helicopter-flights" }
];

const faqs = [
  { question: "What is a shared helicopter flight?", answer: "A shared flight combines compatible passengers on the same route. Each traveler pays a per-person fare only after the departure, passenger mix, and operating details are confirmed." },
  { question: "Is a shared departure guaranteed?", answer: "No. A departure depends on enough compatible passengers, aircraft availability, weather, permissions, and the operating crew's assessment." },
  { question: "How is shared-flight pricing calculated?", answer: "The aircraft cost is divided according to the confirmed passenger arrangement. The operations desk provides the current per-person fare and explains what it includes before payment." },
  { question: "Can my preferred date change?", answer: "Yes. Shared flights require flexibility because travelers must be matched and mountain weather can affect the operating window." },
  { question: "Are passenger weight and baggage required?", answer: "Yes. Accurate passenger weights and baggage details are required for flight planning. Limits vary by aircraft, altitude, route, and conditions." },
  { question: "When should I choose private charter instead?", answer: "Private charter is generally a better fit when your group needs control over timing, custom routing, privacy, or a departure that should not depend on matching other passengers." }
];

export default async function SharedHelicopterFlightsPage() {
  const published = await getPublishedTours();
  const sharedTours = published.filter((tour) => tour.sharedAvailable);
  const tours = sharedTours.length ? sharedTours : FALLBACK_TOURS.filter((tour) => tour.sharedAvailable);

  return (
    <>
      <PageSchema path="/helicopter-tours/shared-helicopter-flights" />
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />
      <PageHero
        eyebrow="Shared helicopter flights Nepal"
        title="Share the aircraft cost, not the experience"
        description="Request a seat on selected Nepal helicopter routes. Sharing Heli helps match compatible travellers, then confirms the operating plan and current per-person fare."
        image="/images/campaign/everest-helicopter.jpg"
        imageAlt="Shared helicopter flight in the Nepal Himalayas"
        width="wide"
        primaryAction={{ label: "Request a shared seat", href: "/check-availability" }}
        secondaryAction={{ label: "Compare routes", href: "/tours" }}
        priority
      />

      <section className="band band-cream">
        <div className="shell grid gap-5 md:grid-cols-3">
          {[
            { icon: UsersRound, title: "Submit your request", text: "Share the route, date range, passenger count, weights and contact details." },
            { icon: CalendarClock, title: "We check a match", text: "The team checks compatible requests and available operating windows. No match is promised." },
            { icon: CircleDollarSign, title: "Review the confirmation", text: "Receive the current fare, inclusions, timing and operational conditions before deciding." }
          ].map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="surface-card p-7">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon size={22} className="mt-5 text-navy" />
              <h2 className="mt-5 font-display text-lg font-semibold uppercase leading-6 tracking-[0.06em] text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <SignatureTours tours={tours} />

      <section className="band band-navy">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-white/60">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Important conditions
            </p>
            <h2 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.01em] text-white sm:text-[2.4rem]">
              What shared flight availability really means
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-[1.9] text-white/65">
            <p>A shared request is not a scheduled airline ticket. The flight becomes actionable only after passenger compatibility, aircraft, route, weather, permissions and commercial terms are confirmed.</p>
            <p>High-altitude performance can change the number of passengers or require routing adjustments. Provide accurate weights and baggage information from the start.</p>
            <p>Do not make non-refundable onward arrangements until the operations desk confirms the flight plan.</p>
          </div>
        </div>
      </section>

      <FaqSection title="Shared Flight Questions" intro="Clear answers before you request a seat." items={faqs} />
    </>
  );
}
