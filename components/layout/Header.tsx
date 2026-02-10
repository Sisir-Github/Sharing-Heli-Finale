"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { cn } from "@/lib/utils";

type HeaderSettings = {
  brandName: string;
};

type NavItem = { id: string; label: string; href: string };

export function Header({
  settings,
  navItems
}: {
  settings: HeaderSettings | null;
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const fallbackSettings = useMemo(
    () => ({
      brandName: "Sharing Heli"
    }),
    []
  );

  const resolvedSettings = settings ?? fallbackSettings;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-50 transition-all duration-500",
        isTransparent ? "border-transparent bg-transparent" : "border-b border-white/10 bg-midnight/86 shadow-luxe backdrop-blur-xl"
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={resolvedSettings.brandName}>
          <div className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-sm font-semibold text-gold transition-colors group-hover:bg-gold/20">
            SH
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg text-white">{resolvedSettings.brandName}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-haze/90">Luxury Helicopter Services</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide text-haze transition-colors hover:text-white",
                pathname === item.href && "text-gold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <InquiryButton />
          <ThemeToggle className="h-12 w-12 p-0" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="h-11 w-11 p-0" />
          <button
            type="button"
            className="rounded-full border border-white/25 bg-white/10 p-2 text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-storm/95 px-4 transition-all duration-300 md:hidden",
          menuOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        )}
      >
        <nav className="shell grid gap-3" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium text-haze transition-colors hover:bg-white/10 hover:text-white",
                pathname === item.href && "bg-gold/10 text-gold"
              )}
            >
              {item.label}
            </Link>
          ))}
          <InquiryButton className="w-full" />
        </nav>
      </div>
    </header>
  );
}
