"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string; href: string; groupLabel?: string | null };

type NavEntry =
  | { type: "link"; item: NavItem }
  | { type: "group"; label: string; items: NavItem[] };

function buildNavigation(items: NavItem[]) {
  const entries: NavEntry[] = [];
  const groups = new Map<string, Extract<NavEntry, { type: "group" }>>();

  for (const item of items) {
    const groupLabel = item.groupLabel?.trim();
    if (!groupLabel) {
      entries.push({ type: "link", item });
      continue;
    }

    let group = groups.get(groupLabel);
    if (!group) {
      group = { type: "group", label: groupLabel, items: [] };
      groups.set(groupLabel, group);
      entries.push(group);
    }
    group.items.push(item);
  }

  return entries;
}

export function Header({
  settings,
  navItems
}: {
  settings: { brandName: string; logoImage?: string | null } | null;
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const menuOpen = menuState.open && menuState.pathname === pathname;
  const isHome = pathname === "/";
  const navigation = buildNavigation(navItems);

  return (
    <header className={cn("site-header z-50 border-b border-ink/10 text-ink backdrop-blur-xl transition-colors duration-300", isHome ? "site-header-home fixed inset-x-0 top-0" : "sticky top-0")}>
      <div className="shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="group flex shrink-0 items-center" aria-label={`${settings?.brandName || "Sharing Heli"} home`}>
          <BrandLogo src={settings?.logoImage} imageClassName="h-12 sm:h-[52px]" />
        </Link>

        <nav className="hidden items-center gap-2 xl:flex" aria-label="Primary navigation">
          {navigation.map((entry) => entry.type === "link" ? (
            <Link key={entry.item.id} href={entry.item.href} className={cn("border-b border-transparent px-1 py-2 text-[12px] font-semibold text-slate-700 transition-colors hover:text-aurora", pathname === entry.item.href && "border-aurora text-ink")}>{entry.item.label}</Link>
          ) : (
            <div key={entry.label} className="group/nav relative">
              <button
                type="button"
                className={cn("inline-flex items-center gap-1 border-b border-transparent px-1 py-2 text-[12px] font-semibold text-slate-700 transition-colors hover:text-aurora", entry.items.some((item) => pathname === item.href) && "border-aurora text-ink")}
                aria-haspopup="true"
              >
                {entry.label}<ChevronDown size={13} className="transition-transform group-hover/nav:rotate-180" />
              </button>
              <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                <div className="overflow-hidden rounded-lg border border-ink/10 bg-canvas p-2 shadow-2xl shadow-ink/15">
                  {entry.items.map((item) => (
                    <Link key={item.id} href={item.href} className={cn("block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-ink/5 hover:text-aurora", pathname === item.href && "bg-ink/5 text-aurora")}>{item.label}</Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ReservationButton className={cn("min-h-11 px-5", isHome && "home-header-cta")} />
          <ThemeToggle className="h-11 w-11 p-0" />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ReservationButton className={cn("hidden min-h-11 px-4 sm:inline-flex", isHome && "home-header-cta")} />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-ink/20 text-ink"
            onClick={() => setMenuState({ open: !menuOpen, pathname })}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <ThemeToggle className="h-11 w-11 p-0" />
        </div>
      </div>

      <div className={cn("site-mobile-menu overflow-hidden border-t border-ink/10 transition-all duration-300 xl:hidden", menuOpen ? "max-h-[calc(100vh-76px)] opacity-100" : "max-h-0 opacity-0")}>
        <nav className="shell grid max-h-[calc(100vh-76px)] gap-1 overflow-y-auto py-4" aria-label="Mobile navigation">
          {navigation.map((entry) => entry.type === "link" ? (
            <Link key={entry.item.id} href={entry.item.href} onClick={() => setMenuState({ open: false, pathname })} className={cn("rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-ink/5", pathname === entry.item.href && "bg-ink/5 text-aurora")}>{entry.item.label}</Link>
          ) : (
            <details key={entry.label} className="group/mobile-nav">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-ink/5">
                {entry.label}<ChevronDown size={15} className="transition-transform group-open/mobile-nav:rotate-180" />
              </summary>
              <div className="ml-3 grid gap-1 border-l border-ink/10 pl-2">
                {entry.items.map((item) => <Link key={item.id} href={item.href} onClick={() => setMenuState({ open: false, pathname })} className={cn("rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-ink/5", pathname === item.href && "bg-ink/5 text-aurora")}>{item.label}</Link>)}
              </div>
            </details>
          ))}
          <ReservationButton className="mt-3 w-full" />
        </nav>
      </div>
    </header>
  );
}
