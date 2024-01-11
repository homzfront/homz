"use client"
import React, { useState } from "react";
import All from "./all";
import InProgress from "./inProgress";
import PendingRequests from "./pendingRequests";
import Resolved from "./resolved";

const pages = [

  { id: 1, name: "All", component: <All /> },
  { id: 2, name: "In-progress", component: <InProgress /> },
  { id: 3, name: "Pending Requests", component: <PendingRequests /> },
  { id: 4, name: "Resolved", component: <Resolved /> },
];

const Widget = () => {
  const [active, setActive] = useState(pages[0].id);

  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className="flex mt-5 gap-2 justify-between w-[471px] px-8 cursor-pointer">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md  ${
                active === page.id ? "bg-BlueHomz text-white" : "text-BlackHomz"
              }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className="text-[14px] font-500">{page.name}</p>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-[12px]">
          {pages.map((page) => (
            <div
              key={page.id}
              className={active === page.id ? "inline" : "hidden"}
            >
              {page.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
