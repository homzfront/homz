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
  pixel
}) => {

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(...firstThreePages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(...lastThreePages);
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers.map((page, index) => (
      <button
        key={index}
        onClick={() => handlePageClick(page)}
        className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${page === parseInt(currentPage) ? "bg-GrayHomz5 text-GrayHomz" : ""
          }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className={`flex md:w-full gap-2 justify-between ${pixel ? pixel : "md:px-14"} mt-4`}>
      <div>
        <button
          onClick={handlePrev}
          className={`border text-[14px] font-[500] py-2 px-6 rounded-md hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center${currentPage === 1 ? "pointer-events-none opacity-20" : ""
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="hidden md:flex items-center justify-around">
        {renderPageNumbers()}
      </div>

      <div className="block text-center md:hidden">
        <p className="">
          page {currentPage} of {totalPages}
        </p>
      </div>
      <div>
        <button
          onClick={handleNext}
          className={`border py-2 px-6 rounded-md text-[14px] font-[500] hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center ${totalPages <= 6 ? "ml-[0]" : "ml-0"
            } ${currentPage === totalPages ? "pointer-events-none opacity-20" : ""
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
