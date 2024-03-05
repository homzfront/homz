import { useEffect } from 'react';

const useDisableBodyScroll = (open) => {
  useEffect(() => {
    // Function to set maximum height for scrolling
    const setMaxHeightForScrolling = () => {
      // Determine the maximum height for scrolling
      const maxHeightForScrolling = Math.min(1020, window.innerHeight) + 'px';
      
      // Set max-height to the determined value
      document.body.style.maxHeight = maxHeightForScrolling;
    };

    // Set maximum height for scrolling by default
    setMaxHeightForScrolling();

    // Set maximum height for scrolling when sidebar is open
    if (open) {
      setMaxHeightForScrolling();
    }

    // Reset max-height when sidebar is closed
    return () => {
      document.body.style.maxHeight = 'none';
    };
  }, [open]); // Re-run effect when 'open' state changes
};

export default useDisableBodyScroll;

