import Image from "next/image";
import React from "react";

const Button = ({
  currentPage,
  totalPages,
  lastThreePages,
  handleNext,
  handlePageClick,
  handlePrev,
  firstThreePages,
}) => {
  const renderPageNumbers = () => {
    if (totalPages <= 6) {
      // Show all pages if total pages is less than or equal to 6
      return Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${
              currentPage === page ? "bg-GrayHomz5 text-GrayHomz" : ""
            }`}
          >
            {page}
          </button>
        )
      );
    } else {
      // Default behavior when total pages is more than 6
      return (
        <>
          {firstThreePages
            .filter((page) => !lastThreePages.includes(page))
            .map((page) => (
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

          <span
            className={`text-[14px] font-[500] ${
              firstThreePages.length === 0 && "hidden"
            }`}
          >
            {firstThreePages.every((element) =>
              lastThreePages.includes(element)
            )
              ? ""
              : ". . ."}
          </span>
          {lastThreePages.map((page) => (
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
        </>
      );
    }
  };

  return (
    <div className="flex md:w-full gap-2 justify-between items-center mt-6 mb-3">
      <div>
        <button
          onClick={handlePrev}
          className={`adminBorders text-[14px] font-[500] py-2 px-6 border rounded-md hover:bg-whiteblue border-[#006AFF] text-[#006AFF] flex items-center justify-center ${
            currentPage === 1 ? "pointer-events-none opacity-20" : ""
          }`}
        >
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
            }
            alt=""
            height={16}
            width={16}
            className="hidden"
          />
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="hidden md:flex items-center justify-around">
        {renderPageNumbers()}
      </div>
      <div className="block text-center md:hidden">
        <p>
          page {currentPage} of {totalPages}
        </p>
      </div>
      <div>
        <button
          onClick={handleNext}
          className={`adminBorders py-2 px-6 rounded-md text-[14px] font-[500] border hover:bg-whiteblue border-[#006AFF] text-[#006AFF] flex items-center justify-center ${
            currentPage === totalPages ? "pointer-events-none opacity-20" : ""
          }`}
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
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
