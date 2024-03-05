// ToggleButton.js
import React from "react";

const ToggleButton = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`rounded-full h-7 w-11 flex justify-center items-center border  cursor-pointer ${
        !isOpen ? "bg-GrayHomz6 pr-4" : "bg-BlueHomz pl-4"
      } `}
      onClick={onToggle}
    >
      <button className={`rounded-full h-5 w-5 shadow-md bg-white `}>
         </button>
    </div>
  );
};

export default ToggleButton;
