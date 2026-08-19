import { PageIntro } from "@/components/layout/PageIntro";
import { ContentSections } from "@/components/seo/ContentSections";
import { buildPageMetadata } from "@/lib/seo/page-seo";

export const metadata = buildPageMetadata("/privacy-policy");
export const revalidate = 86400;

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy"
        title="Privacy Policy"
        description="How Sharing Heli Nepal handles inquiry, booking, invoice, and website information."
      />
      <ContentSections
        sections={[
          {
            title: "Information We Collect",
            paragraphs: [
              "We collect the information you submit through inquiry, booking, contact, invoice, and email forms. This can include name, phone, email, travel date, passenger count, route, payment details needed for an invoice, and any message you choose to send.",
              "Basic website analytics may be collected when analytics is enabled. Analytics should be configured to measure site performance and inquiry quality, not to collect sensitive booking information."
            ]
          },
          {
            title: "How We Use Information",
            paragraphs: [
              "We use inquiry details to respond to flight requests, check route feasibility, prepare quotes, issue invoices, and coordinate practical travel information.",
              "We do not sell customer inquiry data. Information may be shared with relevant operators or service partners only when needed to review or coordinate a requested flight."
            ]
          },
          {
            title: "Retention And Contact",
            paragraphs: [
              "Operational and invoice records may be kept for business, accounting, and legal requirements. You can contact the flight desk to request correction of inaccurate contact details.",
              "For privacy questions, use the contact information published on this website."
            ]
          }
        ]}
      />
    </>
  );
}
