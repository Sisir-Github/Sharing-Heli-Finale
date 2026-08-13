import { notFound } from "next/navigation";

import { TourLanding } from "@/components/tours/TourLanding";
import { getSiteSettings, getTourBySlug } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { buildTourMetadata } from "@/lib/seo/tour-metadata";

export const revalidate = 900;

export async function generateMetadata() {
  const tour = await getTourBySlug("annapurna-base-camp-helicopter-tour-nepal");
  return buildTourMetadata(tour, "/annapurna-base-camp-helicopter-tour-nepal");
}

export default async function AnnapurnaTourPage() {
  const [tour, settings] = await Promise.all([
    getTourBySlug("annapurna-base-camp-helicopter-tour-nepal"),
    getSiteSettings()
  ]);

  if (!tour) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return (
    <TourLanding tour={tour} path="/annapurna-base-camp-helicopter-tour-nepal" contactSettings={contactSettings} />
  );
}
