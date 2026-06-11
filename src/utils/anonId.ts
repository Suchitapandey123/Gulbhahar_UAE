const ANON_ID_COOKIE = "gb_anon_id";
const ANON_ID_MAX_AGE_DAYS = 365;

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const writeCookie = (name: string, value: string, days: number) => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};

const generateId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

// Returns a persistent anonymous visitor id stored in a cookie,
// creating one on first call if it doesn't exist yet.
export const getAnonId = (): string => {
  let anonId = readCookie(ANON_ID_COOKIE);
  if (!anonId) {
    anonId = generateId();
    writeCookie(ANON_ID_COOKIE, anonId, ANON_ID_MAX_AGE_DAYS);
  }
  return anonId;
};

export default { getAnonId };
