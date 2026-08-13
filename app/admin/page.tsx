import Link from "next/link";
import { ArrowUpRight, CalendarCheck, FileText, Plane, Tags } from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [services, tours, posts, inquiries, reservations, invoices, media] = await Promise.all([
    prisma.service.count(),
    prisma.tour.count(),
    prisma.blogPost.count(),
    prisma.inquiryLead.count(),
    prisma.reservation.count(),
    prisma.invoice.count(),
    prisma.mediaAsset.count()
  ]);

  const cards = [
    { label: "Reservations", value: reservations, href: "/admin/reservations", icon: CalendarCheck },
    { label: "Tour prices", value: tours, href: "/admin/pricing", icon: Tags },
    { label: "Tours", value: tours, href: "/admin/tours", icon: Plane },
    { label: "Inquiries", value: inquiries, href: "/admin/inquiries", icon: FileText }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-haze">Reservations, pricing, and customer-facing content in one workspace.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link key={label} href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-aurora/50 hover:bg-white/[0.06]">
            <div className="flex items-start justify-between"><Icon size={18} className="text-aurora" /><ArrowUpRight size={15} className="text-haze" /></div>
            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-haze">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          </Link>
        ))}
      </div>

      <div className="border-t border-white/10 pt-7">
        <h2 className="text-sm font-semibold text-white">Content inventory</h2>
        <p className="mt-3 text-sm leading-6 text-haze">{services} services · {posts} blog posts · {invoices} invoices · {media} media assets</p>
      </div>
    </div>
  );
}
