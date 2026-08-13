import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { buildServiceMetadata } from "@/lib/seo/service-metadata";

export const revalidate = 900;

export async function generateMetadata() {
  const service = await getServiceBySlug("luxury-helicopter-tour-nepal");
  return buildServiceMetadata(service, "/luxury-helicopter-tour-nepal");
}

export default async function LuxuryTourPage() {
  const [service, settings] = await Promise.all([
    getServiceBySlug("luxury-helicopter-tour-nepal"),
    getSiteSettings()
  ]);

  if (!service) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return (
    <ServiceLanding service={service} path="/luxury-helicopter-tour-nepal" contactSettings={contactSettings} />
  );
}
