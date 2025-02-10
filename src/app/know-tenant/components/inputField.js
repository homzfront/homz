"use client"
import React from "react";

const InputField = ({ span, formData, setFormData, label, type = "text", inputHeight = "h-[45px]", register = () => ({}), placeholder, className, width }) => {
  const formatLabel = () => {
    return label
      .split(" ") // Split by spaces
      .map((word, index) =>
        index === 0
          ? word.toLowerCase() // First word starts with lowercase
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize others
      )
      .join(""); // Join without spaces
  };

  const handleInputChange = (e) => {
    const formattedLabel = formatLabel(label);
    const value = e.target.value;
    
    setFormData((prev) => ({
      ...prev,
      [formattedLabel]: value, 
    }));
  };

  return (
    <div className={`relative inline-block w-full ${className}`}>
      <label className="block text-GrayHomz text-sm font-medium mb-1">{label}<span className="text-GrayHomz2 ml-0.5">{span}</span></label>
      <input
        onChange={handleInputChange}
        value={formData ? formData[formatLabel(label)] || "" : ""} 
        type={type}
        // {...register(label.toLowerCase())}
        className={`${width} mt-2 text-BlackHomz px-4 border ${inputHeight} flex items-center rounded-[4px] w-full p-2 focus:outline-none bg-transparent`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
