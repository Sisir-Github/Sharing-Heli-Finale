export const TOUR_CATEGORIES = ["SCENIC", "PILGRIMAGE"] as const;

export type TourCategory = (typeof TOUR_CATEGORIES)[number];

export const TOUR_CATEGORY_LABELS: Record<TourCategory, string> = {
  SCENIC: "Scenic & transfer",
  PILGRIMAGE: "Pilgrimage"
};

const PILGRIMAGE_SLUGS = new Set([
  "muktinath-helicopter-tour-nepal",
  "gosaikunda-helicopter-tour",
  "damodar-kunda-darshan"
]);

export function normalizeTourCategory(category: string | null | undefined, slug: string): TourCategory {
  if (TOUR_CATEGORIES.includes(category as TourCategory)) return category as TourCategory;
  return PILGRIMAGE_SLUGS.has(slug) ? "PILGRIMAGE" : "SCENIC";
}
