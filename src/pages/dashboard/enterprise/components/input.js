import React from "react";

const Input = ({ disabled, label, type, placeholder, span, span2, onChange, value, required = false, autoComplete }) => {
  return (
    <div>
      <label className="text-[14px] font-[500]">
        {label} <span className="text-error">{span}</span>{" "}
        <span className="ml-1 text-[12px] font-[400] text-GrayHomz2">{span2}</span>
      </label>
      <input
        className={`px-4 border mt-2 rounded-md h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required} 
        disabled = {disabled}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Input;
