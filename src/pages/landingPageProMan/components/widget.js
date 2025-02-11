"use client"
import React from "react";
import PlansMonthly from "./plansMonthly.js";
import PlansYearly from "./plansYearly.js";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PlanPayBiAnnually from "./planPayBiAnnually.js";
import useOpenPaymentType from "@/store/enterpriseStore/useOpenPaymentType.js";
import PopUpPayment from "./popUpPayment.js";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";


const Widget = ({ routeTo }) => {
  const { data, fetchData } = useProfileEnterpriseMe();
  const { isOpenModal, setIsOpenModal } = useOpenPaymentType();
  const [active, setActive] = React.useState(0);

  const pages = [
    "Pay Monthly",
    "Pay bi-annually",
    "Pay Yearly",
  ];

  React.useEffect(() => {
    fetchData();
  }, []);


  React.useEffect(() => {
    if (!data) return;
    if (data?.interval === "annually") {
      setActive(2);
    }
    else if (data?.interval === "biannually") {
      setActive(1)
    }
    else {
      setActive(0)

    }
  }, [data]);

  return (
    <div className="w-full max-w-[1440px]">
      <CustomizedModal isOpen={isOpenModal} onRequestClose={() => setIsOpenModal(false)}>
        <PopUpPayment profile={data} />
      </CustomizedModal>

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
        <div className="flex mt-1 gap-3 justify-center sm:gap-2 flex-wrap sm:flex-nowrap sm:justify-between w-full sm:w-[450px] cursor-pointer m-auto">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`mt-2 sm:mt-0 ${page === "Pay Yearly" ? "" : ""} flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === index ? "bg-BlueHomz text-white" : "bg-whiteblue text-BlueHomz "
                }`}
                onClick={() => {
                  setActive(index)
                }}
            >
              <p className={`text-[14px] font-500 ${page === "Pay Yearly" ? "flex items-center gap-1" : ""}`}>{page} <span className={`${page === "Pay Yearly" ? " bg-BlueHomz  py-1 px-2 rounded-md  font-normal text-[11px]" : "hidden"} ${active === index ? "bg-white text-BlueHomz" : "text-white"}`}>Save 20%</span></p>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-[12px] ">
          {active === 0 && (
            <PlansMonthly routeTo={routeTo} profile={data} />
          )}
          {active === 1 && (
            <PlanPayBiAnnually routeTo={routeTo} profile={data} />
          )}
          {active === 2 && (
            <PlansYearly routeTo={routeTo} profile={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
