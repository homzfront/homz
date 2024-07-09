"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/general/pagination";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import SkeletonLoader from "./skeletonLoader";
import api from "@/utils/api";
import addCommasToNumber from "@/utils/addCommasToNumber";


const Deposite = () => {
  const [currentData, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (page) => {
      setLoading(true);
      try {
        const response = await api.get(`/wallet/activies/tenant?page=${page}&transactionType=deposit&type=add`);
        const result = response?.data;
        setData(result?.data);
        setTotalPages(result?.pagination?.totalPages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstThreePages = [1, 2, 3];
  const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

  const getFirstLetter = (str) => {
    return str[0];
  };

  return (
    <div className={`w-full`}>
      {loading ? (
        <SkeletonLoader data={currentData?.length} />
      ) : (
        <div className={`w-full`}>
          {currentData?.map((data) => (
            <div key={data?._id}>
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
                      <p className="text-[11px] md:text-[14px] font-[500] text-GrayHomz break-words">
                        You deposited {addCommasToNumber(data?.amount)} into your wallet
                      </p>
                      <span className="text-[10px] md:text-[13px] font-[400] text-GrayHomz2">
                        {changeBackendDateFormat(data?.transactionDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-[9px] md:text-[14px] font-[400] text-Success w-[20%]">
                  {addCommasToNumber(data?.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {currentData && currentData.length >= 1 && <div className="mt-6">
        <Pagination
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
          lastThreePages={lastThreePages}
        />
      </div>}
    </div>
  )
};

export default Deposite;