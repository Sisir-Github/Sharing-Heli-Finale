import Link from "next/link";
import { Building2, MapPin, MessagesSquare } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { COMPANY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/about-us");

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about-us" }]} />
      <section className="section-space bg-canvas">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">About Sharing Heli</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">Local Flight Coordination From Lakeside, Pokhara</h1>
            <p className="copy mt-6 text-lg">
              {COMPANY.companyName} helps travelers request shared helicopter flights and private charter arrangements in Nepal. Flight coordination is operated by{" "}
              <a href={COMPANY.operatorUrl} target="_blank" rel="noreferrer" className="font-semibold text-aurora underline decoration-aurora/30 underline-offset-4">
                {COMPANY.operator}
              </a>
              .
            </p>
            <p className="copy mt-4">Our role is flight coordination, not direct aircraft operation. The written quotation for each booking should identify the licensed operating carrier, route basis, inclusions, and key flight conditions before any payment or deposit.</p>
            <Link href="/contact" className="inquiry-button mt-7">Contact The Pokhara Team</Link>
          </div>
          <div className="grid gap-4">
            {[
              { icon: MapPin, title: "Office", text: `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.line3}, ${COMPANY.address.country}` },
              { icon: Building2, title: "Business identity", text: <>{COMPANY.companyName}. Operated by <a href={COMPANY.operatorUrl} target="_blank" rel="noreferrer" className="font-semibold text-aurora underline decoration-aurora/30 underline-offset-4">{COMPANY.operator}</a>.</> },
              { icon: MessagesSquare, title: "Direct contact", text: <><a href={`tel:${COMPANY.primaryPhone}`} className="font-semibold text-aurora">{COMPANY.primaryPhone}</a> · <a href={COMPANY.whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-aurora">WhatsApp</a></> }
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="surface-card p-6">
                <Icon className="text-brass" />
                <h2 className="mt-5 text-lg font-semibold text-ink">{title}</h2>
                <p className="copy mt-2 text-sm">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
