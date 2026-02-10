import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { ToursGrid } from "@/components/sections/ToursGrid";
import { getPublishedTours, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/tours");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" }
];

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const [tours, settings] = await Promise.all([getPublishedTours(), getSiteSettings()]);
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
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Signature Experiences"
        title="Nepal Helicopter Tours"
        description="Choose from expertly planned helicopter journeys across iconic Himalayan destinations with direct inquiry support."
        headingLevel={1}
      />
      <ToursGrid tours={tours} />
      <RelatedLinks
        heading="Plan The Right Flight"
        items={[
          {
            title: "Everest Base Camp Tour",
            description: "Fly close to Everest with altitude-aware planning and premium onboard comfort.",
            href: "/everest-base-camp-helicopter-tour-nepal"
          },
          {
            title: "Annapurna Base Camp Tour",
            description: "Enjoy panoramic Annapurna basin views with smooth, time-efficient routing.",
            href: "/annapurna-base-camp-helicopter-tour-nepal"
          },
          {
            title: "Muktinath Pilgrimage Tour",
            description: "Sacred-route helicopter service with reliable timing and support.",
            href: "/muktinath-helicopter-tour-nepal"
          }
        ]}
      />
      <ContactPreview settings={contactSettings} />
    </>
  );
}
