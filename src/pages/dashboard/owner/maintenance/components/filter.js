"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Dropdown from '../../components/dropDownTwo';


const Filter = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const options = [
        { id: 1, label: "Heaven Estate" },
        { id: 2, label: "Diamond Estate" },
        { id: 3, label: "Ajao Estate" },
        { id: 4, label: "Platnium Estate" },
      ];
    const options2 = [
        { id: 1, label: "Abuja" },
        { id: 2, label: "Lagos" },
        { id: 3, label: "Ekiti" },
        { id: 4, label: "Jos" },
      ];
      const handleSelect = (option) => {
        // Handle the selected value as needed
        console.log("Selected Option:", option);
        setSelectedValue(option);
      };
  return (
    <div>
        <div className="flex items-center justify-center gap-2">
            <p className="text-[16px] font-[400] text-BlackHomz pr-2">
              Filter by:{" "}
            </p>
            <Dropdown
              options={options}
              onSelect={handleSelect}
              selectOption={"Property"}
              className={"w-[150px] text-[14px] font-[500] text-GrayHomz2"}
            />

            <Dropdown
              options={options2}
              onSelect={handleSelect}
              selectOption={"Status"}
              className={"w-[100px] text-[14px] font-[500] text-GrayHomz2"}
            />
            <input
              type="date"
              className="border text-GrayHomz2 px-4 h-[45px] w-[120px] py-2 rounded cursor-pointer"
            />
            <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[44px] w-[92px] rounded cursor-pointer">
              <span>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                  }
                  alt=""
                  height={17}
                  width={16}
                />
              </span>
              Reset
            </button>
          </div>
         
    </div>
  )
}

export default Filter