import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/guides");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" }
];

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageIntro
        eyebrow="Insights"
        title="Nepal Helicopter Planning Guides"
        description="Operationally informed guides from Sharing Heli to help you plan safer, more efficient Himalayan helicopter experiences."
        headingLevel={1}
      />
      <RelatedLinks
        heading="Read The Guides"
        items={[
          {
            title: "Best Time for Helicopter Tours",
            description: "Seasonal windows, visibility patterns, and route timing strategies.",
            href: "/guides/best-time-helicopter-tours-nepal"
          },
          {
            title: "Is Everest Helicopter Tour Safe?",
            description: "A practical safety framework for high-altitude Everest flights.",
            href: "/guides/is-everest-base-camp-helicopter-tour-safe"
          },
          {
            title: "Helicopter vs Trekking in Nepal",
            description: "Compare comfort, time, cost, and effort before you choose.",
            href: "/guides/helicopter-vs-trekking-nepal"
          }
        ]}
      />
    </>
  );
}
