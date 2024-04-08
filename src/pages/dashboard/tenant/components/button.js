import Image from 'next/image'
import React from 'react'

const Button = ({currentPage, totalPages, handleNext, handlePageClick, handlePrev, firstThreePages}) => {
  return (
    <div className="flex gap-2 justify-between items-center mt-4">
    <div>
      <button
        onClick={handlePrev}
        className={`text-[14px] font-[500] py-2 px-6 border rounded-md hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center${
          currentPage === 1 ? "pointer-events-none opacity-20" : ""
        }`}
      >
        <Image
        src={"/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"} alt="" height={16} width={16}/>
        Previous
      </button>
    </div>
    <div className="w-[350px] flex items-center justify-around">
      {firstThreePages && firstThreePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${
            currentPage === page ? "bg-GrayHomz5   text-GrayHomz" : ""
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage > 3 && totalPages - 2 > currentPage ? (
        <p className="text-[14px] font-[500] w-10 h-10 rounded-md flex items-center justify-center bg-GrayHomz5 text-GrayHomz">{currentPage}</p>
      ) : (
        <span className={`${totalPages <= 6 ? "hidden" : "inline"}`}>
          ...
        </span>
      )}
      {totalPages > 6 &&
        [totalPages - 2, totalPages - 1, totalPages].map((page) => (
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
      {currentPage > 3 && currentPage < 7 && (
        <span className={`text-[14px] font-[500] w-10 h-10 border rounded-md flex items-center justify-center bg-GrayHomz5 text-GrayHomz ${totalPages > 6 ? "hidden" : "inline"}`}>
          {currentPage}
        </span>
      )}
    </div>
    <div>
      <button
        onClick={handleNext}
        className={`py-2 px-6 rounded-md text-[14px] font-[500] border hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center ${
          totalPages <= 6 ? "ml-[0]" : "ml-0"
        } ${
          currentPage === totalPages ? "pointer-events-none opacity-20" : ""
        }`}
      >
        Next
        <Image
        src={"/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"} alt="" height={16} width={16}/>
      </button>
    </div>
  </div>
  )
}

export default Button