import type { LandingContent } from "@/lib/seo/landing/types";

const COST_TABLE_NOTE =
  "This table describes how a Nepal helicopter fare is assembled, not a price list. Any figure quoted anywhere online is indicative until a written quotation names the route basis, currency, validity period, inclusions, exclusions and cancellation terms for a specific date.";

export const packagesHub: LandingContent = {
  path: "/nepal-helicopter-tour-packages",
  eyebrow: "All helicopter packages",
  title: "Nepal Helicopter Tour Packages",
  answer:
    "Nepal helicopter tour packages fall into three types: shared per-seat flights where travellers split one aircraft, private charters where you book the whole helicopter, and point-to-point mountain transfers. The main routes are Everest and the Khumbu from Kathmandu, Annapurna Base Camp and Mardi Himal from Pokhara, Muktinath and Mustang for pilgrims, and Langtang and Gosaikunda for short Kathmandu departures.",
  heroImage: "/images/campaign/everest-helicopter.jpg",
  heroImageAlt: "Helicopter flying between Himalayan peaks in Nepal",
  quickFacts: [
    { label: "Package types", value: "Shared seat, private charter, mountain transfer" },
    { label: "Main departure cities", value: "Kathmandu and Pokhara" },
    { label: "Typical flight duration", value: "1 to 5 hours including ground stops" },
    { label: "Aircraft", value: "Single-engine H125 / AS350 B3e class" },
    { label: "Passengers per aircraft", value: "Up to 5, weight permitting" },
    { label: "Best months", value: "October to November, March to April" }
  ],
  sections: [
    {
      heading: "The three package formats, and which one fits your trip",
      paragraphs: [
        "Almost every helicopter product sold in Nepal is one of three things wearing different marketing names. A shared flight puts compatible travellers on the same aircraft and route so the cost of the helicopter is divided between seats. A private charter books the entire aircraft for your group, so you control departure time, routing and how long you stay on the ground. A transfer moves you between two points, usually to save a multi-day walk or to recover a schedule after a delay.",
        "The right choice usually comes down to how much flexibility you have. Shared flights are the cheapest way to see a big mountain route, but they only depart when enough compatible passengers line up on the same day, and you inherit the group's timing. Private charters cost more per group but remove the matching problem entirely, which matters if you have one fixed day in Nepal or a family that cannot be split across departures.",
        "There is no quality difference in the flying itself. The same operators, the same aircraft types and the same weather rules apply. What changes is who controls the schedule."
      ],
      bullets: [
        "Fixed dates and a tight itinerary usually mean private charter",
        "Flexible dates and a smaller budget favour a shared seat",
        "Groups of four or five often reach charter pricing anyway once seats are added up",
        "Pilgrimage groups with elderly travellers usually prefer charter for ground-time control"
      ]
    },
    {
      heading: "Routes worth knowing before you compare packages",
      paragraphs: [
        "Everest region flights leave from Kathmandu and run up the Khumbu valley past Lukla and Namche toward Everest, Lhotse, Nuptse and Ama Dablam. Most itineraries include a landing at a viewpoint such as Kala Patthar or a breakfast stop at Everest View Hotel in Syangboche, both subject to weather and aircraft performance on the day.",
        "Annapurna flights are Pokhara-based and much shorter, entering the Annapurna Sanctuary past Machhapuchhre toward Annapurna Base Camp. Because Pokhara sits low and close to the range, these flights are efficient and often the best value scenic option in Nepal.",
        "Muktinath and Mustang flights serve pilgrims and travellers heading into the trans-Himalayan desert north of the Annapurnas. Langtang and Gosaikunda flights are the short option out of Kathmandu when Everest is either weathered out or beyond budget."
      ]
    },
    {
      heading: "What is normally included, and what is not",
      paragraphs: [
        "Inclusions vary by operator and route, which is exactly why a written quotation matters more than a package name. As a rule, the aircraft, crew and the flown route are included. National park and conservation area fees, landing fees at specific points, airport taxes, meals during ground stops, and hotel transfers may or may not be.",
        "Read any package that advertises an unusually low headline number with that split in mind. A per-seat figure that excludes park fees and a ground stop is not comparable to one that includes them."
      ],
      bullets: [
        "Usually included: aircraft, crew, the flown routing, standard safety briefing",
        "Often extra: national park and conservation fees, specific landing fees, meals on ground stops",
        "Almost never included: travel insurance, personal expenses, extra ground time beyond the plan",
        "Never assume included: a guaranteed landing at a named high-altitude point"
      ]
    },
    {
      heading: "How weather shapes every package in Nepal",
      paragraphs: [
        "Helicopter flying in the Himalaya is a morning activity. Cloud typically builds through the day, so first-light departures have the best chance of a clean route and a landing. A package sold with an afternoon slot is not automatically worse, but it carries more risk of being reduced, rerouted or postponed.",
        "Build at least one buffer day into any itinerary that includes a mountain flight. It is the single change that most improves the odds of flying at all, and it costs nothing until you use it."
      ]
    }
  ],
  table: {
    caption: "Comparing the three package formats",
    note: COST_TABLE_NOTE,
    columns: ["Format", "Priced by", "Departure certainty", "Best for"],
    rows: [
      [
        "Shared seat",
        "Per person",
        "Depends on other travellers joining the same route and date",
        "Flexible travellers, solos and couples, budget-led planning"
      ],
      [
        "Private charter",
        "Per aircraft",
        "Independent of other passengers; still weather-dependent",
        "Fixed dates, families, pilgrimage groups, filming, custom routing"
      ],
      [
        "Point-to-point transfer",
        "Per aircraft or per seat on some sectors",
        "Depends on aircraft positioning that day",
        "Skipping a trekking section, schedule recovery, evacuation of a plan"
      ]
    ]
  },
  faqs: [
    {
      question: "What is the cheapest helicopter tour in Nepal?",
      answer:
        "A shared seat on a short Pokhara-based Annapurna route is normally the least expensive way to fly, because the flight is short and the aircraft cost is split across passengers. Everest routes cost more simply because they are longer and involve higher-altitude operations."
    },
    {
      question: "Can I customise a helicopter tour package?",
      answer:
        "Yes, on a private charter. You can adjust routing, ground time and departure point within what the aircraft, weather, permissions and daylight allow. Shared flights follow a fixed route, because the routing has to work for everyone on board."
    },
    {
      question: "How long does a Nepal helicopter tour take?",
      answer:
        "Annapurna scenic flights from Pokhara are commonly one to two hours door to door. Everest region tours from Kathmandu usually run four to five hours including refuelling and ground stops. Transfers depend entirely on the sector."
    },
    {
      question: "Do helicopter packages include a landing?",
      answer:
        "Most scenic packages plan a landing at a viewpoint, but a landing is always conditional. Visibility, wind, aircraft performance at altitude, total passenger weight and the pilot's judgement on the day decide whether it happens."
    },
    {
      question: "How far in advance should I book?",
      answer:
        "For October, November, March and April, several weeks ahead is sensible because these are the busiest months and aircraft availability tightens. Outside those months a few days is often enough, though weather flexibility matters more."
    },
    {
      question: "Is a helicopter tour worth it compared with trekking?",
      answer:
        "They answer different needs. A helicopter gives you the view and the altitude in hours instead of days, which suits limited time, mobility constraints or pilgrimage travel. Trekking gives you acclimatisation, distance and the culture of the trail. Many travellers do one of each."
    }
  ],
  related: [
    { title: "Everest helicopter tour cost", description: "What drives the price of a Khumbu flight.", href: "/everest-helicopter-tour-cost" },
    { title: "Annapurna helicopter tour cost", description: "Pokhara departures and what they include.", href: "/annapurna-helicopter-tour-cost" },
    { title: "Shared helicopter flights", description: "How per-seat matching actually works.", href: "/helicopter-tours/shared-helicopter-flights" }
  ],
  about: ["Helicopter tour", "Nepal", "Everest", "Annapurna", "Muktinath", "Langtang"],
  marketRatePattern: /./,
  marketRateHeading: "Published rates across the Nepali market",
  reviewedOn: "2026-08-19",
  breadcrumbParent: { name: "Tours", path: "/tours" }
};

