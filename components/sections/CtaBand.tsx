import { InquiryButton } from "@/components/ui/InquiryButton";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  text,
  buttonLabel,
  buttonHref
}: {
  text: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <section className="section-space py-10">
      <Reveal className="shell">
        <div className="shine-line relative overflow-hidden rounded-3xl border border-aurora/35 bg-gradient-to-r from-[#0d1727] via-[#132742] to-[#11273d] p-8 sm:p-10">
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Priority Booking Desk</p>
              <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">Ready To Plan Your Premium Helicopter Journey?</h2>
              <p className="copy mt-3 max-w-2xl text-slate-200">{text}</p>
            </div>
            <InquiryButton className="w-full sm:w-auto" label={buttonLabel} href={buttonHref} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
