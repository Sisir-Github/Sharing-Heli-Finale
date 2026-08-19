import { createDeparture, deleteDeparture, updateDeparture } from "@/app/admin/departures/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function toDateInput(value: Date) {
  return value.toISOString().slice(0, 10);
}

function DepartureFields({
  departure,
  tours
}: {
  departure?: {
    tourId: string | null;
    routeName: string;
    departureDate: Date;
    departureTime: string | null;
    seatsTotal: number;
    seatsBooked: number;
    pricePerSeat: number | null;
    currency: string;
    note: string | null;
    published: boolean;
  };
  tours: { id: string; title: string }[];
}) {
  return (
    <>
      <select name="tourId" defaultValue={departure?.tourId || ""} className="input" aria-label="Route">
        <option value="">No linked tour</option>
        {tours.map((tour) => (
          <option key={tour.id} value={tour.id}>
            {tour.title}
          </option>
        ))}
      </select>
      <input
        name="routeName"
        defaultValue={departure?.routeName}
        placeholder="Route name shown on the card"
        className="input"
        required
      />
      <input
        name="departureDate"
        type="date"
        defaultValue={departure ? toDateInput(departure.departureDate) : ""}
        className="input"
        required
      />
      <input name="departureTime" defaultValue={departure?.departureTime || ""} placeholder="Time e.g. 06:30" className="input" />
      <input
        name="seatsTotal"
        type="number"
        min="1"
        max="20"
        defaultValue={departure?.seatsTotal ?? 5}
        placeholder="Total seats"
        className="input"
        required
      />
      <input
        name="seatsBooked"
        type="number"
        min="0"
        max="20"
        defaultValue={departure?.seatsBooked ?? 0}
        placeholder="Seats booked"
        className="input"
        required
      />
      <input
        name="pricePerSeat"
        type="number"
        min="0"
        step="1"
        defaultValue={departure?.pricePerSeat ?? ""}
        placeholder="Price per seat"
        className="input"
      />
      <input name="currency" defaultValue={departure?.currency || "USD"} placeholder="Currency" className="input" />
      <input name="note" defaultValue={departure?.note || ""} placeholder="Short note (optional)" className="input md:col-span-2" />
      <label className="flex items-center gap-2 text-sm text-haze md:col-span-2">
        <input type="checkbox" name="published" defaultChecked={departure?.published ?? true} /> Show on the website
      </label>
    </>
  );
}

export default async function AdminDeparturesPage() {
  const [departures, tours] = await Promise.all([
    prisma.fixedDeparture.findMany({ orderBy: { departureDate: "asc" }, include: { tour: { select: { title: true } } } }),
    prisma.tour.findMany({ where: { published: true }, orderBy: { title: "asc" }, select: { id: true, title: true } })
  ]);

  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Fixed departures</h1>
        <p className="mt-2 text-sm text-haze">
          Scheduled shared-seat flights shown on the homepage. Past dates stop showing automatically.
        </p>
      </div>

      <form action={createDeparture} className="glass grid gap-3 rounded-2xl p-6 md:grid-cols-2">
        <p className="text-sm font-semibold text-white md:col-span-2">Add a departure</p>
        <DepartureFields tours={tours} />
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black md:col-span-2">
          Add departure
        </button>
      </form>

      <div className="grid gap-4">
        {departures.length ? (
          departures.map((departure) => {
            const isPast = departure.departureDate < today;
            return (
              <form
                key={departure.id}
                action={updateDeparture}
                className="glass grid gap-3 rounded-2xl p-4 md:grid-cols-2"
              >
                <input type="hidden" name="id" value={departure.id} />
                <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                  <p className="text-sm font-semibold text-white">
                    {departure.tour?.title || departure.routeName}
                  </p>
                  <span className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze">
                    {departure.seatsTotal - departure.seatsBooked} of {departure.seatsTotal} seats left
                  </span>
                  {isPast ? (
                    <span className="rounded-md border border-amber-400/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-amber-300">
                      Past date — hidden
                    </span>
                  ) : null}
                  {!departure.published ? (
                    <span className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze">
                      Hidden
                    </span>
                  ) : null}
                </div>

                <DepartureFields departure={departure} tours={tours} />

                <div className="flex gap-3 md:col-span-2">
                  <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white">Save</button>
                  <button
                    formAction={deleteDeparture}
                    className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </form>
            );
          })
        ) : (
          <p className="rounded-2xl border border-white/10 p-6 text-sm text-haze">
            No departures yet. Add one above and it appears on the homepage straight away.
          </p>
        )}
      </div>
    </div>
  );
}
