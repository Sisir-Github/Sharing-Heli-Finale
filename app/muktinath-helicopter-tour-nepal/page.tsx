import { notFound } from "next/navigation";

import { TourLanding } from "@/components/tours/TourLanding";
import { getSiteSettings, getTourBySlug } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { buildTourMetadata } from "@/lib/seo/tour-metadata";

export const revalidate = 900;

export async function generateMetadata() {
  const tour = await getTourBySlug("muktinath-helicopter-tour-nepal");
  return buildTourMetadata(tour, "/muktinath-helicopter-tour-nepal");
}

export default async function MuktinathTourPage() {
  const [tour, settings] = await Promise.all([
    getTourBySlug("muktinath-helicopter-tour-nepal"),
    getSiteSettings()
  ]);

  if (!tour) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return (
    <TourLanding tour={tour} path="/muktinath-helicopter-tour-nepal" contactSettings={contactSettings} />
  );
}
