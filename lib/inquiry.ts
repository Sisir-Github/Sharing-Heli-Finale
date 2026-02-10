import { CONTACT_SERVICE_PATHS } from "@/lib/constants";

const SERVICE_TO_PATH: Record<string, string> = {
  Charter: CONTACT_SERVICE_PATHS.charter,
  "Everest Base Camp Helicopter Tour": CONTACT_SERVICE_PATHS.everest,
  "Annapurna Base Camp Tour": CONTACT_SERVICE_PATHS.annapurna,
  "Muktinath Pilgrimage Tour": CONTACT_SERVICE_PATHS.muktinath
};

const SLUG_TO_SERVICE: Record<string, string> = {
  charter: "Charter",
  "everest-base-camp-helicopter-tour": "Everest Base Camp Helicopter Tour",
  "annapurna-base-camp-tour": "Annapurna Base Camp Tour",
  "muktinath-pilgrimage-tour": "Muktinath Pilgrimage Tour"
};

export function getInquiryPath(service: string) {
  return SERVICE_TO_PATH[service] || "/contact";
}

export function getServiceForSlug(slug: string) {
  return SLUG_TO_SERVICE[slug] || null;
}

export function getInquiryServicePaths() {
  return Object.keys(SLUG_TO_SERVICE).map((slug) => ({ slug }));
}
