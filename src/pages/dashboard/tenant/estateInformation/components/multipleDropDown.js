"use client";
import React, { useState } from "react";
import Dropdown from "../../components/dropDownTwo";
import Image from "next/image";

const MultipleDropDown = () => {
  const optionI = [
    {
      id: 1,
      label: "Lagos",
    },
    {
      id: 2,
      label: "Edo",
    },
    {
      id: 3,
      label: "Abuja",
    },
  ];
  const optionII = [
    {
      id: 1,
      label: "Adolo",
    },
    {
      id: 2,
      label: "Egbeda",
    },
    {
      id: 3,
      label: "Isheri",
    },
  ];
  const optionIII = [
    {
      id: 1,
      label: "Akunmi Ayoimde",
    },
    {
      id: 2,
      label: "Tella Yetunde",
    },
    {
      id: 3,
      label: "Ibrahim Diaz",
    },
  ];

  const [selectedOptionI, setSelectedOptionI] = useState(null);
  const [selectedOptionII, setSelectedOptionII] = useState(null);
  const [selectedOptionIII, setSelectedOptionIII] = useState(null);

  // ... (Similar state variables for Dropdown II and III)

  // Update state when options are selected:
  const handleOptionISelect = (selectedOption) => {
    setSelectedOptionI(selectedOption);
  };

  const handleOptionISelectII = (selectedOption) => {
    setSelectedOptionII(selectedOption);
  };
  const handleOptionISelectIII = (selectedOption) => {
    setSelectedOptionIII(selectedOption);
  };

  return (
    <div className="flex gap-2 items-center justify-center p-0">
      <Dropdown
        options={optionI}
        selectOption={"State"}
        className={"w-[130px] h-[37px]"}
        onSelect={handleOptionISelect}
      />
      <Dropdown
        options={optionII}
        selectOption={"Area"}
        className={"w-[130px] h-[37px]"}
        onSelect={handleOptionISelectII}
      />
      <Dropdown
        options={optionIII}
        selectOption={"Property Manager"}
        className={"w-[230px] h-[37px]"}
        onSelect={handleOptionISelectIII}
      />
      <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] mt-[8px] h-[42px] w-[92px] rounded cursor-pointer">
        
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
            alt=""
            height={17}
            width={16}
          />
        Reset
      </button>
    </div>
  );
};

export default MultipleDropDown;
