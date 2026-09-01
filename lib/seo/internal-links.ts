/**
 * Contextual internal links.
 *
 * Deep pages that only appear in a sitemap get crawled but carry almost no
 * internal link weight, and readers never find them. This map connects each
 * tour and service to the planning pages that genuinely help someone reading
 * it, so the links are useful first and an SEO signal second.
 */
export type ContextualLink = { title: string; description: string; href: string };

const COST_EVEREST: ContextualLink = {
  title: "Everest helicopter tour cost",
  description: "Per-seat versus per-aircraft pricing, park fees and what published rates actually look like.",
  href: "/everest-helicopter-tour-cost"
};
const COST_ANNAPURNA: ContextualLink = {
  title: "Annapurna helicopter tour cost",
  description: "Why Pokhara departures cost less, and what the published rates include.",
  href: "/annapurna-helicopter-tour-cost"
};
const COST_CHARTER: ContextualLink = {
  title: "Private charter cost",
  description: "Hourly rates, positioning legs and when charter beats buying seats.",
  href: "/private-helicopter-charter-cost-nepal"
};
const HOW_TO_BOOK: ContextualLink = {
  title: "How to book a helicopter in Nepal",
  description: "What to send, what a proper quotation must state, and what to ask before paying.",
  href: "/how-to-book-a-helicopter-in-nepal"
};
const WEIGHTS: ContextualLink = {
  title: "Weight and baggage limits",
  description: "Why operators plan by kilograms, and what you can realistically carry.",
  href: "/helicopter-weight-baggage-limits-nepal"
};
const PACKAGES: ContextualLink = {
  title: "All helicopter tour packages",
  description: "Compare shared seats, private charter and transfers across every region.",
  href: "/nepal-helicopter-tour-packages"
};
const KATHMANDU: ContextualLink = {
  title: "Helicopter tours from Kathmandu",
  description: "Everest, Langtang, Gosaikunda and transfers out of the capital.",
  href: "/kathmandu-helicopter-tours"
};
const MUKTINATH: ContextualLink = {
  title: "Pokhara to Muktinath by helicopter",
  description: "Flight time, temple ground time, altitude guidance and seasons.",
  href: "/pokhara-to-muktinath-helicopter"
};
const LANGTANG: ContextualLink = {
  title: "Langtang and Gosaikunda",
  description: "The shortest Himalayan flight from Kathmandu.",
  href: "/langtang-gosaikunda-helicopter-tour"
};

const DEFAULT_LINKS: ContextualLink[] = [PACKAGES, HOW_TO_BOOK, WEIGHTS];

const RULES: Array<{ pattern: RegExp; links: ContextualLink[] }> = [
  { pattern: /everest|khumbu|kala-?patthar|lukla|gokyo|namche/i, links: [COST_EVEREST, KATHMANDU, WEIGHTS] },
  { pattern: /annapurna|mardi|machhapuchhre|tilicho|abc/i, links: [COST_ANNAPURNA, PACKAGES, WEIGHTS] },
  { pattern: /muktinath|mustang|jomsom|damodar|pilgrim/i, links: [MUKTINATH, COST_ANNAPURNA, HOW_TO_BOOK] },
  { pattern: /langtang|gosaikunda|kyanjin/i, links: [LANGTANG, KATHMANDU, PACKAGES] },
  { pattern: /charter|luxury|custom|cargo|emergency|rescue/i, links: [COST_CHARTER, HOW_TO_BOOK, WEIGHTS] },
  { pattern: /shared|sharing|join/i, links: [PACKAGES, COST_ANNAPURNA, HOW_TO_BOOK] },
  { pattern: /pokhara/i, links: [COST_ANNAPURNA, MUKTINATH, PACKAGES] },
  { pattern: /kathmandu/i, links: [KATHMANDU, COST_EVEREST, PACKAGES] }
];

/** Returns up to three planning pages relevant to a tour or service path/slug. */
export function getContextualLinks(subject: string, exclude?: string): ContextualLink[] {
  const matched = RULES.find((rule) => rule.pattern.test(subject));
  const links = matched ? matched.links : DEFAULT_LINKS;
  const filtered = links.filter((link) => link.href !== exclude);
  return filtered.length ? filtered : DEFAULT_LINKS.filter((link) => link.href !== exclude);
}
