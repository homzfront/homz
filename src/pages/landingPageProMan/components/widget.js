"use client"
import React, { useEffect, useState } from "react";
import PlansMonthly from "./plansMonthly.js";
import PlansYearly from "./plansYearly.js";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Widget = ({ routeTo }) => {
  const { data, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    fetchData();
  }, []);

  const pages = [
    { id: 1, name: "Pay Monthly", component: <PlansMonthly routeTo={routeTo} profile={data} /> },
    { id: 2, name: "Pay Yearly", component: <PlansYearly routeTo={routeTo} profile={data} /> },
  ];

  const [active, setActive] = useState(pages[0].id);

  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div className="w-full max-w-[1440px]">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-auto h-auto py-4">
        <div className="flex mt-1 gap-1 sm:gap-2 justify-between w-[280px] cursor-pointer m-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`${page.name === "Pay Yearly" ? "": ""} flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === page.id ? "bg-BlueHomz text-white" : "bg-whiteblue text-BlueHomz "
                }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className={`text-[14px] font-500 ${page.name === "Pay Yearly" ? "flex items-center gap-1": ""}`}>{page.name} <span className={`${page.name === "Pay Yearly" ? " bg-BlueHomz  py-1 px-2 rounded-md  font-normal text-[11px]": "hidden"} ${active === page.id ? "bg-white text-BlueHomz" : "text-white" }`}>Save 20%</span></p>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-[12px] ">
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
