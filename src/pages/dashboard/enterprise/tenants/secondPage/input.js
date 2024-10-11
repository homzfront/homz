import React from "react";

const Input = ({ disabled, label, type, placeholder, span, span2, onChange, value, required = false, }) => {
  return (
    <div>
      <div className="md:h-[40px] text-[14px] font-[500] flex flex-col">
        <label className="">
          {label} <span className="text-error">{span}</span>{" "}
        </label>
        <span className="text-[12px] font-[400] text-GrayHomz2">{span2}</span>
      </div>
      <input
        className={`px-4 border mt-2 rounded-md pl-3 flex justify-center items-center h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
