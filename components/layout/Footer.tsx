import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, MessageCircleMore, Phone, Youtube } from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { getFooterGroups, getSiteSettings } from "@/lib/cms";
import { COMPANY } from "@/lib/constants";
import { isSafePublicHref } from "@/lib/safe-url";

const fallbackGroups = [
  {
    id: "tours",
    title: "Helicopter Tours",
    links: [
      { id: "shared", label: "Shared Helicopter Flights", href: "/helicopter-tours/shared-helicopter-flights" },
      { id: "everest", label: "Everest Region", href: "/everest-base-camp-helicopter-tour-nepal" },
      { id: "annapurna", label: "Annapurna Region", href: "/annapurna-base-camp-helicopter-tour-nepal" },
      { id: "muktinath", label: "Muktinath", href: "/muktinath-helicopter-tour-nepal" }
    ]
  },
  {
    id: "planning",
    title: "Plan A Flight",
    links: [
      { id: "availability", label: "Reserve a Flight", href: "/check-availability" },
      { id: "charter", label: "Private Charter", href: "/helicopter-charter-nepal" },
      { id: "safety", label: "Safety & Flight Information", href: "/safety-flight-information" },
      { id: "about", label: "About Sharing Heli", href: "/about-us" },
      { id: "articles", label: "Travel Guides", href: "/blog" },
      { id: "contact", label: "Contact Operations", href: "/contact" }
    ]
  }
];

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube
};

export async function Footer() {
  const [settings, groups] = await Promise.all([getSiteSettings(), getFooterGroups()]);
  const resolved = {
    companyName: settings?.companyName || COMPANY.companyName,
    brandName: settings?.brandName || COMPANY.brandName,
    tagline: settings?.tagline || COMPANY.tagline,
    primaryPhone: settings?.primaryPhone || COMPANY.primaryPhone,
    whatsappNumber: settings?.whatsappNumber || COMPANY.whatsappNumber,
    email: settings?.email || COMPANY.inquiryEmail,
    addressLine1: settings?.addressLine1 || COMPANY.address.line1,
    addressLine2: settings?.addressLine2 || COMPANY.address.line2,
    addressLine3: settings?.addressLine3 || COMPANY.address.line3,
    addressLine4: settings?.addressLine4 || COMPANY.address.country
  };
  const footerGroups = groups.length ? groups.slice(0, 2) : fallbackGroups;
  const whatsappHref = `https://wa.me/${resolved.whatsappNumber.replace(/[^\d]/g, "")}`;
  const socialLinks = (settings ? settings.socialLinks.filter((link) => link.visible) : COMPANY.socialLinks).filter((link) =>
    isSafePublicHref(link.href)
  );

  return (
    <footer className="bg-footer relative overflow-hidden pb-24 text-white md:pb-0">
      {/* Oversized watermark mark, as in the reference footer */}
      <div className="pointer-events-none absolute -left-10 bottom-0 select-none opacity-[0.05]" aria-hidden="true">
        <span className="font-display text-[16rem] font-bold leading-none tracking-tighter">SH</span>
      </div>

      <div className="shell relative pt-16 lg:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_0.85fr_0.85fr_1.15fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <BrandLogo src={settings?.logoImage} imageClassName="brand-logo-inverse h-14" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-[1.9] text-white/55">
              {resolved.tagline}. Thoughtful helicopter planning for travellers who value clarity, comfort and direct local
              support.
            </p>
            <p className="mt-6 max-w-sm text-[11px] leading-5 text-white/45">
              Operated by{" "}
              <a
                href={COMPANY.operatorUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
              >
                {COMPANY.operator}
              </a>
            </p>
            <div className="mt-7 flex items-center gap-2" aria-label="Social media">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.label.toLowerCase() as keyof typeof socialIcons] || ArrowUpRight;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="grid h-10 w-10 place-items-center rounded-btn border border-white/15 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-navydeep"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.id}>
              <p className="footer-heading">{group.title}</p>
              <ul className="mt-6 space-y-3.5 text-sm text-white/55">
                {group.links
                  .filter((link) => isSafePublicHref(link.href))
                  .map((link) => (
                    <li key={link.id}>
                      <Link href={link.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="footer-heading">Pokhara Operations</p>
            <address className="mt-6 space-y-4 text-sm not-italic text-white/55">
              <a
                href={COMPANY.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 leading-6 transition-colors hover:text-white"
              >
                <MapPin size={16} className="mt-1 shrink-0 text-accent" />
                <span>
                  {resolved.addressLine1}
                  <br />
                  {resolved.addressLine2}
                  <br />
                  {resolved.addressLine3}
                  <br />
                  {resolved.addressLine4}
                </span>
              </a>
              <a href={`tel:${resolved.primaryPhone}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone size={16} className="text-accent" />
                {resolved.primaryPhone}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <MessageCircleMore size={16} className="text-accent" />
                {resolved.whatsappNumber}
              </a>
              <a href={`mailto:${resolved.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white">
                <Mail size={16} className="text-accent" />
                {resolved.email}
              </a>
            </address>
          </div>
        </div>

        {/* Action strip, mirroring the reference footer buttons */}
        <div className="grid gap-3 border-b border-white/10 py-8 sm:grid-cols-3">
          <Link href="/check-availability" className="light-button w-full">
            Reserve a flight
          </Link>
          <a href={COMPANY.googleMapsUrl} target="_blank" rel="noreferrer" className="outline-button w-full border-white/40 text-white hover:bg-white hover:text-navy">
            Get directions
          </a>
          <Link href="/contact" className="outline-button w-full border-white/40 text-white hover:bg-white hover:text-navy">
            Talk to the flight desk
          </Link>
        </div>

        <div className="flex flex-col gap-4 py-7 font-display text-[10px] uppercase tracking-[0.2em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {resolved.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/safety-flight-information" className="transition-colors hover:text-white">
              Flight information
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
