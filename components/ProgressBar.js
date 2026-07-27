export default function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="mb-10">
      <div className="flex justify-between text-xs font-mono text-paper-200/50 mb-2">
        <span>
          Section {current + 1} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-[2px] w-full bg-ink-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-brass-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
