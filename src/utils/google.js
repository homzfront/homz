// utils/google.ts (or wherever your helper lives)

export const sendGTMEvent = (data) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};
