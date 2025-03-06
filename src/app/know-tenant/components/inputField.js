"use client"
import FormatLabel from "@/utils/formatLabel";
import React from "react";

const InputField = ({ name, span, formData, setFormData, label, type = "text", inputHeight = "h-[45px]", register = () => ({}), placeholder, className, width }) => {

  const handleInputChange = (e) => {
    const formattedLabel = FormatLabel(name ? name : label);
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name ? name : formattedLabel]: value,
    }));
  };
  
  return (
    <div className={`relative inline-block w-full ${className}`}>
      <label className="block text-GrayHomz text-sm font-medium mb-1">{label}<span className="text-GrayHomz2 ml-0.5">{span}</span></label>
      <input
        onChange={handleInputChange}
        value={formData?.[FormatLabel(name ? name : label)] ? formData?.[FormatLabel(name ? name : label)] : name ? formData?.[name] : ""}
        type={type}
        // {...register(label.toLowerCase())}
        className={`${width} mt-2 text-BlackHomz px-4 border ${inputHeight} flex items-center rounded-[4px] w-full p-2 focus:outline-none bg-transparent`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
