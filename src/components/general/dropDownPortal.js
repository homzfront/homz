// components/DropDownPortal.js
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const DropDownPortal = ({ children, position, onClose }) => {
  const menuRef = useRef();
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    // Adjust position if the dropdown would go off-screen
    const checkViewport = () => {
      if (!menuRef.current) return;

      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newLeft = position.left;
      let newTop = position.top;

      // Check right edge
      if (rect.right > viewportWidth) {
        newLeft = viewportWidth - rect.width - 10;
      }

      // Check bottom edge (only if dropdown opens downward)
      if (rect.bottom > viewportHeight) {
        newTop = position.top - rect.height - 30; // Open upward instead
      }

      setAdjustedPosition({ top: newTop, left: newLeft });
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    checkViewport();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [position, onClose]);

  return ReactDOM.createPortal(
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: adjustedPosition.top,
        left: adjustedPosition.left,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default DropDownPortal;