import { useEffect, useRef } from "react";

// Custom hook to handle clicks outside an element
const useClickOutside = (handler) => {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, { passive: true }); // Mark the event listener as passive
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, { passive: true });
    };
  }, []);

  return ref;
};

export default useClickOutside;
