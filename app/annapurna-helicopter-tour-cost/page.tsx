import { LandingPage } from "@/components/seo/LandingPage";
import { annapurnaCost } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/annapurna-helicopter-tour-cost");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={annapurnaCost} />;
}
