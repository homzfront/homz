"use client";
import Image from "next/image";
import Button from "@/pages/dashboard/enterprise/components/button";
import React, { useEffect, useState } from "react";

const All = ({ data }) => {

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = data?.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const getFirstLetter = (str) => {
    return str[0];
  };

  return (
    <div className="mt-4 w-full">
      <div className={`w-full`}>
        {currentData?.map((data) => (
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
                        <p className="text-[11px] md:text-[14px] font-[500] text-GrayHomz break-words">
                          {data?.From} transferred {data?.Amount} to {data?.To}
                        </p>
                        <span className="text-[10px] md:text-[13px] font-[400] text-GrayHomz2">
                          {data?.TransDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] md:text-[14px] font-[400] text-Success w-[20%]">
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
                            <p className="text-[11px] md:text-[14px] font-[500] text-GrayHomz break-words">
                              {data?.From} transferred {data?.Amount} to {data?.To}
                            </p>
                            <span className="text-[10px] md:text-[13px] font-[400] text-GrayHomz2">
                              {data?.TransDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px] md:text-[14px] font-[500] md:font-[400] text-[#d92d20] w-[20%]">
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
                              <p className="text-[11px] md:text-[14px] font-[500] text-GrayHomz break-words">
                                {data?.From} deposited {data?.Amount} into your wallet
                              </p>
                              <span className="text-[10px] md:text-[13px] font-[400] text-GrayHomz2">
                                {data?.TransDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[9px] md:text-[14px] font-[400] text-Success w-[20%]">
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
                              <p className="text-[11px] md:text-[14px] font-[500] text-GrayHomz break-words">
                                {data?.From} withdrew {data?.Amount} to your bank account
                              </p>
                              <span className="text-[10px] md:text-[13px] font-[400] text-GrayHomz2">
                                {data?.TransDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[9px] md:text-[14px] font-[400] text-[#d92d20] w-[20%]">
                          {data?.Amount}
                        </div>
                      </div>
                    )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default All;
