import React from "react";

const Input = ({ label, type, placeholder }) => {
  return (
    <div className="flex gap-1">
      <input
        className="border rounded-md px-4 h-10 w-[120px] mb-1 py-2  cursor-pointer placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[400]"
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
