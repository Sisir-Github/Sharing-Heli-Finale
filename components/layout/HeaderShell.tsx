import { getNavItems, getSiteSettings } from "@/lib/cms";
import { NAV_LINKS } from "@/lib/constants";
import { Header } from "@/components/layout/Header";

export async function HeaderShell() {
  const [settings, navItems] = await Promise.all([getSiteSettings(), getNavItems()]);
  const resolvedNav = navItems.length ? navItems : NAV_LINKS.map((item, index) => ({
    id: String(index),
    label: item.label,
    href: item.href
  }));
  return <Header settings={settings} navItems={resolvedNav} />;
}
