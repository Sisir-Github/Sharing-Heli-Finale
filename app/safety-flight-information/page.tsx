import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/safety-flight-information");

const breadcrumbs = [{ name: "Home", path: "/" }, { name: "Safety & Flight Information", path: "/safety-flight-information" }];
const faqs = [
  { question: "Can weather change a helicopter flight?", answer: "Yes. Mountain visibility, wind, cloud, precipitation, and conditions along the full route can delay, reroute, postpone, or cancel a flight." },
  { question: "Why do you need every passenger's weight?", answer: "The operating company uses accurate passenger and baggage weights for aircraft performance and loading decisions, particularly on high-altitude routes." },
  { question: "How much baggage can I bring?", answer: "Limits vary by aircraft, route, altitude, passenger load, and conditions. Request the written limit for your confirmed flight rather than relying on a generic allowance." },
  { question: "Who operates the helicopter?", answer: "The operating carrier and available aircraft should be disclosed with the final quotation or confirmation. Sharing Heli must not be assumed to own or operate the aircraft unless stated in writing." },
  { question: "What is the cancellation and refund policy?", answer: "Terms can vary by flight and supplier. Before payment, ask how customer cancellation, operator cancellation, weather postponement, and non-refundable third-party fees are handled in your written quote." },
  { question: "Is submitting an inquiry a booking?", answer: "No. A booking exists only after availability, route, operating details, commercial terms, and any required payment are confirmed in writing." }
];

const topics = [
  { title: "Weather and visibility", body: "Mountain flights are conditional. A clear departure point does not prove that the full route or destination is suitable. Build flexibility into the itinerary and do not pressure an operating crew to continue in unsuitable conditions." },
  { title: "Passenger weight and baggage", body: "Provide accurate individual weights and baggage details. The operating company may change loading, passenger count, route, or timing based on aircraft performance requirements." },
  { title: "Route and landing plan", body: "Request the current route and approved landing plan in writing before payment. A marketing page cannot guarantee a high-altitude landing, fixed ground time, or unchanged routing." },
  { title: "Operating carrier disclosure", body: "Ask for the legal name of the helicopter operator, aircraft information when available, and the documents or insurance details relevant to your booking." },
  { title: "Cancellation and refunds", body: "The final quotation should separate customer cancellation, operator cancellation, weather postponement, and non-refundable third-party costs so you know what applies before payment." },
  { title: "Medical and altitude preparation", body: "A helicopter reduces travel time but does not remove altitude exposure. Travelers should discuss personal medical concerns with a qualified clinician and follow the operating team's boarding and safety briefing." }
];

export default function SafetyFlightInformationPage() {
  return (
    <>
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <section className="section-space bg-canvas pb-12">
        <div className="shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="eyebrow">Before you confirm</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">Safety And Flight Information For Nepal Helicopter Travel</h1>
          </div>
          <div>
            <p className="copy text-lg">Use this guide to ask better questions about weather, routing, operator responsibility, passenger loading, and commercial terms.</p>
            <Link href="/check-availability" className="inquiry-button mt-6">Discuss My Flight</Link>
          </div>
        </div>
      </section>
      <section className="bg-canvas pb-16">
        <div className="shell grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic.title} className="surface-card p-6">
              <h2 className="font-display text-2xl font-semibold tracking-normal text-ink">{topic.title}</h2>
              <p className="copy mt-3 text-sm">{topic.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-space bg-ink text-white"><div className="shell grid gap-8 lg:grid-cols-2"><div><p className="eyebrow text-glacier">Before payment</p><h2 className="mt-3 font-display text-4xl">Confirm The Terms That Apply To Your Flight</h2></div><div className="space-y-4 text-sm leading-relaxed text-slate-300"><p>Routes, suppliers, landing requests, and third-party fees can have different conditions. Use the written quotation for your trip rather than assuming one general policy applies to every flight.</p><p>Confirm the operating carrier, route, landing plan, included and excluded fees, payment schedule, cancellation terms, weather procedure, and refund treatment in writing.</p></div></div></section>
      <FaqSection items={faqs} />
    </>
  );
}
