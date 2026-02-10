import Script from "next/script";

import "@/app/globals.css";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/cms";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { buildLocalBusinessSchema, buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const title = settings?.seoTitle || "Luxury Helicopter Tours & Charter in Nepal | Sharing Heli";
  const description =
    settings?.seoDescription ||
    "Experience luxury helicopter tours, private charter, pilgrimage flights, rescue support, and aerial services in Nepal with experienced mountain pilots at Sharing Heli.";

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
      url: SITE_URL
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
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
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
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
      <body className="bg-midnight text-white antialiased">
        <JsonLd
          data={[
            buildOrganizationSchema(settings || undefined),
            buildLocalBusinessSchema(settings || undefined),
            buildWebSiteSchema(settings || undefined)
          ]}
        />
        <HeaderShell />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp whatsappNumber={whatsappNumber} />
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
