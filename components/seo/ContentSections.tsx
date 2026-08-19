type ContentSection = {
  title: string;
  paragraphs: string[];
};

type ContentSectionsProps = {
  sections: ContentSection[];
};

export function ContentSections({ sections }: ContentSectionsProps) {
  return (
    <section className="band band-cream">
      <div className="shell space-y-12">
        {sections.map((section, index) => (
          <article key={section.title} className="grid gap-6 border-t border-sand pt-9 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
            <div>
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[2rem]">
                {section.title}
              </h2>
            </div>
            <div className="space-y-4">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-${paragraphIndex}`} className="text-[15px] leading-[1.9] text-[var(--muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
