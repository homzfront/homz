import React, { useState } from "react";
import PersonalInfo from "./components/personalInfo";
import CreatePassword from "./components/createPassword";

const Widget = () => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
  };

  return (
    <div>
      <div className="w-full h-auto">
        <div className="w-[794px] h-auto  flex justify-center">
          <div className="z-0 absolute w-[444px] pr-[96px] pl-[96px] py-[27px]">
            <div className="border-[1px]"></div>
          </div>
          <div className="z-1 relative flex mt-5 gap-4 justify-between items-center px-8 cursor-pointer w-[440px]">
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col items-center p-2 justify-center ${
                  !active
                    ? " bg-white rounded-full  w-1 h-1 shadow-md "
                    : "h-1 w-1"
                }`}
                onClick={handlePageChange}
              >
                <div
                  className={`rounded-full w-[1px] h-[1px]  bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
                ></div>
              </div>
              <p className="text-[14px] font-400">Personal Information</p>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col p-2 items-center justify-center ${
                  activeTwo
                    ? " bg-white rounded-full  w-1 h-1 shadow-md "
                    : "h-1 w-1"
                }`}
                onClick={handlePageChangeTwo}
              >
                <div
                  className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
                ></div>
              </div>
              <p className="text-[14px] font-400">Create password</p>
            </div>
          </div>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <PersonalInfo />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <CreatePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
