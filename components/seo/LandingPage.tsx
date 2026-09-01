import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { MarketRateTable } from "@/components/seo/MarketRateTable";
import { PageHero } from "@/components/ui/PageHero";
import { ReservationButton } from "@/components/ui/ReservationButton";
import type { LandingContent } from "@/lib/seo/landing/types";
import { ratesForRoute } from "@/lib/seo/market-rates";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildWebPageSchema
} from "@/lib/seo/schema";

/**
 * Shared template for high-intent search landing pages.
 *
 * Structure is deliberate: the direct answer sits first inside a
 * `data-speakable` block, facts come next as a definition list, then the long
 * form, then a table, then FAQs. That order is what both Google's snippet
 * extraction and LLM retrieval reward — the answer should be findable without
 * reading the whole page.
 */
export function LandingPage({ content }: { content: LandingContent }) {
  const marketRates = content.marketRatePattern ? ratesForRoute(content.marketRatePattern) : [];
  const reviewedOn = content.reviewedOn || new Date().toISOString().slice(0, 10);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...(content.breadcrumbParent ? [content.breadcrumbParent] : []),
    { name: content.title, path: content.path }
  ];

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildWebPageSchema({
            name: content.title,
            description: content.answer,
            path: content.path,
            primaryImage: content.heroImage,
            about: content.about,
            dateModified: reviewedOn,
            reviewedOn
          }),
          ...(content.faqs.length ? [buildFaqSchema(content.faqs)] : []),
          ...(content.steps?.length
            ? [
                buildHowToSchema({
                  name: content.title,
                  description: content.answer,
                  path: content.path,
                  steps: content.steps
                })
              ]
            : [])
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        image={content.heroImage}
        imageAlt={content.heroImageAlt}
        width="wide"
        priority
        primaryAction={{ label: "Get a written quote", href: "/check-availability" }}
        secondaryAction={{ label: "Talk to the desk", href: "/contact" }}
      />

      {/* Answer-first block */}
      <section className="band-tight band-cream">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              Short answer
            </p>
            <p data-speakable className="mt-5 font-display text-[1.35rem] font-medium leading-[1.55] text-navy sm:text-[1.6rem]">
              {content.answer}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-sand pt-5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              <span>Written and fact-checked by the Sharing Heli Pokhara flight desk</span>
              <span aria-hidden="true">&middot;</span>
              <span>
                Last reviewed{" "}
                <time dateTime={reviewedOn}>
                  {new Date(reviewedOn).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </time>
              </span>
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-px self-start border-y border-sand sm:grid-cols-2">
            {content.quickFacts.map((fact) => (
              <div key={fact.label} className="border-b border-sand py-5 last:border-b-0 sm:border-b-0 sm:py-6 sm:odd:pr-6 sm:even:border-l sm:even:border-sand sm:even:pl-6">
                <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-display text-base font-semibold leading-6 text-navy">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Long form */}
      <section className="band band-white">
        <div className="shell space-y-12">
          {content.sections.map((section, index) => (
            <article key={section.heading} className="grid gap-6 border-t border-sand pt-9 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
              <div>
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-[1.55rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[1.95rem]">
                  {section.heading}
                </h2>
              </div>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-[15px] leading-[1.9] text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="mt-2 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-[15px] leading-[1.8] text-[var(--muted)]">
                        <Check size={16} className="mt-1.5 shrink-0 text-accent" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {marketRates.length ? (
        <MarketRateTable rates={marketRates} heading={content.marketRateHeading} />
      ) : null}

      {/* Comparison table */}
      {content.table ? (
        <section className="band band-cream-deep">
          <div className="shell">
            <h2 className="font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[2rem]">
              {content.table.caption}
            </h2>
            <div className="mt-8 overflow-x-auto border border-sand bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    {content.table.columns.map((column) => (
                      <th key={column} scope="col" className="px-5 py-4 font-display text-[10px] font-semibold uppercase tracking-[0.18em]">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.table.rows.map((row) => (
                    <tr key={row[0]} className="border-t border-sand align-top">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={
                            cellIndex === 0
                              ? "px-5 py-4 font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-navy"
                              : "px-5 py-4 leading-[1.75] text-[var(--muted)]"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {content.table.note ? (
              <p className="mt-5 max-w-3xl text-xs leading-6 text-[var(--muted)]">{content.table.note}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Steps */}
      {content.steps?.length ? (
        <section className="band band-white">
          <div className="shell">
            <h2 className="max-w-2xl font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[2rem]">
              Step by step
            </h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {content.steps.map((step, index) => (
                <li key={step.name} id={`step-${index + 1}`} className="border-t border-sand pt-6">
                  <span className="font-display text-[2.2rem] font-bold leading-none text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-[0.08em] text-navy">
                    {step.name}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.85] text-[var(--muted)]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {content.faqs.length ? (
        <section className="band band-cream" id="faq">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow justify-center">
                <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
                Common questions
              </p>
              <h2 className="mt-5 font-display text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.01em] text-navy sm:text-[2.3rem]">
                Questions travellers ask
              </h2>
            </div>
            <div className="mx-auto mt-11 max-w-3xl divide-y divide-sand border-y border-sand">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-base font-semibold text-navy sm:text-lg">
                    {faq.question}
                    <span
                      className="mt-1 shrink-0 font-display text-xl leading-none text-accent transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-[1.9] text-[var(--muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA + related */}
      <section className="band band-navy">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.01em] text-white sm:text-[2.3rem]">
              {content.ctaHeading || "Get a written quote for your date"}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-white/65">
              {content.ctaBody ||
                "Send the route, date range, passenger count and approximate weights. The Pokhara desk returns feasibility, the current fare and the operating carrier in writing."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ReservationButton variant="accent" label="Check availability" />
              <Link href="/contact" className="outline-button">
                Talk to the desk
              </Link>
            </div>
          </div>

          <nav aria-label="Related pages" className="grid content-start border-t border-white/12">
            {content.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-5 border-b border-white/12 py-5 transition-colors hover:bg-white/5"
              >
                <span>
                  <span className="block font-display text-sm font-semibold uppercase tracking-[0.08em] text-white">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-xs leading-[1.8] text-white/55">{item.description}</span>
                </span>
                <ArrowUpRight size={17} className="mt-0.5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
