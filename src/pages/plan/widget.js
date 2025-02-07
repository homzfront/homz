"use client"
import React, { useState } from "react";
import PlansYearly from "./components/plansYearly.js";
import PopUpPayment from "./components/popUpPayment.js";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import PlanPayBiAnnually from "./components/planPayBiAnnually.js";
import useOpenPaymentType from "@/store/enterpriseStore/useOpenPaymentType.js";
import Plans from "./components/plansMonthly.js";

const Widget = ({ data, setLoadProfile }) => {
  const pages = [
    { id: 1, name: "Pay Monthly", component: <Plans data={data} setLoadProfile={setLoadProfile} /> },
    { id: 2, name: "Pay bi-annually", component: <PlanPayBiAnnually data={data} setLoadProfile={setLoadProfile} /> },
    { id: 3, name: "Pay Yearly", component: <PlansYearly data={data} setLoadProfile={setLoadProfile} /> },
  ];

  const [active, setActive] = useState(pages[0].id);
  const { isOpenModal, setIsOpenModal } = useOpenPaymentType();

  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div>
      <div className="w-auto h-auto py-4">
        <CustomizedModal isOpen={isOpenModal} onRequestClose={() => setIsOpenModal(false)}>
          <PopUpPayment />
        </CustomizedModal>
        <div className="flex mt-1 gap-3 justify-center sm:gap-2 flex-wrap sm:flex-nowrap sm:justify-between w-full sm:w-[450px] cursor-pointer m-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === page.id ? "bg-BlueHomz text-white" : "bg-whiteblue text-BlueHomz"
                }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className="text-[14px] font-500">
                {page.name}
                {page.name === "Pay Yearly" && (
                  <span
                    className={`ml-1 py-1 px-2 rounded-md font-normal text-[11px] ${active === page.id ? "bg-white text-BlueHomz" : "bg-BlueHomz text-white"
                      }`}
                  >
                    Save 20%
                  </span>
                )}
              </p>
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