import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return {};
  }
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.shortDescription
  };
}

export default async function ServiceSlugPage({ params }: { params: { slug: string } }) {
  const [service, settings] = await Promise.all([getServiceBySlug(params.slug), getSiteSettings()]);
  if (!service) {
    notFound();
  }

  const contactSettings = settings
    ? {
        primaryPhone: settings.primaryPhone,
        whatsappNumber: settings.whatsappNumber,
        email: settings.email,
        operatingUnder: settings.operatingUnder
      }
    : {
        primaryPhone: "+977-9802855690",
        whatsappNumber: "+977-9856028155",
        email: "rishi8848@gmail.com",
        operatingUnder: "Operating under Pokhara Flight Centre Tours & Travel Pvt. Ltd."
      };

  return <ServiceLanding service={service} path={`/services/${params.slug}`} contactSettings={contactSettings} />;
}
