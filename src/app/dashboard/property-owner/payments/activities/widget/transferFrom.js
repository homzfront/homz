import React, { useState } from 'react'
import Button from "@/pages/dashboard/enterprise/components/button";
import Image from 'next/image';

const Data = [
  { Id: 1, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 2, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 3, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 4, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 5, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 6, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 7, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 8, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 9, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 10, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 11, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 12, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 13, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 14, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 15, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 16, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 17, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 18, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 19, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
  { Id: 20, From: "Adeyemo Olayemi", To: "you", Image: "/static/dashboard/enterprisemanager/payment/received_2.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000" },
]

const TransferFrom = () => {

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Data?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = Data?.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const getFirstLetter = (str) => {
    return str[0];
  };

  return (
    <div className={`w-full`}>
      {currentData?.map((data) => (
        <div key={data?.Id}>
          <div className="w-full flex items-center justify-between mt-8 border-b h-[40px] pb-7">
            <div className="w-[80%] flex items-center gap-4">
              <div className="">
                <Image
                  src={data?.Image}
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
        </div>
      ))}
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
  )
};

export default TransferFrom;