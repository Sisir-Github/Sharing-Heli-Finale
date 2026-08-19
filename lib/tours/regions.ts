export const TOUR_REGIONS = ["EVEREST", "ANNAPURNA", "LANGTANG"] as const;

export type TourRegion = (typeof TOUR_REGIONS)[number];

export const TOUR_REGION_CONTENT: Array<{
  id: TourRegion;
  anchor: string;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
}> = [
  {
    id: "EVEREST",
    anchor: "everest-region",
    label: "Everest Region",
    shortLabel: "Everest",
    description: "Scenic day tours and point-to-point helicopter transfers across Lukla, Namche, Pheriche, Gokyo, and the upper Khumbu.",
    image: "/images/campaign/everest-helicopter.jpg"
  },
  {
    id: "ANNAPURNA",
    anchor: "annapurna-mustang-region",
    label: "Annapurna & Mustang",
    shortLabel: "Annapurna",
    description: "Pokhara-based mountain flights and pilgrimage routes covering Annapurna Base Camp, Mardi Himal, Tilicho, Muktinath, and Damodar Kunda.",
    image: "/images/campaign/annapurna-helicopter.jpg"
  },
  {
    id: "LANGTANG",
    anchor: "langtang-region",
    label: "Langtang & Gosaikunda",
    shortLabel: "Langtang",
    description: "Short Kathmandu departures toward Kyanjin Gompa, Langtang National Park, and the sacred Gosaikunda lakes.",
    image: "/images/campaign/sharing-heli-hero.jpg"
  }
];

export function normalizeTourRegion(region: string | null | undefined, slug: string): TourRegion {
  if (TOUR_REGIONS.includes(region as TourRegion)) return region as TourRegion;
  if (slug.includes("annapurna") || slug.includes("muktinath") || slug.includes("mardi") || slug.includes("tilicho") || slug.includes("damodar")) {
    return "ANNAPURNA";
  }
  if (slug.includes("langtang") || slug.includes("gosaikunda")) return "LANGTANG";
  return "EVEREST";
}
