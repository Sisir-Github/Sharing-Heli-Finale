import { notFound } from "next/navigation";

import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServiceBySlug, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/emergency-helicopter-rescue-nepal");
export const dynamic = "force-dynamic";

export default async function RescuePage() {
  const [service, settings] = await Promise.all([
    getServiceBySlug("emergency-helicopter-rescue-nepal"),
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
    <ServiceLanding service={service} path="/emergency-helicopter-rescue-nepal" contactSettings={contactSettings} />
  );
}
