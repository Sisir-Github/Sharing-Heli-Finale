
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { PageHero } from "@/components/ui/PageHero";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { buildBreadcrumbSchema, buildServiceSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getContextualLinks } from "@/lib/seo/internal-links";
import { safeLocalImageSource } from "@/lib/safe-url";

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
  featuredImage?: string | null;
};

function getServiceImage(path: string, featuredImage?: string | null) {
  if (featuredImage && !featuredImage.toLowerCase().endsWith(".svg")) {
    return safeLocalImageSource(featuredImage, "/images/campaign/sharing-heli-hero.jpg");
  }
  if (path.includes("muktinath")) return "/images/campaign/muktinath-helicopter.jpg";
  if (path.includes("everest") || path.includes("shared")) return "/images/campaign/everest-helicopter.jpg";
  if (path.includes("pokhara") || path.includes("emergency")) return "/images/campaign/annapurna-helicopter.jpg";
  return "/images/campaign/sharing-heli-hero.jpg";
}

export function ServiceLanding({
  service,
  path
}: {
  service: Service;
  path: string;
  contactSettings: ContactSettings;
}) {
  const displayService = path.includes("emergency-helicopter-rescue-nepal")
    ? {
        ...service,
        title: "Emergency Flight Coordination",
        shortDescription: "Time-sensitive helicopter coordination subject to aircraft, weather, daylight, permissions, payment or insurance arrangements, and operator confirmation.",
        longDescription: "Sharing Heli can help relay urgent transport requirements to available operators. Sharing Heli does not guarantee dispatch, medical care, aircraft availability, or a successful rescue. The operating company remains responsible for the flight decision. Emergency cases may require location details, patient information, an insurer or payment guarantee, permissions, and coordination with medical or local authorities."
      }
    : path.includes("luxury-helicopter-tour-nepal")
      ? {
          ...service,
          title: "Custom Helicopter Experiences",
          shortDescription: "Private flight planning for photography, filming, corporate travel, proposals, and special occasions.",
          longDescription: "Share the intended route, purpose, passenger count, equipment, and date. The operations desk will review aircraft suitability, permissions, operating limitations, availability, and a current quote before any confirmation."
        }
      : service;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: displayService.title, path }
  ];
  const heroImage = getServiceImage(path, displayService.featuredImage);

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildServiceSchema({
            name: displayService.title,
            description: displayService.seoDescription || displayService.shortDescription,
            path,
            image: heroImage
          }),
          buildWebPageSchema({
            name: displayService.title,
            description: displayService.seoDescription || displayService.shortDescription,
            path,
            primaryImage: heroImage,
            about: ["Nepal", "Helicopter service", displayService.title],
            dateModified: new Date()
          })
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />
      <PageHero
        eyebrow="Helicopter service"
        title={displayService.title}
        description={displayService.seoDescription || displayService.shortDescription}
        image={heroImage}
        imageAlt={`${displayService.title} in Nepal`}
        priority
        actions={<ReservationButton />}
        secondaryAction={{ label: "View all services", href: "/services" }}
      />
      <ServiceDetail
        longDescription={displayService.longDescription}
      />
      <RelatedLinks heading="Plan this flight properly" items={getContextualLinks(`${path} ${displayService.title}`, path)} />
    </>
  );
}
