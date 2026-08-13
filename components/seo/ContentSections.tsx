type ContentSection = {
  title: string;
  paragraphs: string[];
};

type ContentSectionsProps = {
  sections: ContentSection[];
};

export function ContentSections({ sections }: ContentSectionsProps) {
  return (
    <section className="section-space bg-canvas pt-6">
      <div className="shell space-y-8">
        {sections.map((section) => (
          <article key={section.title} className="surface-card p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold tracking-normal text-ink">{section.title}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.title}-${index}`} className="copy text-base">
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
