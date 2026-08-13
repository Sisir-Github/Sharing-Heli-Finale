import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/layout/PageIntro";
import { ToursGrid } from "@/components/sections/ToursGrid";
import { getPublishedTours } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/tours");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" }
];

export const revalidate = 900;

export default async function ToursPage() {
  const tours = await getPublishedTours();

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Signature Experiences"
        title="Nepal Helicopter Tours"
        description="Compare common Himalayan route requests, then confirm aircraft, weather, timing, passenger details, and current quote before booking."
        headingLevel={1}
      />
      <ToursGrid tours={tours} />
    </>
  );
}
