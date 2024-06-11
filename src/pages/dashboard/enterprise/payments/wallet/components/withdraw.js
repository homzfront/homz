import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import BankForm from "../../components/bankForm";
import useBodyScroll from "@/utils/useBodyScroll";

const Withdraw = ({ illuminateWallet }) => {
  const [bankDetails, setBankDetails] = useState([]);
  const [fillBankDetails, setFillBankDetails] = useState(false);
  // useEffect to handle scrolling
  useBodyScroll([fillBankDetails]);

  // Ensure Data is defined before use
  const bankdata = bankDetails || []; // Assign an empty array if Data is undefined

  const handleAddBankDetails = () => {
    setFillBankDetails(!fillBankDetails);
  };
  
  const closeMenu = () => {
    setFillBankDetails(false);
  };
  return (
    <div className="p-5 border rounded-[12px] flex flex-col gap-4 w-[100%] h-auto md:h-[360px]">
      <div className="flex gap-1 items-center">
        {illuminateWallet ? (
          <Image
            src={"/static/dashboard/enterprisemanager/payment/received.png"}
            width={20}
            height={21}
            alt=""
          />
        ) : (
          <Image
            src={"/static/dashboard/tenant/finance/received.png"}
            width={20}
            height={21}
            alt=""
          />
        )}

        <p
          className={`text-[14px] font-[500] ${
            illuminateWallet ? "text-BlueHomz" : "text-GrayHomz6"
          } `}
        >
          Withdraw
        </p>
      </div>
      <p
        className={`text-[13px] font-[400]  ${
          illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
        }`}
      >
        Withdraw from your wallet balance to your local bank account
      </p>
      {bankdata < 1 ? (
        <div
          className={` rounded-md w-[212px] h-[37px] flex items-center justify-center  ${
            illuminateWallet
              ? "bg-BlueHomz"
              : "bg-GrayHomz6 pointer-events-none"
          }`}
          onClick={handleAddBankDetails}
        >
          <p className="text-[14px] font-[700] text-white cursor-pointer">
            Add withdrawal destination
          </p>
        </div>
      ) : (
        <div className="w-full">
          {bankdata.map((details, index) => (
            <div key={index}>
              <div className="flex gap-4 w-[240px] justify-between">
                <p className="text-[11px] font-[400] text-GrayHomz">
                  Account Number
                </p>
                <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
                  {details.accountNo}
                </p>
              </div>
              <div className="flex gap-4 w-[240px] justify-between">
                <p className="text-[11px] font-[400] text-GrayHomz">
                  Account Name
                </p>
                <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
                  {details.accountName}
                </p>
              </div>
              <div className="flex gap-4 w-[240px] justify-between">
                <p className="text-[11px] font-[400] text-GrayHomz">Bank</p>
                <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
                  {details.bankName}
                </p>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-4 mt-4">
            <Input label={"Amount (N)"} placeholder={"200,000"} />
            <div className=" bg-GrayHomz6 w-[full] h-[45px] rounded-md flex justify-center items-center">
              <span className=" text-GrayHomz2">Withdraw</span>
            </div>
          </div>
        </div>
      )}
      {fillBankDetails && (
        <div>
          <BankForm closeMenu={closeMenu} setBankDetails={setBankDetails} />
        </div>
      )}
    </div>
  );
};

export default Withdraw;
