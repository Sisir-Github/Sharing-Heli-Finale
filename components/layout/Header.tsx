"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ReservationButton } from "@/components/ui/ReservationButton";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string; href: string };

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

  return (
    <header className={cn("site-header z-50 border-b border-ink/10 text-ink backdrop-blur-xl transition-colors duration-300", isHome ? "site-header-home fixed inset-x-0 top-0" : "sticky top-0")}>
      <div className="shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="group flex shrink-0 items-center" aria-label={`${settings?.brandName || "Sharing Heli"} home`}>
          <BrandLogo src={settings?.logoImage} imageClassName="h-12 sm:h-[52px]" />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.id} href={item.href} className={cn("border-b border-transparent py-2 text-[12px] font-semibold text-slate-700 transition-colors hover:text-aurora", pathname === item.href && "border-aurora text-ink")}>{item.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ReservationButton className={cn("min-h-11 px-5", isHome && "home-header-cta")} />
          <ThemeToggle className="h-11 w-11 p-0" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
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

      <div className={cn("site-mobile-menu overflow-hidden border-t border-ink/10 transition-all duration-300 xl:hidden", menuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0")}>
        <nav className="shell grid gap-1 py-4" aria-label="Mobile navigation">
          {navItems.map((item) => <Link key={item.id} href={item.href} onClick={() => setMenuState({ open: false, pathname })} className={cn("rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-ink/5", pathname === item.href && "bg-ink/5 text-aurora")}>{item.label}</Link>)}
          <ReservationButton className="mt-3 w-full" />
        </nav>
      </div>
    </header>
  );
}
