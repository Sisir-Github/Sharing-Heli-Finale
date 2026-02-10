type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  headingLevel?: 1 | 2;
};

export function PageIntro({ eyebrow, title, description, headingLevel = 1 }: PageIntroProps) {
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";

  return (
    <section className="section-space">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label">{eyebrow}</span>
          <HeadingTag className="headline text-balance">{title}</HeadingTag>
          <p className="copy mt-4">{description}</p>
        </div>
      </div>
    </section>
  );
}
