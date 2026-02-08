import { SectionHeading } from "@/components/ui/SectionHeading";

export function MarketingBlock({
  title,
  children,
  cards,
}: {
  title: string;
  children: React.ReactNode;
  cards?: React.ReactNode;
}) {
  return (
    <div>
      <SectionHeading title={title} />
      <div className="mt-8 space-y-6 text-body text-text-secondary">
        {children}
      </div>
      {cards ? <div className="mt-10">{cards}</div> : null}
    </div>
  );
}
