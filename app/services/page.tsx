import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { getPublishedServices, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/services");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" }
];

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getPublishedServices(), getSiteSettings()]);
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
        eyebrow="Our Services"
        title="Helicopter Services in Nepal"
        description="Purpose-built flight solutions across Nepal with luxury execution and high-altitude operational discipline."
        headingLevel={1}
      />
      <ServicesGrid services={services} />
      <RelatedLinks
        heading="Explore Related Journeys"
        items={[
          {
            title: "Private Helicopter Charter",
            description: "Flexible charter missions with dedicated dispatch support and premium aircraft planning.",
            href: "/helicopter-charter-nepal"
          },
          {
            title: "Emergency Helicopter Rescue",
            description: "Rapid coordination for high-priority rescue logistics in mountain environments.",
            href: "/emergency-helicopter-rescue-nepal"
          },
          {
            title: "Signature Nepal Tours",
            description: "Everest, Annapurna, and Muktinath helicopter circuits with expert mountain pilots.",
            href: "/tours"
          }
        ]}
      />
      <ContactPreview settings={contactSettings} />
    </>
  );
}
