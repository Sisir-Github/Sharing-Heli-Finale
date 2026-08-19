import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedServices } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata("/services");

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" }
];

export const revalidate = 900;

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageHero
        eyebrow="Our services"
        title="Helicopter services in Nepal"
        description="Choose the service that matches your route, group and travel date. Each request is reviewed for aircraft, weather, permissions and passenger requirements."
        image="/images/campaign/sharing-heli-hero.jpg"
        imageAlt="Helicopter flying near the Himalayas in Nepal"
        primaryAction={{ label: "Reserve a flight", href: "/check-availability" }}
        secondaryAction={{ label: "Talk to the desk", href: "/contact" }}
        priority
      />
      <ServicesGrid services={services} />
    </>
  );
}
