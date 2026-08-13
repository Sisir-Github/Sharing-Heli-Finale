import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";

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

export async function Footer() {
  const [settings, groups] = await Promise.all([getSiteSettings(), getFooterGroups()]);
  const resolved = {
    companyName: settings?.companyName || COMPANY.companyName,
    brandName: settings?.brandName || COMPANY.brandName,
    tagline: settings?.tagline || COMPANY.tagline,
    operatingUnder: settings?.operatingUnder || `Operated by ${COMPANY.operator}`,
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

  return (
    <footer className="bg-footer pb-24 pt-20 text-white md:pb-10 lg:pt-24">
      <div className="shell">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.15fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <BrandLogo src={settings?.logoImage} imageClassName="brand-logo-inverse h-14" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/48">{resolved.tagline}. Thoughtful helicopter planning for travelers who value clarity, comfort, and direct local support.</p>
            <p className="mt-6 max-w-sm text-[11px] leading-5 text-white/65">
              Operated by{" "}
              <a href={COMPANY.operatorUrl} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white">
                {COMPANY.operator}
              </a>
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.id}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">{group.title}</p>
              <ul className="mt-6 space-y-3.5 text-sm text-white/52">
                {group.links.filter((link) => isSafePublicHref(link.href)).map((link) => <li key={link.id}><Link href={link.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">{link.label}</Link></li>)}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">Pokhara Operations</p>
            <address className="mt-6 space-y-4 text-sm not-italic text-white/52">
              <a href={COMPANY.googleMapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 leading-6 transition-colors hover:text-white"><MapPin size={17} className="mt-1 shrink-0 text-copper" /><span>{resolved.addressLine1}<br />{resolved.addressLine2}<br />{resolved.addressLine3}<br />{resolved.addressLine4}</span></a>
              <a href={`tel:${resolved.primaryPhone}`} className="flex items-center gap-3 transition-colors hover:text-white"><Phone size={17} className="text-copper" />{resolved.primaryPhone}</a>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-white"><MessageCircleMore size={17} className="text-copper" />{resolved.whatsappNumber}</a>
              <a href={`mailto:${resolved.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white"><Mail size={17} className="text-copper" />{resolved.email}</a>
            </address>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">Contact the flight desk <ArrowUpRight size={15} /></Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[10px] uppercase tracking-[0.12em] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {resolved.companyName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/safety-flight-information" className="hover:text-white">Flight information</Link>
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white">Terms</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
