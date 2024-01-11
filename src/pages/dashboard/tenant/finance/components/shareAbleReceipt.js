import Image from "next/image";
import React from "react";

const ShareAbleReceipt = ({closeShareAbleReceipt}) => {
  return (
    <div className="absolute top-0 z-30 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div className="h-[680px] w-[530px] bg-white rounded-lg p-8">
        <div className="flex flex-col gap-4">
          <div className="">
            <div className="flex gap-4 items-center">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/BWFrame.png"}
                alt=""
                height={44}
                width={44}
                onClick={closeShareAbleReceipt}
              />
              <p className="text-GrayHomz text-[18px] font-[500]">
                Company Name
              </p>
            </div>
          </div>
          <div>
            <p className="text-BlueHomz text-[14px] font-[500]">
              Transaction Receipt
            </p>
          </div>
          <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-3">
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Amount
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                N1,500,000
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Description
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                2 years rent
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Payment Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                4th January, 2023
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Next Due Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                4th January, 2025
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Apartment Number
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                Apartment 1
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Estate
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                New Suncity Estate
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property Type
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                2-Bedroom Bungalow
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Estate Manager
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                Estate Manager’s Registered Name
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-whiteblue p-4 flex flex-col gap-2">
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
          <div className="border-t grid grid-cols-2 gap-3 pt-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/sms.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                Estate manager’s email@gmail.com
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
          <p className="mt-2 text-[11px] font-[400] text-GrayHomz text-center">
          &copy; Copyright  2022  Homz.ng. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareAbleReceipt;
