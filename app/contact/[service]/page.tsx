import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/layout/PageIntro";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { getPublishedServices, getSiteSettings } from "@/lib/cms";
import { getServiceForSlug } from "@/lib/inquiry";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

type InquiryServicePageProps = {
  params: {
    service: string;
  };
};

export function generateMetadata({ params }: InquiryServicePageProps) {
  return buildPageMetadata(`/contact/${params.service}`);
}

export const dynamic = "force-dynamic";

export default async function InquiryServicePage({ params }: InquiryServicePageProps) {
  type ServiceItem = { title: string };
  const [services, settings] = (await Promise.all([getPublishedServices(), getSiteSettings()])) as [ServiceItem[], Awaited<ReturnType<typeof getSiteSettings>>];
  const serviceName = getServiceForSlug(params.service);

  if (!serviceName) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: serviceName, path: `/contact/${params.service}` }
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow="Service Inquiry"
        title={`${serviceName} Inquiry`}
        description="You are submitting a focused inquiry route. This page is optimized for form completion and routes directly to our operations desk."
        headingLevel={1}
      />
      <InquiryForm
        defaultService={serviceName}
        showMap
        services={services.map((item) => item.title)}
        contactSettings={{
          primaryPhone: settings?.primaryPhone || "+977-9802855690",
          whatsappNumber: settings?.whatsappNumber || "+977-9856028155",
          email: settings?.email || "rishi8848@gmail.com",
          addressLine1: settings?.addressLine1 || "Lakeside-6, 15 Street No.",
          addressLine2: settings?.addressLine2 || "Pokhara 33700",
          addressLine3: settings?.addressLine3 || "Kaski, Gandaki Province",
          addressLine4: settings?.addressLine4 || "Nepal"
        }}
      />
    </>
  );
}
