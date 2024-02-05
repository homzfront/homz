import Image from "next/image";
import React, { useState } from "react";
import { set } from "react-hook-form";
import PopUpWalletCreationForm from "./popUpWalletCreationForm";

const WalletBalance = () => {
  const [openForm, setOpenForm]= useState(false);

  const openWalletForm = () => {
    setOpenForm(!openForm);
  }

  const closeForm = () => {
    setOpenForm(false);
  }
  return (
    <div>
      <div className="bg-[url('/Background_image.png')] bg-BlueHomz bg-cover bg-no-repeat w-[550px] h-[132px] rounded-[12px]">
        {
          openForm && <PopUpWalletCreationForm closeForm={closeForm}/>
        }
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/Frame1022.png"}
              height={52}
              width={52}
              alt=""
            />
            <p className="text-[14px] font-[400] text-white">Wallet Balance</p>
          </div>
          <div className="w-[140px] flex items-center py-2 bg-BlueHomz rounded-md">
            <p onClick={openWalletForm} className="text-white text-[14px] font-[400] w-full text-center">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/add.png"}
                alt=""
                width={16}
                height={16}
              />{" "}
              Create Wallet
            </p>
          </div>
        </div>
        <div className="text-[18px] font-[400] px-5 text-white">
          N36,000,000
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
