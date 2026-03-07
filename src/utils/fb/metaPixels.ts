declare global {
  interface Window {
    fbq?: (track: string, action: string, params?: object) => void;
    gtag?: (command: string, action: string, params?: object) => void;
  }
}

interface FbEventOptions {
  action: string;
  params?: object;
  callback?: () => void;
}

export const fbEvent = ({ action, params = {}, callback }: FbEventOptions): void => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", action, params);
    if (callback) callback();
  } else {
    console.warn("window.fbq not ready");
    if (callback) callback();
  }
};
