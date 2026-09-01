import { LandingPage } from "@/components/seo/LandingPage";
import { charterCost } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/private-helicopter-charter-cost-nepal");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={charterCost} />;
}
