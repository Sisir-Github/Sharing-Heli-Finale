import Link from "next/link";

import { InquiryButton } from "@/components/ui/InquiryButton";
import { getFooterGroups, getSiteSettings } from "@/lib/cms";

export async function Footer() {
  type SocialLinkItem = { id: string; label: string; href: string; visible: boolean };
  type Settings = {
    companyName: string;
    brandName: string;
    tagline: string;
    operatingUnder: string;
    primaryPhone: string;
    whatsappNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string | null;
    socialLinks: SocialLinkItem[];
  };
  type FooterGroup = { id: string; title: string; links: { id: string; label: string; href: string }[] };

  const [settings, footerGroups] = (await Promise.all([
    getSiteSettings(),
    getFooterGroups()
  ])) as [Settings | null, FooterGroup[]];
  const resolvedSettings = settings ?? {
    companyName: "Sharing Heli Nepal Pvt. Ltd.",
    brandName: "Sharing Heli",
    tagline: "Elevate Your Journey Above the Himalayas",
    operatingUnder: "Operating under Pokhara Flight Centre Tours & Travel Pvt. Ltd.",
    primaryPhone: "+977-9802855690",
    whatsappNumber: "+977-9856028155",
    email: "rishi8848@gmail.com",
    addressLine1: "Lakeside-6, 15 Street No.",
    addressLine2: "Pokhara 33700",
    addressLine3: "Kaski, Gandaki Province",
    addressLine4: "Nepal"
  };

  const socialLinks = settings?.socialLinks?.filter((link) => link.visible) || [];

  return (
    <footer className="bg-footer border-t border-white/10 py-14">
      <div className="shell grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-white">{resolvedSettings.companyName}</p>
          <p className="copy mt-3 max-w-md">{resolvedSettings.tagline}</p>
          <p className="mt-4 text-sm text-haze">{resolvedSettings.operatingUnder}</p>
          {socialLinks.length ? (
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-haze">
              {socialLinks.map((link) => (
                <Link key={link.id} href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {footerGroups.slice(0, 2).map((group) => (
          <div key={group.id}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">{group.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-haze">
              {group.links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="glass rounded-3xl p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-gold">Contact & Address</p>
          <p className="mt-3 text-sm text-haze">{resolvedSettings.addressLine1}</p>
          <p className="text-sm text-haze">{resolvedSettings.addressLine2}</p>
          <p className="text-sm text-haze">{resolvedSettings.addressLine3}</p>
          {resolvedSettings.addressLine4 ? <p className="text-sm text-haze">{resolvedSettings.addressLine4}</p> : null}
          <a href={`tel:${resolvedSettings.primaryPhone}`} className="mt-3 block text-sm text-white transition-colors hover:text-gold">
            Phone: {resolvedSettings.primaryPhone}
          </a>
          <a
            href={`https://wa.me/${resolvedSettings.whatsappNumber.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-sm text-white transition-colors hover:text-gold"
          >
            WhatsApp: {resolvedSettings.whatsappNumber}
          </a>
          <p className="mt-1 text-sm text-haze">Email: {resolvedSettings.email}</p>
          <InquiryButton className="mt-4 w-full" />
        </div>
      </div>

      <div className="shell mt-10 border-t border-white/10 pt-6 text-xs text-haze/80">
        <p>© {new Date().getFullYear()} {resolvedSettings.brandName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
