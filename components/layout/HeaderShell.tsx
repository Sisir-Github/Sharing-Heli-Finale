import { getNavItems, getSiteSettings } from "@/lib/cms";
import { NAV_LINKS } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { isSafePublicHref } from "@/lib/safe-url";

function normalizeNavItems(items: Array<{ id: string; label: string; href: string }>) {
  const source = items.length
    ? items.filter((item) => item.label.trim() && isSafePublicHref(item.href))
    : NAV_LINKS.map((item, index) => ({ id: `core-${index}`, ...item }));
  if (!source.some((item) => item.href === "/blog")) {
    const aboutIndex = source.findIndex((item) => item.href === "/about-us");
    source.splice(aboutIndex >= 0 ? aboutIndex : source.length, 0, { id: "core-blog", label: "Blog", href: "/blog" });
  }
  const unique = new Map(source.map((item) => [item.href, item]));
  unique.delete("/");

  return [
    source.find((item) => item.href === "/") || { id: "core-home", label: "Home", href: "/" },
    ...Array.from(unique.values())
  ].slice(0, 7);
}

export async function HeaderShell() {
  const [settings, navItems] = await Promise.all([getSiteSettings(), getNavItems()]);
  const resolvedNav = normalizeNavItems(navItems);
  return <Header settings={settings} navItems={resolvedNav} />;
}
