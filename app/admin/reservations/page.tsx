import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { CalendarDays, Download, Plus, Search } from "lucide-react";

import { createManualReservation, updateReservation } from "@/app/admin/reservations/actions";
import { prisma } from "@/lib/prisma";
import { FLIGHT_TYPES, formatFlightType, formatReservationStatus, PAYMENT_STATUSES, RESERVATION_STATUSES, toDateInput } from "@/lib/reservations";

export const dynamic = "force-dynamic";

function money(value: number | null, currency: string) {
  if (value == null) return "Not quoted";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

function statusClass(status: string) {
  if (status === "CONFIRMED" || status === "COMPLETED") return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  if (status === "CANCELLED") return "border-rose-400/25 bg-rose-400/10 text-rose-200";
  if (status === "QUOTED" || status === "AWAITING_PAYMENT") return "border-sky-400/25 bg-sky-400/10 text-sky-200";
  return "border-white/15 bg-white/5 text-slate-200";
}

export default async function AdminReservationsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const filters = await searchParams;
  const selectedStatus = RESERVATION_STATUSES.includes(filters.status as (typeof RESERVATION_STATUSES)[number]) ? filters.status : "";
  const query = filters.q?.trim() || "";
  const where: Prisma.ReservationWhereInput = {
    ...(selectedStatus ? { status: selectedStatus } : {}),
    ...(query ? {
      OR: [
        { bookingReference: { contains: query } },
        { customerName: { contains: query } },
        { customerEmail: { contains: query } },
        { customerPhone: { contains: query } },
        { routeName: { contains: query } }
      ]
    } : {})
  };

  const [reservations, grouped] = await Promise.all([
    prisma.reservation.findMany({ where, orderBy: { createdAt: "desc" }, take: 200, include: { tour: { select: { title: true } } } }),
    prisma.reservation.groupBy({ by: ["status"], _count: { _all: true } })
  ]);
  const counts = new Map(grouped.map((item) => [item.status, item._count._all]));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora">Operations</p>
          <h1 className="mt-2 font-display text-3xl text-white">Reservations</h1>
          <p className="mt-2 text-sm text-haze">Manage requests from first review through payment and completed flight.</p>
        </div>
        <Link href="/admin/reservations/export" className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white"><Download size={16} /> Export CSV</Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {RESERVATION_STATUSES.map((status) => (
          <Link key={status} href={`/admin/reservations?status=${status}`} className={`rounded-lg border p-4 ${selectedStatus === status ? "border-aurora bg-aurora/10" : "border-white/10 bg-white/[0.03]"}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-haze">{formatReservationStatus(status)}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{counts.get(status) || 0}</p>
          </Link>
        ))}
      </div>

      <form className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:flex-row" action="/admin/reservations">
        <label className="relative flex-1">
          <Search size={16} className="absolute left-3 top-3.5 text-haze" />
          <input name="q" defaultValue={query} className="input pl-10" placeholder="Search reference, customer, phone, or route" />
        </label>
        <select name="status" defaultValue={selectedStatus} className="input sm:max-w-56">
          <option value="">All statuses</option>
          {RESERVATION_STATUSES.map((status) => <option key={status} value={status}>{formatReservationStatus(status)}</option>)}
        </select>
        <button className="rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white">Filter</button>
      </form>

      <details className="rounded-lg border border-white/10 bg-white/[0.03]">
        <summary className="flex cursor-pointer list-none items-center gap-2 p-5 text-sm font-semibold text-white"><Plus size={17} /> Add phone or walk-in reservation</summary>
        <form action={createManualReservation} className="grid gap-3 border-t border-white/10 p-5 md:grid-cols-2 xl:grid-cols-4">
          <input name="customerName" className="input" placeholder="Customer name" required />
          <input name="customerEmail" type="email" className="input" placeholder="Email" required />
          <input name="customerPhone" className="input" placeholder="Phone" required />
          <input name="routeName" className="input" placeholder="Route" required />
          <select name="flightType" className="input" defaultValue="FLEXIBLE">{FLIGHT_TYPES.map((type) => <option key={type} value={type}>{formatFlightType(type)}</option>)}</select>
          <input name="preferredDate" type="date" className="input" required />
          <input name="passengers" type="number" min="1" max="20" className="input" placeholder="Passengers" required />
          <input name="customerNotes" className="input" placeholder="Notes" />
          <button className="rounded-lg bg-aurora px-5 py-3 text-sm font-semibold text-white md:col-span-2 xl:col-span-4 xl:justify-self-end">Create reservation</button>
        </form>
      </details>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
        {reservations.length ? reservations.map((reservation) => (
          <details key={reservation.id} className="group border-b border-white/10 last:border-b-0">
            <summary className="grid cursor-pointer list-none gap-4 p-5 md:grid-cols-[1.1fr_1fr_0.8fr_auto] md:items-center lg:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${statusClass(reservation.status)}`}>{formatReservationStatus(reservation.status)}</span>
                  <span className="text-xs font-semibold text-aurora">{reservation.bookingReference}</span>
                </div>
                <p className="mt-2 font-semibold text-white">{reservation.customerName}</p>
                <p className="mt-1 text-xs text-haze">{reservation.customerPhone} · {reservation.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{reservation.routeName}</p>
                <p className="mt-1 text-xs text-haze">{formatFlightType(reservation.flightType)} · {reservation.passengers} passenger{reservation.passengers === 1 ? "" : "s"}</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-sm text-white"><CalendarDays size={15} className="text-aurora" /> {reservation.preferredDate.toLocaleDateString("en-GB", { dateStyle: "medium" })}</p>
                <p className="mt-1 text-xs text-haze">{money(reservation.quotedAmount, reservation.currency)}</p>
              </div>
              <span className="text-xs font-semibold text-haze group-open:text-aurora">Manage</span>
            </summary>

            <form action={updateReservation} className="border-t border-white/10 bg-black/10 p-5 lg:p-6">
              <input type="hidden" name="id" value={reservation.id} />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="grid gap-2 text-xs text-haze">Reservation status
                  <select name="status" defaultValue={reservation.status} className="input">{RESERVATION_STATUSES.map((status) => <option key={status} value={status}>{formatReservationStatus(status)}</option>)}</select>
                </label>
                <label className="grid gap-2 text-xs text-haze">Payment status
                  <select name="paymentStatus" defaultValue={reservation.paymentStatus} className="input">{PAYMENT_STATUSES.map((status) => <option key={status} value={status}>{formatReservationStatus(status)}</option>)}</select>
                </label>
                <label className="grid gap-2 text-xs text-haze">Confirmed flight date
                  <input name="confirmedDate" type="date" defaultValue={toDateInput(reservation.confirmedDate)} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze">Aircraft / operator
                  <input name="assignedAircraft" defaultValue={reservation.assignedAircraft || ""} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze">Quoted amount
                  <input name="quotedAmount" type="number" min="0" step="0.01" defaultValue={reservation.quotedAmount ?? ""} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze">Deposit received
                  <input name="depositAmount" type="number" min="0" step="0.01" defaultValue={reservation.depositAmount ?? ""} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze">Currency
                  <input name="currency" maxLength={3} defaultValue={reservation.currency} className="input" required />
                </label>
                <label className="grid gap-2 text-xs text-haze">Pickup point
                  <input name="pickupPoint" defaultValue={reservation.pickupPoint || ""} className="input" />
                </label>
                <label className="grid gap-2 text-xs text-haze md:col-span-2 xl:col-span-4">Internal operations notes
                  <textarea name="adminNotes" defaultValue={reservation.adminNotes || ""} className="textarea" placeholder="Aircraft hold, operator contact, payload, payment, or follow-up notes" />
                </label>
              </div>
              {reservation.customerNotes ? <p className="mt-4 border-l-2 border-aurora pl-4 text-sm leading-6 text-slate-300"><strong className="text-white">Customer note:</strong> {reservation.customerNotes}</p> : null}
              <div className="mt-5 flex justify-end"><button className="rounded-lg bg-aurora px-5 py-2.5 text-sm font-semibold text-white">Save reservation</button></div>
            </form>
          </details>
        )) : <p className="p-8 text-center text-sm text-haze">No reservations match these filters.</p>}
      </div>
    </div>
  );
}
