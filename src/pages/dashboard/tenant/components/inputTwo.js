import React from "react";

const Input = ({ label, type, placeholder }) => {
  return (
    <div className="flex gap-1 border">
      <input
        className=""
        type={type}
        placeholder={placeholder}
      />
      <label className="text-[14px] font-[500] text-BlackHomz">
        {label}
      </label>
    </div>
  );
};

export default Input;
