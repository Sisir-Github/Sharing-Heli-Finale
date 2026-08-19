import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/layout/PageIntro";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { getPublishedServices, getSiteSettings } from "@/lib/cms";
import { resolveContactSettings } from "@/lib/constants";
import { getServiceForSlug } from "@/lib/inquiry";
import { buildPageMetadata } from "@/lib/seo/page-seo";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

type InquiryServicePageProps = {
  params: Promise<{
    service: string;
  }>;
};

export async function generateMetadata({ params }: InquiryServicePageProps) {
  const { service } = await params;
  return buildPageMetadata(`/contact/${service}`);
}

export const revalidate = 900;

export default async function InquiryServicePage({ params }: InquiryServicePageProps) {
  const { service } = await params;
  type ServiceItem = { title: string };
  const [services, settings] = (await Promise.all([getPublishedServices(), getSiteSettings()])) as [ServiceItem[], Awaited<ReturnType<typeof getSiteSettings>>];
  const serviceName = getServiceForSlug(service);

  if (!serviceName) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: serviceName, path: `/contact/${service}` }
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageIntro
        eyebrow="Service Inquiry"
        title={`${serviceName} Inquiry`}
        description="Share your route, preferred date, passenger details, and timing so our team can review the current options."
        headingLevel={1}
      />
      <InquiryForm
        defaultService={serviceName}
        showMap
        services={services.map((item) => item.title)}
        contactSettings={resolveContactSettings(settings)}
      />
    </>
  );
}
