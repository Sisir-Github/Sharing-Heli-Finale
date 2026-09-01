import type { LandingContent } from "@/lib/seo/landing/types";

export const howToBook: LandingContent = {
  path: "/how-to-book-a-helicopter-in-nepal",
  eyebrow: "Booking guide",
  title: "How to Book a Helicopter in Nepal",
  answer:
    "To book a helicopter in Nepal, send the route, your date or date range, the number of passengers, approximate individual weights and your departure city. You should receive a written quotation that names the licensed operating carrier, states whether the fare is per seat or per aircraft, lists inclusions and exclusions, and sets out the weather and cancellation terms. The booking is confirmed only once those terms are accepted in writing.",
  heroImage: "/images/campaign/sharing-heli-hero.jpg",
  heroImageAlt: "Helicopter being prepared for a flight in Nepal",
  quickFacts: [
    { label: "Information needed", value: "Route, date, passengers, weights, departure city" },
    { label: "Quote should name", value: "The licensed operating carrier" },
    { label: "Fare basis", value: "Per seat (shared) or per aircraft (charter)" },
    { label: "Lead time in peak season", value: "Several weeks for October, November, March, April" },
    { label: "Confirmation", value: "In writing, before any deposit" },
    { label: "Buffer day", value: "Strongly recommended for mountain routes" }
  ],
  steps: [
    {
      name: "Send the operational details",
      text: "Route or destination, preferred date and any flexibility, passenger count, approximate individual weights, luggage, departure city, and anything relevant about mobility, age or medical conditions. Weights are not a formality: aircraft performance at altitude is calculated from them."
    },
    {
      name: "Get a feasibility answer",
      text: "A competent desk will tell you whether the route works on your date, whether a shared seat is realistic or whether you need the whole aircraft, and what the weather pattern for that period typically looks like. Expect an honest answer about landings rather than a guarantee."
    },
    {
      name: "Read the written quotation",
      text: "It should name the operating carrier, state the fare basis and currency, list what is included and excluded, give a validity period, and set out weather postponement, operator cancellation and customer cancellation terms separately."
    },
    {
      name: "Confirm and pay under stated terms",
      text: "Only pay once the terms are in writing and you understand which third-party costs are non-refundable. Keep the confirmation, the routing and the carrier name accessible on your phone."
    },
    {
      name: "Prepare for the flight window",
      text: "Reconfirm the day before, arrange an early pickup, pack warm layers, and keep the rest of that day loose. Mountain departures move for weather more often than travellers expect."
    }
  ],
  sections: [
    {
      heading: "What to send, and why each item matters",
      paragraphs: [
        "A helicopter booking is an operational request, not a shopping cart. The details you provide are the inputs to a performance calculation, so vague information produces a vague quote — and sometimes a plan that falls apart at the helipad.",
        "Individual passenger weights matter most, and travellers routinely under-report them. At Kathmandu's elevation a five-seat helicopter carries five people comfortably; at a landing point above 5,000 metres it may not. The operator is planning in kilograms, and an inaccurate figure can cost you the landing or force an extra shuttle.",
        "Date flexibility is the second most valuable thing you can offer. It improves your chance of joining a shared flight, gives the operator room to combine your movement with another, and protects you when the weather closes your first choice."
      ],
      bullets: [
        "Route or destination, and any must-see points",
        "Preferred date plus how flexible you can be",
        "Number of passengers and approximate weight of each",
        "Departure city and where you are staying",
        "Age, mobility or medical considerations",
        "Whether you want a shared seat or the whole aircraft"
      ]
    },
    {
      heading: "How to read a quotation properly",
      paragraphs: [
        "The single most useful question is whether the figure is per person or per aircraft. Everything else follows from that. A per-seat number and a per-aircraft number for the same route can differ by a factor of four or five and still both be honest.",
        "Next, look at inclusions. National park and conservation area fees, landing fees, meals at a ground stop and airport charges are the items most often left out of a headline figure. A quote that itemises them is not more expensive than one that hides them; it is just telling you the truth earlier.",
        "Finally, read the conditions. Weather postponement, operator cancellation and your own cancellation are three different events with three different outcomes, and a quote that treats them as one line is not detailed enough to rely on."
      ]
    },
    {
      heading: "Who actually flies the aircraft",
      paragraphs: [
        "In Nepal, the business that sells you a helicopter tour is very often not the business that operates the aircraft. Flights are conducted by licensed air operators; travel companies coordinate the booking. Both roles are legitimate, but you should know which is which for your flight.",
        "Ask for the operating carrier to be named in writing before you pay a deposit. A coordinator who is straightforward about this is telling you something useful about how they work. One who avoids the question is telling you something too."
      ]
    },
    {
      heading: "Timing your booking",
      paragraphs: [
        "October, November, March and April are the busiest months for mountain flying, and aircraft availability tightens well ahead. Booking several weeks out is sensible if your dates are fixed.",
        "Outside those months, a few days of notice is often enough, but weather flexibility becomes more valuable than lead time. In monsoon especially, the useful question is not how early you booked but how many days you can wait."
      ]
    }
  ],
  table: {
    caption: "Questions to ask before you pay",
    note:
      "If a provider cannot answer these in writing, that is information in itself. A professional quotation covers every row below without being asked twice.",
    columns: ["Question", "What a good answer looks like"],
    rows: [
      ["Which licensed operator flies the aircraft?", "A named company, given without hesitation"],
      ["Is the fare per person or per aircraft?", "Stated explicitly, with the assumed passenger count"],
      ["What exactly is included?", "An itemised list covering park fees, landing fees and meals"],
      ["What is excluded?", "Named separately rather than left implied"],
      ["How long is this quote valid?", "A specific date, not an open-ended figure"],
      ["What happens if weather postpones the flight?", "A defined policy, separate from cancellation terms"],
      ["What if I cancel?", "A schedule of charges, with non-refundable third-party costs identified"],
      ["Is the landing guaranteed?", "No — and a provider saying yes should concern you"]
    ]
  },
  faqs: [
    {
      question: "How far in advance should I book a helicopter in Nepal?",
      answer:
        "Several weeks for peak months — October, November, March and April — because aircraft availability tightens. Outside those periods a few days is often workable, though weather flexibility matters more than lead time."
    },
    {
      question: "Is an online booking form a confirmed booking?",
      answer:
        "No. Submitting a request starts the process. A booking exists only after availability, route, operating details, commercial terms and any required payment are confirmed in writing."
    },
    {
      question: "Why does the operator need my weight?",
      answer:
        "Helicopter performance at altitude depends on total load, not passenger count. Accurate individual weights let the operator plan seating, fuel and whether a high landing is achievable. Under-reporting risks losing the landing on the day."
    },
    {
      question: "Can I book a helicopter in Nepal from abroad?",
      answer:
        "Yes. Most bookings are arranged remotely by email or WhatsApp before arrival, which is also the best time to secure peak-season availability."
    },
    {
      question: "What documents do I need on the day?",
      answer:
        "Photo identification for the domestic terminal, your booking confirmation, and any permit documentation the operator has asked you to carry. Keep essential medication on your person rather than in baggage."
    },
    {
      question: "Should I book through a coordinator or directly with an operator?",
      answer:
        "Either can work. What matters is that the operating carrier is named, the terms are written, and the person selling to you answers operational questions clearly rather than in marketing language."
    }
  ],
  related: [
    { title: "Check availability", description: "Send your route, date and passenger details.", href: "/check-availability" },
    { title: "Safety and flight information", description: "Weather, weight, carrier disclosure and terms.", href: "/safety-flight-information" },
    { title: "Private charter cost", description: "How charter quotes are assembled.", href: "/private-helicopter-charter-cost-nepal" }
  ],
  about: ["Helicopter booking", "Nepal", "Travel planning"],
  marketRatePattern: /./,
  marketRateHeading: "Published rates, so you can sanity-check a quote",
  reviewedOn: "2026-08-19",
  breadcrumbParent: { name: "Flight information", path: "/safety-flight-information" }
};

