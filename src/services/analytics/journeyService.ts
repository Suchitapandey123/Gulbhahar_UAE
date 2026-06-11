import { API_BASE_URL } from "@/utils/envHere";
import { getAnonId } from "@/utils/anonId";

export type VisitorEventType =
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "PROCEED_TO_CHECKOUT"
  | "CHECKOUT_FORM_FILLED"
  | "CONTINUE_TO_PAYMENT"
  | "PAYMENT_METHOD_SELECTED"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED";

// Fire-and-forget visitor funnel event. Never throws — journey tracking
// must not interfere with the actual cart/checkout/payment flow.
export const trackVisitorEvent = (
  eventType: VisitorEventType,
  data?: Record<string, unknown>
): void => {
  try {
    fetch(`${API_BASE_URL}/api/v1/journey/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anonId: getAnonId(), eventType, data: data || {} }),
    }).catch(() => {});
  } catch {
    // ignore
  }
};

export default { trackVisitorEvent };
