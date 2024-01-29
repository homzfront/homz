import Image from "next/image";
import React from "react";

const PopUpMenu = ({ openLink }) => {
  return (
    <div className="drop-down absolute text-GrayHomz font-[500] top-8 right-2 border h-[50px] w-[218px] rounded-lg bg-white flex flex-col items-center justify-around">
      <div className="rounded-md flex gap-1 items-center  px-2 w-full ">
        <div onClick={openLink} className="hover:bg-whiteblue h-full w-full rounded-md">
          <p className="text-[13px] font-[500] py-1 px-2  text-GrayHomz hover:text-BlueHomz">
          Join Property
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopUpMenu;
