export default function PageHeader({
  eyebrow,
  kicker,
}: {
  eyebrow: string;
  kicker: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-dim">
        {kicker}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
        {eyebrow}
      </span>
    </div>
  );
}
