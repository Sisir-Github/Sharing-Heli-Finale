import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { buildServiceMetadata } from "@/lib/seo/service-metadata";

export const revalidate = 900;

export async function generateMetadata() {
  const service = await getServiceBySlug("emergency-helicopter-rescue-nepal");
  return buildServiceMetadata(service, "/emergency-helicopter-rescue-nepal");
}

export default async function RescuePage() {
  const [service, settings] = await Promise.all([
    getServiceBySlug("emergency-helicopter-rescue-nepal"),
    getSiteSettings()
  ]);

  if (!service) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return (
    <ServiceLanding service={service} path="/emergency-helicopter-rescue-nepal" contactSettings={contactSettings} />
  );
}
