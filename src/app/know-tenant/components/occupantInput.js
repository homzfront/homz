"use client";
import React from "react";

const formatLabel = (text) => {
  return text
    ? text
        .split(" ")
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("")
    : "";
};

const OccupantInput = ({
  name,
  span,
  formData,
  setFormData,
  label,
  type = "text",
  inputHeight = "h-[45px]",
  register,
  placeholder,
  className = "",
  width = "w-full",
  index, // Add index prop to target specific occupant
  field // Add field prop (name, age, occupation)
}) => {
  const formattedLabel = formatLabel(name || label);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    setFormData(prev => {
      const updatedOccupants = [...prev.occupantDetails];
      
      // Create new occupant object if it doesn't exist
      if (!updatedOccupants[index]) {
        updatedOccupants[index] = {
          [`occupantName${index}`]: '',
          [`occupantAge${index}`]: '',
          [`occupantOccupation${index}`]: '',
          is_deleted: false,
          _id: `temp-${Date.now()}`,
          index
        };
      }
      
      // Update specific field
      updatedOccupants[index][`occupant${field}${index}`] = value;
      return {
        ...prev,
        occupantDetails: updatedOccupants
      };
    });
  };

  // Get current value from form data
  const currentValue = formData?.occupantDetails?.[index]?.[`occupant${field}${index}`] || '';

  return (
    <div className={`relative inline-block ${width} ${className}`}>
      <label className="block text-GrayHomz text-sm font-medium mb-1">
        {label}
        {span && <span className="text-GrayHomz2 ml-0.5">{span}</span>}
      </label>
      <input
        {...register?.(`occupantDetails.${index}.${field}`)}
        onChange={handleInputChange}
        value={currentValue}
        type={type}
        className={`mt-2 text-BlackHomz px-4 border ${inputHeight} flex items-center rounded-[4px] w-full p-2 focus:outline-none bg-transparent`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default OccupantInput;