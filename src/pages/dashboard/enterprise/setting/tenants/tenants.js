"use client";
import React, { useState } from "react";
import ToggleButton from "../../components/toggle";
import InputSetting from "../components/inputSetting";
import SaveChanges from "../components/saveChanges";

const Tenants = () => {
  const documentNames = [
    "Full Name",
    "New DocumentApartment Address",
    "Apartment Number",
    "Estate",
    "Phone Number",
  ];
  const [toggles, setToggles] = useState([false, true, true, true, true]);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(true);
  const [incentive, setIntensive] = useState("");

  const handleInput = (e) => {
    // setIntensive((e)=> e.target.value)
  };

  const handleToggle = (index) => {
    setToggles((prevToggles) => {
      const newToggles = [...prevToggles];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };

  return (
    <div>
      <div className="border-t p-8">
        <div className="text-[14px] font-[400] text-GrayHomz">
          Customize the information required from tenants on their "Update
          biodata form."
        </div>

        <div className="mt-8 rounded-md text-[16px] font-[400] text-GrayHomz h-[280px] w-[600px] bg-inputBg flex flex-col p-8 justify-between">
          {toggles.map((isOpen, index) => (
            <div key={index} className="flex gap-2 items-center">
              <ToggleButton
                onToggle={() => handleToggle(index)}
                isOpen={!isOpen}
              />
              <p>{documentNames[index]}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md text-[16px] font-[400] text-GrayHomz h-[56px] w-[600px] bg-inputBg flex flex-col p-8 justify-center">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle2} isOpen={!isOpen2} />{" "}
            <p className="">Allow messages from tenants</p>
          </div>
        </div>
        <div className="mt-4 rounded-md text-[16px] font-[400] text-GrayHomz h-[56px] w-[600px] bg-inputBg flex flex-col p-8 justify-center">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle3} isOpen={!isOpen3} />{" "}
            <p className="">Early rent payment incentive</p>
          </div>
        </div>
        <div className="w-[600px] flex flex-col gap-1 mt-2">
          <InputSetting
            label={"Add a heading for your payment incentive"}
            type={"text"}
            placeholder={"E.g Early Rent Payment Cashback!"}
            onChange={handleInput}
            value={incentive}
          />
          <InputSetting
            label={"Add a description of your payment incentive"}
            type={"text"}
            placeholder={"E.g Pay within the first 6 months for 10% cashback!"}
            onChange={handleInput}
            value={incentive}
          />
        </div>
      </div>
            <div className="mt-[-110px]">
            <SaveChanges/>
            </div>
    </div>
  );
};

export default Tenants;
