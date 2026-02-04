export function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent2";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 text-sm font-semibold outline-none transition focus-visible:ring-2";

  if (variant === "primary") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} h-11 bg-accent text-accent-foreground ring-offset-0 hover:brightness-95 focus-visible:ring-accent/40 ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} h-11 border border-border bg-surface-2 text-text hover:bg-surface focus-visible:ring-accent/25 ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === "accent2") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} h-11 bg-accent-2 text-white ring-offset-0 hover:brightness-95 focus-visible:ring-accent-2/40 ${className}`}
      >
        {children}
      </button>
    );
  }

  // ghost
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} h-11 text-text-secondary hover:bg-surface-2 hover:text-text focus-visible:ring-accent/25 ${className}`}
    >
      {children}
    </button>
  );
}
