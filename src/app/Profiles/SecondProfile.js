"use client";
import React, { useState } from "react";
import InnerProfile from "./ManagerProfile/InnerProfile";
import BusinessInfoForm from "./Business";
import PaymentMethod from "./Payment";
import PasswordForm from "./Password";

const SecondProfile = ({ data }) => {
  const [active, setActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);

  const handlePageChange = () => {
    setActive(true);
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActiveFour(false);
    setActive(false);
    setActiveThree(false);
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveFour(false);
    setActiveTwo(false);
    setActive(false);
  };
  const handlePageChangeFour = () => {
    setActiveFour(true);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(false);
  };

  return (
    <div className="profiles adminCellBorders flex flex-col rounded-[8px] md:w-[744px] h-[686px] relative">
      <div className="Taskbar flex flex-wrap md:flex-nowrap gap-[2rem] items-center border-b-2 p-3 md:pl-[2.75rem] h-[101px]">
        <button
          className={` items-center ${
            active ? "text-blue-600" : "text-BlackHomz"
          }`}
          onClick={(e) => handlePageChange(e)}
        >
          User Profile
        </button>
        <button
          className={`${activeTwo ? "text-blue-600 " : "text-BlackHomz"}`}
          onClick={(e) => handlePageChangeTwo(e)}
        >
          Business Information
        </button>
        <button
          className={`${activeThree ? "text-blue-600" : "text-BlackHomz "}`}
          onClick={(e) => handlePageChangeThree(e)}
        >
          Password
        </button>
        <button
          className={`${activeFour ? "text-blue-600" : "text-BlackHomz"}`}
          onClick={(e) => handlePageChangeFour(e)}
        >
          Payment
        </button>
      </div>
      <main className="User_body pl-[1.75rem] pt-[2.5rem] pb-[4rem]">
        {active && <InnerProfile data={data} />}
        
        {activeTwo &&
            <BusinessInfoForm data={data} /> 
          }

        {activeThree &&
          <PasswordForm data={data} /> 
          }

        {activeFour &&
         <PaymentMethod data={data} /> 
          }
          
      </main>
    </div>
  );
};

export default SecondProfile;
