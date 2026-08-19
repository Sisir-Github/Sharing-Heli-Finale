"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarCheck, CalendarRange, FileText, Gauge, Images, Map, Menu, MessageSquareQuote, Navigation, Plane, ReceiptText, Settings2, Tags, Users } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Grouped by how often the desk actually uses each screen: bookings every day,
 * the catalogue when prices or routes change, the website rarely.
 */
const groups = [
  {
    label: "Every day",
    items: [
      { label: "Dashboard", href: "/admin", icon: Gauge },
      { label: "Reservations", href: "/admin/reservations", icon: CalendarCheck },
      { label: "Inquiries", href: "/admin/inquiries", icon: FileText },
      { label: "Invoices", href: "/admin/invoices", icon: ReceiptText }
    ]
  },
  {
    label: "What we sell",
    items: [
      { label: "Tours", href: "/admin/tours", icon: Plane },
      { label: "Fixed departures", href: "/admin/departures", icon: CalendarRange },
      { label: "Pricing", href: "/admin/pricing", icon: Tags },
      { label: "Services", href: "/admin/services", icon: Map }
    ]
  },
  {
    label: "Website",
    items: [
      { label: "Site content", href: "/admin/settings", icon: Settings2 },
      { label: "Team", href: "/admin/team", icon: Users },
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
      { label: "Navigation", href: "/admin/navigation", icon: Navigation },
      { label: "Blog", href: "/admin/blog", icon: BookOpen },
      { label: "Media", href: "/admin/media", icon: Images }
    ]
  }
];

const allItems = groups.flatMap((group) => group.items);

function activePath(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export function AdminNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  if (mobile) {
    const current = allItems.find((item) => activePath(pathname, item.href));

    return (
      <details className="border-b border-white/10 bg-[#0a2029] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-white">
          <Menu size={18} /> {current?.label || "Admin menu"}
        </summary>
        <nav className="border-t border-white/10 p-3" aria-label="Admin navigation">
          {groups.map((group) => (
            <div key={group.label} className="mb-3 last:mb-0">
              <p className="px-1 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-haze">{group.label}</p>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {group.items.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-xs text-haze",
                      activePath(pathname, href) && "bg-aurora text-white"
                    )}
                  >
                    <Icon size={15} /> {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </details>
    );
  }

  return (
    <nav className="mt-8 grid gap-6 text-sm" aria-label="Admin navigation">
      {groups.map((group) => (
        <div key={group.label} className="grid gap-1">
          <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-haze">{group.label}</p>
          {group.items.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-haze transition hover:bg-white/10 hover:text-white",
                activePath(pathname, href) && "bg-aurora text-white"
              )}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
