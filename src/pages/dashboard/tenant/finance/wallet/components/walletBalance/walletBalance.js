"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RentInformation from "../../../components/rentInformation";

const WalletBalance = () => {
  const [data, setData] = useState("");
  const [rent, setRent] = useState(false);

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
  }, []);

  const formatNumberWithCommas = (number) => {
    if (number == undefined) {
      return [];
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  console.log(data);
  return (
    <div className="">
      {rent && <RentInformation closeRentPay={closeRentPay} />}
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
          <div className="w-[82px] py-2 bg-blue-200  border border-white cursor-pointer rounded-md opacity-90">
            <p
              onClick={payRent}
              className="text-white text-[14px] font-[400] w-full text-center"
            >
              Pay Rent
            </p>
          </div>
        </div>
        <div className="text-[18px] font-[400] px-5 text-white">
          N{formatNumberWithCommas(data[0]?.wallet)}
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
