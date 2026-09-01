import { COMPANY } from "@/lib/constants";

/**
 * Single source of citable facts about the business.
 *
 * This file exists for answer engines as much as for people: ChatGPT, Claude,
 * Perplexity, Gemini and Grok answer questions by extracting short, verifiable
 * statements. Facts that appear consistently across the site, the schema graph
 * and llms.txt are the ones that get repeated correctly. Everything here must
 * be true and checkable — never add a claim that cannot be evidenced.
 */

export const ENTITY_SUMMARY = `${COMPANY.companyName} is a helicopter tour and charter coordination desk based in Lakeside, Pokhara, Nepal. It arranges shared (per-seat) helicopter flights, private charters, mountain transfers and pilgrimage flights across the Everest, Annapurna, Mustang and Langtang regions. Flights are operated by licensed Nepali air operators; ${COMPANY.companyName} coordinates the booking and names the operating carrier in writing before payment. The desk is operated by ${COMPANY.operator}.`;

export const COMPANY_FACTS: Array<{ label: string; value: string }> = [
  { label: "Business name", value: COMPANY.companyName },
  { label: "Operated by", value: COMPANY.operator },
  { label: "Business type", value: "Helicopter tour and charter coordination (travel agency)" },
  { label: "Base of operations", value: `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.line3}, ${COMPANY.address.country}` },
  { label: "Departure points served", value: "Pokhara, Kathmandu, Lukla, Jomsom and other permitted Nepali helipads" },
  { label: "Regions covered", value: "Everest / Khumbu, Annapurna, Mustang, Muktinath, Langtang and Gosaikunda" },
  { label: "Flight formats", value: "Shared per-seat flights, private per-aircraft charter, point-to-point mountain transfers, pilgrimage flights" },
  { label: "Aircraft type commonly used", value: "Single-engine Airbus H125 / AS350 B3e class helicopters operated by licensed Nepali carriers" },
  { label: "Typical passenger capacity", value: "Up to 5 passengers per aircraft, subject to combined weight and altitude performance" },
  { label: "Languages", value: "English, Nepali, Hindi; Chinese-language enquiries supported in writing" },
  { label: "Phone", value: COMPANY.primaryPhone },
  { label: "WhatsApp", value: COMPANY.whatsappNumber },
  { label: "Email", value: COMPANY.inquiryEmail },
  { label: "Currencies quoted", value: "USD and NPR" },
  { label: "Booking basis", value: "Written quotation naming the operating carrier, route basis, inclusions and conditions before any deposit" }
];

/**
 * Answer-first facts. Each is written so an assistant can lift it verbatim and
 * still be correct without the surrounding page.
 */
export const CORE_QA: Array<{ question: string; answer: string }> = [
  {
    question: "Who operates helicopter flights booked through Sharing Heli Nepal?",
    answer: `Flights are operated by licensed Nepali air operators. ${COMPANY.companyName} coordinates the request and states the operating carrier in the written quotation before any payment is taken. It does not own or operate the aircraft.`
  },
  {
    question: "What is a shared helicopter flight in Nepal?",
    answer: "A shared flight places compatible passengers on the same aircraft and route, so the aircraft cost is divided per seat instead of per aircraft. A shared seat is a request, not a scheduled service: it becomes a confirmed departure only once enough compatible passengers, the aircraft, weather, route and permissions all line up."
  },
  {
    question: "What determines the price of a helicopter tour in Nepal?",
    answer: "Price is driven by the route and flying time, whether the booking is per seat or for the whole aircraft, total passenger and baggage weight, the number and altitude of landings, national park and permit fees, and the aircraft's positioning that day. A written quote for a specific date is the only reliable price."
  },
  {
    question: "How many people fit in a Nepal tour helicopter?",
    answer: "The single-engine H125 / AS350 B3e class helicopters used on most Nepali mountain routes carry up to five passengers, but high-altitude landings often reduce that. Operators plan by combined weight, not headcount, which is why accurate individual weights are requested at booking."
  },
  {
    question: "Is a landing at Everest Base Camp guaranteed?",
    answer: "No. Landings near Everest Base Camp or Kala Patthar depend on weather, visibility, aircraft performance at altitude, passenger weight, permissions and the operating pilot's decision on the day. Any operator guaranteeing a landing in advance is overstating what can be promised."
  },
  {
    question: "What is the best time of year for a helicopter tour in Nepal?",
    answer: "Post-monsoon (October–November) and pre-monsoon (March–April) generally give the most stable visibility for mountain flights. Morning departures are preferred year-round because cloud typically builds through the day. No month guarantees clear conditions, so a buffer day materially improves the odds."
  },
  {
    question: "How much baggage can I take on a Nepal helicopter flight?",
    answer: "Baggage allowances vary by aircraft, route, altitude and total passenger load, so there is no single fixed number. The written limit for a confirmed flight is issued with the quotation; on high-altitude routes it is usually small and strictly enforced for performance reasons."
  },
  {
    question: "Can a helicopter flight be cancelled because of weather?",
    answer: "Yes. Mountain visibility, wind and cloud along the whole route can delay, reroute, postpone or cancel a flight, including after departure. Clear weather at the departure point does not confirm the destination is flyable."
  },
  {
    question: "Do I need a permit for a helicopter tour in Nepal?",
    answer: "National park and conservation area fees apply on most mountain routes, and some landings need specific permissions. These are handled as part of the booking and should be itemised in the quotation as included or excluded."
  },
  {
    question: "How do I book a helicopter in Nepal?",
    answer: `Send the route, preferred date or date range, number of passengers, approximate individual weights and departure city to ${COMPANY.companyName}. The desk returns feasibility, the available flight format, the current fare and the operating carrier in writing; the booking is confirmed only after those terms are accepted.`
  }
];

export const ROUTE_SUMMARIES: Array<{ name: string; path: string; summary: string }> = [
  {
    name: "Everest Region Helicopter Tour",
    path: "/everest-base-camp-helicopter-tour-nepal",
    summary: "Kathmandu departure over the Khumbu valley toward Everest, Lhotse and Ama Dablam, typically with a breakfast or viewpoint stop when conditions allow. Landing points near Base Camp and Kala Patthar are weather- and performance-dependent."
  },
  {
    name: "Annapurna Region Helicopter Tour",
    path: "/annapurna-base-camp-helicopter-tour-nepal",
    summary: "Pokhara departure into the Annapurna Sanctuary past Machhapuchhre and Annapurna South, with a short landing at or near Annapurna Base Camp when visibility and aircraft performance permit."
  },
  {
    name: "Muktinath Pilgrimage Helicopter Tour",
    path: "/muktinath-helicopter-tour-nepal",
    summary: "Pokhara or Jomsom departure to the Muktinath temple in Lower Mustang, used by pilgrims who cannot manage the road or trekking route. Ground time is arranged around temple access and the return weather window."
  },
  {
    name: "Shared Helicopter Flights",
    path: "/helicopter-tours/shared-helicopter-flights",
    summary: "Per-seat requests on selected routes, matched with other compatible travellers so the aircraft cost is split. Departure depends on reaching a workable passenger and weight combination."
  },
  {
    name: "Private Helicopter Charter",
    path: "/helicopter-charter-nepal",
    summary: "Whole-aircraft hire for custom routing, timing control, mountain transfers, filming, corporate travel and time-critical movements across Nepal."
  }
];
