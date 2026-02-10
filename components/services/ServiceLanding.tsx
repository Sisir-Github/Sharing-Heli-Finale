import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/layout/PageIntro";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

type ContactSettings = {
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  operatingUnder: string;
};

type Service = {
  title: string;
  shortDescription: string;
  longDescription: string;
  seoDescription?: string | null;
};

export function ServiceLanding({
  service,
  path,
  contactSettings
}: {
  service: Service;
  path: string;
  contactSettings: ContactSettings;
}) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path }
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Service"
        title={service.title}
        description={service.seoDescription || service.shortDescription}
        headingLevel={1}
      />
      <ServiceDetail
        title={service.title}
        shortDescription={service.shortDescription}
        longDescription={service.longDescription}
      />
      <RelatedLinks
        heading="Related Services"
        items={[
          { title: "All Services", description: "Explore every helicopter service offering.", href: "/services" },
          { title: "Signature Tours", description: "Explore premium Himalayan tour packages.", href: "/tours" },
          { title: "Contact Desk", description: "Speak with our 24/7 coordination team.", href: "/contact" }
        ]}
      />
      <ContactPreview settings={contactSettings} />
    </>
  );
}
