import Image from "next/image";
import React, { useEffect, useState } from "react";
import PopUpWalletCreationForm from "../../components/popUpWalletCreationForm";
import useBodyScroll from "@/utils/useBodyScroll";
import AccountInfo from "../../components/accountInfo";
import addCommasToNumber from "@/utils/addCommasToNumber";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import BusinessAlert from "@/components/icons/businessAlert";
import Link from "next/link";
import useClickOutside from "@/utils/clickOutside";
import TopUPModal from "../../components/topUPModal";
import AddWallet from "@/components/icons/addWallet";

const WalletBalance = ({
  illuminateWallet,
  wallet,
  fetchDataAgain,
  walletBalance,
  loading,
  showKYC
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  const dropdownRef = useClickOutside(() => setAccountInfo(false));
  const [topUP, setTopUP] = useState(false);

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

  const closeTopUpModal = () => {
    setTopUP(false);
  }

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
        {topUP && (
          <TopUPModal
            closeTopUpModal={closeTopUpModal}
          />
        )}
        {accountInfo &&
          <div
            className="absolute px-8 md:px-0 inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
            <div ref={dropdownRef} className="bg-white w-[464px] h-[290px] rounded-[12px] flex flex-col p-8 items-center justify-around">
              <BusinessAlert />
              <p className="text-[20px] font-[700] text-BlackHomz">
                Update KYC
              </p>
              <p className="text-[16px] font-[400] text-GrayHomz text-center">
                Kindly verify your identity before proceeding
              </p>
              <Link
                href={"/dashboard/property-owner/profile?tab=acctInfo"}
                className="w-full h-[48px] bg-BlueHomz rounded-[4px] flex items-center justify-center"
              >
                <span className="text-white text-[16px] font-[700]">
                  Update KYC
                </span>
              </Link>
            </div>
          </div>
        }
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/Frame1022.png"}
              height={52}
              width={52}
              alt=""
            />
            <p
              className={`text-[14px] font-[400] text-white  ${illuminateWallet ? "hidden" : "hidden md:block"
                }`}
            >
              Wallet Balance
            </p>
          </div>
          {showKYC ?
            <div
              onClick={openAccountInfo}
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
            </div> :
            illuminateWallet ? (
              <div
              onClick={() => {
                setTopUP(!topUP)
              }}
              className="py-2 px-4 cursor-pointer rounded-md flex items-center gap-1 hover:border">
                <AddWallet />
              <p
                className="text-white text-[14px] font-[500] w-full text-center"
              >
               Top Up Wallet
              </p>
            </div>
            ) : wallet?.data === null ?
              (<div
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
              ) : <div></div>
          }
        </div>
        <div
          className={`text-[18px] font-[400] px-5 pb-3 md:pb-0 text-white flex flex-col md:flex-row md:items-center w-full md:justify-start ${loading ? "" : ""
            } ${illuminateWallet ? "" : "hidden"
            }`}
        >
          <p
            className={`text-[14px] font-[400] text-white md:hidden  ${illuminateWallet ? "" : "md:hidden"
              }`}
          >
            Wallet Balance
          </p>
          {walletBalance ?
            `${addCommasToNumber(walletBalance)}` : "N 0"
          }
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
