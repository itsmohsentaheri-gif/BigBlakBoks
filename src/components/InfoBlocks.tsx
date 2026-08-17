export default function InfoBlocks({
  blocks,
}: {
  blocks: readonly { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
      {blocks.map((block) => (
        <div key={block.label} className="flex flex-col gap-1.5">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
            {block.label}
          </dt>
          <dd className="font-display text-base font-medium text-fg/90">
            {block.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