export const weightLimits: LandingContent = {
  path: "/helicopter-weight-baggage-limits-nepal",
  eyebrow: "Practical limits",
  title: "Helicopter Weight and Baggage Limits in Nepal",
  answer:
    "Nepali tour helicopters are planned by total weight rather than seat count. A single-engine H125 class helicopter seats up to five passengers near Kathmandu or Pokhara, but at a high-altitude landing point the usable load falls sharply, so operators calculate each flight from individual passenger weights, fuel and the altitude of the planned landing. Baggage allowances are correspondingly small on mountain routes and are confirmed per flight rather than by a fixed published figure.",
  heroImage: "/images/campaign/muktinath-helicopter.jpg",
  heroImageAlt: "Helicopter on a high-altitude helipad in Nepal",
  quickFacts: [
    { label: "Planning unit", value: "Total weight, not passenger count" },
    { label: "Seats", value: "Up to 5 on H125 / AS350 B3e class" },
    { label: "Why weights are asked", value: "Aircraft performance falls with altitude" },
    { label: "Baggage on mountain routes", value: "Small; confirmed per flight" },
    { label: "High landings", value: "May require shuttling in smaller groups" },
    { label: "Accuracy", value: "Under-reporting can cost you the landing" }
  ],
  sections: [
    {
      heading: "Why altitude changes the arithmetic",
      paragraphs: [
        "A helicopter generates lift by pushing air downwards. The higher and warmer it gets, the thinner that air becomes, and the less lift the same rotor produces at the same power. This is why performance charts, not seat counts, decide what a helicopter can carry on a given day.",
        "In practice the difference is dramatic. A machine that lifts five passengers comfortably out of Pokhara at 820 metres may only be able to hover safely with two or three at a landing point above 5,000 metres. Nothing is wrong with the aircraft; that is simply physics.",
        "Temperature matters too. A warm morning reduces performance further than a cold one at the same elevation, which is another reason mountain flights depart early."
      ]
    },
    {
      heading: "What operators do with your weights",
      paragraphs: [
        "The figures you give are entered into a load and balance calculation alongside fuel and the planned landing altitude. That calculation determines how many people can be on board for the high segment, how much fuel can be carried, and whether the aircraft needs to shuttle passengers up in two groups.",
        "Shuttling is normal on Everest-region itineraries and is not a sign of a problem. It does consume time, which is why it appears in the cost structure of those tours.",
        "If a passenger's actual weight turns out to be significantly higher than declared, the crew has to redo that calculation at the helipad. The usual outcomes are a reduced landing, a longer shuttle or a cancelled high segment — with no refund, because the aircraft flew."
      ],
      bullets: [
        "Give your weight in clothing and boots, not your best number",
        "Include hand baggage and camera equipment in the estimate",
        "Tell the desk if anyone in the group is notably tall or heavy",
        "Update the operator if the group composition changes"
      ]
    },
    {
      heading: "Baggage on mountain routes",
      paragraphs: [
        "There is no single published baggage figure that applies across Nepali helicopter tours, because the allowance is whatever remains after passengers and fuel on that specific flight. On a short low-altitude scenic flight there may be reasonable room; on a high landing there may be almost none.",
        "For scenic tours, plan to carry very little: warm layers you are wearing, a camera, water, and essential medication. For transfers and charters, ask for a written baggage allowance in kilograms as part of your quotation, and confirm the dimensions if you are carrying camera cases, ski or expedition equipment.",
        "Excess baggage is not usually a payable extra on a mountain route. If it does not fit within the performance calculation, it stays behind."
      ]
    },
    {
      heading: "Practical guidance for passengers",
      paragraphs: [
        "Wear your bulk rather than packing it. A down jacket on your body is part of the passenger weight either way, and you will want it at the landing point.",
        "Keep medication, documents and anything irreplaceable on your person. If a load has to be reduced at short notice, hold baggage is the first thing to come off.",
        "If you have a specific requirement — a wheelchair, oxygen, a large camera rig, a child seat — raise it at enquiry stage rather than on the day. Most of these are workable with notice and none of them are workable as a surprise at the helipad."
      ]
    }
  ],
  table: {
    caption: "How altitude affects what a helicopter can carry",
    note:
      "This table explains the direction and cause of the effect; it is not a performance chart. Actual figures are calculated by the operating carrier for the specific aircraft, temperature, fuel state and landing point on the day, and only that calculation is authoritative.",
    columns: ["Landing elevation", "Example points", "Effect on usable load", "Common consequence"],
    rows: [
      ["Under 1,500 m", "Kathmandu, Pokhara", "Full seating normally available", "Standard boarding"],
      ["3,000 to 4,000 m", "Kyanjin Gompa, Muktinath, Syangboche", "Noticeably reduced", "Weights checked carefully; load managed"],
      ["4,000 to 5,000 m", "Annapurna Base Camp area, Gosaikunda", "Significantly reduced", "Fewer passengers per landing, short ground time"],
      ["Above 5,000 m", "Kala Patthar and similar viewpoints", "Sharply reduced", "Passengers usually shuttled in smaller groups"]
    ]
  },
  faqs: [
    {
      question: "What is the weight limit for a helicopter tour in Nepal?",
      answer:
        "There is no single limit. The operating carrier calculates a maximum total load for each flight from the aircraft type, temperature, fuel and the altitude of the planned landing, then works backwards to how many passengers and how much baggage can be carried."
    },
    {
      question: "How much baggage can I bring on a helicopter tour?",
      answer:
        "On scenic mountain routes, very little — plan for warm layers, a camera and essentials. On transfers and charters, ask for a written allowance in kilograms as part of the quotation, because it depends on the routing."
    },
    {
      question: "Why do you ask for each passenger's weight individually?",
      answer:
        "Because load and balance both matter. The crew needs the distribution, not just the total, to seat people correctly and to know whether a high-altitude landing is achievable."
    },
    {
      question: "What happens if a passenger weighs more than declared?",
      answer:
        "The calculation is redone at the helipad. That can mean a reduced landing, splitting the group into an extra shuttle, or dropping the high segment — and because the aircraft still flew, a refund is unlikely."
    },
    {
      question: "Can five passengers land at Kala Patthar together?",
      answer:
        "Often not. Above 5,000 metres usable load falls sharply, so operators commonly shuttle passengers up in smaller groups. That is standard practice on Everest itineraries and is built into the schedule."
    },
    {
      question: "Is there an extra fee for heavier passengers?",
      answer:
        "Not usually as a surcharge, but a heavier group may need an additional shuttle or a larger share of the aircraft, which affects the plan and sometimes the price. Declaring weights accurately at enquiry stage avoids surprises."
    }
  ],
  related: [
    { title: "Safety and flight information", description: "Weather, carrier disclosure and terms.", href: "/safety-flight-information" },
    { title: "How to book a helicopter", description: "What to send and what to expect back.", href: "/how-to-book-a-helicopter-in-nepal" },
    { title: "Everest helicopter tour cost", description: "Why shuttling appears in the price.", href: "/everest-helicopter-tour-cost" }
  ],
  about: ["Helicopter performance", "High altitude", "Baggage allowance", "Nepal"],
  reviewedOn: "2026-08-19",
  breadcrumbParent: { name: "Flight information", path: "/safety-flight-information" }
};
