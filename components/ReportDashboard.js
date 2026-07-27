"use client";

import { useState } from "react";
import StatusStamp, { RiskDot } from "./StatusStamp";

const FILTERS = ["all", "high", "medium", "low"];

export default function ReportDashboard({ report, onRestart }) {
  const [filter, setFilter] = useState("all");
  const [downloading, setDownloading] = useState(null);

  const { summary, gaps, drafted_documents: draftedDocs } = report;

  const visibleGaps =
    filter === "all" ? gaps : gaps.filter((g) => g.risk === filter);

  async function downloadDoc(doc) {
    setDownloading(doc.title);
    try {
      const res = await fetch("/api/generate-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      if (!res.ok) throw new Error("failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title.replace(/[^a-z0-9]/gi, "_")}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("Could not generate the document. Please try again.");
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <span className="font-display text-2xl text-paper-50">Mizan</span>
        <button
          onClick={onRestart}
          className="text-xs font-mono text-paper-200/50 hover:text-brass-400 transition-colors"
        >
          Start a new assessment
        </button>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div className="border border-ink-700 rounded-lg p-6 bg-ink-900">
          <p className="font-mono text-[11px] uppercase tracking-wide text-paper-200/50 mb-2">
            Compliance score
          </p>
          <p className="font-display text-4xl text-brass-400 tabular-nums">
            {summary.compliance_percent}%
          </p>
        </div>
        <div className="border border-ink-700 rounded-lg p-6 bg-ink-900">
          <p className="font-mono text-[11px] uppercase tracking-wide text-paper-200/50 mb-2">
            High-risk gaps
          </p>
          <p className="font-display text-4xl text-signal-missing tabular-nums">
            {summary.high_risk_count}
          </p>
        </div>
        <div className="border border-ink-700 rounded-lg p-6 bg-ink-900">
          <p className="font-mono text-[11px] uppercase tracking-wide text-paper-200/50 mb-2">
            Applicable frameworks
          </p>
          <p className="text-sm text-paper-200/80 leading-snug">
            {summary.applicable_frameworks?.join(" · ")}
          </p>
        </div>
      </div>

      <div className="border border-brass-600/40 bg-brass-500/10 rounded-lg p-5 mb-10">
        <p className="font-mono text-[11px] uppercase tracking-wide text-brass-400 mb-1">
          Top priority
        </p>
        <p className="text-paper-50 text-sm leading-relaxed">{summary.top_priority}</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-mono uppercase px-3 py-1.5 rounded-full border transition-colors ${
              filter === f
                ? "border-brass-500 text-brass-400 bg-brass-500/10"
                : "border-ink-700 text-paper-200/50 hover:border-ink-600"
            }`}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Gap table */}
      <div className="border border-ink-700 rounded-lg overflow-hidden mb-14">
        {visibleGaps.map((gap, i) => (
          <details
            key={i}
            className={`group border-ink-700 ${i !== 0 ? "border-t" : ""}`}
          >
            <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-4 hover:bg-ink-900/60 transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                <StatusStamp status={gap.status} />
                <span className="text-sm text-paper-50 truncate">{gap.requirement}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <RiskDot risk={gap.risk} />
                <span className="text-paper-200/30 text-xs font-mono group-open:rotate-90 transition-transform">
                  &rsaquo;
                </span>
              </div>
            </summary>
            <div className="px-6 pb-5 pt-1 bg-ink-900/40">
              <p className="text-xs font-mono uppercase tracking-wide text-paper-200/40 mb-1">
                {gap.source}
              </p>
              <p className="text-sm text-paper-200/80 leading-relaxed mb-3">{gap.explanation}</p>
              <p className="text-sm text-paper-50 leading-relaxed">
                <span className="text-brass-400 font-medium">Next step: </span>
                {gap.action}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* Drafted documents */}
      {draftedDocs && draftedDocs.length > 0 && (
        <div>
          <h2 className="font-display text-2xl text-paper-50 mb-2">Drafted policies</h2>
          <p className="text-sm text-paper-200/60 mb-6">
            First-pass drafts built from your answers, ready for legal review.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {draftedDocs.map((doc, i) => (
              <div key={i} className="border border-ink-700 rounded-lg p-5 bg-ink-900">
                <p className="text-paper-50 mb-1">{doc.title}</p>
                <p className="text-xs text-paper-200/50 mb-4 line-clamp-2">
                  {doc.content.slice(0, 90)}&hellip;
                </p>
                <button
                  onClick={() => downloadDoc(doc)}
                  disabled={downloading === doc.title}
                  className="text-xs font-mono uppercase border border-brass-600/60 text-brass-400 rounded-full px-4 py-2 hover:bg-brass-500/10 transition-colors disabled:opacity-50"
                >
                  {downloading === doc.title ? "Preparing..." : "Download .docx"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
