import { RateLimiter } from "@/lib/rate-limit";

/**
 * Login throttle for /admin: 5 wrong passwords per IP per hour.
 * See RateLimiter for the per-instance caveat.
 */
const limiter = new RateLimiter(5, 60 * 60 * 1000);

export function isBlocked(ip: string): boolean {
  return limiter.isBlocked(ip);
}

export function recordFailure(ip: string): void {
  limiter.hit(ip);
}
