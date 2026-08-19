import Link from "next/link";
import { ArrowUpRight, CalendarCheck, FileText, Plane, Tags } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getTourPricePresentation } from "@/lib/tours/pricing";

export const dynamic = "force-dynamic";

function formatDate(value: Date) {
  return value.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function AdminDashboard() {
  const [pendingReservations, newInquiries, tours, recentReservations, recentInquiries] = await Promise.all([
    prisma.reservation.count({ where: { status: "PENDING" } }),
    prisma.inquiryLead.count({ where: { status: "new" } }),
    prisma.tour.findMany({
      select: {
        id: true,
        priceMode: true,
        currency: true,
        sharedPriceFrom: true,
        privateCharterPrice: true,
        priceValidFrom: true,
        priceValidUntil: true,
        lastVerifiedAt: true,
        pricingNote: true
      }
    }),
    prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, bookingReference: true, customerName: true, routeName: true, preferredDate: true, status: true }
    }),
    prisma.inquiryLead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, service: true, createdAt: true, status: true }
    })
  ]);

  // A price the public site will show as "on request" rather than a real fare.
  const unverifiedPrices = tours.filter((tour) => !getTourPricePresentation(tour).isVerified).length;

  const attention = [
    {
      label: "Pending reservations",
      value: pendingReservations,
      href: "/admin/reservations",
      icon: CalendarCheck,
      hint: pendingReservations ? "Awaiting your confirmation" : "Nothing waiting"
    },
    {
      label: "New inquiries",
      value: newInquiries,
      href: "/admin/inquiries",
      icon: FileText,
      hint: newInquiries ? "Not yet answered" : "All handled"
    },
    {
      label: "Prices to verify",
      value: unverifiedPrices,
      href: "/admin/pricing",
      icon: Tags,
      hint: unverifiedPrices ? "Showing as 'on request'" : "All fares current"
    },
    {
      label: "Published tours",
      value: tours.length,
      href: "/admin/tours",
      icon: Plane,
      hint: "Routes in the catalogue"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-haze">What needs attention today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {attention.map(({ label, value, href, icon: Icon, hint }) => (
          <Link
            key={label}
            href={href}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-aurora/50 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between">
              <Icon size={18} className={value > 0 ? "text-aurora" : "text-haze"} />
              <ArrowUpRight size={15} className="text-haze" />
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-haze">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-1.5 text-xs text-haze">{hint}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Latest reservations</h2>
            <Link href="/admin/reservations" className="text-xs text-aurora hover:underline">View all</Link>
          </div>

          {recentReservations.length ? (
            <ul className="mt-4 grid gap-2.5">
              {recentReservations.map((reservation) => (
                <li key={reservation.id} className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-white">{reservation.customerName}</p>
                    <p className="truncate text-xs text-haze">
                      {reservation.routeName} · {formatDate(reservation.preferredDate)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-haze">
                    {reservation.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-haze">No reservations yet.</p>
          )}
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Latest inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs text-aurora hover:underline">View all</Link>
          </div>

          {recentInquiries.length ? (
            <ul className="mt-4 grid gap-2.5">
              {recentInquiries.map((inquiry) => (
                <li key={inquiry.id} className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-white">{inquiry.name}</p>
                    <p className="truncate text-xs text-haze">
                      {inquiry.service} · {formatDate(inquiry.createdAt)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-haze">
                    {inquiry.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-haze">No inquiries yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
