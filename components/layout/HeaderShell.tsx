import { getNavItems, getPublishedTours, getSiteSettings } from "@/lib/cms";
import { NAV_LINKS } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { isSafePublicHref } from "@/lib/safe-url";
import { getCanonicalTourPath } from "@/lib/seo/canonical";
import { normalizeTourRegion } from "@/lib/tours/regions";

function normalizeNavItems(items: Array<{ id: string; label: string; href: string; groupLabel?: string | null }>) {
  const source = items.length
    ? items.filter((item) => item.label.trim() && isSafePublicHref(item.href) && item.groupLabel?.trim().toLowerCase() !== "pilgrimage tours")
    : NAV_LINKS.map((item, index) => ({ id: `core-${index}`, ...item }));
  const unique = new Map(source.map((item) => [item.href, item]));
  return Array.from(unique.values()).slice(0, 24);
}

export async function HeaderShell() {
  const [settings, navItems, tours] = await Promise.all([getSiteSettings(), getNavItems(), getPublishedTours()]);
  const resolvedNav = normalizeNavItems(navItems);
  const tourMenuItems = tours.map((tour, index) => ({
    id: tour.id,
    title: tour.title,
    href: getCanonicalTourPath(tour.slug),
    region: normalizeTourRegion("region" in tour ? tour.region : null, tour.slug),
    sortOrder: "sortOrder" in tour && typeof tour.sortOrder === "number" ? tour.sortOrder : index
  }));

  return <Header settings={settings} navItems={resolvedNav} tourMenuItems={tourMenuItems} />;
}
