import Link from "next/link";

import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/safety-flight-information");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Safety & Flight Information", path: "/safety-flight-information" }
];

const faqs = [
  {
    question: "Can weather change a helicopter flight?",
    answer:
      "Yes. Mountain visibility, wind, cloud, precipitation, and conditions along the full route can delay, reroute, postpone, or cancel a flight."
  },
  {
    question: "Why do you need every passenger's weight?",
    answer:
      "The operating company uses accurate passenger and baggage weights for aircraft performance and loading decisions, particularly on high-altitude routes."
  },
  {
    question: "How much baggage can I bring?",
    answer:
      "Limits vary by aircraft, route, altitude, passenger load, and conditions. Request the written limit for your confirmed flight rather than relying on a generic allowance."
  },
  {
    question: "Who operates the helicopter?",
    answer:
      "The operating carrier and available aircraft should be disclosed with the final quotation or confirmation. Sharing Heli must not be assumed to own or operate the aircraft unless stated in writing."
  },
  {
    question: "What is the cancellation and refund policy?",
    answer:
      "Terms can vary by flight and supplier. Before payment, ask how customer cancellation, operator cancellation, weather postponement, and non-refundable third-party fees are handled in your written quote."
  },
  {
    question: "Is submitting an inquiry a booking?",
    answer:
      "No. A booking exists only after availability, route, operating details, commercial terms, and any required payment are confirmed in writing."
  }
];

const topics = [
  {
    title: "Weather and visibility",
    body: "Mountain flights are conditional. A clear departure point does not prove that the full route or destination is suitable. Build flexibility into the itinerary and do not pressure an operating crew to continue in unsuitable conditions."
  },
  {
    title: "Passenger weight and baggage",
    body: "Provide accurate individual weights and baggage details. The operating company may change loading, passenger count, route, or timing based on aircraft performance requirements."
  },
  {
    title: "Route and landing plan",
    body: "Request the current route and approved landing plan in writing before payment. A marketing page cannot guarantee a high-altitude landing, fixed ground time, or unchanged routing."
  },
  {
    title: "Operating carrier disclosure",
    body: "Ask for the legal name of the helicopter operator, aircraft information when available, and the documents or insurance details relevant to your booking."
  },
  {
    title: "Cancellation and refunds",
    body: "The final quotation should separate customer cancellation, operator cancellation, weather postponement, and non-refundable third-party costs so you know what applies before payment."
  },
  {
    title: "Medical and altitude preparation",
    body: "A helicopter reduces travel time but does not remove altitude exposure. Travellers should discuss personal medical concerns with a qualified clinician and follow the operating team's boarding and safety briefing."
  }
];

export default function SafetyFlightInformationPage() {
  return (
    <>
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />

      <PageHero
        eyebrow="Before you confirm"
        title="Safety and flight information for Nepal helicopter travel"
        description="Use this guide to ask better questions about weather, routing, operator responsibility, passenger loading and commercial terms."
        image="/images/campaign/muktinath-helicopter.jpg"
        imageAlt="Helicopter operating in the Nepal mountains"
        width="wide"
        primaryAction={{ label: "Discuss my flight", href: "/check-availability" }}
        priority
      />

      <section className="band band-cream">
        <div className="shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <article key={topic.title} className="surface-card p-7">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold uppercase leading-6 tracking-[0.06em] text-navy">
                {topic.title}
              </h2>
              <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{topic.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band band-navy">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-white/60">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Before payment
            </p>
            <h2 className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.01em] text-white sm:text-[2.4rem]">
              Confirm the terms that apply to your flight
            </h2>
            <Link href="/contact" className="light-button mt-8">
              Ask the flight desk
            </Link>
          </div>
          <div className="space-y-5 text-[15px] leading-[1.9] text-white/65">
            <p>
              Routes, suppliers, landing requests and third-party fees can have different conditions. Use the written
              quotation for your trip rather than assuming one general policy applies to every flight.
            </p>
            <p>
              Confirm the operating carrier, route, landing plan, included and excluded fees, payment schedule,
              cancellation terms, weather procedure and refund treatment in writing.
            </p>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </>
  );
}
