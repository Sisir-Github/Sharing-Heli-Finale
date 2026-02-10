import { InquiryButton } from "@/components/ui/InquiryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ServiceDetailProps = {
  title: string;
  shortDescription: string;
  longDescription: string;
};

export function ServiceDetail({ title, shortDescription, longDescription }: ServiceDetailProps) {
  return (
    <section className="section-space">
      <div className="shell space-y-8">
        <SectionHeading eyebrow="Service Detail" title={title} description={shortDescription} />
        <div className="glass rounded-3xl p-6">
          <p className="copy whitespace-pre-line">{longDescription}</p>
        </div>
        <InquiryButton />
      </div>
    </section>
  );
}
