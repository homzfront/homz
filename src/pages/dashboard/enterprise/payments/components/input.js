import React from "react";

const Input = ({ label, type, placeholder, value }) => {
  return (
    <div>
      <label className="text-[13px] font-[500]">
        {label} 
      </label>
      <input
        className={`mt-2 rounded-md p-3 bg-inputBg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
