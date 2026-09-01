import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ZH_UI, type ZhPageContent } from "@/lib/i18n/zh";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";

export function ZhPageTemplate({ content }: { content: ZhPageContent }) {
  const breadcrumbs = [
    { name: "首页", path: "/zh" },
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
            inLanguage: "zh-Hans",
            primaryImage: content.heroImage,
            dateModified: new Date()
          }),
          ...(content.faqs.length
            ? [buildFaqSchema(content.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })))]
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
        primaryAction={{ label: ZH_UI.reserve, href: "/zh/contact" }}
        secondaryAction={{ label: ZH_UI.viewRoutes, href: "/zh/tours" }}
      />

      <section className="band-tight band-cream">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">
              <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
              {ZH_UI.quickAnswer}
            </p>
            <p data-speakable className="mt-5 font-display text-[1.25rem] font-medium leading-[1.9] text-navy sm:text-[1.45rem]">
              {content.answer}
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-px self-start border-y border-sand sm:grid-cols-2">
            {content.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-sand py-5 last:border-b-0 sm:border-b-0 sm:py-6 sm:odd:pr-6 sm:even:border-l sm:even:border-sand sm:even:pl-6"
              >
                <dt className="text-[11px] tracking-[0.1em] text-[var(--muted)]">{fact.label}</dt>
                <dd className="mt-2 font-display text-base font-semibold leading-7 text-navy">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band band-white">
        <div className="shell space-y-12">
          {content.sections.map((section, index) => (
            <article key={section.heading} className="grid gap-6 border-t border-sand pt-9 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
              <div>
                <span className="font-display text-[11px] font-semibold tracking-[0.24em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-[1.45rem] font-semibold leading-[1.5] text-navy sm:text-[1.8rem]">
                  {section.heading}
                </h2>
              </div>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-[15px] leading-[2] text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="mt-2 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-[15px] leading-[1.9] text-[var(--muted)]">
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

      {content.table ? (
        <section className="band band-cream-deep">
          <div className="shell">
            <h2 className="font-display text-[1.5rem] font-semibold leading-[1.5] text-navy sm:text-[1.9rem]">
              {content.table.caption}
            </h2>
            <div className="mt-8 overflow-x-auto border border-sand bg-white">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    {content.table.columns.map((column) => (
                      <th key={column} scope="col" className="px-5 py-4 text-[12px] font-semibold tracking-[0.08em]">
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
                              ? "px-5 py-4 font-display text-[14px] font-semibold text-navy"
                              : "px-5 py-4 leading-[1.9] text-[var(--muted)]"
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
              <p className="mt-5 max-w-3xl text-xs leading-7 text-[var(--muted)]">{content.table.note}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {content.faqs.length ? (
        <section className="band band-cream" id="faq">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow justify-center">
                <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
                {ZH_UI.commonQuestions}
              </p>
              <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-[1.5] text-navy sm:text-[2.1rem]">
                旅客最常问的问题
              </h2>
            </div>
            <div className="mx-auto mt-11 max-w-3xl divide-y divide-sand border-y border-sand">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-base font-semibold leading-7 text-navy sm:text-lg">
                    {faq.question}
                    <span
                      className="mt-1 shrink-0 font-display text-xl leading-none text-accent transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-[2] text-[var(--muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="band band-navy">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[1.6rem] font-semibold leading-[1.5] text-white sm:text-[2.1rem]">
              {ZH_UI.ctaHeading}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[2] text-white/65">{ZH_UI.ctaBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/zh/contact" className="accent-button">
                {ZH_UI.reserve}
              </Link>
              <Link href="/zh/tours" className="outline-button">
                {ZH_UI.allRoutes}
              </Link>
            </div>
          </div>

          <nav aria-label={ZH_UI.relatedPages} className="grid content-start border-t border-white/12">
            {content.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-5 border-b border-white/12 py-5 transition-colors hover:bg-white/5"
              >
                <span>
                  <span className="block font-display text-sm font-semibold text-white">{item.title}</span>
                  <span className="mt-2 block text-xs leading-[1.9] text-white/55">{item.description}</span>
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
