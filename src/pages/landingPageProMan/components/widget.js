"use client"
import React, { useEffect, useState } from "react";
import PlansMonthly from "./plansMonthly.js";
import PlansYearly from "./plansYearly.js";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PlanPayBiAnnually from "./planPayBiAnnually.js";

const Widget = ({ routeTo }) => {
  const { data, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (!data) return;
    if (data?.interval === "annually") {
      setActive(3);
    }
    else if (data?.interval === "bi-annually") {
      setActive(2)
    }
    else {
      setActive(1)
    }
  }, [data]);

  const pages = [
    { id: 1, name: "Pay Monthly", component: <PlansMonthly routeTo={routeTo} profile={data} /> },
    { id: 2, name: "Pay bi-annually", component: <PlanPayBiAnnually routeTo={routeTo} profile={data} /> },
    { id: 3, name: "Pay Yearly", component: <PlansYearly routeTo={routeTo} profile={data} /> },
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
        <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-3 w-full sm:w-[550px] justify-center cursor-pointer m-auto px-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`mt-2 sm:mt-0 ${page.name === "Pay Yearly" ? "" : ""} flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === page.id ? "bg-BlueHomz text-white" : "bg-whiteblue text-BlueHomz "
                }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className={`text-[14px] font-500 ${page.name === "Pay Yearly" ? "flex items-center gap-1" : ""}`}>{page.name} <span className={`${page.name === "Pay Yearly" ? " bg-BlueHomz  py-1 px-2 rounded-md  font-normal text-[11px]" : "hidden"} ${active === page.id ? "bg-white text-BlueHomz" : "text-white"}`}>Save 20%</span></p>
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
