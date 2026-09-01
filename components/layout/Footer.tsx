import Link from "next/link";
import { ArrowUpRight, Clock, Facebook, Instagram, Mail, MapPin, MessageCircleMore, Phone, Youtube } from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { getSiteSettings } from "@/lib/cms";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { isSafePublicHref } from "@/lib/safe-url";

const utilityLinks = [
  { label: "Flight information", href: "/safety-flight-information" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "FAQ", href: "/faq" }
];

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube
};

/** High-intent guides that must be reachable from every page. */
const planningLinks = [
  { label: "Nepal helicopter tour packages", href: "/nepal-helicopter-tour-packages" },
  { label: "Everest helicopter tour cost", href: "/everest-helicopter-tour-cost" },
  { label: "Annapurna helicopter tour cost", href: "/annapurna-helicopter-tour-cost" },
  { label: "Private charter cost", href: "/private-helicopter-charter-cost-nepal" },
  { label: "Helicopter tours from Kathmandu", href: "/kathmandu-helicopter-tours" },
  { label: "Pokhara to Muktinath", href: "/pokhara-to-muktinath-helicopter" },
  { label: "Langtang & Gosaikunda", href: "/langtang-gosaikunda-helicopter-tour" },
  { label: "How to book a helicopter", href: "/how-to-book-a-helicopter-in-nepal" },
  { label: "Weight & baggage limits", href: "/helicopter-weight-baggage-limits-nepal" }
];

export async function Footer() {
  const settings = await getSiteSettings();
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
  const whatsappHref = `https://wa.me/${resolved.whatsappNumber.replace(/[^\d]/g, "")}`;
  const socialLinks = (settings ? settings.socialLinks.filter((link) => link.visible) : COMPANY.socialLinks).filter((link) =>
    isSafePublicHref(link.href)
  );
  const businessHours = settings?.businessHours || "Every day, 8:00 AM - 11:00 PM";
  // Short form: street line plus the city, without postal code, province or country.
  const addressCity = resolved.addressLine2.replace(/\s*\d{4,}\s*$/, "").trim();

  return (
    <footer className="relative overflow-hidden bg-navydeep pb-24 text-white md:pb-0">
      <div className="shell relative pt-16 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-white/10 pb-14 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
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

          <div>
            <p className="footer-heading">Explore</p>
            <ul className="mt-6 space-y-3.5 text-sm text-white/55">
              {NAV_LINKS.filter((link) => isSafePublicHref(link.href)).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-[28px] items-center gap-1.5 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading">Information</p>
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
                  {addressCity}
                </span>
              </a>
              <a href={`tel:${resolved.primaryPhone}`} className="flex min-h-[28px] items-center gap-3 transition-colors hover:text-white">
                <Phone size={16} className="text-accent" />
                {resolved.primaryPhone}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[28px] items-center gap-3 transition-colors hover:text-white"
              >
                <MessageCircleMore size={16} className="text-accent" />
                {resolved.whatsappNumber}
              </a>
              <a href={`mailto:${resolved.email}`} className="flex min-h-[28px] items-center gap-3 break-all transition-colors hover:text-white">
                <Mail size={16} className="text-accent" />
                {resolved.email}
              </a>
              <p className="flex items-center gap-3">
                <Clock size={16} className="shrink-0 text-accent" />
                {businessHours}
              </p>
            </address>
          </div>

          <div>
            <p className="footer-heading">Utility Pages</p>
            <ul className="mt-6 space-y-3.5 text-sm text-white/55">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-[28px] items-center gap-1.5 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Planning guides. These pages answer the highest-intent searches, so
            they need real internal links rather than sitemap-only discovery. */}
        <nav aria-label="Costs and planning guides" className="border-b border-white/10 py-10">
          <p className="footer-heading">Costs &amp; planning</p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm text-white/55 sm:grid-cols-2 lg:grid-cols-3">
            {planningLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-[28px] items-center transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language. Baidu ignores hreflang entirely, so the Chinese section
            needs a crawlable link from the English site to be discovered. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 py-6">
          <span className="footer-heading">Language</span>
          <Link href="/" hrefLang="en" className="inline-flex min-h-[28px] items-center text-sm text-white/55 transition-colors hover:text-white">
            English
          </Link>
          <span className="text-white/25" aria-hidden="true">/</span>
          <Link href="/zh" hrefLang="zh-Hans" lang="zh-Hans" className="inline-flex min-h-[28px] items-center text-sm text-white/55 transition-colors hover:text-white">
            简体中文
          </Link>
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

        <div className="py-7 font-display text-[10px] uppercase tracking-[0.2em] text-white/45">
          <p>
            &copy; {new Date().getFullYear()} {resolved.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
