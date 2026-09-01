import { LandingPage } from "@/components/seo/LandingPage";
import { kathmanduTours } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/kathmandu-helicopter-tours");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={kathmanduTours} />;
}
