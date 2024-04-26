"use client"
import React, { useState } from 'react'
import SaveChanges from '../components/saveChanges';
import ToggleButton from '../../components/toggle';

const Notifications = () => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(true);
  
  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };
  return (
    <div>
      <div className="border-t p-8">
      <div className="rounded-md text-[16px] font-[400] text-GrayHomz h-[56px] w-[600px] bg-inputBg flex flex-col p-8 justify-center">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle2} isOpen={!isOpen2} />{" "}
            <p className="">Messages</p>
          </div>
        </div>
        <div className="mt-4 rounded-md text-[16px] font-[400] text-GrayHomz h-[56px] w-[600px] bg-inputBg flex flex-col p-8 justify-center">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle3} isOpen={!isOpen3} />{" "}
            <p className="">Alerts</p>
          </div>
        </div>
      </div>
      <div className='mt-[380px]'>
        <SaveChanges/>
      </div>
    </div>
  )
}

export default Notifications