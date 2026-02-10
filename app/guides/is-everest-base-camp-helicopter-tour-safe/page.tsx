import { PageEngagementTracker } from "@/components/analytics/PageEngagementTracker";
import { PageIntro } from "@/components/layout/PageIntro";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/seo/ContentSections";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageVisualIntro } from "@/components/seo/PageVisualIntro";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/guides/is-everest-base-camp-helicopter-tour-safe");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Is Everest Base Camp Helicopter Tour Safe", path: "/guides/is-everest-base-camp-helicopter-tour-safe" }
];

const sections = [
  {
    title: "What Safety Means in Everest Helicopter Operations",
    paragraphs: [
      "When travelers ask whether an Everest Base Camp helicopter tour is safe, the most accurate answer is that safety depends on planning quality, weather discipline, aircraft standards, and pilot decision-making. In mountain aviation, safety is not a single feature; it is a process repeated before every mission. Good operators treat safety as a constant workflow, not a marketing statement.",
      "Everest flights involve high-altitude terrain, changing wind profiles, and visibility sensitivity. These factors are manageable when teams apply strong operational controls: route viability checks, payload management, weather re-validation, and flexible timing. Unsafe outcomes are more likely when missions are forced through poor conditions or when schedule pressure overrides aviation judgment.",
      "For travelers, the practical takeaway is clear: choose operators with experienced mountain pilots, transparent communication, and regulation-compliant standards. Ask how decisions are made on weather days and whether postponements are treated as safety actions rather than service failures."
    ]
  },
  {
    title: "Core Risk Controls Used by Responsible Operators",
    paragraphs: [
      "The first major safety layer is weather evaluation. Before departure, crews assess current and forecast conditions along the full route, not only at takeoff point. If mountain conditions degrade, mission timing may shift or the flight may be deferred. This is normal and responsible in Himalayan operations.",
      "The second layer is performance and payload control. High altitude requires careful passenger and load planning to preserve safe performance margins. Responsible operators review manifests in advance and structure the mission accordingly. These steps help maintain predictable aircraft behavior in thin-air conditions.",
      "The third layer is pilot expertise specific to mountain flying. Experienced crews know when to adjust, when to wait, and when to stop. That judgment is one of the strongest safety assets on any Everest mission."
    ]
  },
  {
    title: "Passenger Preparation and Comfort Safety",
    paragraphs: [
      "Passenger behavior also contributes to mission safety. Follow pre-flight briefings, clothing guidance, and boarding instructions carefully. Layered cold-weather clothing, hydration, and practical footwear improve comfort and reduce avoidable stress at altitude.",
      "Travelers should disclose any relevant health concerns before departure so teams can provide practical recommendations. This does not automatically prevent participation, but it helps everyone plan with better awareness.",
      "A well-prepared passenger group improves boarding efficiency, communication clarity, and overall mission quality. These small details often have an outsized effect in high-altitude environments."
    ]
  },
  {
    title: "How to Evaluate an Operator Before Booking",
    paragraphs: [
      "Before booking, ask direct operational questions: how weather go/no-go decisions are made, how schedule flexibility is handled, and how route planning is adapted when conditions change. High-quality operators answer clearly and prioritize realistic planning over guaranteed promises.",
      "Check whether communication is structured and responsive. Safety-led operations usually involve clear pre-flight updates, transparent expectations, and practical alternatives when conditions are not suitable.",
      "Everest helicopter tours can be a safe and exceptional experience when executed by disciplined teams. The strongest booking strategy is to prioritize operational quality over aggressive claims, then align your own schedule with mountain realities."
    ]
  }
];

const faqs = [
  {
    question: "Is Everest Base Camp helicopter tour generally safe?",
    answer:
      "With proper weather discipline, experienced mountain pilots, and regulation-compliant operations, it is widely considered a manageable and safe premium aerial experience."
  },
  {
    question: "What is the biggest safety factor on Everest flights?",
    answer:
      "Weather and pilot decision-making are the most critical factors, especially in fast-changing mountain conditions."
  },
  {
    question: "Can a tour be delayed for safety reasons?",
    answer:
      "Yes. Delays or rescheduling are normal and often necessary when weather or route conditions are not acceptable."
  },
  {
    question: "Does altitude affect helicopter operations?",
    answer:
      "Yes. Altitude directly affects aircraft performance, which is why payload and mission planning are tightly controlled."
  },
  {
    question: "How can travelers reduce risk?",
    answer:
      "Choose experienced operators, keep timing flexible, follow briefings, and prepare properly for high-altitude conditions."
  },
  {
    question: "Should I avoid operators that promise guaranteed departures?",
    answer:
      "Be cautious. In mountain aviation, rigid guarantees can conflict with safety-led weather decisions."
  }
];

export const dynamic = "force-dynamic";

export default async function EverestSafetyGuidePage() {
  const settings = await getSiteSettings();
  const contactSettings = settings
    ? {
        primaryPhone: settings.primaryPhone,
        whatsappNumber: settings.whatsappNumber,
        email: settings.email,
        operatingUnder: settings.operatingUnder
      }
    : {
        primaryPhone: "+977-9802855690",
        whatsappNumber: "+977-9856028155",
        email: "rishi8848@gmail.com",
        operatingUnder: "Operating under Pokhara Flight Centre Tours & Travel Pvt. Ltd."
      };

  return (
    <>
      <PageEngagementTracker trackGuideScroll />
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Safety Guide"
        title="Is Everest Base Camp Helicopter Tour Safe?"
        description="A practical safety breakdown covering weather strategy, altitude controls, pilot expertise, and traveler preparation for Everest helicopter tours."
        headingLevel={1}
      />
      <PageVisualIntro
        imageSrc="/images/guide-safety.svg"
        imageAlt="Safety planning for Everest Base Camp helicopter tour in Nepal"
        note="Safety outcomes come from disciplined weather decisions, experienced mountain pilots, and realistic itinerary planning."
      />
      <ContentSections sections={sections} />
      <FaqSection items={faqs} />
      <RelatedLinks
        heading="Continue Planning"
        items={[
          {
            title: "Everest Base Camp Helicopter Tour",
            description: "Review tour details, duration, pricing, and mission flow.",
            href: "/everest-base-camp-helicopter-tour-nepal"
          },
          {
            title: "Best Time for Helicopter Tours",
            description: "Understand seasonal timing strategy to improve mission reliability.",
            href: "/guides/best-time-helicopter-tours-nepal"
          },
          {
            title: "Contact Operations Desk",
            description: "Discuss route planning directly with Sharing Heli’s coordination team.",
            href: "/contact"
          }
        ]}
      />
      <ContactPreview settings={contactSettings} />
    </>
  );
}
