import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/layout/PageIntro";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { TourDetail } from "@/components/tours/TourDetail";
import { buildBreadcrumbSchema, buildProductSchema } from "@/lib/seo/schema";

type ContactSettings = {
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  operatingUnder: string;
};

type Tour = {
  title: string;
  duration: string;
  priceFrom: number;
  currency: string;
  highlights: string;
  itinerary: string;
  inclusions: string;
  exclusions: string;
  seoDescription?: string | null;
};

export function TourLanding({
  tour,
  path,
  contactSettings
}: {
  tour: Tour;
  path: string;
  contactSettings: ContactSettings;
}) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: tour.title, path }
  ];

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildProductSchema({
            name: tour.title,
            description: tour.seoDescription || tour.highlights,
            path,
            fromPriceUsd: tour.priceFrom,
            duration: tour.duration
          })
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Signature Tour"
        title={tour.title}
        description={tour.seoDescription || tour.highlights}
        headingLevel={1}
      />
      <TourDetail
        title={tour.title}
        duration={tour.duration}
        priceFrom={tour.priceFrom}
        currency={tour.currency}
        highlights={tour.highlights}
        itinerary={tour.itinerary}
        inclusions={tour.inclusions}
        exclusions={tour.exclusions}
      />
      <RelatedLinks
        heading="Continue Exploring"
        items={[
          { title: "All Tours", description: "Explore every published helicopter tour package.", href: "/tours" },
          { title: "Private Charter", description: "Design a custom flight plan with our ops team.", href: "/helicopter-charter-nepal" },
          { title: "Contact Desk", description: "Speak with our 24/7 coordination team.", href: "/contact" }
        ]}
      />
      <ContactPreview settings={contactSettings} />
    </>
  );
}
