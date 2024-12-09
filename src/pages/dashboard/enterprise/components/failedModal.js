import React from "react";
import Image from "next/image";

const FailedModal = ({
  header,
  body,
  button,
  returnHome,
}) => {
  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="max-w-[464px] m-auto bg-white rounded-md">
        <div className="md:w-[464px] flex flex-col justify-around p-8 items-center gap-2">
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
            className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;
