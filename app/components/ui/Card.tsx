export function Card({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  if (variant === "light") {
    return (
      <div className="rounded-2xl border border-paper-border bg-paper ">
        {children}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface ">
      {children}
    </div>
  );
}
