export function Badge({
  children,
  variant = "featured",
}: {
  children: React.ReactNode;
  variant?: "featured" | "milestone";
}) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-small font-semibold tracking-wide";

  if (variant === "milestone") {
    return (
      <span className={`${base} bg-accent-2/18 text-text-secondary`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${base} bg-surface-2 text-text-secondary`}>{children}</span>
  );
}
