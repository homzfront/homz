import React from "react";

const Input = ({ label, type, placeholder, span, span2, onChange, value, required = false, }) => {
  return (
    <div>
      <label className="text-[14px] font-[500]">
        {label} <span className="text-error">{span}</span>{" "}
        <span className="ml-1 text-[12px] font-[400] text-GrayHomz2">{span2}</span>
      </label>
      <input
        className={`${type === "date" ? "" : "justify-center"} border mt-2 rounded-md pl-3 flex items-center h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required} 
      />
    </div>
  );
};

export default Input;
