/**
 * Fixed-window counter, in memory.
 *
 * Per-instance, so on serverless hosts each warm instance counts separately
 * and counts reset on redeploy — enough to stop casual abuse, not a substitute
 * for an edge limiter.
 *
 * Entries used to be evicted only when the same key was seen again, so keys
 * that appeared once stayed for the life of the process. A sweep now runs
 * whenever the map grows past a threshold.
 */
const SWEEP_THRESHOLD = 5_000;

type Entry = { count: number; windowStart: number };

export class RateLimiter {
  private hits = new Map<string, Entry>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  private sweep(now: number): void {
    for (const [key, entry] of this.hits) {
      if (now - entry.windowStart > this.windowMs) this.hits.delete(key);
    }
  }

  private active(key: string, now: number): Entry | undefined {
    const entry = this.hits.get(key);
    if (entry && now - entry.windowStart > this.windowMs) {
      this.hits.delete(key);
      return undefined;
    }
    return entry;
  }

  /** True when the key is over its limit for the current window. */
  isBlocked(key: string): boolean {
    const entry = this.active(key, Date.now());
    return entry !== undefined && entry.count >= this.limit;
  }

  /** Count one hit. Returns true when this hit is still within the limit. */
  hit(key: string): boolean {
    const now = Date.now();
    if (this.hits.size > SWEEP_THRESHOLD) this.sweep(now);

    const entry = this.active(key, now);
    if (!entry) {
      this.hits.set(key, { count: 1, windowStart: now });
      return true;
    }
    entry.count += 1;
    return entry.count <= this.limit;
  }

  /** Testing/introspection only. */
  get size(): number {
    return this.hits.size;
  }
}
