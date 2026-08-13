import { notFound } from "next/navigation";

import { TourLanding } from "@/components/tours/TourLanding";
import { getSiteSettings, getTourBySlug } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { getCanonicalTourPath } from "@/lib/seo/canonical";
import { buildTourMetadata } from "@/lib/seo/tour-metadata";

export const revalidate = 900;

type TourPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  return buildTourMetadata(tour, getCanonicalTourPath(slug));
}

export default async function TourSlugPage({ params }: TourPageProps) {
  const { slug } = await params;
  const [tour, settings] = await Promise.all([getTourBySlug(slug), getSiteSettings()]);
  if (!tour) {
    notFound();
  }

  const contactSettings = resolveContactSettings(settings);

  return <TourLanding tour={tour} path={`/tours/${slug}`} contactSettings={contactSettings} />;
}
