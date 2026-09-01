import { annapurnaCost, everestCost, packagesHub } from "@/lib/seo/landing/pricing";
import { charterCost } from "@/lib/seo/landing/charter";
import { kathmanduTours, langtangTour, pokharaMuktinath } from "@/lib/seo/landing/regions";
import { howToBook, weightLimits } from "@/lib/seo/landing/practical";
import type { LandingContent } from "@/lib/seo/landing/types";

/** Every high-intent landing page, keyed by its canonical path. */
export const LANDING_PAGES: Record<string, LandingContent> = {
  [packagesHub.path]: packagesHub,
  [everestCost.path]: everestCost,
  [annapurnaCost.path]: annapurnaCost,
  [charterCost.path]: charterCost,
  [kathmanduTours.path]: kathmanduTours,
  [pokharaMuktinath.path]: pokharaMuktinath,
  [langtangTour.path]: langtangTour,
  [howToBook.path]: howToBook,
  [weightLimits.path]: weightLimits
};

export const LANDING_PATHS = Object.keys(LANDING_PAGES);

export type { LandingContent };
export { annapurnaCost, charterCost, everestCost, howToBook, kathmanduTours, langtangTour, packagesHub, pokharaMuktinath, weightLimits };

/**
 * Search metadata for the landing pages. Titles stay under ~60 characters and
 * descriptions under ~155 so neither is truncated in results.
 */
export const LANDING_META: Record<string, { title: string; description: string; keywords: string[]; primaryKeyword: string }> = {
  "/nepal-helicopter-tour-packages": {
    title: "Nepal Helicopter Tour Packages | Routes & Formats",
    description:
      "Compare Nepal helicopter tour packages: shared per-seat flights, private charters and mountain transfers across Everest, Annapurna, Muktinath and Langtang.",
    keywords: ["Nepal helicopter tour packages", "helicopter tour Nepal", "helicopter packages Nepal", "Himalaya helicopter tour"],
    primaryKeyword: "Nepal helicopter tour packages"
  },
  "/everest-helicopter-tour-cost": {
    title: "Everest Helicopter Tour Cost Explained | Sharing Heli",
    description:
      "What an Everest helicopter tour actually costs: per-seat versus per-aircraft pricing, park and landing fees, positioning, and what to check before paying.",
    keywords: ["Everest helicopter tour cost", "Everest helicopter tour price", "Everest base camp helicopter cost", "Kala Patthar landing"],
    primaryKeyword: "Everest helicopter tour cost"
  },
  "/annapurna-helicopter-tour-cost": {
    title: "Annapurna Helicopter Tour Cost | Pokhara Departures",
    description:
      "How Annapurna helicopter tour pricing works from Pokhara: flight time, conservation area fees, landing charges, and shared versus private fares.",
    keywords: ["Annapurna helicopter tour cost", "Annapurna base camp helicopter price", "Pokhara helicopter tour cost"],
    primaryKeyword: "Annapurna helicopter tour cost"
  },
  "/private-helicopter-charter-cost-nepal": {
    title: "Private Helicopter Charter Cost in Nepal | Sharing Heli",
    description:
      "Nepal helicopter charter is priced per aircraft per flying hour. Understand positioning legs, ground waiting, fees and when charter beats buying seats.",
    keywords: ["helicopter charter cost Nepal", "private helicopter Nepal price", "helicopter hire Nepal", "charter helicopter Kathmandu"],
    primaryKeyword: "helicopter charter cost Nepal"
  },
  "/kathmandu-helicopter-tours": {
    title: "Helicopter Tours from Kathmandu | Everest & Langtang",
    description:
      "Helicopter tours departing Kathmandu: Everest and the Khumbu, Langtang, Gosaikunda and transfers. Timings, what to expect and why flights leave at dawn.",
    keywords: ["Kathmandu helicopter tour", "helicopter tour from Kathmandu", "Everest helicopter Kathmandu", "Langtang helicopter tour"],
    primaryKeyword: "Kathmandu helicopter tour"
  },
  "/pokhara-to-muktinath-helicopter": {
    title: "Pokhara to Muktinath Helicopter | Pilgrimage Flight",
    description:
      "Fly Pokhara to Muktinath in about 45-55 minutes. Ground time at the temple, altitude guidance, seasons and how shared and charter bookings work.",
    keywords: ["Pokhara to Muktinath helicopter", "Muktinath helicopter tour", "Muktinath darshan helicopter", "Mustang helicopter Nepal"],
    primaryKeyword: "Pokhara to Muktinath helicopter"
  },
  "/langtang-gosaikunda-helicopter-tour": {
    title: "Langtang & Gosaikunda Helicopter Tour from Kathmandu",
    description:
      "The shortest Himalayan helicopter flight from Kathmandu. Langtang valley and the sacred Gosaikunda lakes in about two hours, with landing conditions explained.",
    keywords: ["Langtang helicopter tour", "Gosaikunda helicopter", "Kathmandu short helicopter tour", "Kyanjin Gompa helicopter"],
    primaryKeyword: "Langtang helicopter tour"
  },
  "/how-to-book-a-helicopter-in-nepal": {
    title: "How to Book a Helicopter in Nepal | Step-by-Step",
    description:
      "What to send, what a proper quotation must state, who actually operates the aircraft, and the questions to ask before paying a deposit in Nepal.",
    keywords: ["how to book helicopter Nepal", "book helicopter Nepal", "helicopter booking Nepal", "helicopter quote Nepal"],
    primaryKeyword: "how to book a helicopter in Nepal"
  },
  "/helicopter-weight-baggage-limits-nepal": {
    title: "Helicopter Weight & Baggage Limits in Nepal",
    description:
      "Why Nepali helicopter flights are planned by weight, not seats: altitude performance, why operators ask for individual weights, and realistic baggage limits.",
    keywords: ["helicopter weight limit Nepal", "helicopter baggage allowance Nepal", "Nepal helicopter passenger weight", "Kala Patthar landing weight"],
    primaryKeyword: "helicopter weight limit Nepal"
  }
};
