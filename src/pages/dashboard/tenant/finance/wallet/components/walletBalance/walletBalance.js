"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RentInformation from "../../../components/rentInformation";
import PopUpWalletCreationForm from "../../../components/popUpWalletCreationForm";
import useBodyScroll from "@/utils/useBodyScroll";
import AccountInfo from "../../../components/accountInfo";
import { tenantRentInfo } from "@/api/tenantSevice";
import addCommasToNumber from "@/utils/addCommasToNumber";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import Link from "next/link";
import BusinessAlert from "@/components/icons/businessAlert";
import useClickOutside from "@/utils/clickOutside";
import TopUPModal from "../../../components/topUPModal";
import AddWallet from "@/components/icons/addWallet";


const WalletBalance = ({
  activeTwo,
  illuminateWallet,
  wallet,
  fetchDataAgain,
  walletBalance,
  loading,
  showKYC
}) => {
  const [data, setData] = useState("");
  const [rent, setRent] = useState(false);
  const [topUP, setTopUP] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  const dropdownRef = useClickOutside(() => setAccountInfo(false));
  const [loadingII, setLoadingII] = useState(false);
  const [rentData, setRentData] = useState("");
  const openWalletForm = () => {
    setOpenForm(!openForm);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  useBodyScroll([openForm, rent, accountInfo, topUP]);

  const openAccountInfo = () => {
    setAccountInfo(!accountInfo);
  };

  const closeAccountInfo = () => {
    setAccountInfo(false);
  };

  const payRent = () => {
    setRent(!rent);
  };

  const closeRentPay = () => {
    setRent(false);
  };

  const closeTopUpModal = () => {
    setTopUP(false);
  }

  useEffect(() => {
    const savedData = localStorage.getItem("Data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, [activeTwo]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoadingII(true);
  //       const data = await tenantRentInfo();
  //       if (data.statuscode === 200 && data.success === true) {
  //         setRentData(data);
  //         setLoadingII(false);
  //       } else {
  //         setLoadingII(false);
  //       }
  //     } catch (error) {
  //       setLoadingII(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="">
      {openForm && (
        <PopUpWalletCreationForm
          closeForm={closeForm}
          setOpenForm={setOpenForm}
          fetchDataAgain={fetchDataAgain}
        />
      )}
      {rent && (
        <RentInformation
          fetchDataAgain={fetchDataAgain}
          closeRentPay={closeRentPay}
          rentData={rentData}
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
              href={"/dashboard/tenant/profile?tab=acctInfo"}
              className="w-full h-[48px] bg-BlueHomz rounded-[4px] flex items-center justify-center"
            >
              <span className="text-white text-[16px] font-[700]">
                Update KYC
              </span>
            </Link>
          </div>
        </div>
      }
      <div className="bg-[url('/Background_image.png')] bg-BlueHomz bg-cover bg-no-repeat w-full md:h-[160px] rounded-[12px] flex flex-col justify-between md:pb-4">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/Frame1022.png"}
              height={52}
              width={52}
              alt=""
            />
            <p
              className={`text-[14px] font-[400] text-white hidden md:block  ${illuminateWallet ? "" : "hidden"
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
              <div className="w-[82px] py-2 bg-blue-200  border border-white cursor-pointer rounded-md md:mr-2">
                <p
                  onClick={payRent}
                  className="text-BlueHomz2 text-[14px] font-[400] w-full text-center"
                >
                  Pay Rent
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
        <div className="flex items-center justify-between pr-4">
          <div
            className={`w-[65%] text-[18px] font-[400] px-5 pb-3 md:pb-0 text-white flex flex-col md:flex-row md:items-center md:justify-start ${loading ? "" : ""
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
          <div
            onClick={() => {
              setTopUP(!topUP)
            }}
            className={`${illuminateWallet ? "" : "hidden"} py-2 px-4 w-[35%] cursor-pointer rounded-md flex items-center justify-center gap-1 hover:border`}>
            <AddWallet />
            <p
              className="hidden md:block text-white text-[11px] md:text-[12px] xl:text-[14px] font-[500] w-full text-center"
            >
              Top Up Wallet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
