import Image from "next/image";
import React from "react";

const WalletBalance = () => {
  return (
    <div>
      <div className="bg-[url('/Background_image.png')] bg-BlueHomz bg-cover bg-no-repeat w-[550px] h-[132px] rounded-[12px]">
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
          <div className="w-[120px] py-2 bg-walletBg rounded-md">
            <p className="text-white text-[14px] font-[400] w-full text-center">
              Receive Money
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
