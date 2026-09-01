import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { CORE_QA } from "@/lib/seo/knowledge";
import { buildFaqSchema } from "@/lib/seo/schema";

/**
 * Homepage FAQ.
 *
 * Sourced from lib/seo/knowledge.ts so the wording stays identical to
 * llms-full.txt and the FAQ page — answer engines reward a claim that is
 * consistent everywhere it appears, and contradict-yourself pages get dropped.
 */
export function HomeFaq({ limit = 6 }: { limit?: number }) {
  const items = CORE_QA.slice(0, limit);

  return (
    <section className="band band-cream-deep" id="faq">
      <JsonLd data={buildFaqSchema(items)} />
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Straight answers
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-navy sm:text-[2.6rem]">
            Nepal helicopter questions, answered
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-[var(--muted)]">
            The things travellers ask us most, answered the way we would answer them on the phone.
          </p>
        </div>

        <div className="mx-auto mt-11 max-w-3xl divide-y divide-sand border-y border-sand">
          {items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-base font-semibold text-navy sm:text-lg">
                {item.question}
                <span
                  className="mt-1 shrink-0 font-display text-xl leading-none text-accent transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-[1.9] text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/faq" className="outline-button">
            All flight questions
          </Link>
        </div>
      </div>
    </section>
  );
}
