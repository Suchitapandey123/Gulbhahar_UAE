/** @param {{ action: any, params?: object, callback?: () => void }} options */
export const gaEvent = ({ action, params, callback }) => {
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
