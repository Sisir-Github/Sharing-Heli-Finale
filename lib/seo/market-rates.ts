/**
 * PUBLISHED MARKET RATES — third-party data, cited.
 *
 * These are rates that other Nepali helicopter operators and agencies publish
 * openly on their own websites. They are recorded here as market context so
 * travellers can sanity-check a quote, and because pages that carry sourced
 * numbers are both more useful to readers and materially more likely to be
 * cited by AI answer engines than opinion-only content.
 *
 * RULES FOR THIS FILE
 * 1. Every figure must be traceable to a named public source with a URL.
 * 2. Nothing here is a Sharing Heli price. Our own fares are issued per request
 *    in a written quotation and are never inferred from this table.
 * 3. These numbers must NEVER be emitted as Offer / PriceSpecification schema,
 *    because they are not our offers. Marking up someone else's price as your
 *    own is a structured-data policy violation.
 * 4. Re-check the sources each season and update `surveyedOn`. Stale price
 *    context is worse than none.
 */

export const MARKET_RATE_SURVEY = {
  surveyedOn: "2026-08-19",
  currency: "USD",
  note:
    "Rates below are advertised by third-party Nepali operators and agencies on their own public websites. They are indicative market context only, usually exclude some fees, and change with season, fuel and demand."
};

export type MarketRate = {
  route: string;
  basis: "per person (shared)" | "per aircraft (private)" | "per flying hour";
  low: number;
  high: number;
  source: string;
  sourceUrl: string;
};

export const MARKET_RATES: MarketRate[] = [
  {
    route: "Everest Base Camp / Kala Patthar scenic tour, from Kathmandu",
    basis: "per person (shared)",
    low: 1240,
    high: 1600,
    source: "Flight Everest, Best Heritage Tour",
    sourceUrl: "https://www.flighteverest.com/everest-base-camp-helicopter-tour-cost/"
  },
  {
    route: "Everest Base Camp / Kala Patthar scenic tour, from Kathmandu",
    basis: "per aircraft (private)",
    low: 5800,
    high: 6500,
    source: "Flight Everest, Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  },
  {
    route: "Annapurna Base Camp, from Pokhara",
    basis: "per aircraft (private)",
    low: 2200,
    high: 2500,
    source: "Best Heritage Tour, Nepal Helicopters",
    sourceUrl: "https://www.bestheritagetour.com/blog/annapurna-base-camp-helicopter-tour-cost"
  },
  {
    route: "Annapurna Base Camp, from Pokhara",
    basis: "per person (shared)",
    low: 440,
    high: 500,
    source: "Best Heritage Tour (five-passenger group-joining rate)",
    sourceUrl: "https://www.bestheritagetour.com/blog/annapurna-base-camp-helicopter-tour-cost"
  },
  {
    route: "Annapurna Base Camp, from Kathmandu",
    basis: "per aircraft (private)",
    low: 4200,
    high: 4500,
    source: "Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  },
  {
    route: "Muktinath, from Pokhara",
    basis: "per aircraft (private)",
    low: 3200,
    high: 3200,
    source: "Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  },
  {
    route: "Muktinath, from Kathmandu",
    basis: "per aircraft (private)",
    low: 4800,
    high: 4800,
    source: "Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  },
  {
    route: "Langtang valley, from Kathmandu",
    basis: "per aircraft (private)",
    low: 2400,
    high: 2400,
    source: "Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  },
  {
    route: "Gosaikunda, from Kathmandu",
    basis: "per aircraft (private)",
    low: 2000,
    high: 2000,
    source: "Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  },
  {
    route: "Kathmandu to Lukla transfer",
    basis: "per aircraft (private)",
    low: 3200,
    high: 3200,
    source: "Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  },
  {
    route: "General charter rate, single-engine helicopter",
    basis: "per flying hour",
    low: 1300,
    high: 3000,
    source: "Nepal Helicopters",
    sourceUrl: "https://www.nepalhelicopters.com/blog/helicopter-charter-costs-in-nepal/"
  }
];

export function ratesForRoute(pattern: RegExp) {
  return MARKET_RATES.filter((rate) => pattern.test(rate.route));
}

export function formatRate(rate: MarketRate) {
  const format = (value: number) => `$${value.toLocaleString("en-US")}`;
  return rate.low === rate.high ? `around ${format(rate.low)}` : `${format(rate.low)} – ${format(rate.high)}`;
}

/** Distinct sources, for a citation list under the table. */
export function rateSources(rates: MarketRate[]) {
  const seen = new Map<string, string>();
  for (const rate of rates) {
    if (!seen.has(rate.sourceUrl)) seen.set(rate.sourceUrl, rate.source);
  }
  return Array.from(seen.entries()).map(([url, name]) => ({ url, name }));
}
