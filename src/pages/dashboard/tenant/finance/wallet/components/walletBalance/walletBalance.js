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

const WalletBalance = ({
  activeTwo,
  illuminateWallet,
  wallet,
  fetchDataAgain,
  walletBalance,
  loading
}) => {
  const [data, setData] = useState("");
  const [rent, setRent] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  const [loadingII, setLoadingII] = useState(false);
  const [rentData, setRentData] = useState("");
  const openWalletForm = () => {
    setOpenForm(!openForm);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  useBodyScroll([openForm, rent, accountInfo]);

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

  // useEffect to load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("Data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, [activeTwo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingII(true);
        const data = await tenantRentInfo();
        if (data.statuscode === 200 && data.success === true) {
          setRentData(data);
          setLoadingII(false);
        } else {
          setLoadingII(false);
        }
      } catch (error) {
        setLoadingII(false);
      }
    };

    fetchData();
  }, []);

  console.log(loading);
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
      {accountInfo && (
        <AccountInfo closeAccountInfo={closeAccountInfo} wallet={wallet} />
      )}
      <div className="bg-[url('/Background_image.png')] bg-BlueHomz bg-cover bg-no-repeat w-full h-[132px] rounded-[12px]">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/Frame1022.png"}
              height={52}
              width={52}
              alt=""
            />
            <p
              className={`text-[14px] font-[400] text-white  ${illuminateWallet ? "" : "hidden"
                }`}
            >
              Wallet Balance
            </p>
          </div>
          {illuminateWallet ? (
            <div className="w-[82px] py-2 bg-blue-200  border border-white cursor-pointer rounded-md">
              <p
                onClick={payRent}
                className="text-BlueHomz2 text-[14px] font-[400] w-full text-center"
              >
                Pay Rent
              </p>
            </div>
          ) : loading ?
            (
              <div>
              </div>
            )
            :
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
            )
          }
        </div>
        <div className="flex items-center justify-between px-5">
          <div
            className={`text-[18px] font-[400] text-white flex items-center w-[45%] justify-start ${loading ? "" : ""
              } ${illuminateWallet ? "" : "hidden"
              }`}
          >
            {walletBalance?.data?.availableBalance ?
              `${addCommasToNumber(walletBalance?.data?.availableBalance)}` : "N 0"
            }
          </div>
          <div
            className={`cursor-pointer flex items-center gap-1 ${illuminateWallet ? "" : "hidden"
              }`}
          >
            <Image
              src={"/static/dashboard/enterprisemanager/payment/add.png"}
              alt=""
              width={16}
              height={16}
            />
            <p
              onClick={openAccountInfo}
              className="cursor-pointer text-[14px] font-[500] text-white"
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
