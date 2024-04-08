"use client";
import React, { useState } from "react";


const PropertyInfo = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedValue(option);
  };

  const options = [
    { id: 1, label: "Ajah" },
    { id: 2, label: "Lekki" },
    { id: 3, label: "Ikeja" },
  ];

  const optionsTwo = [
    { id: 1, label: "Lagos" },
    { id: 2, label: "Oyo" },
    { id: 3, label: "Calabar" },
  ];

  return (
    <div className="">
      <div className="mt-8 rounded-[12px] text-[16px] font-[400] text-GrayHomz h-[351px] w-[1108px] bg-inputBg flex flex-col gap-2 p-8 justify-between">
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Name</p>
          <p className="font-[500] text-BlackHomz">[Property Name]</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Location</p>
          <p className="font-[500] text-BlackHomz">[Area], [State]</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Address</p>
          <p className="font-[500] text-BlackHomz">[Property Address]</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Size</p>
          <p className="font-[500] text-BlackHomz">0.00 Sqm</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Total No of Apartments in Property</p>
          <p className="font-[500] text-BlackHomz">[Number of apartments]</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Description</p>
          <p className="font-[500] text-BlackHomz">[Description entered by property manager]</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
