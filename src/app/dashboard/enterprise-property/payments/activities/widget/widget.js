"use client";
import React, { useEffect, useState } from "react";
import All from "./all";
import TransferFrom from "./transferFrom";
import TransferTo from "./transferTo";
import Deposite from "./deposite";
import WithDrawal from "./withDrawal"
import Image from "next/image";
import Filter from "@/components/icons/filter";

const Widget = ({ data }) => {
  const Data = data || [];
  const pages = [
    { id: 1, name: "All", component: <All data={Data} /> },
    { id: 2, name: "Transfer From", component: <TransferFrom data={Data} /> },
    {
      id: 3,
      name: "Transfer To",
      component: <TransferTo data={Data} />,
    },
    { id: 4, name: "Deposit", component: <Deposite data={Data} /> },
    { id: 5, name: "Withdrawal", component: <WithDrawal data={Data} /> },
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
          <div className="hidden md:flex items-center gap-2">
            <input
              type="date"
              // onChange={(e) => setSelectedDate(e.target.value)}
              className="border px-4 h-[42px] w-[130px] text-GrayHomz2 p-2 rounded cursor-pointer"
            />
            <button
              // onClick={clear}
              type="text"
              className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz p-[9px] rounded cursor-pointer"
            >
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                }
                alt=""
                height={17}
                width={16}
              />
            </button>
            <button className="p-2 bg-BlueHomz rounded-[4px] flex items-center gap-1">
              <Filter />
              <p className="text-[14px] text-white font-[700]">Filter</p>
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
