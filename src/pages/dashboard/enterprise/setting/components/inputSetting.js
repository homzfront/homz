import React from "react";

const InputSetting = ({ label, type, placeholder, onChange, value }) => {
  return (
    <div>
      <label className="text-[13px] font-[400] text-GrayHomz">
        {label} 
      </label>
      <input
        className="border mt-2 rounded-md p-3 h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[13px] placeholder:font-[500]"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputSetting;
