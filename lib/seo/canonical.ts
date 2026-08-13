export const CANONICAL_TOUR_SLUGS = new Set([
  "everest-base-camp-helicopter-tour-nepal",
  "annapurna-base-camp-helicopter-tour-nepal",
  "muktinath-helicopter-tour-nepal"
]);

const SERVICE_CANONICAL_PATHS: Record<string, string> = {
  "helicopter-charter-nepal": "/helicopter-charter-nepal",
  "emergency-helicopter-rescue-nepal": "/emergency-helicopter-rescue-nepal",
  "pokhara-helicopter-service": "/pokhara-helicopter-service",
  "luxury-helicopter-tour-nepal": "/luxury-helicopter-tour-nepal",
  "muktinath-helicopter-tour-nepal": "/muktinath-helicopter-tour-nepal",
  "shared-helicopter-flights": "/helicopter-tours/shared-helicopter-flights"
};

export function getCanonicalTourPath(slug: string) {
  return CANONICAL_TOUR_SLUGS.has(slug) ? `/${slug}` : `/tours/${slug}`;
}

export function getCanonicalServicePath(slug: string) {
  return SERVICE_CANONICAL_PATHS[slug] || `/services/${slug}`;
}

export const LEGACY_REDIRECTS = [
  ["/activities/annapurna-base-camp-helicopter-tour", "/annapurna-base-camp-helicopter-tour-nepal"],
  ["/activities/everest-base-camp-helicopter-tour", "/everest-base-camp-helicopter-tour-nepal"],
  ["/activities/muktinath-helicopter-tour", "/muktinath-helicopter-tour-nepal"],
  ["/charter-services", "/helicopter-charter-nepal"],
  ["/rescue-emergency-support", "/emergency-helicopter-rescue-nepal"],
  ["/everest-helicopter-tour-nepal", "/everest-base-camp-helicopter-tour-nepal"],
  ["/annapurna-helicopter-tour-nepal", "/annapurna-base-camp-helicopter-tour-nepal"],
  ["/muktinath-pilgrimage-helicopter-tour", "/muktinath-helicopter-tour-nepal"],
  ["/pokhara-heli-service", "/pokhara-helicopter-service"],
  ["/luxury-helicopter-nepal", "/luxury-helicopter-tour-nepal"],
  ["/contact-us", "/contact"],
  ["/inquiry", "/contact"],
  ["/shared-helicopter-flights", "/helicopter-tours/shared-helicopter-flights"],
  ["/helicopter-sharing-nepal", "/helicopter-tours/shared-helicopter-flights"],
  ["/team", "/about-us"],
  ["/tours/everest-base-camp-helicopter-tour-nepal", "/everest-base-camp-helicopter-tour-nepal"],
  ["/tours/annapurna-base-camp-helicopter-tour-nepal", "/annapurna-base-camp-helicopter-tour-nepal"],
  ["/tours/muktinath-helicopter-tour-nepal", "/muktinath-helicopter-tour-nepal"],
  ["/services/helicopter-charter-nepal", "/helicopter-charter-nepal"],
  ["/services/emergency-helicopter-rescue-nepal", "/emergency-helicopter-rescue-nepal"],
  ["/services/pokhara-helicopter-service", "/pokhara-helicopter-service"],
  ["/services/luxury-helicopter-tour-nepal", "/luxury-helicopter-tour-nepal"],
  ["/services/muktinath-helicopter-tour-nepal", "/muktinath-helicopter-tour-nepal"],
  ["/services/shared-helicopter-flights", "/helicopter-tours/shared-helicopter-flights"]
] as const;
