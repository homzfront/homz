import Image from "next/image";
import Link from "next/link";
import React from "react";

const Activities = ({ illuminateWallet }) => {
  const Data = [
    {
      Id: 1, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "transfer"
    },
    {
      Id: 2, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000 ", tyepe: "transfer"
    },
    {
      Id: 3, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "deposited"
    },
    {
      Id: 4, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000 ", tyepe: "withdrawal"
    },
    {
      Id: 5, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "transfer"
    },
    {
      Id: 6, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000 ", tyepe: "transfer"
    },
    {
      Id: 7, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "deposited"
    },
    {
      Id: 8, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000 ", tyepe: "withdrawal"
    },
    {
      Id: 9, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "deposited"
    },
    {
      Id: 10, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000 ", tyepe: "withdrawal"
    },
    {
      Id: 11, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "deposited"
    },
    {
      Id: 12, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000 ", tyepe: "withdrawal"
    },
    {
      Id: 13, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000 ", tyepe: "transfer"
    },
    {
      Id: 14, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "deposited"
    },
    {
      Id: 15, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000 ", tyepe: "withdrawal"
    },
    {
      Id: 16, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "transfer"
    },
    {
      Id: 17, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000 ", tyepe: "transfer"
    },
    {
      Id: 18, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000 ", tyepe: "transfer"
    },
    {
      Id: 19, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000 ", tyepe: "transfer"
    },
    {
      Id: 20, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000 ", tyepe: "transfer"
    },
  ];

  const getFirstLetter = (str) => {
    return str[0];
  };

  return (
    <div className="p-5 mt-0 border rounded-[12px] w-[100%] overflow-auto max-h-[508px] scrollbar-container">
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
        <Link href={illuminateWallet ? "/dashboard/tenant/finance/activities" : ""} className="flex gap-1 items-center">
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
        {Data.map((data) => (
          <div key={data?.Id}>
            <div className="">
              {data?.Status === "Receive" && data?.tyepe === "transfer" ? (
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
                          {getFirstLetter(data?.From)}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                          {data?.From} transferred {data?.Amount} to {data?.To}
                        </p>
                        <span className="text-[10px]  font-[400] text-GrayHomz2">
                          {data?.TransDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px]  font-[400] text-Success w-[20%]">
                    {data?.Amount}
                  </div>
                </div>
              )
                :
                data?.Status === "Sent" && data?.tyepe === "transfer" ?
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
                              {getFirstLetter(data?.To)}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                              {data?.From} transferred {data?.Amount} to {data?.To}
                            </p>
                            <span className="text-[10px]  font-[400] text-GrayHomz2">
                              {data?.TransDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px]  font-[500] md:font-[400] text-[#d92d20] w-[20%]">
                        {data?.Amount}
                      </div>
                    </div>
                  ) :
                  data?.Status === "Receive" && data?.tyepe === "deposited" ?
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
                                {getFirstLetter(data?.To)}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                                {data?.From} deposited {data?.Amount} into your wallet
                              </p>
                              <span className="text-[10px]  font-[400] text-GrayHomz2">
                                {data?.TransDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[9px]  font-[400] text-Success w-[20%]">
                          {data?.Amount}
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
                                A
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[11px]  font-[500] text-GrayHomz break-words">
                                {data?.From} withdrew {data?.Amount} to your bank account
                              </p>
                              <span className="text-[10px]  font-[400] text-GrayHomz2">
                                {data?.TransDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[9px]  font-[400] text-[#d92d20] w-[20%]">
                          {data?.Amount}
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

export default Activities;
