import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TransferHis = ({ illuminateWallet, walletActivities }) => {

  const getFirstLetter = (str) => {
    if (!str) {
      return "H"
    } else {
      return str[0];
    }
  };

  return (
    <div className="p-5 mt-0 border rounded-[12px] w-[100%] overflow-auto max-h-[407px] scrollbar-container">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {illuminateWallet
            ? (
              <Image
                src={"/static/dashboard/enterprisemanager/payment/clock.png"}
                alt=""
                height={21}
                width={20}
              />
            ) : (
              <Image
                src={"/static/dashboard/tenant/finance/clock.png"}
                alt=""
                height={21}
                width={20}
              />
            )}
          <p
            className={`text-[14px] font-[500] ${illuminateWallet
              ? "text-GrayHomz" : "text-GrayHomz6"
              }`}
          >
            Activities
          </p>
        </div>
        <Link href={illuminateWallet ? "/dashboard/property-owner/payments/activities" : ""} className="flex gap-1 items-center">
          <p
            className={`text-[13px] font-[400]   ${illuminateWallet
              ? "text-BlackHomz" : "text-GrayHomz6"
              }`}
          >
            View All
          </p>
          {illuminateWallet
            ? (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/payment/arrow-right.png"
                }
                alt=""
                height={17}
                width={17}
              />
            ) : (
              <Image
                src={"/static/dashboard/tenant/finance/arrow-right.png"}
                alt=""
                height={17}
                width={17}
              />
            )}
        </Link>
      </div>
      <div className={`${illuminateWallet
        ? "block" : "hidden"}`}>
        {walletActivities?.map((data) => (
          <div key={data?._id}>
            <div className="">
              {data?.transactionType === "transfer" && data?.type === "add" ? (
                <div className="w-full flex items-center justify-between mt-8 border-b h-[40px] pb-7">
                  <div className="w-[80%] flex items-center gap-4">
                    <div className="">
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/payment/received_2.png"
                        }
                        width={20}
                        height={21}
                        alt=""
                        className=""
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden w-[32px] h-[32px] rounded-[100%] md:flex items-center justify-center bg-BlueHomz">
                        <p className="text-[16px] font-[500] text-white">
                          {getFirstLetter(data?.sender?.fullName)}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                          {data?.sender?.fullName} transferred <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)} to You
                        </p>
                        <span className="text-[10px]  font-[400] text-GrayHomz2">
                          {changeBackendDateFormat(data?.transactionDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px]  font-[400] text-Success w-[20%]">
                  <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)}
                  </div>
                </div>
              )
                :
                data?.transactionType === "withdrawal" && data?.type === "subtract" ?
                  (
                    <div className="w-full flex items-center justify-between mt-8 border-b h-[40px] pb-7">
                      <div className="w-[80%] flex items-center gap-4">
                        <div className="">
                          <Image
                            src={
                              "/static/dashboard/enterprisemanager/payment/send.png"
                            }
                            width={20}
                            height={21}
                            alt=""
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="hidden w-[32px] h-[32px] rounded-[100%] md:flex items-center justify-center bg-warning2">
                            <p className="text-[16px] font-[500] text-white">
                              {getFirstLetter(data?.sender?.fullName)}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                              You withdrew <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)} to your bank account
                            </p>
                            <span className="text-[10px]  font-[400] text-GrayHomz2">
                              {changeBackendDateFormat(data?.transactionDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px]  font-[500] md:font-[400] text-[#d92d20] w-[20%]">
                      <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)}
                      </div>
                    </div>
                  ) :
                  data?.transactionType === "deposit" && data?.type === "add" ?
                    (
                      <div className="w-full flex items-center justify-between mt-8 border-b h-[40px] pb-7">
                        <div className="w-[80%] flex items-center gap-4">
                          <div className="">
                            <Image
                              src={
                                "/static/dashboard/enterprisemanager/payment/received_2.png"
                              }
                              width={20}
                              height={21}
                              alt=""
                              className=""
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="hidden w-[32px] h-[32px] rounded-[100%] md:flex items-center justify-center bg-BlueHomz">
                              <p className="text-[16px] font-[500] text-white">
                                {getFirstLetter(data?.sender?.fullName)}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                                You deposited <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)} into your wallet
                              </p>
                              <span className="text-[10px]  font-[400] text-GrayHomz2">
                                {changeBackendDateFormat(data?.transactionDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[9px]  font-[400] text-Success w-[20%]">
                        <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)}
                        </div>
                      </div>
                    )
                    :
                    (
                      <div className="w-full flex items-center justify-between mt-8 border-b h-[40px] pb-7">
                        <div className="w-[80%] flex items-center gap-4">
                          <div className="">
                            <Image
                              src={
                                "/static/dashboard/enterprisemanager/payment/send.png"
                              }
                              width={20}
                              height={21}
                              alt=""
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="hidden w-[32px] h-[32px] rounded-[100%] md:flex items-center justify-center bg-warning2">
                              <p className="text-[16px] font-[500] text-white">
                                {getFirstLetter(data?.receiver?.fullName)}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                                You transferred <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)} to {data?.receiver?.fullName}
                              </p>
                              <span className="text-[10px]  font-[400] text-GrayHomz2">
                                {changeBackendDateFormat(data?.transactionDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[9px]  font-[400] text-[#d92d20] w-[20%]">
                        <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amount)}
                        </div>
                      </div>
                    )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferHis;
