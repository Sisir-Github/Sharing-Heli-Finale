import Image from "next/image";

type PageVisualIntroProps = {
  imageSrc: string;
  imageAlt: string;
  note: string;
};

export function PageVisualIntro({ imageSrc, imageAlt, note }: PageVisualIntroProps) {
  return (
    <section className="section-space bg-canvas pt-4">
      <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="surface-card overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1600}
            height={900}
            priority={false}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold tracking-normal text-ink">Operational brief</h2>
          <p className="copy mt-4">{note}</p>
        </div>
      </div>
    </section>
  );
}
