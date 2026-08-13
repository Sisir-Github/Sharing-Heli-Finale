import { safeLocalImageSource } from "@/lib/safe-url";

export const TOUR_CAMPAIGN_IMAGES: Record<string, string> = {
  "everest-base-camp-helicopter-tour-nepal": "/images/campaign/everest-helicopter.jpg",
  "annapurna-base-camp-helicopter-tour-nepal": "/images/campaign/annapurna-helicopter.jpg",
  "muktinath-helicopter-tour-nepal": "/images/campaign/muktinath-helicopter.jpg"
};

export function getTourImage(slug: string, configuredImage?: string | null) {
  const fallback = TOUR_CAMPAIGN_IMAGES[slug] || "/images/campaign/sharing-heli-hero.jpg";
  const image = configuredImage?.trim();

  if (!image || image.toLowerCase().endsWith(".svg")) return fallback;
  return safeLocalImageSource(image, fallback);
}
