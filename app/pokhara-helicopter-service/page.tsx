import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/pokhara-helicopter-service");
export const dynamic = "force-dynamic";

export default async function PokharaServicePage() {
  const [service, settings] = await Promise.all([
    getServiceBySlug("pokhara-helicopter-service"),
    getSiteSettings()
  ]);

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

  return (
    <ServiceLanding service={service} path="/pokhara-helicopter-service" contactSettings={contactSettings} />
  );
}
