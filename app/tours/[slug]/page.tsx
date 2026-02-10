import { notFound } from "next/navigation";

import { TourLanding } from "@/components/tours/TourLanding";
import { getSiteSettings, getTourBySlug } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = await getTourBySlug(params.slug);
  if (!tour) {
    return {};
  }
  return {
    title: tour.seoTitle || tour.title,
    description: tour.seoDescription || tour.highlights
  };
}

export default async function TourSlugPage({ params }: { params: { slug: string } }) {
  const [tour, settings] = await Promise.all([getTourBySlug(params.slug), getSiteSettings()]);
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

  return <TourLanding tour={tour} path={`/tours/${params.slug}`} contactSettings={contactSettings} />;
}
