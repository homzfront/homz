"use client"
import React from "react";
import PlansMonthly from "./components/plansMonthly.js";
import PlansYearly from "./components/plansYearly.js";
import PlanPayBiAnnually from "./components/planPayBiAnnually.js";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import PopUpPayment from "./components/popUpPayment.js";
import useOpenPaymentType from "@/store/enterpriseStore/useOpenPaymentType.js";


const Widget = ({ data, profile }) => {
  const { isOpenModal, setIsOpenModal } = useOpenPaymentType();
  const [active, setActive] = React.useState(0);

  const pages = [
    "Pay Monthly",
    "Pay bi-annually",
    "Pay Yearly",
  ];

  React.useEffect(() => {
    if (!profile) return;
    if (profile?.interval === "annually") {
      setActive(2);
    }
    else if (profile?.interval === "biannually") {
      setActive(1)
    }
    else {
      setActive(0)
    }
  }, [profile]);


  return (
    <div>
      <div className="w-auto h-auto py-4">
        <CustomizedModal isOpen={isOpenModal} onRequestClose={() => setIsOpenModal(false)}>
          <PopUpPayment profile={profile} />
        </CustomizedModal>
        <div className="flex mt-1 gap-3 justify-center sm:gap-2 flex-wrap sm:flex-nowrap sm:justify-between w-full sm:w-[500px] cursor-pointer m-auto">
          {pages.map((page, index)=> (
            <div
              key={index}
              className={`${page === "Pay Yearly" ? "" : ""} flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === index ? "bg-BlueHomz text-white" : "bg-whiteblue text-BlueHomz "
                }`}
              onClick={() => {
                setActive(index)
              }}
            >
              <p className={`text-[14px] font-500 ${page === "Pay Yearly" ||page === "Pay bi-annually" ? "flex items-center gap-1" : ""}`}>{page} <span className={`${page === "Pay Yearly" || page === "Pay bi-annually" ? " bg-BlueHomz  py-1 px-2 rounded-md  font-normal text-[11px]" : "hidden"} ${active === index ? "bg-white text-BlueHomz" : "text-white"}`}>{page === "Pay Yearly" ? "Save 20%" : "Save 10%"}</span></p>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-[12px] ">
          {active === 0 && (
            <PlansMonthly data={data} profile={profile} />
          )}
          {active === 1 && (
            <PlanPayBiAnnually data={data} profile={profile} />
          )}
          {active === 2 && (
            <PlansYearly data={data} profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
