import Script from "next/script";

import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@/app/globals.css";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileConversionBar } from "@/components/layout/MobileConversionBar";
import { PublicSiteChrome } from "@/components/layout/PublicSiteChrome";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/cms";
import { buildLanguageAlternates, COMPANY, IS_PRODUCTION_SITE, SEARCH_VERIFICATION, SITE_URL } from "@/lib/constants";
import { buildLocalBusinessSchema, buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

/**
 * Verification tokens for every engine that matters to this site, including the
 * Chinese ones. Each is emitted only when the token is actually configured, so
 * an unset engine never leaves a dangling empty meta tag.
 */
function buildOtherMeta() {
  const meta: Record<string, string> = {};
  if (SEARCH_VERIFICATION.bing) meta["msvalidate.01"] = SEARCH_VERIFICATION.bing;
  if (SEARCH_VERIFICATION.baidu) meta["baidu-site-verification"] = SEARCH_VERIFICATION.baidu;
  if (SEARCH_VERIFICATION.sogou) meta["sogou_site_verification"] = SEARCH_VERIFICATION.sogou;
  if (SEARCH_VERIFICATION.so360) meta["360-site-verification"] = SEARCH_VERIFICATION.so360;
  if (SEARCH_VERIFICATION.shenma) meta["shenma-site-verification"] = SEARCH_VERIFICATION.shenma;
  if (SEARCH_VERIFICATION.naver) meta["naver-site-verification"] = SEARCH_VERIFICATION.naver;
  // Baidu transcoding degrades mobile pages; opt out and keep our own layout.
  meta["applicable-device"] = "pc,mobile";
  meta["MobileOptimized"] = "width";
  meta["HandheldFriendly"] = "true";
  return meta;
}

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const title = settings?.seoTitle || "Helicopter Tours & Charter Nepal | Sharing Heli";
  const description =
    settings?.seoDescription ||
    "Plan shared helicopter flights and private charters in Nepal with Pokhara-based support, clear operational guidance, and current fare confirmation.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s"
    },
    description,
    applicationName: settings?.brandName || COMPANY.brandName,
    keywords: [
      "helicopter tours Nepal",
      "Nepal helicopter charter",
      "Everest base camp helicopter tour",
      "Annapurna helicopter tour",
      "Muktinath helicopter",
      "shared helicopter flight Nepal",
      "Pokhara helicopter",
      "尼泊尔直升机",
      "珠峰直升机旅游",
      "尼泊尔包机"
    ],
    alternates: {
      canonical: SITE_URL,
      languages: buildLanguageAlternates("/", true)
    },
    openGraph: {
      title,
      description,
      siteName: settings?.brandName || COMPANY.brandName,
      type: "website",
      locale: "en_NP",
      alternateLocale: ["zh_CN"],
      url: SITE_URL,
      images: [
        {
          url: "/images/campaign/sharing-heli-hero.jpg",
          width: 1200,
          height: 630,
          alt: "Sharing Heli Nepal helicopter flight planning"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/campaign/sharing-heli-hero.jpg"]
    },
    verification: {
      ...(SEARCH_VERIFICATION.google ? { google: SEARCH_VERIFICATION.google } : {}),
      ...(SEARCH_VERIFICATION.yandex ? { yandex: SEARCH_VERIFICATION.yandex } : {}),
      other: buildOtherMeta()
    },
    other: {
      "og:locale:alternate": "zh_CN"
    },
    formatDetection: { telephone: true, address: true, email: true },
    category: "travel",
    authors: [{ name: COMPANY.companyName, url: SITE_URL }],
    creator: COMPANY.companyName,
    publisher: COMPANY.operator,
    robots: {
      index: IS_PRODUCTION_SITE,
      follow: IS_PRODUCTION_SITE,
      googleBot: {
        index: IS_PRODUCTION_SITE,
        follow: IS_PRODUCTION_SITE,
        "max-image-preview": "large"
      }
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const whatsappNumber = settings?.whatsappNumber || COMPANY.whatsappNumber;
  return (
    <html lang="en-NP" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <JsonLd
          data={[
            buildOrganizationSchema(settings || undefined),
            buildLocalBusinessSchema(settings || undefined),
            buildWebSiteSchema(settings || undefined)
          ]}
        />
        <ScrollToTop />
        <PublicSiteChrome>
          <HeaderShell />
        </PublicSiteChrome>
        <main>{children}</main>
        <PublicSiteChrome>
          <Footer />
          <FloatingWhatsApp whatsappNumber={whatsappNumber} />
          <MobileConversionBar phone={settings?.primaryPhone || COMPANY.primaryPhone} whatsapp={whatsappNumber} />
        </PublicSiteChrome>
        {ga4Id ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${ga4Id}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
