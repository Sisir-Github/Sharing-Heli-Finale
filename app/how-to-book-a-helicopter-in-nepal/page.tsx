import { LandingPage } from "@/components/seo/LandingPage";
import { howToBook } from "@/lib/seo/landing";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/how-to-book-a-helicopter-in-nepal");
export const revalidate = 86400;

export default function Page() {
  return <LandingPage content={howToBook} />;
}
