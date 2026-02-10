type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="label">{eyebrow}</span>
      <h2 className="headline text-balance">{title}</h2>
      <p className="copy mt-4">{description}</p>
    </div>
  );
}
