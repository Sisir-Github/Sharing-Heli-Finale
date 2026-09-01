import { FaqSection } from "@/components/seo/FaqSection";
import { PageSchema } from "@/components/seo/PageSchema";
import { CORE_QA } from "@/lib/seo/knowledge";
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

// The canonical Q&A set is shared with llms-full.txt and the homepage FAQ, so
// the same question never gets two different answers across the site.
const merged = [
  ...faqs,
  ...CORE_QA.filter((item) => !faqs.some((existing) => existing.question === item.question))
];

export default function FaqPage() {
  return (
    <>
      <PageSchema path="/faq" />
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(merged)]} />
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
      <section className="band-tight band-cream">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              How to use this page
            </p>
            <p data-speakable className="mt-5 font-display text-[1.3rem] font-medium leading-[1.6] text-navy sm:text-[1.5rem]">
              Most disappointment with a Nepal helicopter flight traces back to three things nobody asked about before
              paying: whether the fare was per seat or per aircraft, what the quote excluded, and what happens when the
              weather closes the route. Everything below is written to answer those before you commit.
            </p>
          </div>
          <div className="space-y-4 self-center text-[15px] leading-[1.9] text-[var(--muted)]">
            <p>
              Nepali helicopter travel has an unusual structure. The company selling you a tour is often not the company
              flying the aircraft; fares are quoted on two different bases that differ by a factor of four or five; and
              the most photographed part of the itinerary, the high-altitude landing, is the part least under anyone
              control. None of that is a problem once you know it, and all of it is a problem if you do not.
            </p>
            <p>
              If a question you have is not answered here, send it to the Pokhara desk before booking. A provider who
              answers operational questions in plain language is telling you something useful about how they work.
            </p>
          </div>
        </div>
      </section>

      <FaqSection items={merged} />
    </>
  );
}
