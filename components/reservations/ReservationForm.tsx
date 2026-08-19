"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";

import { PhoneField } from "@/components/ui/PhoneField";
import { trackEvent } from "@/lib/analytics";
import { getNepalDateInput } from "@/lib/date";

type TourOption = {
  id: string;
  slug: string;
  title: string;
  priceLabel: string;
  sharedAvailable: boolean;
  privateAvailable: boolean;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function ReservationForm({
  tours,
  selectedTourSlug,
  selectedDate
}: {
  tours: TourOption[];
  selectedTourSlug?: string;
  selectedDate?: string;
}) {
  const initialTour = tours.find((tour) => tour.slug === selectedTourSlug)?.id || "";
  const [selectedTourId, setSelectedTourId] = useState(initialTour);
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const minDate = useMemo(() => getNepalDateInput(), []);
  const selectedTour = tours.find((tour) => tour.id === selectedTourId);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const routeName = selectedTour?.title || String(data.get("customRoute") || "Custom route");

    setState("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.get("customerName"),
          customerEmail: data.get("customerEmail"),
          customerPhone: data.get("customerPhone"),
          tourId: selectedTour?.id || "",
          routeName,
          flightType: data.get("flightType"),
          preferredDate: data.get("preferredDate"),
          alternateDate: data.get("alternateDate"),
          passengers: data.get("passengers"),
          pickupPoint: data.get("pickupPoint"),
          customerNotes: data.get("customerNotes"),
          source: window.location.pathname + window.location.search,
          companyWebsite: data.get("companyWebsite")
        })
      });
      const result = (await response.json()) as { success?: boolean; message?: string; error?: string; bookingReference?: string };
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to submit the reservation request.");

      setBookingReference(result.bookingReference || "");
      setState("success");
      setFeedback(result.message || "Your reservation request was received.");
      trackEvent("reservation_submit_success", { route: routeName, flight_type: String(data.get("flightType")) });
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : "Unable to submit the reservation request.");
    }
  }

  if (state === "success") {
    return (
      <div className="border-y border-ink/10 py-10 text-center sm:py-14" role="status">
        <CheckCircle2 className="mx-auto text-aurora" size={36} />
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-normal text-ink">Request received</h2>
        <p className="copy mx-auto mt-3 max-w-xl">{feedback} The flight desk will review the route, aircraft, and fare before confirming anything.</p>
        {bookingReference ? <p className="mt-6 text-sm text-slate-500">Reference <strong className="font-semibold text-ink">{bookingReference}</strong></p> : null}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="reservation-form">
      {/* Step 1 — what you want to fly */}
      <section>
        <p className="form-step">
          <span className="form-step-number">1</span> Your flight
        </p>

        <div className="mt-4 grid gap-x-6 gap-y-5 md:grid-cols-2">
          <label className="field-label md:col-span-2">Route
            <select name="tourId" className="input mt-2" required value={selectedTourId} onChange={(event) => setSelectedTourId(event.target.value)}>
              <option value="" disabled>Select a route</option>
              {tours.map((tour) => <option key={tour.id} value={tour.id}>{tour.title}{tour.priceLabel ? ` - ${tour.priceLabel}` : ""}</option>)}
              <option value="custom">Another route</option>
            </select>
          </label>

          {selectedTourId === "custom" ? (
            <label className="field-label md:col-span-2">Requested route
              <input name="customRoute" className="input mt-2" placeholder="Departure and destination" required />
            </label>
          ) : null}

          <label className="field-label">Preferred date
            <input name="preferredDate" type="date" min={minDate} defaultValue={selectedDate} className="input mt-2" required />
          </label>
          <label className="field-label">Passengers
            <input name="passengers" type="number" min="1" max="20" className="input mt-2" placeholder="1" required />
          </label>

          <fieldset className="md:col-span-2">
            <legend className="field-label">Flight preference</legend>
            <div className="reservation-segments mt-2 grid grid-cols-3 overflow-hidden rounded-lg border border-ink/15">
              {[["SHARED", "Shared seat"], ["PRIVATE", "Private"], ["FLEXIBLE", "Flexible"]].map(([value, label]) => (
                <label key={value} className="cursor-pointer border-r border-ink/10 p-3 text-center text-xs font-semibold text-ink last:border-r-0 has-[:checked]:bg-aurora has-[:checked]:text-white">
                  <input type="radio" name="flightType" value={value} defaultChecked={value === "FLEXIBLE"} className="sr-only" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      {/* Step 2 — how to reach you */}
      <section className="mt-9 border-t border-ink/10 pt-7">
        <p className="form-step">
          <span className="form-step-number">2</span> Your details
        </p>

        <div className="mt-4 grid gap-x-6 gap-y-5 md:grid-cols-2">
          <label className="field-label">Name
            <input name="customerName" autoComplete="name" className="input mt-2" required />
          </label>
          <PhoneField name="customerPhone" label="WhatsApp number" required />
          <label className="field-label md:col-span-2">Email
            <input name="customerEmail" type="email" autoComplete="email" className="input mt-2" required />
          </label>
        </div>
      </section>

      {/* Everything optional is folded away so the default form stays short. */}
      <details className="form-optional mt-6">
        <summary className="form-optional-summary">
          Add flexible dates, pickup point or notes
          <span className="normal-case text-slate-400">(optional)</span>
        </summary>

        <div className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2">
          <label className="field-label">Alternate date
            <input name="alternateDate" type="date" min={minDate} className="input mt-2" />
          </label>
          <label className="field-label">Pickup point
            <input name="pickupPoint" className="input mt-2" placeholder="Hotel, airport, or address" />
          </label>
          <label className="field-label md:col-span-2">Notes
            <textarea name="customerNotes" className="textarea mt-2" placeholder="Baggage, mobility needs, timing, or questions" />
          </label>
        </div>
      </details>

      <input name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-7 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-slate-500">Send your request and the flight desk will come back with the available aircraft, current fare and next steps.</p>
        <button type="submit" className="inquiry-button shrink-0" disabled={state === "submitting"}>
          {state === "submitting" ? <><Loader2 size={16} className="animate-spin" /> Submitting</> : <><CalendarDays size={16} /> Submit request <ArrowRight size={16} /></>}
        </button>
      </div>

      {state === "error" ? <p role="alert" className="mt-4 text-sm text-rose-700">{feedback}</p> : null}
    </form>
  );
}
