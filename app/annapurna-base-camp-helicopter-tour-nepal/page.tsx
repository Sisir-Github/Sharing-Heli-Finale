import { notFound } from "next/navigation";

import { TourLanding } from "@/components/tours/TourLanding";
import { getSiteSettings, getTourBySlug } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/annapurna-base-camp-helicopter-tour-nepal");
export const dynamic = "force-dynamic";

export default async function AnnapurnaTourPage() {
  const [tour, settings] = await Promise.all([
    getTourBySlug("annapurna-base-camp-helicopter-tour-nepal"),
    getSiteSettings()
  ]);

  if (!tour) {
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
    <TourLanding tour={tour} path="/annapurna-base-camp-helicopter-tour-nepal" contactSettings={contactSettings} />
  );
}
