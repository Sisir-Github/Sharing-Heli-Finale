import { LandingPage } from "@/components/seo/LandingPage";
import { weightLimits } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/helicopter-weight-baggage-limits-nepal");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={weightLimits} />;
}
