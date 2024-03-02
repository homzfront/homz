import Image from "next/image";
import React, { useState } from "react";
import PopUpWalletCreationForm from "../../components/popUpWalletCreationForm";
import useBodyScroll from "@/utils/useBodyScroll";
import AccountInfo from "../../components/accountInfo";
import addCommasToNumber from "@/utils/addCommasToNumber";
import LoadingFormII from "@/components/mainmenu/loadingFormII";

const WalletBalance = ({
  illuminateWallet,
  wallet,
  fetchDataAgain,
  walletBalance,
  loading,
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);

  const openWalletForm = () => {
    setOpenForm(!openForm);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const openAccountInfo = () => {
    setAccountInfo(!accountInfo);
  };

  const closeAccountInfo = () => {
    setAccountInfo(false);
  };

  useBodyScroll([openForm, accountInfo]);

  return (
    <div>
      <div className="bg-[url('/Background_image.png')] bg-BlueHomz bg-cover bg-no-repeat w-[100%] h-[132px] rounded-[12px]">
        {openForm && (
          <PopUpWalletCreationForm
            closeForm={closeForm}
            fetchDataAgain={fetchDataAgain}
          />
        )}
        {accountInfo && (
          <AccountInfo closeAccountInfo={closeAccountInfo} wallet={wallet} />
        )}
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/Frame1022.png"}
              height={52}
              width={52}
              alt=""
            />
            <p
              className={`text-[14px] font-[400] text-white  ${
                illuminateWallet ? "" : "hidden"
              }`}
            >
              Wallet Balance
            </p>{" "}
          </div>
          {illuminateWallet ? (
            <div
              onClick={openAccountInfo}
              className="relative bg-white bg-opacity-30 cursor-pointer w-[140px] h-[40px] px-3 flex items-center justify-center py-2 rounded-md border border-white"
            >
              <p className="absolute text-white text-[14px] font-[500] w-full text-center">
                Fund Wallet
              </p>
            </div>
          ) : (
            <div
              onClick={openWalletForm}
              className="cursor-pointer w-[140px] h-[40px] px-3 flex items-center justify-center py-2 bg-BlueHomz5 rounded-md"
            >
              <Image
                src={"/static/dashboard/enterprisemanager/payment/add.png"}
                alt=""
                width={16}
                height={16}
              />
              <p className="text-white text-[14px] font-[500] w-full text-center">
                Create Wallet
              </p>
            </div>
          )}
        </div>
        <div
          className={`text-[17px] font-[400] px-5 text-white flex items-center w-[40%] justify-start ${
            loading ? "ml-6 mb-2" : ""
          } ${
            illuminateWallet ? "" : "hidden"
          }`}
        >
          {loading ? (
            <LoadingFormII />
          ) : (
            `${addCommasToNumber(walletBalance?.data?.availableBalance)}`
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
