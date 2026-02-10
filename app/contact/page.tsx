import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { getPublishedServices, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/contact");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" }
];

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  type ServiceItem = { title: string };
  const [services, settings] = (await Promise.all([getPublishedServices(), getSiteSettings()])) as [ServiceItem[], Awaited<ReturnType<typeof getSiteSettings>>];
  const serviceNames = services.map((service) => service.title);
  const contactSettings = settings
    ? {
        primaryPhone: settings.primaryPhone,
        whatsappNumber: settings.whatsappNumber,
        email: settings.email,
        addressLine1: settings.addressLine1,
        addressLine2: settings.addressLine2,
        addressLine3: settings.addressLine3,
        addressLine4: settings.addressLine4
      }
    : {
        primaryPhone: "+977-9802855690",
        whatsappNumber: "+977-9856028155",
        email: "rishi8848@gmail.com",
        addressLine1: "Lakeside-6, 15 Street No.",
        addressLine2: "Pokhara 33700",
        addressLine3: "Kaski, Gandaki Province",
        addressLine4: "Nepal"
      };

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Contact"
        title="Contact Sharing Heli Nepal"
        description="Send your travel plans or mission details and receive tailored support from our 24/7 operations desk."
        headingLevel={1}
      />
      <InquiryForm showMap services={serviceNames} contactSettings={contactSettings} />
      <RelatedLinks
        heading="Popular Inquiry Paths"
        items={[
          {
            title: "Charter Inquiry",
            description: "Request private charter scheduling, route planning, and premium ground support.",
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
