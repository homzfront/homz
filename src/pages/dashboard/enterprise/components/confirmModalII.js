import Image from "next/image";
import React from "react";

const ConfirmModalIII = ({ header, button, returnHome }) => {
  return (
    <div className="px-8 md:px-0 absolute top-0 z-20 h-screen w-full  inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="md:max-w-[464px] m-auto bg-white h-auto rounded-md">
        <div className="mt-[-10px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
            }
            alt=""
            height={48}
            width={48}
          />
          <h1 className="text-BlackHomz text-center font-[700] text-[20px]">{header}</h1>
          <button
            onClick={returnHome}
            className="h-[48px] rounded-md w-full hover:bg-BlueHomz text-BlueHomz hover:text-white text-[16px] font-[400]"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalIII;
