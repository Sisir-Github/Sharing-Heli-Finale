import { LandingPage } from "@/components/seo/LandingPage";
import { packagesHub } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/nepal-helicopter-tour-packages");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={packagesHub} />;
}
