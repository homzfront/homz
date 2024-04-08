import Image from "next/image";
import React from "react";

const Receipt = ({ closeReceipt, openShareAbleReceipt }) => {
  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div className="h-[660px] w-[530px] bg-white rounded-lg p-8">
        <div
          onClick={closeReceipt}
          className="cursor-pointer flex w-full justify-end"
        >
          <Image
            src={"/static/dashboard/enterprisemanager/payment/close-square.png"}
            alt=""
            height={24}
            width={24}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/BWFrame.png"}
              alt=""
              height={64}
              width={64}
            />
            <p className="text-GrayHomz text-[18px] font-[500]">Company Name</p>
          </div>
          <div>
            <p className="text-BlueHomz text-[14px] font-[500]">
              Transaction Receipt
            </p>
          </div>
          <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-4">
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Amount
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                N200,000
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Recipient
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                Victor Simon
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Description
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                2023 Rent Payments
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                6 December, 2023
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-whiteblue p-4 flex flex-col gap-4">
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Transaction Reference No
              </p>
              <div className="flex items-center gap-4 w-[50%]">
                <p className="text-BlueHomz text-[14px] font-[400]">
                  000000000000
                </p>
                <Image
                  src={"/static/dashboard/enterprisemanager/payment/copy.png"}
                  alt=""
                  height={16}
                  width={16}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Status
              </p>
              <p className="text-BlueHomz text-[14px] font-[400] w-[50%]">
                Successful
              </p>
            </div>
          </div>
          <button onClick={openShareAbleReceipt} className="w-full h-[48px] bg-BlueHomz rounded-md text-white">
            Share Receipt
          </button>
          <div className="border-t grid grid-cols-2 gap-2 pt-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/sms.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                Property manager’s email@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/call.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
              0000 000 0000
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/location.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
              17, Alapere, Alagomeji Area, Yaba, Lagos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
