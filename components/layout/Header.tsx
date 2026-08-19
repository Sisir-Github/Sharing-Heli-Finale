"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Facebook, Instagram, Menu, Phone, X, Youtube } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { COMPANY } from "@/lib/constants";
import { TOUR_REGION_CONTENT, type TourRegion } from "@/lib/tours/regions";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string; href: string; groupLabel?: string | null };

type NavEntry =
  | { type: "link"; item: NavItem }
  | { type: "group"; label: string; items: NavItem[] };

type TourMenuItem = {
  id: string;
  title: string;
  href: string;
  region: TourRegion;
  sortOrder: number;
};

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube
};

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
  navItems,
  tourMenuItems
}: {
  settings: { brandName: string; logoImage?: string | null } | null;
  navItems: NavItem[];
  tourMenuItems: TourMenuItem[];
}) {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const menuOpen = menuState.open && menuState.pathname === pathname;
  const navigation = buildNavigation(navItems);
  const tourGroups = TOUR_REGION_CONTENT.map((region) => ({
    ...region,
    items: tourMenuItems
      .filter((tour) => tour.region === region.id)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title))
  }));
  const isTourNavigationActive = pathname === "/tours" || tourMenuItems.some((tour) => pathname === tour.href);
  const closeMenu = () => setMenuState({ open: false, pathname });

  return (
    <header className="site-header sticky top-0 z-50">
      {/* Utility strip */}
      <div className="site-topbar hidden border-b border-white/10 lg:block">
        <div className="shell flex h-9 items-center justify-between gap-6">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em]">
            {COMPANY.tagline}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY.primaryPhone}`}
              className="inline-flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-white"
            >
              <Phone size={12} /> {COMPANY.primaryPhone}
            </a>
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            <div className="flex items-center gap-3">
              {COMPANY.socialLinks.map((link) => {
                const Icon = socialIcons[link.label.toLowerCase() as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="transition-colors hover:text-white"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main bar: nav left · logo centre · action right */}
      <div className="shell grid h-[78px] grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
          {navigation.map((entry) =>
            entry.type === "link" && entry.item.href === "/tours" && tourMenuItems.length ? (
              <div key={entry.item.id} className="group/nav relative">
                <Link
                  href={entry.item.href}
                  className="site-nav-link"
                  data-active={isTourNavigationActive ? "true" : undefined}
                  aria-haspopup="true"
                >
                  {entry.item.label}
                  <ChevronDown size={12} className="transition-transform group-hover/nav:rotate-180" />
                </Link>
                <div className="pointer-events-none invisible fixed left-1/2 top-[116px] z-[60] w-[min(1140px,calc(100vw-2rem))] -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                  <div className="nav-panel max-h-[calc(100vh-140px)] overflow-y-auto">
                    <div className="flex items-center justify-between gap-5 border-b border-sand px-6 py-4">
                      <div>
                        <p className="eyebrow">All published routes</p>
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          Compare {tourMenuItems.length} helicopter tours across Nepal.
                        </p>
                      </div>
                      <Link href="/tours" className="editorial-link shrink-0">
                        View all heli tours
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-sand">
                      {tourGroups.map((region) => (
                        <section key={region.id} className="min-w-0 p-5">
                          <div className="flex items-baseline justify-between gap-3 border-b border-sand pb-3">
                            <h2 className="font-display text-base font-semibold text-navy">{region.label}</h2>
                            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                              {region.items.length} tours
                            </span>
                          </div>
                          <div className="mt-2 grid gap-0.5">
                            {region.items.map((tour) => (
                              <Link
                                key={tour.id}
                                href={tour.href}
                                className={cn(
                                  "rounded-btn px-2 py-1.5 text-[13px] font-medium leading-5 text-[var(--muted)] transition-colors hover:bg-cream hover:text-navy",
                                  pathname === tour.href && "bg-cream text-navy"
                                )}
                              >
                                {tour.title}
                              </Link>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : entry.type === "link" ? (
              <Link
                key={entry.item.id}
                href={entry.item.href}
                className="site-nav-link"
                data-active={pathname === entry.item.href ? "true" : undefined}
              >
                {entry.item.label}
              </Link>
            ) : (
              <div key={entry.label} className="group/nav relative">
                <button
                  type="button"
                  className="site-nav-link"
                  data-active={entry.items.some((item) => pathname === item.href) ? "true" : undefined}
                  aria-haspopup="true"
                >
                  {entry.label}
                  <ChevronDown size={12} className="transition-transform group-hover/nav:rotate-180" />
                </button>
                <div className="pointer-events-none invisible absolute left-0 top-full z-50 w-64 pt-3 opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                  <div className="nav-panel p-2">
                    {entry.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          "block rounded-btn px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-cream hover:text-navy",
                          pathname === item.href && "bg-cream text-navy"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-btn border border-white/25 text-white xl:hidden"
          onClick={() => setMenuState({ open: !menuOpen, pathname })}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link
          href="/"
          className="col-start-2 justify-self-center"
          aria-label={`${settings?.brandName || COMPANY.brandName} home`}
        >
          <BrandLogo src={settings?.logoImage} imageClassName="brand-logo-inverse h-11 sm:h-[52px]" priority />
        </Link>

        <div className="col-start-3 flex items-center justify-end gap-3">
          <ReservationButton variant="accent" className="hidden min-h-[42px] px-5 sm:inline-flex" label="Reserve a flight" />
          <a
            href={`tel:${COMPANY.primaryPhone}`}
            className="grid h-11 w-11 place-items-center rounded-btn border border-white/25 text-white sm:hidden"
            aria-label={`Call ${COMPANY.primaryPhone}`}
          >
            <Phone size={18} />
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "site-mobile-menu overflow-hidden border-t border-white/10 transition-all duration-300 xl:hidden",
          menuOpen ? "max-h-[calc(100vh-78px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="shell grid max-h-[calc(100vh-78px)] gap-1 overflow-y-auto py-4" aria-label="Mobile navigation">
          {navigation.map((entry) =>
            entry.type === "link" && entry.item.href === "/tours" && tourMenuItems.length ? (
              <details key={entry.item.id} className="group/mobile-nav">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-btn px-3 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 hover:bg-white/5">
                  {entry.item.label}
                  <ChevronDown size={15} className="transition-transform group-open/mobile-nav:rotate-180" />
                </summary>
                <div className="ml-3 grid gap-4 border-l border-white/15 pb-3 pl-3">
                  <Link href="/tours" onClick={closeMenu} className="rounded-btn bg-white/10 px-3 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    View all heli tours
                  </Link>
                  {tourGroups.map((region) => (
                    <section key={region.id}>
                      <h2 className="px-3 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        {region.label}
                      </h2>
                      <div className="mt-1 grid gap-0.5">
                        {region.items.map((tour) => (
                          <Link
                            key={tour.id}
                            href={tour.href}
                            onClick={closeMenu}
                            className={cn(
                              "rounded-btn px-3 py-2 text-sm font-medium leading-5 text-white/70 hover:bg-white/5",
                              pathname === tour.href && "bg-white/5 text-accent"
                            )}
                          >
                            {tour.title}
                          </Link>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </details>
            ) : entry.type === "link" ? (
              <Link
                key={entry.item.id}
                href={entry.item.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-btn px-3 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 hover:bg-white/5",
                  pathname === entry.item.href && "bg-white/5 text-accent"
                )}
              >
                {entry.item.label}
              </Link>
            ) : (
              <details key={entry.label} className="group/mobile-nav">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-btn px-3 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 hover:bg-white/5">
                  {entry.label}
                  <ChevronDown size={15} className="transition-transform group-open/mobile-nav:rotate-180" />
                </summary>
                <div className="ml-3 grid gap-1 border-l border-white/15 pl-2">
                  {entry.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "rounded-btn px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5",
                        pathname === item.href && "bg-white/5 text-accent"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            )
          )}

          <div className="mt-3 grid gap-2 border-t border-white/10 pt-4">
            <ReservationButton variant="accent" className="w-full" label="Reserve a flight" />
            <a href={`tel:${COMPANY.primaryPhone}`} className="outline-button w-full">
              Call the flight desk
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
