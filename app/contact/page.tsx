import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedServices, getSiteSettings } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/contact");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" }
];

export const revalidate = 900;

export default async function ContactPage() {
  type ServiceItem = { title: string };
  const [services, settings] = (await Promise.all([getPublishedServices(), getSiteSettings()])) as [
    ServiceItem[],
    Awaited<ReturnType<typeof getSiteSettings>>
  ];
  const serviceNames = services.map((service) => service.title);
  const contactSettings = resolveContactSettings(settings);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageHero
        eyebrow="Contact"
        title="Talk to the flight desk"
        description="Send your travel plans or mission details for current availability, route feasibility and planning support."
        image="/images/campaign/muktinath-helicopter.jpg"
        imageAlt="Helicopter landing in the Nepal Himalayas"
        size="sm"
        priority
      />
      <InquiryForm showMap services={serviceNames} contactSettings={contactSettings} />
      <RelatedLinks
        heading="Popular inquiry paths"
        items={[
          {
            title: "Charter inquiry",
            description: "Request private charter scheduling, route planning and ground support details.",
            href: "/contact/charter"
          },
          {
            title: "Everest tour inquiry",
            description: "Discuss timing, weather windows and group arrangements for Everest flights.",
            href: "/contact/everest-base-camp-helicopter-tour"
          },
          {
            title: "Muktinath pilgrimage inquiry",
            description: "Coordinate religious travel requirements and mission planning support.",
            href: "/contact/muktinath-pilgrimage-tour"
          }
        ]}
      />
    </>
  );
}
