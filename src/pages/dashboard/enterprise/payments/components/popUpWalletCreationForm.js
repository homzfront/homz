import Image from "next/image";
import React from "react";

const PopUpWalletCreationForm = ({ closeForm }) => {
  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div className="w-[550px] h-[495px] bg-white shadow-lg rounded-md p-8">
        <div className="flex items-start w-full justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-[500] text-BlueHomz">
              Create Wallet
            </p>
            <p className="text-[13px] font-[400] text-GrayHomz">
              Update your profile to create wallet
            </p>
          </div>
          <div onClick={closeForm}>
            <Image
              src={
                "/static/dashboard/enterprisemanager/payment/close-square.png"
              }
              height={24}
              width={24}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpWalletCreationForm;
