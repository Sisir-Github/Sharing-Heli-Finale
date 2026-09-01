import { LandingPage } from "@/components/seo/LandingPage";
import { langtangTour } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/langtang-gosaikunda-helicopter-tour");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={langtangTour} />;
}
