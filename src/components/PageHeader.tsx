export default function PageHeader({ eyebrow, kicker }: { eyebrow: string; kicker: string }) {
  return <div className="architecture-rule flex flex-col gap-2 pt-5"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{kicker}</span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">{eyebrow}</span></div>;
}
