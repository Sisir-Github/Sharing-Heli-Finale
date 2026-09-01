import type { LandingContent } from "@/lib/seo/landing/types";

export const charterCost: LandingContent = {
  path: "/private-helicopter-charter-cost-nepal",
  eyebrow: "Charter pricing",
  title: "Private Helicopter Charter Cost in Nepal",
  answer:
    "A private helicopter charter in Nepal is priced per aircraft per flying hour, not per passenger. The quote covers the hours actually flown including any empty positioning legs, plus fuel, landing and park fees, crew time and waiting time on the ground. Because the whole aircraft is yours, the total is the same whether one person or five travel, which is why charter often matches shared-seat pricing once a group reaches four or five people.",
  heroImage: "/images/campaign/sharing-heli-hero.jpg",
  heroImageAlt: "Private charter helicopter in Nepal",
  quickFacts: [
    { label: "Priced as", value: "Per aircraft, per flying hour" },
    { label: "Passengers", value: "Up to 5, subject to combined weight" },
    { label: "Departure points", value: "Kathmandu, Pokhara, and permitted helipads" },
    { label: "Positioning legs", value: "Chargeable if the aircraft flies empty to reach you" },
    { label: "Ground waiting", value: "Usually billed, rates vary by operator" },
    { label: "Typical uses", value: "Custom routing, transfers, filming, pilgrimage, time-critical travel" }
  ],
  sections: [
    {
      heading: "The flying hour is the unit that matters",
      paragraphs: [
        "Charter pricing in Nepal is built on aircraft time. Everything else — fuel, crew, maintenance reserve, insurance — is folded into an hourly rate for the aircraft type, and your quote is essentially that rate multiplied by the hours your trip will consume.",
        "This is why a short Pokhara scenic flight and a multi-sector Everest day look so different on paper. It is also why adding a single extra landing can move a quote noticeably: the aircraft is running, and the clock does not stop while you are on the ground."
      ]
    },
    {
      heading: "Positioning: the cost travellers most often miss",
      paragraphs: [
        "Helicopters do not wait at every airport. If the nearest available aircraft is based in Kathmandu and your flight departs Pokhara, someone has to pay for the empty leg that brings it there, and possibly the empty leg that takes it home.",
        "Good quotes state positioning explicitly. If a figure looks unusually low, positioning is the first thing to ask about — and if an operator can combine your movement with another job on the same day, that is where genuine savings come from.",
        "The reverse is also true. Being flexible about your departure point or time occasionally lets you pick up an aircraft that is already in position, which is the single most effective way to reduce a charter bill."
      ],
      bullets: [
        "Ask whether the quoted hours include empty positioning legs",
        "Ask where the aircraft is based on your date",
        "Ask whether ground waiting time is billed, and at what rate",
        "Ask what happens if the return leg is delayed by weather overnight"
      ]
    },
    {
      heading: "Weight is a hard constraint, not a guideline",
      paragraphs: [
        "A single-engine H125-class helicopter seats five passengers at low elevation. At high-altitude landing points that number falls, sometimes substantially, because thinner air reduces the power available to hover and land safely.",
        "This is why operators ask for individual passenger weights rather than a headcount, and why an accurate answer at booking is in your own interest. An underestimate discovered at the helipad forces a reshuffle, a second shuttle, or a cancelled landing — all of which cost time and money."
      ]
    },
    {
      heading: "Where published charter rates sit",
      paragraphs: [
        "As of August 2026, Nepali operators publish single-engine helicopter charter rates of roughly USD 1,300 to 3,000 per flying hour, with the spread driven by aircraft type, route and season. Whole-aircraft route prices follow from that: Pokhara to Annapurna Base Camp at roughly USD 2,200 to 2,500, Pokhara to Muktinath around USD 3,200, Langtang around USD 2,400, Gosaikunda around USD 2,000, Kathmandu to Lukla around USD 3,200, and an Everest scenic charter at roughly USD 5,800 to 6,500.",
        "Those figures are a useful floor for judging a quote, but they rarely include everything. Park and conservation fees, landing charges at specific helipads and ground waiting are the three items most often quoted separately, and positioning is the one most often left unmentioned altogether."
      ]
    },
    {
      heading: "When charter beats buying seats",
      paragraphs: [
        "Run the arithmetic before assuming charter is the expensive option. Four or five per-seat fares on the same route frequently approach the cost of the whole aircraft, and the charter comes with control over departure time, routing and ground time that a shared flight cannot offer.",
        "Charter also removes the matching risk entirely. A shared seat depends on other travellers appearing; a charter depends only on weather and aircraft availability. For a group with one fixed day in Nepal, that difference is usually worth more than the price gap."
      ]
    }
  ],
  table: {
    caption: "Charter quote components to check line by line",
    note:
      "Ask for every line below to be shown as included or excluded. A quote that lists only a single total is not comparable with one that itemises, and the difference is usually park fees, positioning and ground waiting.",
    columns: ["Line item", "What to ask", "Why it matters"],
    rows: [
      ["Aircraft hourly rate", "Which aircraft type, and the rate per hour", "Sets the base of the whole quote"],
      ["Estimated flight hours", "Route breakdown by sector", "Lets you sanity-check the total"],
      ["Positioning legs", "Are empty legs included or extra", "Most common source of quote differences"],
      ["Fuel and refuelling stops", "Where the aircraft refuels on this routing", "Adds time as well as cost"],
      ["Park and conservation fees", "Included or payable separately", "Often excluded from headline figures"],
      ["Landing fees", "Which helipads, and at what charge", "Varies by point used"],
      ["Ground waiting", "Billed per hour or included", "Long temple or photo stops add up"],
      ["Weather contingency", "What happens on postponement or overnight delay", "Decides who carries the cost of a weather day"]
    ]
  },
  faqs: [
    {
      question: "How much does it cost to charter a helicopter in Nepal?",
      answer:
        "It is quoted per aircraft per flying hour, so the total depends entirely on your routing, landings and positioning. Ask for an itemised quote covering hours, positioning, fees and waiting time rather than comparing single headline numbers."
    },
    {
      question: "Is charter cheaper than buying five seats?",
      answer:
        "Often it is close. Once a group reaches four or five people, per-seat fares on the same route frequently approach the whole-aircraft price, and the charter adds control over timing and routing."
    },
    {
      question: "Can I hire a helicopter for a single one-way transfer?",
      answer:
        "Yes. Point-to-point transfers are common, for example Lukla to Kathmandu when flights are backed up, or Pokhara to Jomsom. Whether the return empty leg is chargeable depends on where the aircraft is needed next."
    },
    {
      question: "How many passengers fit on a charter?",
      answer:
        "Up to five on the single-engine types used for most Nepali mountain work, but combined weight and landing altitude can reduce that. Provide accurate individual weights and the operator will plan the load properly."
    },
    {
      question: "Do I pay for the helicopter while it waits on the ground?",
      answer:
        "Usually yes, though the rate and any free allowance vary by operator. This is worth confirming in writing if your plan includes a long temple visit, a photo shoot or a meeting on the ground."
    },
    {
      question: "Who operates the aircraft on a charter?",
      answer:
        "A licensed Nepali air operator. The coordinating company should name the operating carrier in the written quotation before you pay a deposit, and you are entitled to ask for that in writing."
    }
  ],
  related: [
    { title: "Helicopter charter Nepal", description: "The service, requirements and how to request it.", href: "/helicopter-charter-nepal" },
    { title: "How to book a helicopter in Nepal", description: "What to send, and what to get back.", href: "/how-to-book-a-helicopter-in-nepal" },
    { title: "Weight and baggage limits", description: "Why kilograms decide the plan.", href: "/helicopter-weight-baggage-limits-nepal" }
  ],
  about: ["Helicopter charter", "Nepal", "Aviation pricing"],
  marketRatePattern: /./,
  marketRateHeading: "Published charter rates by route",
  reviewedOn: "2026-08-19",
  breadcrumbParent: { name: "Services", path: "/services" },
  ctaHeading: "Ask for an itemised charter quote",
  ctaBody:
    "Send the routing, date, passenger count and approximate weights. You get hours, positioning, fees and waiting time broken out, with the operating carrier named."
};
