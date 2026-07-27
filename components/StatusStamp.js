const STYLES = {
  met: "border-signal-met text-signal-met",
  partial: "border-signal-partial text-signal-partial",
  missing: "border-signal-missing text-signal-missing",
};

const LABELS = {
  met: "Met",
  partial: "Partial",
  missing: "Missing",
};

export default function StatusStamp({ status }) {
  const cls = STYLES[status] || STYLES.partial;
  return (
    <span
      className={`inline-block font-mono text-[11px] tracking-wide uppercase border rounded px-2 py-1 -rotate-2 ${cls}`}
    >
      {LABELS[status] || status}
    </span>
  );
}

export function RiskDot({ risk }) {
  const color =
    risk === "high" ? "bg-signal-missing" : risk === "medium" ? "bg-signal-partial" : "bg-signal-met";
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-paper-200/60">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      {risk}
    </span>
  );
}
