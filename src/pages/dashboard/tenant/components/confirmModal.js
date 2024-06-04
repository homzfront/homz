import Image from "next/image";
import React from "react";

const ConfirmModal = ({ header, body, button, returnHome }) => {
  return (
    <div className="absolute top-0 z-20 h-screen w-full px-8 md:px-0 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full md:max-w-[464px] bg-white h-[290px] rounded-md">
        <div className="w-full h-full flex justify-center items-center m-auto">
        <div className="w-[464px] flex flex-col justify-around px-8  items-center gap-3">
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
            }
            alt=""
            height={48}
            width={48}
          />
          <h1 className="text-BlackHomz font-[700] text-[20px]">{header}</h1>
          <p className="text-[16px] font-[400] text-GrayHomz text-center">{body}</p>
          <button
            onClick={returnHome}
            className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
          >
            {button}
          </button>
        </div>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
