export function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "accent2";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium";

  if (tone === "accent") {
    return (
      <span className={`${base} bg-accent/15 text-text`}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {children}
      </span>
    );
  }

  if (tone === "accent2") {
    return (
      <span className={`${base} bg-accent-2/18 text-text`}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden />
        {children}
      </span>
    );
  }

  return (
    <span className={`${base} border border-border bg-surface-2 text-text`}>
      {children}
    </span>
  );
}
