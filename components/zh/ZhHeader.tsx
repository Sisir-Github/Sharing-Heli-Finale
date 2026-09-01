"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { COMPANY } from "@/lib/constants";
import { ZH_NAV, ZH_UI } from "@/lib/i18n/zh";
import { cn } from "@/lib/utils";

export function ZhHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-topbar hidden border-b border-white/10 lg:block">
        <div className="shell flex h-9 items-center justify-between gap-6">
          <p className="text-[11px] tracking-[0.08em]">{ZH_UI.tagline}</p>
          <div className="flex items-center gap-5 text-[11px]">
            <a href={`tel:${COMPANY.primaryPhone}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Phone size={12} /> {COMPANY.primaryPhone}
            </a>
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            <Link href="/" className="inline-flex min-h-[26px] items-center transition-colors hover:text-white" hrefLang="en">
              {ZH_UI.switchToEnglish}
            </Link>
          </div>
        </div>
      </div>

      <div className="shell grid h-[78px] grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav className="hidden items-center gap-7 lg:flex" aria-label="主导航">
          {ZH_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative inline-flex items-center py-3 text-[13px] font-medium text-white/80 transition-colors hover:text-white"
              data-active={pathname === item.href ? "true" : undefined}
            >
              <span className={cn(pathname === item.href && "text-white")}>{item.label}</span>
              {pathname === item.href ? (
                <span className="absolute inset-x-0 bottom-1 h-0.5 bg-accent" aria-hidden="true" />
              ) : null}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-btn border border-white/25 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="打开菜单"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/zh" className="col-start-2 justify-self-center" aria-label={`${ZH_UI.brand} 首页`}>
          <BrandLogo imageClassName="brand-logo-inverse h-11 sm:h-[52px]" priority />
        </Link>

        <div className="col-start-3 flex items-center justify-end gap-3">
          <Link href="/" className="hidden text-[12px] text-white/70 transition-colors hover:text-white lg:inline-flex" hrefLang="en">
            {ZH_UI.switchToEnglish}
          </Link>
          <Link href="/zh/contact" className="accent-button hidden min-h-[42px] px-5 text-[12px] tracking-[0.08em] sm:inline-flex">
            {ZH_UI.reserve}
          </Link>
          <a
            href={`tel:${COMPANY.primaryPhone}`}
            className="grid h-11 w-11 place-items-center rounded-btn border border-white/25 text-white sm:hidden"
            aria-label={`拨打 ${COMPANY.primaryPhone}`}
          >
            <Phone size={18} />
          </a>
        </div>
      </div>

      <div
        className={cn(
          "site-mobile-menu overflow-hidden border-t border-white/10 transition-all duration-300 lg:hidden",
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="shell grid gap-1 py-4" aria-label="移动端导航">
          {ZH_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-btn px-3 py-3 text-sm text-white/85 hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/" onClick={() => setOpen(false)} className="rounded-btn px-3 py-3 text-sm text-white/60 hover:bg-white/5" hrefLang="en">
            English site
          </Link>
          <Link href="/zh/contact" onClick={() => setOpen(false)} className="accent-button mt-3 w-full">
            {ZH_UI.reserve}
          </Link>
        </nav>
      </div>
    </header>
  );
}
