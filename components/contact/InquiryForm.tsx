"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics";

type InquiryState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  companyWebsite: string;
  pageSource: string;
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
    companyWebsite: "",
    pageSource: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({ ...prev, pageSource: window.location.pathname }));
    }
  }, []);
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
        body: JSON.stringify(formData)
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
        companyWebsite: "",
        pageSource: ""
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
    <section id="inquiry" className="section-space pt-6">
      <Reveal className="shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="space-y-5">
          <article className="glass rounded-3xl p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Direct Coordination</p>
            <h2 className="mt-3 font-display text-3xl text-white">24/7 Operations Desk</h2>
              <p className="copy mt-3">
                Speak with our team for charter planning, tour schedules, rescue coordination, and premium mission support.
              </p>

            <div className="mt-6 space-y-3 text-sm text-slate-100">
              <p className="inline-flex items-center gap-2"><Phone size={15} /> {contactSettings.primaryPhone}</p>
              <p className="inline-flex items-center gap-2"><Phone size={15} /> WhatsApp {contactSettings.whatsappNumber}</p>
              <p className="inline-flex items-center gap-2"><Mail size={15} /> {contactSettings.email}</p>
              <p className="inline-flex items-start gap-2"><MapPin size={15} className="mt-0.5" /> {contactSettings.addressLine1}, {contactSettings.addressLine2}, {contactSettings.addressLine3}{contactSettings.addressLine4 ? `, ${contactSettings.addressLine4}` : ""}</p>
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

          <article className="glass rounded-3xl p-6">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold"><ShieldCheck size={14} /> Trust Signals</p>
            <ul className="copy mt-3 space-y-2 text-sm">
              <li>Government-regulation compliant operations</li>
              <li>Certified crew and experienced mountain pilots</li>
              <li>International traveler-ready support workflow</li>
              <li>Rapid emergency mission coordination</li>
            </ul>
          </article>

          {showMap ? (
            <article className="glass rounded-3xl p-2">
              <iframe
                title="Sharing Heli Nepal Location"
                src="https://www.google.com/maps?q=Lakeside-6%2C%2015%20Street%20No.%2C%20Pokhara%2033700%2C%20Kaski%2C%20Gandaki%20Province%2C%20Nepal&output=embed"
                className="h-64 w-full rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </article>
          ) : null}
        </aside>

        <div className="glass rounded-[1.8rem] p-6 sm:p-8">
          <h3 className="font-display text-3xl text-white">Premium Inquiry Form</h3>
          <p className="copy mt-3">
            Share your travel goals and route preference. We will send a tailored response with practical next steps.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4" noValidate>
            <input
              className="hidden"
              type="text"
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={formData.companyWebsite}
              onChange={(event) => setFormData((prev) => ({ ...prev, companyWebsite: event.target.value }))}
            />

            <label className="grid gap-2 text-sm text-haze">
              Full Name
              <input
                required
                autoComplete="name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora"
                placeholder="Your full name"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-haze">
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora"
                  placeholder="you@example.com"
                />
              </label>

              <label className="grid gap-2 text-sm text-haze">
                Phone
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora"
                  placeholder="+977-98XXXXXXXX"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-haze">
              Service
              <select
                value={formData.service}
                onChange={(event) => setFormData((prev) => ({ ...prev, service: event.target.value }))}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora"
              >
                {serviceOptions.map((service) => (
                  <option key={service} value={service} className="bg-midnight text-white">
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-haze">
              Message
              <textarea
                required
                minLength={15}
                rows={5}
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-aurora"
                placeholder="Share travel date, passenger count, route preference, and special requests."
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inquiry-button mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting Inquiry..." : "Inquiry Now"}
            </button>

            {status.type !== "idle" ? (
              <p
                className={`rounded-xl border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-400/35 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-400/35 bg-rose-500/10 text-rose-200"
                }`}
                role="status"
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
