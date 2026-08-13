import Link from "next/link";
import { CalendarClock, CircleDollarSign, UsersRound } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SignatureTours } from "@/components/sections/SignatureTours";
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
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="section-space pb-12">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="eyebrow">Shared helicopter flights Nepal</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] text-ink sm:text-6xl">Share The Aircraft Cost, Not The Experience</h1>
          </div>
          <div>
            <p className="copy text-lg">Request a seat on selected Nepal helicopter routes. Sharing Heli helps match compatible travelers, then confirms the operating plan and current per-person fare.</p>
            <Link href="/check-availability" className="inquiry-button mt-6">Request A Shared Seat</Link>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="shell grid gap-4 md:grid-cols-3">
          {[
            { icon: UsersRound, title: "1. Submit your request", text: "Share the route, date range, passenger count, weights, and contact details." },
            { icon: CalendarClock, title: "2. We check a match", text: "The team checks compatible requests and available operating windows. No match is promised." },
            { icon: CircleDollarSign, title: "3. Review the confirmation", text: "Receive the current fare, inclusions, timing, and operational conditions before deciding." }
          ].map(({ icon: Icon, title, text }) => <article key={title} className="surface-card p-6"><Icon className="text-brass" /><h2 className="mt-5 text-lg font-semibold text-ink">{title}</h2><p className="copy mt-3 text-sm">{text}</p></article>)}
        </div>
      </section>

      <SignatureTours tours={tours} />

      <section className="section-space bg-ink text-white">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow text-glacier">Important conditions</p><h2 className="mt-3 font-display text-4xl">What Shared Flight Availability Really Means</h2></div>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300"><p>A shared request is not a scheduled airline ticket. The flight becomes actionable only after passenger compatibility, aircraft, route, weather, permissions, and commercial terms are confirmed.</p><p>High-altitude performance can change the number of passengers or require routing adjustments. Provide accurate weights and baggage information from the start.</p><p>Do not make non-refundable onward arrangements until the operations desk confirms the flight plan.</p></div>
        </div>
      </section>

      <FaqSection title="Shared Flight Questions" intro="Clear answers before you request a seat." items={faqs} />
    </>
  );
}
