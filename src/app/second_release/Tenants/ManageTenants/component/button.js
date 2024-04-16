import React from "react";
import Image from "next/image";

const Button = ({
  currentPage,
  totalPages,
  lastThreePages,
  handleNext,
  handlePageClick,
  handlePrev,
  firstThreePages,
}) => {
  const isDisabledPrev = currentPage === 1;
  const isDisabledNext = currentPage === totalPages;

  return (
    <div className="flex md:w-full gap-2 justify-between items-center mt-4 px-3 md:px-0">
      <div>
        <button
          onClick={handlePrev}
          className={`adminBorders text-[14px] font-[500] py-2 px-6 border rounded-md hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center ${
            isDisabledPrev ? "pointer-events-none opacity-20" : ""
          }`}
          disabled={isDisabledPrev}
        >
          <span className="hidden md:block">Previous</span>
          <span className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="hidden md:flex items-center justify-around">
        {firstThreePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${
              currentPage === page ? "bg-GrayHomz5 text-GrayHomz" : ""
            }`}
          >
            {page}
          </button>
        ))}
        {totalPages > 6 && currentPage > 3 && currentPage < totalPages - 2 && (
          <span
            className={`text-[14px] font-[500] w-10 h-10  rounded-md text-center pt-[10px] mr-2 ${
              currentPage ? "bg-GrayHomz5 text-GrayHomz" : ""
            }`}
          >
            {currentPage}
          </span>
        )}
        {totalPages > 6 && currentPage > 3 && currentPage < totalPages - 2 && (
          <span className="text-[14px] font-[500]">. . .</span>
        )}
        {totalPages > 6 &&
          lastThreePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${
                currentPage === page ? "bg-GrayHomz5 text-GrayHomz" : ""
              }`}
            >
              {page}
            </button>
          ))}
      </div>

      <div className="block text-center md:hidden">
        <p className="">
          page {currentPage} of {totalPages}
        </p>
      </div>
      <div>
        <button
          onClick={handleNext}
          className={`adminBorders py-2 px-6 rounded-md text-[14px] font-[500] border hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center ${
            totalPages <= 6 ? "ml-[0]" : "ml-0"
          } ${
            isDisabledNext ? "pointer-events-none opacity-20" : ""
          }`}
          disabled={isDisabledNext}
        >
          <span className="hidden md:block">Next</span>
          <span className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
            }
            alt=""
            height={16}
            width={16}
            className="hidden md:block"
          />
        </button>
      </div>
    </div>
  );
};

export default Button;
