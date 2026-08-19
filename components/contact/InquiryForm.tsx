"use client";

import { FormEvent, useMemo, useState } from "react";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics";
import { COMPANY } from "@/lib/constants";

type InquiryState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  companyWebsite: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

type InquiryFormProps = {
  defaultService?: string;
  showMap?: boolean;
  services: string[];
  contactSettings: {
    primaryPhone: string;
    whatsappNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4?: string | null;
  };
};

export function InquiryForm({
  defaultService = "General Inquiry",
  showMap = false,
  services,
  contactSettings
}: InquiryFormProps) {
  const serviceOptions = useMemo(() => (services.length ? services : ["General Inquiry"]), [services]);
  const initialService = useMemo(() => {
    if (serviceOptions.includes(defaultService)) {
      return defaultService;
    }
    return serviceOptions[0];
  }, [defaultService, serviceOptions]);

  const [formData, setFormData] = useState<InquiryState>({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    message: "",
    companyWebsite: ""
  });
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          pageSource: window.location.pathname
        })
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.success) {
        setStatus({
          type: "error",
          message: result.error || "Unable to submit inquiry right now. Please try WhatsApp for immediate support."
        });
        return;
      }

      trackEvent("inquiry_submit_success", {
        service: formData.service
      });

      setStatus({
        type: "success",
        message: result.message || "Inquiry submitted successfully. Our team will contact you shortly."
      });
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        message: "",
        companyWebsite: ""
      }));
    } catch {
      setStatus({
        type: "error",
        message: `Connection error. Please contact us on WhatsApp ${contactSettings.whatsappNumber}.`
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="inquiry" className="band band-cream">
      <Reveal className="shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="space-y-5">
          <article className="surface-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rhododendron">Direct coordination</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-normal text-ink">Pokhara operations desk</h2>
              <p className="copy mt-3">
                Speak with our team for charter planning, tour availability, urgent coordination, and custom flight requests.
              </p>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p className="inline-flex items-center gap-2"><Phone size={15} /> {contactSettings.primaryPhone}</p>
              <p className="inline-flex items-center gap-2"><Phone size={15} /> WhatsApp {contactSettings.whatsappNumber}</p>
              <p className="inline-flex items-center gap-2"><Mail size={15} /> {contactSettings.email}</p>
              <a
                href={COMPANY.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-2 transition-colors hover:text-aurora"
              >
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>{contactSettings.addressLine1}, {contactSettings.addressLine2}, {contactSettings.addressLine3}{contactSettings.addressLine4 ? `, ${contactSettings.addressLine4}` : ""}</span>
              </a>
            </div>

            <a
              href={`https://wa.me/${contactSettings.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="outline-button mt-6"
              onClick={() => trackEvent("whatsapp_click", { placement: "contact_form_sidebar" })}
            >
              WhatsApp Priority
            </a>
          </article>

          <article className="surface-card p-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-rhododendron"><ShieldCheck size={14} /> Before you book</p>
            <ul className="copy mt-3 space-y-2 text-sm">
              <li>Weather and route details confirmed before departure</li>
              <li>Passenger and baggage requirements explained clearly</li>
              <li>Operating details reviewed before payment</li>
              <li>Emergency requests handled as coordination, not a guarantee</li>
            </ul>
          </article>

          {showMap ? (
            <article className="surface-card p-2">
              <iframe
                title="Pokhara Flight Centre Tours and Travel location"
                src={COMPANY.googleMapsEmbedUrl}
                className="h-64 w-full rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={COMPANY.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-semibold text-aurora transition-colors hover:text-ink"
              >
                <MapPin size={16} /> Open in Google Maps
              </a>
            </article>
          ) : null}
        </aside>

        <div className="surface-card p-6 sm:p-8">
          <h3 className="font-display text-3xl font-semibold tracking-normal text-ink">Flight inquiry form</h3>
          <p className="copy mt-3">
            Share your route, date, passenger count, and questions. We will reply with practical next steps.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <input
              className="hidden"
              type="text"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={formData.companyWebsite}
              onChange={(event) => setFormData((prev) => ({ ...prev, companyWebsite: event.target.value }))}
            />

            <label className="grid gap-2 text-sm font-medium text-slate-600">
              Full Name
              <input
                required
                autoComplete="name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                className="input"
                placeholder="Your full name"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-600">
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="input"
                  placeholder="you@example.com"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-600">
                Phone
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  className="input"
                  placeholder="+977-98XXXXXXXX"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-600">
              Service
              <select
                value={formData.service}
                onChange={(event) => setFormData((prev) => ({ ...prev, service: event.target.value }))}
                className="input"
              >
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-600">
              Message
              <textarea
                required
                minLength={15}
                rows={5}
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                className="textarea"
                placeholder="Share travel date, passenger count, route preference, and special requests."
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inquiry-button mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending inquiry..." : "Send inquiry"}
            </button>

            {status.type !== "idle" ? (
              <p
                className={`rounded-lg border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-500/25 bg-emerald-50 text-emerald-700"
                    : "border-rose-500/25 bg-rose-50 text-rose-700"
                }`}
                role={status.type === "error" ? "alert" : "status"}
              >
                {status.message}
              </p>
            ) : null}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