export const everestCost: LandingContent = {
  path: "/everest-helicopter-tour-cost",
  eyebrow: "Cost explained",
  title: "Everest Helicopter Tour Cost",
  answer:
    "An Everest helicopter tour is priced either per seat on a shared flight or per aircraft on a private charter, and the two numbers are not comparable. The cost is built from flying time between Kathmandu and the Khumbu, a refuelling stop, Sagarmatha National Park and municipality fees, any landing at Kala Patthar or Everest View Hotel, and the aircraft's positioning that day. A written quote for your date is the only reliable figure.",
  heroImage: "/images/campaign/everest-helicopter.jpg",
  heroImageAlt: "Everest region seen from a helicopter over the Khumbu valley",
  quickFacts: [
    { label: "Priced as", value: "Per seat (shared) or per aircraft (private)" },
    { label: "Departure", value: "Kathmandu" },
    { label: "Typical total duration", value: "4 to 5 hours door to door" },
    { label: "Refuelling stop", value: "Usually Lukla or Syangboche" },
    { label: "Mandatory extras", value: "Sagarmatha National Park and local fees" },
    { label: "Landing", value: "Planned but never guaranteed" }
  ],
  sections: [
    {
      heading: "Why one route produces two very different prices",
      paragraphs: [
        "The most common mistake travellers make when comparing Everest helicopter quotes is comparing a per-seat number against a per-aircraft number. A shared flight divides one helicopter between passengers, so the number you see is roughly the aircraft cost split several ways. A private charter is the whole aircraft, so it looks several times larger while often costing a group about the same in total.",
        "When you collect quotes, normalise them first. Ask every provider whether the figure is per person or per aircraft, how many passengers it assumes, and what happens to the price if the group size changes. A quote that does not state this clearly is not a quote you can compare."
      ]
    },
    {
      heading: "The components that actually make up the fare",
      paragraphs: [
        "Flying time dominates. Kathmandu to the Khumbu and back is a long sector, and helicopters are costed by the hour of flight, so the Everest routing is structurally more expensive than a Pokhara-based Annapurna flight.",
        "After that come the fixed costs that apply regardless of who you fly with: a refuelling stop, Sagarmatha National Park entry and local municipality fees, and landing charges at the specific points your itinerary uses. A breakfast stop at Everest View Hotel adds a meal cost and ground time.",
        "Finally there is positioning. If the aircraft has to fly empty to reach your departure point, or is repositioned after your flight, that time is real and gets priced in. This is why the same route can be quoted differently on two dates."
      ],
      bullets: [
        "Flight time between Kathmandu and the Khumbu, both directions",
        "Refuelling stop, typically at Lukla or Syangboche",
        "Sagarmatha National Park entry and municipality fees",
        "Landing fees at Kala Patthar, Syangboche or other used points",
        "Ground time and any meal at a viewpoint stop",
        "Aircraft positioning on your date"
      ]
    },
    {
      heading: "Where the landing fits in, and why it is never sold as certain",
      paragraphs: [
        "The high-altitude landing is the part of the itinerary most likely to change. Kala Patthar sits above 5,500 metres, where a single-engine helicopter carries far less than at Kathmandu's elevation. Operators often shuttle passengers up in smaller groups for exactly this reason, and that shuttling costs time.",
        "Weather, wind, visibility, total passenger weight and the pilot's assessment all decide whether the landing happens. Any provider guaranteeing a Base Camp or Kala Patthar landing in writing is promising something that is not theirs to promise. A fair quote describes the landing as planned and explains what happens if it cannot go ahead."
      ]
    },
    {
      heading: "Where published Everest rates actually sit",
      paragraphs: [
        "As of August 2026, Nepali operators and agencies advertise shared-basis Everest scenic tours at roughly USD 1,240 to 1,600 per person, and private charters of the whole aircraft at roughly USD 5,800 to 6,500. Some published per-person figures are quoted before Nepal VAT and before Sagarmatha National Park and municipality fees, which is a large part of why quotes that look similar are not.",
        "Treat those numbers as a sanity check rather than a target. A quote materially below the published band usually has something excluded — park fees, a landing, the breakfast stop or the ground shuttle — and a quote materially above it should come with a reason, such as a longer routing or a repositioned aircraft.",
        "The table below records what specific operators publish, with links, so you can verify it yourself rather than take our word for it."
      ]
    },
    {
      heading: "What to check before you pay a deposit",
      paragraphs: [
        "Get the operating carrier named in writing. In Nepal, the company selling the tour is often not the company flying the aircraft, and you are entitled to know which licensed operator holds the flight.",
        "Then confirm the money terms: what the fare includes and excludes, the currency, how long the quote is valid, what happens if weather cancels the flight, what happens if you cancel, and which third-party costs are non-refundable. These four answers separate a professional quotation from a headline number."
      ]
    }
  ],
  table: {
    caption: "What you are paying for on an Everest helicopter flight",
    note: COST_TABLE_NOTE,
    columns: ["Cost component", "Why it exists", "Varies with"],
    rows: [
      ["Flight time", "Helicopters are costed per flying hour", "Route length, refuelling, ground shuttles"],
      ["Fuel and refuelling stop", "The Khumbu sector requires an uplift", "Fuel price, stop location"],
      ["National park and local fees", "Sagarmatha National Park and municipality charges", "Passenger nationality and current rates"],
      ["Landing fees", "Charged at specific helipads and viewpoints", "Which points the itinerary uses"],
      ["Ground stop and meals", "Breakfast stops carry a per-person cost", "Whether a meal stop is included"],
      ["Aircraft positioning", "Empty legs to reach or leave your departure point", "Date, demand, where the aircraft is based"],
      ["Shared vs private basis", "Splitting the aircraft across seats, or not", "Group size and passenger matching"]
    ]
  },
  faqs: [
    {
      question: "Is the Everest helicopter tour price per person or per helicopter?",
      answer:
        "Both exist. Shared flights are quoted per person, private charters per aircraft. Always confirm which basis a quote uses and how many passengers it assumes before comparing it with another."
    },
    {
      question: "Why do Everest helicopter quotes differ so much between companies?",
      answer:
        "Usually because they include different things. Park fees, landing fees, a breakfast stop and ground shuttle time may be inside one quote and outside another. Positioning costs on your specific date also move the number."
    },
    {
      question: "Does the price include Sagarmatha National Park fees?",
      answer:
        "Sometimes. It must be stated explicitly in the quotation. If the inclusion list does not mention park and municipality fees, assume they are extra and ask."
    },
    {
      question: "Do I pay less if I am flexible on dates?",
      answer:
        "Flexibility mainly improves your chance of joining a shared flight, which is the cheaper basis. It also helps operators combine your trip with other movements, which can reduce positioning cost."
    },
    {
      question: "What happens to my money if weather cancels the flight?",
      answer:
        "That depends on the terms in your written quotation, not on any general rule. Ask specifically how weather postponement, operator cancellation and customer cancellation are each handled, and which third-party fees are non-refundable."
    },
    {
      question: "Is Everest Base Camp itself a landing point?",
      answer:
        "Scenic tours normally land at Kala Patthar or a nearby viewpoint rather than at Base Camp itself, and the landing depends entirely on conditions and aircraft performance that morning."
    }
  ],
  related: [
    { title: "Everest region helicopter tour", description: "The route, timing and what the day looks like.", href: "/everest-base-camp-helicopter-tour-nepal" },
    { title: "Is the Everest heli tour safe?", description: "How risk is actually managed on this route.", href: "/guides/is-everest-base-camp-helicopter-tour-safe" },
    { title: "Weight and baggage limits", description: "Why operators ask for individual weights.", href: "/helicopter-weight-baggage-limits-nepal" }
  ],
  about: ["Everest", "Sagarmatha National Park", "Kala Patthar", "Helicopter tour cost"],
  marketRatePattern: /Everest|Lukla|flying hour/i,
  marketRateHeading: "What Everest helicopter tours are advertised at",
  reviewedOn: "2026-08-19",
  breadcrumbParent: { name: "Tours", path: "/tours" },
  ctaHeading: "Get a real Everest quote, not a headline number",
  ctaBody:
    "Send your date, group size and approximate weights. You get the flight format that actually works, the current fare with inclusions listed, and the operating carrier named in writing."
};

