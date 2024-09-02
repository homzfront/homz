"use client";
import React, { useState } from "react";
import All from "./all";
import TransferFrom from "./transferFrom";
import TransferTo from "./transferTo";
import Deposite from "./deposite";
import WithDrawal from "./withDrawal"
import Reset from "@/components/icons/reset";

const Widget = ({
  firstThreePages,
  currentPage,
  totalPages,
  handleNext,
  handlePageClick,
  handlePrev,
  lastThreePages,
  currentData,
  loading,
  setSelectedDate,
  clear
}) => {

  const pages = [
    {
      id: 1, name: "All", component:
        <All
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
          lastThreePages={lastThreePages}
          currentData={currentData}
          loading={loading}
        />
    },
    { id: 2, name: "Transfer From", component: <TransferFrom /> },
    { id: 3, name: "Transfer To", component: <TransferTo /> },
    { id: 4, name: "Deposit", component: <Deposite /> },
    { id: 5, name: "Withdrawal", component: <WithDrawal /> },
  ];

  const [active, setActive] = useState(pages[0].id);

  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div>
    <div className="w-full h-auto ">
      <div className="px-8 flex w-full justify-between items-center">
        <div className="flex mt-5 gap-2 justify-between w-[550px]">
          {pages?.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md cursor-pointer ${active === page.id ? "bg-BlueHomz text-white" : "text-BlackHomz hover:bg-walletBg hover:text-BlueHomz2"
                }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className="text-[14px] font-500">{page.name}</p>
            </div>
          ))}
        </div>
        <div className={`items-center gap-2 ${active === 1 ? "hidden md:flex" : "hidden"}`}>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-4 h-[37px] w-[160px] text-GrayHomz2 p-2 rounded cursor-pointer"
          />
          <button
            onClick={clear}
            type="text"
            className="bg-BlueHomz items-center text-[14px] font-[500] gap-2 flex text-white p-[8px] rounded cursor-pointer"
          >
            <Reset />
            Reset
          </button>
        </div>
      </div>
      <div className="my-8 rounded-[12px]">
        {pages?.map((page) => (
          <div
            key={page.id}
            className={active === page.id ? "inline" : "hidden"}
          >
            {page?.component}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Widget;
