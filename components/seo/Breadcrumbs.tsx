import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumbs. The JSON-LD BreadcrumbList is emitted separately by each
 * page; Google prefers the visible trail and the markup to agree, and a real
 * trail also gives every deep page an extra internal link upward.
 */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  if (items.length < 2) return null;
  const light = tone === "light";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("border-b", light ? "border-white/15 bg-navy text-white" : "border-sand bg-cream")}
    >
      <ol className="shell flex flex-wrap items-center gap-x-2 gap-y-1 py-3 font-display text-[10px] font-semibold uppercase tracking-[0.16em]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className={light ? "text-white" : "text-navy"}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className={cn(
                      // min-w matters for CJK: two Chinese characters at 10px are ~23px wide.
                      "inline-flex min-h-[24px] min-w-[24px] items-center justify-center transition-colors",
                      light ? "text-white/60 hover:text-white" : "text-[var(--muted)] hover:text-navy"
                    )}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight size={12} className={light ? "text-white/35" : "text-sandstrong"} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
