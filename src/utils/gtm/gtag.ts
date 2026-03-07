interface GaEventOptions {
  action: string;
  params?: Record<string, unknown>;
  callback?: () => void;
}

export const gaEvent = ({ action, params, callback }: GaEventOptions): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      ...params,
      event_callback: callback,
    });
  } else {
    console.warn("window.gtag not ready");
    if (callback) callback();
  }
};
