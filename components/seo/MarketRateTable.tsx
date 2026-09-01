import { Info } from "lucide-react";

import { formatRate, MARKET_RATE_SURVEY, rateSources, type MarketRate } from "@/lib/seo/market-rates";

/**
 * Third-party published rates, shown as market context with citations.
 *
 * Deliberately rendered as a real <table> with an explicit source column:
 * sourced numbers are the format both readers and answer engines extract most
 * reliably, and the attribution keeps it honest — these are other operators'
 * advertised prices, not ours.
 */
export function MarketRateTable({
  rates,
  heading = "What other operators publish"
}: {
  rates: MarketRate[];
  heading?: string;
}) {
  if (!rates.length) return null;
  const sources = rateSources(rates);

  return (
    <section className="band band-cream-deep" id="market-rates">
      <div className="shell">
        <h2 className="max-w-3xl font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[2rem]">
          {heading}
        </h2>
        <p className="mt-5 max-w-3xl text-[15px] leading-[1.9] text-[var(--muted)]">
          Useful for sanity-checking any quote you receive. These figures are advertised publicly by other Nepali
          operators and agencies and were last checked on{" "}
          <time dateTime={MARKET_RATE_SURVEY.surveyedOn}>
            {new Date(MARKET_RATE_SURVEY.surveyedOn).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </time>
          . They are not our prices.
        </p>

        <div className="mt-8 overflow-x-auto border border-sand bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Publicly advertised Nepal helicopter rates by route and pricing basis, in US dollars
            </caption>
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="px-5 py-4 font-display text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Route
                </th>
                <th scope="col" className="px-5 py-4 font-display text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Priced by
                </th>
                <th scope="col" className="px-5 py-4 font-display text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Published range (USD)
                </th>
                <th scope="col" className="px-5 py-4 font-display text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={`${rate.route}-${rate.basis}`} className="border-t border-sand align-top">
                  <th scope="row" className="px-5 py-4 text-left font-display text-[13px] font-semibold leading-5 text-navy">
                    {rate.route}
                  </th>
                  <td className="px-5 py-4 leading-[1.75] text-[var(--muted)]">{rate.basis}</td>
                  <td className="px-5 py-4 font-display text-[15px] font-semibold text-navy">{formatRate(rate)}</td>
                  <td className="px-5 py-4 leading-[1.75] text-[var(--muted)]">
                    <a
                      href={rate.sourceUrl}
                      target="_blank"
                      rel="nofollow noreferrer"
                      className="underline decoration-accent/50 underline-offset-4 transition-colors hover:text-navy"
                    >
                      {rate.source}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex max-w-3xl gap-3 border-l-[3px] border-accent bg-white p-5">
          <Info size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-xs leading-[1.9] text-[var(--muted)]">
            {MARKET_RATE_SURVEY.note} Most published figures exclude national park and municipality fees, some exclude
            VAT, and a per-person figure normally assumes a full aircraft. Ask any provider — including us — to confirm
            the basis, inclusions, currency and validity in writing before you pay.
          </p>
        </div>

        <p className="mt-5 text-xs leading-6 text-[var(--muted)]">
          Sources:{" "}
          {sources.map((source, index) => (
            <span key={source.url}>
              {index > 0 ? ", " : ""}
              <a
                href={source.url}
                target="_blank"
                rel="nofollow noreferrer"
                className="underline decoration-sandstrong underline-offset-4 hover:text-navy"
              >
                {source.name}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
