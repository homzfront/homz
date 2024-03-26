"use client";
import Image from "next/image";
import React, { useState } from "react";

const AccountInfo = ({ closeAccountInfo, wallet }) => {

  const handleCopyClick = async (text, identifier) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState((prevState) => ({ ...prevState, [identifier]: true }));
      setTimeout(
        () =>
          setCopiedState((prevState) => ({
            ...prevState,
            [identifier]: false,
          })),
        2000
      ); // Clear the copied state after 2 seconds
    } catch (error) {
      // console.error("Unable to copy to clipboard:", error);
    }
  };
  const [copiedState, setCopiedState] = useState({
    copied: false,
  });

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[550px] h-[360px] bg-white shadow-lg rounded-md p-8 flex flex-col justify-between">
        <div className="flex items-start w-full justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-[500] text-BlueHomz">
              Top Up Your Wallet
            </p>
            <p className="text-[13px] font-[400] text-GrayHomz w-[430px]">
              Copy and transfer funds to your account number below. Transferred
              amount will reflect on your wallet balance.
            </p>
          </div>
          <div onClick={closeAccountInfo} className="cursor-pointer">
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
        <div className="flex flex-col gap-2 mt-4 px-1">
          <div className="flex w-full justify-between items-center py-2 border-b">
            <p className="text-[14px] font-[400] text-GrayHomz2">
              Account Number
            </p>
            <div className="flex items-center gap-2">
              {copiedState.copied && (
                <span className="text-Success italic text-[10px]">copied</span>
              )}
              <p className="text-[14px] font-[500] text-GrayHomz">
                {wallet?.data?.topUpAccountDetails?.accountNumber}
              </p>
              <Image
                src={"/static/dashboard/tenant/finance/copy.png"}
                height={16}
                width={16}
                alt=""
                className="cursor-pointer"
                onClick={() =>
                  handleCopyClick(
                    `${wallet?.data?.topUpAccountDetails?.accountNumber}`,
                    "copied"
                  )
                }
              />
            </div>
          </div>
          <div className="flex w-full justify-between items-center py-2 border-b">
            <p className="text-[14px] font-[400] text-GrayHomz2">Bank Name</p>
            <div className="">
              <p className="text-[14px] font-[500] text-GrayHomz">
                {wallet?.data?.topUpAccountDetails?.accountName}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center py-2 border-b">
            <p className="text-[14px] font-[400] text-GrayHomz2">
              Account Name
            </p>
            <div className="">
              <p className="text-[14px] font-[500] text-GrayHomz">
                {wallet?.data?.topUpAccountDetails?.bankName}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={closeAccountInfo}
          className="mt-4 text-[16px] font-[700] text-white bg-BlueHomz h-[48px] w-full rounded-[4px]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
