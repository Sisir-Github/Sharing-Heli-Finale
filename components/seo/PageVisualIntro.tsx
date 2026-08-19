import Image from "next/image";

type PageVisualIntroProps = {
  imageSrc: string;
  imageAlt: string;
  note: string;
};

export function PageVisualIntro({ imageSrc, imageAlt, note }: PageVisualIntroProps) {
  return (
    <section className="band-tight band-cream">
      <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <figure className="media-frame m-0 aspect-[16/10]">
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
        </figure>

        <div>
          <p className="eyebrow">
            <span className="inline-block h-px w-7 bg-current align-middle" aria-hidden="true" />
            Operational brief
          </p>
          <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-[1.14] tracking-[-0.01em] text-navy sm:text-[2.1rem]">
            What this means for your flight
          </h2>
          <p className="mt-5 text-[15px] leading-[1.9] text-[var(--muted)]">{note}</p>
        </div>
      </div>
    </section>
  );
}
