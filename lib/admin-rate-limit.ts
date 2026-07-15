/**
 * In-memory rate limiter for /admin login attempts: 5 wrong passwords per IP
 * per hour. Per-instance memory, so on serverless hosts each warm instance
 * counts separately and counts reset on redeploy. Good enough to stop
 * casual brute-forcing of a single-user dashboard.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_FAILURES = 5;

type Entry = { count: number; windowStart: number };
const failures = new Map<string, Entry>();

function activeEntry(ip: string): Entry | undefined {
  const entry = failures.get(ip);
  if (entry && Date.now() - entry.windowStart > WINDOW_MS) {
    failures.delete(ip);
    return undefined;
  }
  return entry;
}

export function isBlocked(ip: string): boolean {
  const entry = activeEntry(ip);
  return entry !== undefined && entry.count >= MAX_FAILURES;
}

export function recordFailure(ip: string): void {
  const entry = activeEntry(ip);
  if (entry) {
    entry.count += 1;
  } else {
    failures.set(ip, { count: 1, windowStart: Date.now() });
  }
}
