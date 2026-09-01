import { LandingPage } from "@/components/seo/LandingPage";
import { pokharaMuktinath } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/pokhara-to-muktinath-helicopter");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={pokharaMuktinath} />;
}
