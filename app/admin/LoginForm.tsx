"use client";

import { useState } from "react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A10] flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-xs">
        <p className="text-xs uppercase tracking-widest font-body text-white/40 font-semibold mb-2">
          Caret admin
        </p>
        <h1 className="font-display text-2xl font-bold text-white mb-6">Sign in</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white font-body mb-3 outline-none focus:border-white/30"
        />
        <button
          type="submit"
          disabled={busy || !password}
          className="w-full rounded-xl bg-[#E63027] text-white font-body font-semibold text-sm py-3 hover:bg-[#E63027]/90 transition-colors disabled:opacity-40"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        {error && (
          <p className="font-body text-xs text-[#FF6B5B] mt-3">{error}</p>
        )}
      </form>
    </div>
  );
}
