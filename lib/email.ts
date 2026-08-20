/**
 * Email validation for the public signup routes.
 *
 * The previous check was `^[^\s@]+@[^\s@]+\.[^\s@]+$`, which accepted anything
 * without a space or a second @ — including `<script>alert(1)</script>@x.com`.
 * That was never XSS (React escapes on render), but it let junk into the
 * waitlist and would become CSV injection the first time the list is exported
 * to a spreadsheet. This restricts both sides to characters that can actually
 * appear in an address.
 */
const LOCAL = String.raw`[A-Za-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_\`{|}~-]+)*`;
const LABEL = String.raw`[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?`;
const EMAIL_RE = new RegExp(`^${LOCAL}@${LABEL}(?:\\.${LABEL})+$`);

/** Spreadsheet formula prefixes — dangerous in an exported CSV cell. */
const FORMULA_PREFIX = /^[=+\-@\t\r]/;

export const MAX_EMAIL_LENGTH = 254;

/** Normalise and validate. Returns null when the address is not usable. */
export function normalizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase();
  if (!email || email.length > MAX_EMAIL_LENGTH) return null;
  if (email.length - email.replace(/@/g, "").length !== 1) return null;
  if (FORMULA_PREFIX.test(email)) return null;
  if (!EMAIL_RE.test(email)) return null;
  return email;
}
