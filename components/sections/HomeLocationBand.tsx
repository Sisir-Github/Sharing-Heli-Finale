import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { COMPANY } from "@/lib/constants";

type ContactDetails = {
  primaryPhone: string;
  email: string;
  businessHours: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
};

export function HomeLocationBand({ contact }: { contact: ContactDetails }) {
  return (
    <section className="band band-navy">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.9rem] font-semibold uppercase leading-[1.14] tracking-[0.02em] text-white sm:text-[2.5rem]">
            Where we operate
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.9] text-white/62">
            Our flight desk sits in Lakeside, Pokhara &mdash; a short drive from the airport and the departure point for
            most Annapurna, Mustang and Muktinath routes. Walk in, call, or send your plan ahead.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="media-frame aspect-[16/11] bg-white/5">
            <iframe
              src={COMPANY.googleMapsEmbedUrl}
              title="Sharing Heli Nepal office location in Lakeside, Pokhara"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="media-frame aspect-[16/11] bg-white/5">
            <Image
              src="/images/campaign/sharing-heli-hero.jpg"
              alt="Helicopter departing from Pokhara, Nepal"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <dl className="mt-12 grid gap-px border-y border-white/12 text-left sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/12">
          <div className="border-b border-white/12 py-6 lg:border-b-0 lg:px-6 lg:first:pl-0">
            <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Office</dt>
            <dd className="mt-2 text-sm leading-6 text-white/75">
              <a href={COMPANY.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex gap-2 hover:text-white">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {contact.addressLine1}, {contact.addressLine2}
                  <br />
                  {contact.addressLine3}, Nepal
                </span>
              </a>
            </dd>
          </div>
          <div className="border-b border-white/12 py-6 lg:border-b-0 lg:px-6">
            <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Phone</dt>
            <dd className="mt-2 text-sm text-white/75">
              <a href={`tel:${contact.primaryPhone}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone size={15} className="text-accent" />
                {contact.primaryPhone}
              </a>
            </dd>
          </div>
          <div className="border-b border-white/12 py-6 sm:border-b-0 lg:px-6">
            <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Email</dt>
            <dd className="mt-2 break-all text-sm text-white/75">
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail size={15} className="shrink-0 text-accent" />
                {contact.email}
              </a>
            </dd>
          </div>
          <div className="py-6 lg:px-6 lg:last:pr-0">
            <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Hours</dt>
            <dd className="mt-2 inline-flex items-center gap-2 text-sm text-white/75">
              <Clock3 size={15} className="text-accent" />
              {contact.businessHours}
            </dd>
          </div>
        </dl>

        <div className="mt-11 text-center">
          <Link href="/contact" className="light-button">
            Contact the Pokhara desk
          </Link>
        </div>
      </div>
    </section>
  );
}
