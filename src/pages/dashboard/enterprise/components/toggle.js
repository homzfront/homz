// ToggleButton.js
import React from "react";

const ToggleButton = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`rounded-full h-[24px] w-[44px] flex justify-center items-center border  cursor-pointer ${
        !isOpen ? "bg-GrayHomz6 pr-4" : "bg-BlueHomz pl-4"
      } `}
      style={{
        transition: "background-color 0.5s ease",
      }}
      onClick={onToggle}
    >
      <button  className={`rounded-full h-[20px] w-[22px] shadow-md bg-white `}>
         </button>
    </div>
  );
};

export default ToggleButton;
