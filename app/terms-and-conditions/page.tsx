import { PageIntro } from "@/components/layout/PageIntro";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/seo/ContentSections";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/terms-and-conditions");
export const revalidate = 86400;

export default function TermsAndConditionsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms And Conditions", path: "/terms-and-conditions" }]} />
      <PageIntro
        eyebrow="Terms"
        title="Terms And Conditions"
        description="General conditions for helicopter inquiries, quotes, bookings, payments, and weather-dependent flight planning."
      />
      <ContentSections
        sections={[
          {
            title: "Inquiry And Quote Basis",
            paragraphs: [
              "Submitting an inquiry does not create a confirmed booking. Routes, aircraft availability, landing permissions, schedule, passenger load, baggage, and fare are confirmed only after review by the flight desk and relevant operator.",
              "Any price shown without a verification date, route basis, inclusions, exclusions, and validity period should be treated as guidance only."
            ]
          },
          {
            title: "Weather And Operational Decisions",
            paragraphs: [
              "Helicopter flights in Nepal are weather-dependent. The operating pilot and operator make final safety and feasibility decisions.",
              "Departure time, route, landing point, ground time, and return timing may change because of weather, aircraft performance, permissions, passenger weight, or other operating requirements."
            ]
          },
          {
            title: "Payments, Changes, And Cancellations",
            paragraphs: [
              "Payment terms, refund rules, cancellation windows, taxes, permits, and included services must be confirmed in the written quote or invoice for the specific booking.",
              "Customers should review passport or ID needs, passenger weight limits, baggage limits, insurance, health suitability, and arrival time before confirming."
            ]
          }
        ]}
      />
    </>
  );
}
