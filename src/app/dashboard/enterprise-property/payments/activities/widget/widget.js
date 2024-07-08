"use client";
import React, { useEffect, useState } from "react";
import All from "./all";
import TransferFrom from "./transferFrom";
import TransferTo from "./transferTo";
import Deposite from "./deposite";
import WithDrawal from "./withDrawal"

const Widget = ({data}) => {


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
        <div className="flex mt-5 gap-2 justify-between w-[550px] px-8 cursor-pointer">
          {pages?.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md  ${
                active === page.id ? "bg-BlueHomz text-white" : "text-BlackHomz hover:bg-walletBg hover:text-BlueHomz2"
              }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className="text-[14px] font-500">{page.name}</p>
            </div>
          ))}
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
