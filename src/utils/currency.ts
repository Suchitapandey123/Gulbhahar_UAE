/**
 * UAE currency display helpers (UI-only).
 * Prices are stored in INR by the backend; business logic untouched.
 */

export const AED_SYMBOL = "AED";

export const INR_TO_AED_RATE = 0.0438;

export function inrToAed(amountInINR: number): number {
  const raw = amountInINR * INR_TO_AED_RATE;
  return Math.round(raw);
}

export function formatAED(amountInINR: number | null | undefined): string {
  const n = amountInINR == null ? 0 : inrToAed(amountInINR);
  return `${AED_SYMBOL} ${n.toLocaleString("en-US")}`;
}

export function formatAEDShort(amountInINR: number | null | undefined): string {
  const n = amountInINR == null ? 0 : inrToAed(amountInINR);
  return `AED ${n.toLocaleString("en-US")}`;
}