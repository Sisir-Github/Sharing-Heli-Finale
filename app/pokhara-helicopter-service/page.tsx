import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { buildServiceMetadata } from "@/lib/seo/service-metadata";

export const revalidate = 900;

export async function generateMetadata() {
  const service = await getServiceBySlug("pokhara-helicopter-service");
  return buildServiceMetadata(service, "/pokhara-helicopter-service");
}

export default async function PokharaServicePage() {
  const [service, settings] = await Promise.all([
    getServiceBySlug("pokhara-helicopter-service"),
    getSiteSettings()
  ]);

  if (!service) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return (
    <ServiceLanding service={service} path="/pokhara-helicopter-service" contactSettings={contactSettings} />
  );
}
