"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarCheck, FileText, Gauge, Images, Map, Menu, Navigation, Plane, ReceiptText, Settings2, Tags } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { label: "Dashboard", href: "/admin", icon: Gauge },
  { label: "Reservations", href: "/admin/reservations", icon: CalendarCheck },
  { label: "Pricing", href: "/admin/pricing", icon: Tags },
  { label: "Tours", href: "/admin/tours", icon: Plane },
  { label: "Services", href: "/admin/services", icon: Map },
  { label: "Site content", href: "/admin/settings", icon: Settings2 },
  { label: "Navigation", href: "/admin/navigation", icon: Navigation },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Inquiries", href: "/admin/inquiries", icon: FileText },
  { label: "Invoices", href: "/admin/invoices", icon: ReceiptText },
  { label: "Media", href: "/admin/media", icon: Images }
];

function activePath(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export function AdminNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <details className="border-b border-white/10 bg-[#0a2029] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-white"><Menu size={18} /> Admin menu</summary>
        <nav className="grid grid-cols-2 gap-1 border-t border-white/10 p-3 sm:grid-cols-3" aria-label="Admin navigation">
          {items.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={cn("flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-xs text-haze", activePath(pathname, href) && "bg-aurora text-white")}>
              <Icon size={15} /> {label}
            </Link>
          ))}
        </nav>
      </details>
    );
  }

  return (
    <nav className="mt-8 grid gap-1 text-sm" aria-label="Admin navigation">
      {items.map(({ label, href, icon: Icon }) => (
        <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-haze transition hover:bg-white/10 hover:text-white", activePath(pathname, href) && "bg-aurora text-white")}>
          <Icon size={16} /> {label}
        </Link>
      ))}
    </nav>
  );
}
