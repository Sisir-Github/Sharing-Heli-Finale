import { getNavItems, getSiteSettings } from "@/lib/cms";
import { NAV_LINKS } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { isSafePublicHref } from "@/lib/safe-url";

function normalizeNavItems(items: Array<{ id: string; label: string; href: string; groupLabel?: string | null }>) {
  const source = items.length
    ? items.filter((item) => item.label.trim() && isSafePublicHref(item.href))
    : NAV_LINKS.map((item, index) => ({ id: `core-${index}`, ...item }));
  const unique = new Map(source.map((item) => [item.href, item]));
  return Array.from(unique.values()).slice(0, 24);
}

export async function HeaderShell() {
  const [settings, navItems] = await Promise.all([getSiteSettings(), getNavItems()]);
  const resolvedNav = normalizeNavItems(navItems);
  return <Header settings={settings} navItems={resolvedNav} />;
}
