import Image from "next/image";
import React from "react";

const ReceiptModal = ({
  header,
  body,
  returnHome,
  returnHomeTwo,
  button,
  buttonTwo,
}) => {
  return (
    <div>
      <div className="absolute top-0 z-20 h-screen w-full px-4 md:px-0 inset-0 flex items-center bg-black bg-opacity-30">
        <div className="md:max-w-[464px] p-2 m-auto bg-white md:h-[300px] rounded-md">
          <div className="flex flex-col justify-around items-center h-full p-6">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
              }
              alt=""
              height={48}
              width={48}
            />
            <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
              {header}
            </h1>
            <p className="text-[16px] font-[500] text-GrayHomz text-center">
              {body}
            </p>
            <button
              onClick={returnHome}
              className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500]"
            >
              {button}
            </button>
            <button
              onClick={returnHomeTwo}
              className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
            >
              {buttonTwo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
