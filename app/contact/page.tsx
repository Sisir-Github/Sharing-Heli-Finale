import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { InquiryForm } from "@/components/contact/InquiryForm";
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
  const [services, settings] = (await Promise.all([getPublishedServices(), getSiteSettings()])) as [ServiceItem[], Awaited<ReturnType<typeof getSiteSettings>>];
  const serviceNames = services.map((service) => service.title);
  const contactSettings = resolveContactSettings(settings);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Contact"
        title="Contact Sharing Heli Nepal"
        description="Send your travel plans or mission details to our Pokhara operations desk for current availability and planning support."
        headingLevel={1}
      />
      <InquiryForm showMap services={serviceNames} contactSettings={contactSettings} />
      <RelatedLinks
        heading="Popular Inquiry Paths"
        items={[
          {
            title: "Charter Inquiry",
            description: "Request private charter scheduling, route planning, and ground support details.",
            href: "/contact/charter"
          },
          {
            title: "Everest Tour Inquiry",
            description: "Discuss timing, weather windows, and group arrangements for Everest flights.",
            href: "/contact/everest-base-camp-helicopter-tour"
          },
          {
            title: "Muktinath Pilgrimage Inquiry",
            description: "Coordinate religious travel requirements and mission planning support.",
            href: "/contact/muktinath-pilgrimage-tour"
          }
        ]}
      />
    </>
  );
}
