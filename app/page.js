import Link from "next/link";

const FEATURES = [
  {
    label: "01",
    title: "Guided intake",
    body: "A short, structured questionnaire on your data practices — no legal jargon, four sections, under five minutes.",
  },
  {
    label: "02",
    title: "AI gap analysis",
    body: "Cross-references your answers against the frameworks that actually apply to your business, not a generic checklist.",
  },
  {
    label: "03",
    title: "Risk-ranked report",
    body: "Every gap comes with a plain-language explanation of what could go wrong and what to fix first.",
  },
  {
    label: "04",
    title: "Drafted policies",
    body: "Missing privacy notices, retention policies, and incident-response plans — drafted from your own details, ready to download as Word documents.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink-950">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight text-paper-50">Mizan</span>
        </div>
        <Link
          href="/assess"
          className="text-sm text-brass-400 border border-brass-600/60 rounded-full px-4 py-2 hover:bg-brass-500/10 transition-colors"
        >
          Start assessment
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase mb-6">
          Compliance readiness &middot; Pakistan
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.1] text-paper-50 max-w-3xl">
          Know exactly where your business stands under{" "}
          <span className="italic text-brass-400">Pakistan&rsquo;s data protection rules.</span>
        </h1>
        <p className="mt-8 text-lg text-paper-200/80 max-w-2xl leading-relaxed">
          Pakistan&rsquo;s Personal Data Protection Bill has cleared the Federal Cabinet and is
          headed to Parliament. Banks and fintechs already answer to SBP&rsquo;s technology
          governance and vendor-risk frameworks. Most SMEs have no idea which of these rules apply
          to them, and hiring a compliance lawyer to find out costs more than most can justify
          before they even know if they have a problem.
        </p>
        <p className="mt-4 text-lg text-paper-200/80 max-w-2xl leading-relaxed">
          Mizan is a five-minute questionnaire that turns into a risk-ranked compliance report and
          a set of drafted policy documents &mdash; built specifically for Pakistani businesses.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/assess"
            className="bg-brass-500 text-ink-950 font-medium rounded-full px-6 py-3 hover:bg-brass-400 transition-colors"
          >
            Start your assessment
          </Link>
          <span className="text-sm text-paper-200/50">No account needed &middot; ~5 minutes</span>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="ledger-rule" />
      </div>

      {/* Who this is for */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase mb-3">
            Built for
          </p>
          <h2 className="font-display text-2xl text-paper-50 mb-3">SME founders</h2>
          <p className="text-paper-200/70 text-sm leading-relaxed">
            Who collect customer data and have never had a compliance review, and don&rsquo;t know
            where to start.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase mb-3">
            Built for
          </p>
          <h2 className="font-display text-2xl text-paper-50 mb-3">Fintech operators</h2>
          <p className="text-paper-200/70 text-sm leading-relaxed">
            Who need to understand SBP&rsquo;s technology governance and outsourcing frameworks
            before an audit does it for them.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-brass-400 uppercase mb-3">
            Built for
          </p>
          <h2 className="font-display text-2xl text-paper-50 mb-3">Compliance-curious teams</h2>
          <p className="text-paper-200/70 text-sm leading-relaxed">
            Who want a first-pass answer before paying for a lawyer to tell them the same thing.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="ledger-rule" />
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-paper-50 mb-12">How it works</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex gap-5">
              <span className="font-mono text-brass-500/70 text-sm pt-1">{f.label}</span>
              <div>
                <h3 className="font-display text-xl text-paper-50 mb-2">{f.title}</h3>
                <p className="text-paper-200/70 text-sm leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="ledger-rule" />
      </div>

      <footer className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between text-xs text-paper-200/40">
        <span>Mizan &middot; an independent compliance-readiness tool</span>
        <span>Not a substitute for legal advice</span>
      </footer>
    </main>
  );
}
