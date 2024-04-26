"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Dropdown from '../../components/dropDownFilter';


const Filter = ({
  selectedProperty,
  selectedStatus,
  selectedDate,
  setSelectedProperty,
  setSelectedStatus,
  setSelectedDate,
  options,
  options2,
  clear,
}) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <p className="text-[16px] font-[400] text-BlackHomz pr-2">
          Filter by:{" "}
        </p>
        <div className="w-[170px]">
          <Dropdown
            options={options2}
            onSelect={(option) => setSelectedProperty(option)}
            selectOption={selectedProperty === null ? "Property" : selectedProperty}
            className={"text-[14px] font-[500] text-GrayHomz2"}
          />
        </div>
        <div className="w-[140px]">
          <Dropdown
            options={options}
            onSelect={(option) => setSelectedStatus(option)}
            selectOption={selectedStatus === null ? "Status" : selectedStatus}
            className={"text-[14px] font-[500] text-GrayHomz2"}
          />
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-4 h-[42px] w-[130px] text-GrayHomz2 p-2 rounded cursor-pointer"
        />
        <button
          onClick={clear}
          type="text"
          className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[44px] w-[92px] rounded cursor-pointer">
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