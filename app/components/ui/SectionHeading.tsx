export function SectionHeading({
  title,
  description,
  align = "left",
  spacing = "default",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  spacing?: "default" | "hero";
}) {
  const isCentered = align === "center";
  const isHeroSpacing = spacing === "hero";

  return (
    <header
      className={`flex flex-col ${isHeroSpacing ? "gap-0" : "gap-3"} ${
        isCentered ? "items-center text-center" : ""
      }`}
    >
      <h2
        className={`font-display text-3xl md:text-4xl text-text ${
          isCentered ? "max-w-4xl mx-auto tracking-tight" : ""
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-body text-text-secondary ${
            isHeroSpacing ? "mt-8 leading-relaxed" : ""
          } ${isCentered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
