import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/faq");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Flight FAQs", path: "/faq" }
];

const faqs = [
  {
    question: "How is a helicopter flight confirmed?",
    answer:
      "A request is confirmed only after the route, date, aircraft availability, passenger details, operating carrier, quote, and payment terms have been agreed in writing."
  },
  {
    question: "Are shared helicopter seats always available?",
    answer:
      "No. Shared flights depend on compatible travelers, passenger weight, route, timing, weather, aircraft availability, and the operating plan for that date. A request is not a confirmed seat."
  },
  {
    question: "What information is needed for a quote?",
    answer:
      "Send the intended route, preferred date or date range, number of passengers, approximate passenger and luggage weights, departure city, and whether you prefer a shared flight or private charter."
  },
  {
    question: "Can weather change the departure time or route?",
    answer:
      "Yes. Mountain visibility and operating conditions can change quickly. Timing, route, landing, postponement, or cancellation may change after an operational review."
  },
  {
    question: "Who operates the aircraft?",
    answer:
      "Sharing Heli Nepal coordinates requests. The licensed operating carrier and relevant flight details should be disclosed for the confirmed booking before payment or deposit."
  },
  {
    question: "Are website prices final?",
    answer:
      "Treat website prices as guidance unless a quote states its route basis, currency, validity period, taxes, inclusions, exclusions, and cancellation terms. Ask for the current written quote before booking."
  },
  {
    question: "What should passengers know about altitude?",
    answer:
      "High-altitude routes may not suit every traveler. Share relevant mobility or health concerns before booking and seek advice from a qualified medical professional when needed."
  },
  {
    question: "Can I request urgent helicopter support through the website?",
    answer:
      "You can send an urgent coordination request, but dispatch is never guaranteed by the form. Availability remains subject to the operating carrier, aircraft, crew, weather, permissions, location, and payment arrangements."
  }
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />
      <PageHero
        eyebrow="Before you request a flight"
        title="Clear answers for helicopter travel in Nepal"
        description="Start with the practical details that affect availability, confirmation and the final quote. Route-specific conditions are confirmed for each request."
        image="/images/campaign/everest-helicopter.jpg"
        imageAlt="Helicopter flying in the Everest region of Nepal"
        primaryAction={{ label: "Reserve a flight", href: "/check-availability" }}
        size="sm"
        priority
      />
      <FaqSection items={faqs} />
    </>
  );
}
