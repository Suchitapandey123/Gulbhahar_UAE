export const fbEvent = ({ action, params = {}, callback }) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel Event:', action, params); // Debug log
    window.fbq('trackCustom', action, params);
    if (callback) callback();
  } else {
    console.warn("window.fbq not ready");
    if (callback) callback();
  }
};