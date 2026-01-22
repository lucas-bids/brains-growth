export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="flex flex-col gap-3">
      <h2 className="font-display text-h2 text-text">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-body text-text-secondary">{description}</p>
      ) : null}
    </header>
  );
}
