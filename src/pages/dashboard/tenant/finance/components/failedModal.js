import React from "react";
import Image from "next/image";

const FailedModal = ({
  header,
  body,
  button,
  returnHome,
  buttonTwo,
  returnHomeTwo,
}) => {
  return (
    <div className="absolute top-0 z-20 h-screen w-full  inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="max-w-[464px] m-auto bg-white h-auto rounded-md">
        <div className=" w-[464px] flex flex-col justify-around p-8 items-center gap-3">
          <Image
            src={"/static/dashboard/enterprisemanager/payment/Failed_icon.png"}
            alt=""
            height={56}
            width={56}
          />
          <div>
            <h1 className="text-center text-BlackHomz font-[700] text-[20px]">{header}</h1>
            <p className="text-center text-[16px] font-[400] text-GrayHomz">
              {body}
            </p>
          </div>
          <button
            onClick={returnHome}
            className="mt-4 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
          >
            {button}
          </button>
          <button
            onClick={returnHomeTwo}
            className={` ${buttonTwo? "block" : "hidden"} mt-2 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]`}
          >
            {buttonTwo}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;
