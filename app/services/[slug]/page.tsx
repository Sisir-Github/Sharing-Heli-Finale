import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { getCanonicalServicePath } from "@/lib/seo/canonical";
import { buildServiceMetadata } from "@/lib/seo/service-metadata";

export const revalidate = 900;

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return buildServiceMetadata(service, getCanonicalServicePath(slug));
}

export default async function ServiceSlugPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()]);
  if (!service) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return <ServiceLanding service={service} path={`/services/${slug}`} contactSettings={contactSettings} />;
}
