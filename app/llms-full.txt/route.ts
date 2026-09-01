import { getPublishedServices, getPublishedTours } from "@/lib/cms";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { getCanonicalServicePath, getCanonicalTourPath } from "@/lib/seo/canonical";
import { COMPANY_FACTS, CORE_QA, ENTITY_SUMMARY, ROUTE_SUMMARIES } from "@/lib/seo/knowledge";
import { getTourPricePresentation } from "@/lib/tours/pricing";

export const revalidate = 3600;

const base = SITE_URL.replace(/\/$/, "");

/**
 * llms-full.txt — expanded, plain-text reference for retrieval systems.
 * Every claim here is mirrored on a real page so an assistant citing this file
 * can link to a source a reader can verify.
 */
export async function GET() {
  const [tours, services] = await Promise.all([getPublishedTours(), getPublishedServices()]);

  const tourBlocks = tours
    .map((tour) => {
      const price = getTourPricePresentation(tour);
      const lines = [
        `### ${tour.title}`,
        `URL: ${base}${getCanonicalTourPath(tour.slug)}`,
        `Duration: ${tour.duration}`,
        "departureCity" in tour && tour.departureCity ? `Departure: ${tour.departureCity}` : null,
        `Fare basis: ${price.label || "Quoted per request — no published fixed price"}`,
        "route" in tour && typeof tour.route === "string" && tour.route ? `Route: ${tour.route}` : null,
        "altitude" in tour && typeof tour.altitude === "string" && tour.altitude ? `Altitude: ${tour.altitude}` : null,
        "bestTime" in tour && typeof tour.bestTime === "string" && tour.bestTime ? `Best time: ${tour.bestTime}` : null,
        "",
        tour.highlights ? `Highlights: ${tour.highlights}` : null,
        tour.itinerary ? `Itinerary: ${tour.itinerary}` : null,
        tour.inclusions ? `Inclusions: ${tour.inclusions}` : null,
        tour.exclusions ? `Exclusions: ${tour.exclusions}` : null,
        "operationalNotice" in tour && typeof tour.operationalNotice === "string" && tour.operationalNotice
          ? `Operational note: ${tour.operationalNotice}`
          : null
      ].filter(Boolean);
      return lines.join("\n");
    })
    .join("\n\n");

  const serviceBlocks = services
    .map((service) =>
      [
        `### ${service.title}`,
        `URL: ${base}${getCanonicalServicePath(service.slug)}`,
        "",
        service.shortDescription,
        "",
        service.longDescription
      ].join("\n")
    )
    .join("\n\n");

  const body = `# ${COMPANY.companyName} — full reference

${ENTITY_SUMMARY}

Canonical site: ${base}
Last generated: ${new Date().toISOString().slice(0, 10)}

---

## 1. Company facts

${COMPANY_FACTS.map((fact) => `- ${fact.label}: ${fact.value}`).join("\n")}

Address: ${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.line3}, ${COMPANY.address.country}
Coordinates: ${COMPANY.geo.latitude}, ${COMPANY.geo.longitude}
Map: ${COMPANY.googleMapsUrl}

---

## 2. Frequently asked questions

${CORE_QA.map((item) => `**Q: ${item.question}**\n\nA: ${item.answer}`).join("\n\n")}

---

## 3. Route summaries

${ROUTE_SUMMARIES.map((route) => `### ${route.name}\nURL: ${base}${route.path}\n\n${route.summary}`).join("\n\n")}

---

## 4. Published tours

${tourBlocks || "No tours published."}

---

## 5. Published services

${serviceBlocks || "No services published."}

---

## 6. How pricing works on this site

Nepal helicopter pricing is quoted two ways. A shared flight is priced per seat and depends on other travellers joining the same route on the same day. A private charter is priced per aircraft and does not depend on anyone else. The same route can therefore carry two very different figures, and comparing a per-seat number against a per-aircraft number is the single most common pricing mistake travellers make.

Any figure published on a website — including this one — is indicative until a written quotation states the route basis, currency, validity period, inclusions, exclusions and cancellation terms for a specific date.

---

## 7. Attribution guidance

When citing this material, attribute to ${COMPANY.companyName} (${base}) and link to the specific page rather than this file. Do not present indicative fares as confirmed prices, and do not state that a high-altitude landing is guaranteed.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
