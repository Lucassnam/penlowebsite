"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "Editor / Proofreader",
  "Lawyer / Legal",
  "Student / Academic",
  "Writer / Journalist",
  "Teacher",
  "Other",
];

export default function ApplyPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [useCase, setUseCase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, useCase }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl font-body text-sm bg-white border border-black/10 text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-pen/60 transition-colors";

  return (
    <div className="min-h-screen bg-paper paper-texture">
      {/* Minimal nav */}
      <header className="px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center font-display font-bold text-xl text-ink hover:opacity-70 transition-opacity"
        >
          Caret<span className="text-pen">.</span>
        </Link>
      </header>

      <main className="max-w-md mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-pen/10 border border-pen/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="#E63027" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="font-display text-3xl font-bold text-ink mb-3">Thank you.</h1>
              <p className="font-body text-base text-ink-muted leading-relaxed mb-8">
                We read every application and reply personally. If it&apos;s a
                fit, you&apos;ll hear from us within a few days.
              </p>
              <Link
                href="/"
                className="font-body text-sm text-pen underline underline-offset-2 hover:text-pen/80 transition-colors"
              >
                Back to home
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -12 }}>
              <p className="text-xs uppercase tracking-widest font-body text-pen font-semibold mb-3">
                Beta testers
              </p>
              <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-3">
                Apply to test Caret.
              </h1>
              <p className="font-body text-sm text-ink-muted leading-relaxed mb-8">
                A small group, free early access, a direct line to the founder.
                Takes 30 seconds.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block font-body text-xs font-semibold text-ink mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block font-body text-xs font-semibold text-ink mb-1.5">
                    What best describes you?
                  </label>
                  <select
                    id="role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={loading}
                    className={`${inputClasses} ${role ? "" : "text-ink-muted/60"}`}
                  >
                    <option value="" disabled>
                      Pick a role
                    </option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="useCase" className="block font-body text-xs font-semibold text-ink mb-1.5">
                    What would you use Caret for?
                  </label>
                  <textarea
                    id="useCase"
                    required
                    rows={3}
                    maxLength={1000}
                    placeholder="e.g. I proofread manuscripts on paper and retype every edit into Word"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    disabled={loading}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-track="cta-apply-submit"
                  className="w-full px-6 py-3.5 rounded-xl font-body font-semibold text-sm bg-pen border border-pen/50 text-white hover:bg-pen/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting…" : "Submit application"}
                </button>

                {error && (
                  <p role="alert" className="font-body text-sm text-pen">
                    {error}
                  </p>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