export const annapurnaCost: LandingContent = {
  path: "/annapurna-helicopter-tour-cost",
  eyebrow: "Cost explained",
  title: "Annapurna Helicopter Tour Cost",
  answer:
    "Annapurna helicopter tours are usually the best-value mountain flight in Nepal because they depart from Pokhara, which sits close to the range, so flying time is short. Cost is built from flight time into the Annapurna Sanctuary, Annapurna Conservation Area fees, any landing at or near Annapurna Base Camp, and whether you book a shared seat or the whole aircraft.",
  heroImage: "/images/campaign/annapurna-helicopter.jpg",
  heroImageAlt: "Helicopter above the Annapurna range in Nepal",
  quickFacts: [
    { label: "Priced as", value: "Per seat (shared) or per aircraft (private)" },
    { label: "Departure", value: "Pokhara" },
    { label: "Typical total duration", value: "1 to 2 hours door to door" },
    { label: "Mandatory extras", value: "Annapurna Conservation Area fees" },
    { label: "Common landing", value: "Annapurna Base Camp area, conditions permitting" },
    { label: "Also flown from Pokhara", value: "Mardi Himal, Machhapuchhre, Tilicho, Muktinath" }
  ],
  sections: [
    {
      heading: "Why Pokhara departures cost less than Kathmandu ones",
      paragraphs: [
        "Pokhara sits about 25 kilometres from the Annapurna massif. A helicopter can be inside the Sanctuary within twenty minutes of lifting off, which means the flying-hour count that drives the fare is far lower than an Everest routing out of Kathmandu.",
        "That geography is the single biggest reason Annapurna scenic flights are the entry point for most travellers who want a mountain flight without an Everest budget. It also means there is less scope for a low quote to hide missing inclusions — there simply are fewer moving parts."
      ]
    },
    {
      heading: "What goes into an Annapurna fare",
      paragraphs: [
        "Flight time into the Sanctuary and back, plus any ground time at the landing point, is the core. Annapurna Conservation Area Project fees apply to the region and should appear explicitly in your quotation as included or excluded.",
        "If your itinerary adds Mardi Himal, Machhapuchhre Base Camp, Tilicho Lake or a continuation to Muktinath, each adds flying time and possibly a further landing fee. Ask for the routing to be written out rather than described by name only."
      ],
      bullets: [
        "Flight time between Pokhara and the Annapurna Sanctuary",
        "Annapurna Conservation Area Project fees",
        "Landing fees at Annapurna Base Camp or an alternative viewpoint",
        "Additional sectors if Mardi, Tilicho or Muktinath are added",
        "Shared versus private basis, and assumed passenger count"
      ]
    },
    {
      heading: "Shared seats work better here than almost anywhere in Nepal",
      paragraphs: [
        "Because the route is short and popular, Pokhara sees more shared-seat demand than most Nepali helicopter routes, so the chance of being matched onto a departure is comparatively good — particularly in October, November, March and April.",
        "It still is not a scheduled service. A shared request becomes a flight when the passenger mix, total weight, aircraft and weather all work on the same morning. Treat a shared booking as a strong possibility rather than a ticket, and keep the rest of that day flexible."
      ]
    },
    {
      heading: "Where published Annapurna rates actually sit",
      paragraphs: [
        "As of August 2026, published rates for a private Pokhara to Annapurna Base Camp flight cluster around USD 2,200 to 2,500 for the whole aircraft, while group-joining per-seat rates are advertised from roughly USD 440 to 500 per person when five passengers travel. The same route flown from Kathmandu is advertised at roughly USD 4,200 to 4,500 per aircraft, which is the transit cost made visible.",
        "Note how cleanly the per-seat number falls out of the aircraft price once five people are on board. That relationship is the quickest way to check whether a per-person quote is reasonable: divide the whole-aircraft price by the passenger count it assumes."
      ]
    },
    {
      heading: "Altitude, weight and the Base Camp landing",
      paragraphs: [
        "Annapurna Base Camp sits around 4,130 metres. That is lower than Kala Patthar but still high enough that combined passenger weight changes what the aircraft can do. Operators plan by kilograms, not headcount, so accurate individual weights at booking directly affect whether the planned landing is possible.",
        "As with every mountain route in Nepal, the landing is conditional. A quote should describe it as planned, and set out what happens if the crew has to substitute a lower viewpoint or return early."
      ]
    }
  ],
  table: {
    caption: "What you are paying for on an Annapurna helicopter flight",
    note: COST_TABLE_NOTE,
    columns: ["Cost component", "Why it exists", "Varies with"],
    rows: [
      ["Flight time", "Costed per flying hour from Pokhara", "Routing and added sectors"],
      ["Conservation area fees", "Annapurna Conservation Area Project charges", "Nationality and current rates"],
      ["Landing fee", "Charged at the helipad used", "Which point the flight lands at"],
      ["Ground time", "Time on the ground is aircraft time", "Planned stop length"],
      ["Added sectors", "Mardi, Tilicho, Muktinath extend the route", "Itinerary chosen"],
      ["Shared vs private basis", "Aircraft cost split, or not", "Group size and matching"]
    ]
  },
  faqs: [
    {
      question: "Is an Annapurna helicopter tour cheaper than Everest?",
      answer:
        "Generally yes, and the reason is distance rather than quality. Pokhara is close to the Annapurna range, so the flight is much shorter than a Kathmandu to Khumbu routing, and flying time is the dominant cost."
    },
    {
      question: "Does the fare include Annapurna Conservation Area fees?",
      answer:
        "It should be stated either way in the written quotation. If the inclusions list is silent on conservation area fees, assume they are extra and ask before paying."
    },
    {
      question: "Can I fly from Kathmandu to Annapurna Base Camp?",
      answer:
        "Yes, but it adds a long transit each way and therefore substantial cost. Most travellers fly or drive to Pokhara first and take the helicopter from there."
    },
    {
      question: "How long is the landing at Annapurna Base Camp?",
      answer:
        "Ground time is typically short — often ten to fifteen minutes — because the aircraft is running and conditions can change quickly. The exact allowance should be written into your itinerary."
    },
    {
      question: "Can we add Muktinath to an Annapurna flight?",
      answer:
        "Yes. Pokhara is the usual departure point for Muktinath as well, and combined routings are common for pilgrimage groups. It adds flying time and possibly another landing fee, so ask for the combined routing in writing."
    },
    {
      question: "What is the best time of day to fly from Pokhara?",
      answer:
        "Early morning. Cloud builds over the Annapurnas through the day, so first departures reliably offer the best visibility and the best chance of completing the planned landing."
    }
  ],
  related: [
    { title: "Annapurna region helicopter tour", description: "Route detail, timing and inclusions.", href: "/annapurna-base-camp-helicopter-tour-nepal" },
    { title: "Pokhara helicopter service", description: "Everything flown out of Pokhara.", href: "/pokhara-helicopter-service" },
    { title: "Pokhara to Muktinath by helicopter", description: "The pilgrimage routing explained.", href: "/pokhara-to-muktinath-helicopter" }
  ],
  about: ["Annapurna", "Annapurna Base Camp", "Pokhara", "Helicopter tour cost"],
  marketRatePattern: /Annapurna|flying hour/i,
  marketRateHeading: "What Annapurna helicopter tours are advertised at",
  reviewedOn: "2026-08-19",
  breadcrumbParent: { name: "Tours", path: "/tours" }
};
