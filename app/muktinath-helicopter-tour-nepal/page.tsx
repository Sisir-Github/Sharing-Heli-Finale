import { notFound } from "next/navigation";

import { TourLanding } from "@/components/tours/TourLanding";
import { getSiteSettings, getTourBySlug } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/muktinath-helicopter-tour-nepal");
export const dynamic = "force-dynamic";

export default async function MuktinathTourPage() {
  const [tour, settings] = await Promise.all([
    getTourBySlug("muktinath-helicopter-tour-nepal"),
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
    <TourLanding tour={tour} path="/muktinath-helicopter-tour-nepal" contactSettings={contactSettings} />
  );
}
