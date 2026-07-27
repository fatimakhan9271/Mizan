"use client";

import { useState } from "react";
import { SECTIONS } from "@/lib/questions";
import ProgressBar from "@/components/ProgressBar";
import ReportDashboard from "@/components/ReportDashboard";

export default function Assess() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const section = SECTIONS[stepIndex];
  const isLastStep = stepIndex === SECTIONS.length - 1;

  function setAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleMulti(id, option) {
    setAnswers((prev) => {
      const current = prev[id] || [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [id]: next };
    });
  }

  function sectionComplete() {
    return section.questions.every((q) => {
      const val = answers[q.id];
      return q.type === "multiselect" ? val && val.length > 0 : !!val;
    });
  }

  async function handleNext() {
    if (!isLastStep) {
      setStepIndex((i) => i + 1);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setReport(data.report);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleRestart() {
    setAnswers({});
    setStepIndex(0);
    setReport(null);
    setError(null);
  }

  if (report) {
    return (
      <main className="min-h-screen bg-ink-950">
        <ReportDashboard report={report} onRestart={handleRestart} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink-950 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <span className="font-display text-2xl text-paper-50 block mb-10">Mizan</span>

        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-2 border-brass-500 border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-paper-200/70 text-sm">
              Reading your answers against the applicable frameworks&hellip;
            </p>
          </div>
        ) : (
          <>
            <ProgressBar current={stepIndex} total={SECTIONS.length} />

            <h1 className="font-display text-3xl text-paper-50 mb-2">{section.title}</h1>
            <p className="text-paper-200/60 text-sm mb-10">{section.description}</p>

            <div className="space-y-8">
              {section.questions.map((q) => (
                <div key={q.id}>
                  <label className="block text-paper-50 text-sm mb-3">{q.label}</label>
                  {q.type === "select" && (
                    <div className="grid gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setAnswer(q.id, opt)}
                          className={`text-left text-sm px-4 py-3 rounded-lg border transition-colors ${
                            answers[q.id] === opt
                              ? "border-brass-500 bg-brass-500/10 text-brass-400"
                              : "border-ink-700 text-paper-200/80 hover:border-ink-600"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  {q.type === "multiselect" && (
                    <div className="grid gap-2">
                      {q.options.map((opt) => {
                        const selected = (answers[q.id] || []).includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => toggleMulti(q.id, opt)}
                            className={`text-left text-sm px-4 py-3 rounded-lg border transition-colors ${
                              selected
                                ? "border-brass-500 bg-brass-500/10 text-brass-400"
                                : "border-ink-700 text-paper-200/80 hover:border-ink-600"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {error && (
              <p className="mt-6 text-sm text-signal-missing border border-signal-missing/40 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={stepIndex === 0}
                className="text-sm text-paper-200/50 disabled:opacity-30 hover:text-paper-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!sectionComplete()}
                className="bg-brass-500 text-ink-950 font-medium rounded-full px-6 py-3 text-sm disabled:opacity-30 hover:bg-brass-400 transition-colors"
              >
                {isLastStep ? "Generate my report" : "Continue"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
