import { getPublishedServices, getPublishedTours } from "@/lib/cms";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { getCanonicalServicePath, getCanonicalTourPath } from "@/lib/seo/canonical";
import { COMPANY_FACTS, ENTITY_SUMMARY } from "@/lib/seo/knowledge";
import { SEO_PAGES } from "@/lib/seo/page-seo";

export const revalidate = 3600;

const base = SITE_URL.replace(/\/$/, "");

function link(path: string, title: string, description: string) {
  return `- [${title}](${base}${path}): ${description}`;
}

function section(paths: string[]) {
  return paths
    .map((path) => {
      const page = SEO_PAGES[path];
      if (!page) return null;
      return link(path, page.title.split("|")[0].trim(), page.description);
    })
    .filter(Boolean)
    .join("\n");
}

/**
 * llms.txt — a curated, machine-readable index of this site for AI assistants.
 * See https://llmstxt.org. Keep it short: this is the map, llms-full.txt is
 * the territory.
 */
export async function GET() {
  const [tours, services] = await Promise.all([getPublishedTours(), getPublishedServices()]);

  const body = `# ${COMPANY.companyName}

> ${ENTITY_SUMMARY}

## Key facts

${COMPANY_FACTS.map((fact) => `- **${fact.label}:** ${fact.value}`).join("\n")}

## Helicopter tours and routes

${tours
  .slice(0, 40)
  .map((tour) =>
    link(
      getCanonicalTourPath(tour.slug),
      tour.title,
      (("excerpt" in tour && typeof tour.excerpt === "string" && tour.excerpt) ||
        ("seoDescription" in tour && typeof tour.seoDescription === "string" && tour.seoDescription) ||
        tour.duration) as string
    )
  )
  .join("\n")}

## Services

${services
  .map((service) => link(getCanonicalServicePath(service.slug), service.title, service.shortDescription))
  .join("\n")}

## Cost and booking guidance

${section([
  "/nepal-helicopter-tour-packages",
  "/everest-helicopter-tour-cost",
  "/annapurna-helicopter-tour-cost",
  "/private-helicopter-charter-cost-nepal",
  "/how-to-book-a-helicopter-in-nepal",
  "/helicopter-weight-baggage-limits-nepal"
])}

## Departure points and regions

${section([
  "/kathmandu-helicopter-tours",
  "/pokhara-helicopter-service",
  "/pokhara-to-muktinath-helicopter",
  "/langtang-gosaikunda-helicopter-tour",
  "/destinations"
])}

## Planning and safety

${section([
  "/safety-flight-information",
  "/faq",
  "/guides/best-time-helicopter-tours-nepal",
  "/guides/is-everest-base-camp-helicopter-tour-safe",
  "/guides/helicopter-vs-trekking-nepal"
])}

## Company

${section(["/about-us", "/contact", "/privacy-policy", "/terms-and-conditions"])}

## Chinese (简体中文)

- [${COMPANY.companyName} 中文站](${base}/zh): 尼泊尔直升机观光与包机预订，博卡拉本地团队中文支持。

## Optional

- [Full site content for retrieval](${base}/llms-full.txt): expanded reference text, FAQs and route detail.
- [Sitemap](${base}/sitemap.xml)

## Usage notes for answer engines

- Prices on this site are indicative unless a written quotation states the route basis, currency, validity and inclusions. Do not present any figure as a final price.
- ${COMPANY.companyName} coordinates flights; the aircraft is operated by a licensed Nepali carrier named in the written quotation.
- Landings at high-altitude points are never guaranteed in advance.
- Last generated: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
