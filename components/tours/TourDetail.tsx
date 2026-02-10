import { InquiryButton } from "@/components/ui/InquiryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TourDetailProps = {
  title: string;
  duration: string;
  priceFrom: number;
  currency: string;
  highlights: string;
  itinerary: string;
  inclusions: string;
  exclusions: string;
};

export function TourDetail({ title, duration, priceFrom, currency, highlights, itinerary, inclusions, exclusions }: TourDetailProps) {
  return (
    <section className="section-space">
      <div className="shell space-y-10">
        <SectionHeading
          eyebrow="Tour Overview"
          title={title}
          description={`Duration: ${duration} · From ${currency} ${priceFrom.toFixed(0)}`}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Highlights</h3>
            <p className="copy mt-3 whitespace-pre-line">{highlights}</p>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Itinerary</h3>
            <p className="copy mt-3 whitespace-pre-line">{itinerary}</p>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Inclusions</h3>
            <p className="copy mt-3 whitespace-pre-line">{inclusions}</p>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Exclusions</h3>
            <p className="copy mt-3 whitespace-pre-line">{exclusions}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InquiryButton />
          <p className="text-sm text-haze">Need a custom itinerary? Our team can tailor your flight plan.</p>
        </div>
      </div>
    </section>
  );
}
