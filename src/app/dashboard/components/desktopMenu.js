import Image from "next/image";
import React, { useRef } from "react";
import MobileDropDown from "../accessControlComponents/mobileDropDown";

const DesktopMenu = ({ open, setStatus, reSet}) => {
  const dropDownMenu = useRef();

  const handleResetFilter = () => {
    if (dropDownMenu.current) {
      dropDownMenu.current.reset(); // Call the reset method of the child
    }
    reSet();
  };
  return (
    <div
      className={`bg-white border ${
        open ? "flex flex-col" : "hidden"
      } w-[212px] p-[8px] rounded-[12px] gap-[16px] `}
    >
      <div className=" flex items-center justify-between">
        <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] pt-2">
          Filter by
        </p>
      </div>

      <MobileDropDown setStatus={setStatus} ref={dropDownMenu} />

      <button
        className="border sm:w-full w-[318px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer"
        onClick={handleResetFilter}
      >
        <Image
          src={"/static/images/white_repeat.svg"}
          alt=""
          height={17}
          width={16}
        />

        <span className="text-[14px] leading-[17.64px] text-[700] text-white">
          Reset
        </span>
      </button>
    </div>
  );
};

export default DesktopMenu;
