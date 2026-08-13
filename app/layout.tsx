import Script from "next/script";

import "@/app/globals.css";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileConversionBar } from "@/components/layout/MobileConversionBar";
import { PublicSiteChrome } from "@/components/layout/PublicSiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/cms";
import { COMPANY, IS_PRODUCTION_SITE, SITE_URL } from "@/lib/constants";
import { buildLocalBusinessSchema, buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

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
    alternates: {
      canonical: SITE_URL,
      languages: {
        "en-NP": SITE_URL,
        "x-default": SITE_URL
      }
    },
    openGraph: {
      title,
      description,
      siteName: settings?.brandName || COMPANY.brandName,
      type: "website",
      locale: "en_NP",
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
      google: googleVerification,
      other: bingVerification
        ? {
            "msvalidate.01": bingVerification
          }
        : undefined
    },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('sharing-heli-theme');var theme=saved==='dark'||saved==='light'?saved:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',theme);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`
          }}
        />
      </head>
      <body className="antialiased">
        <JsonLd
          data={[
            buildOrganizationSchema(settings || undefined),
            buildLocalBusinessSchema(settings || undefined),
            buildWebSiteSchema(settings || undefined)
          ]}
        />
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
