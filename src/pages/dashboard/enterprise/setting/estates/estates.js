"use client";
import React, { useState } from "react";
import ToggleButton from "../../components/toggle";
import SaveChanges from "../components/saveChanges";

const Estates = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };
  const handleToggle4 = () => {
    setIsOpen4(!isOpen4);
  };
  return (
    <div>
      <div className="border-t p-8">
        <div className="text-[14px] font-[400] text-GrayHomz">
          Manage all documents that will be available to tenants
        </div>

        <div className="mt-8 rounded-md text-[16px] font-[400] text-GrayHomz h-[225px] w-[600px] bg-inputBg flex flex-col p-8 justify-between">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle} isOpen={!isOpen} />{" "}
            <p className="">Tenant Agreement</p>
          </div>
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle2} isOpen={!isOpen2} />
            <p>New Document</p>
          </div>
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle3} isOpen={isOpen3} />
            <p>Document 3</p>
          </div>
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle4} isOpen={isOpen4} />
            <p>Document 4</p>
          </div>
        </div>
      </div>
      <div className="mt-[140px]">
        <SaveChanges/>
      </div>
    </div>
  );
};

export default Estates;
