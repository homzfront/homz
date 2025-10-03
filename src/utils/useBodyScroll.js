"use client"
import { useEffect } from "react";

const useBodyScroll = (triggerStates = []) => {
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;
    
    const shouldScroll = triggerStates.some((state) => state);

    document.body.style.overflow = shouldScroll ? "hidden" : "auto";

    if (shouldScroll) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }

    // Cleanup: Restore the body overflow when the component unmounts
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = "auto";
      }
    };
  }, [...triggerStates]);
};

export default useBodyScroll;


