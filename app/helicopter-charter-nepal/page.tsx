import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { buildServiceMetadata } from "@/lib/seo/service-metadata";

export const revalidate = 900;

export async function generateMetadata() {
  const service = await getServiceBySlug("helicopter-charter-nepal");
  return buildServiceMetadata(service, "/helicopter-charter-nepal");
}

export default async function CharterPage() {
  const [service, settings] = await Promise.all([
    getServiceBySlug("helicopter-charter-nepal"),
    getSiteSettings()
  ]);

  if (!service) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return (
    <ServiceLanding service={service} path="/helicopter-charter-nepal" contactSettings={contactSettings} />
  );
}
