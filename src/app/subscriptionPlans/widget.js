"use client";
import React, { useEffect, useState } from "react";
import PlansMonthly from "./components/plansMonthly.js";
import PlansWeekly from "./components/plansWeekly.js";
import PlansYearly from "./components/plansYearly.js";
import SuccessModal from "@/components/mainmenu/SuccessModal";
// import { Carousel } from "react-responsive-carousel";
import useStorePropertyPromotionData from "@/store/propertyPromotions.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/navigation";

const Widget = ({ data, profile }) => {
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [type, setType] = useState("");
  const [upgradePlan, setUpgradePlan] = useState("");

  const router = useRouter();
  const resetPropertyIds = useStorePropertyPromotionData((state) => state.resetPropertyIds);
  // console.log(propertyIds)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const upgrade= urlParams.get("upgrade");
    // console.log(upgrade);
    setUpgradePlan(upgrade);
  }, [upgradePlan]);

  const pages = [
    {
      id: 1,
      name: "Pay Weekly",
      component: (
        <PlansWeekly
          setSuccessModalIsOpen={setSuccessModalIsOpen}
          setModalIsOpen={setModalIsOpen}
          upgradePlan={upgradePlan}
        />
      ),
    },
    {
      id: 2,
      name: "Pay Monthly",
      component: (
        <PlansMonthly
          setSuccessModalIsOpen={setSuccessModalIsOpen}
          setModalIsOpen={setModalIsOpen}
          upgradePlan={upgradePlan}

        />
      ),
    },
    {
      id: 3,
      name: "Pay Yearly",
      component: (
        <PlansYearly
          setSuccessModalIsOpen={setSuccessModalIsOpen}
          setModalIsOpen={setModalIsOpen}
          upgradePlan={upgradePlan}

        />
      ),
    },
  ];

  const [active, setActive] = useState(pages[0].id);
  const closeSaveToDraftModal = () => {
    setSuccessModalIsOpen(false);
    resetPropertyIds();
    router.push("/dashboard/list_Property");
  };
  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div>
      <div className="w-auto h-auto py-4">
        <div className="flex mt-1 sm:gap-2 justify-between gap-[10px] sm:w-fit  cursor-pointer sm:m-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 sm:px-3 justify-center rounded-md w-[105px] h-[37px] ${
                active === page.id
                  ? "bg-BlueHomz text-white"
                  : "bg-whiteblue text-BlueHomz "
              }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className="text-[14px] font-500">{page.name}</p>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-[12px] sm:pl-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className={active === page.id ? "inline" : "hidden"}
            >
              {React.cloneElement(page.component, { data, profile })}
            </div>
          ))}
        </div>
      </div>

      <SuccessModal
        isOpen={successModalIsOpen}
        title="Promotion Successful"
        handleEvent={closeSaveToDraftModal}
        successText="Promotion is currently under review and will be live within 8 hours."
        optionalText="View listed properties"
      />
      <SuccessModal
        isOpen={modalIsOpen}
        title="Promotion is Active"
        handleEvent={() => setModalIsOpen(false)}
        successText={`Your ${"[Monthly]"} promotion is currently running for this property`}
      />
    </div>
  );
};

export default Widget;
const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "hidden md:inline-block absolute top-[rem] left-[-0.25rem] flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    rightControl:
      "hidden md:inline-block absolute top-[rem] right-7 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    "&:hover $leftControl, &:hover $rightControl": {
      display: "inline-block",
    },
  },
  indicators: {
    active: {
      off: " bg-[#559CFF] hover:bg-white dark:bg-blue-600/50 dark:hover:bg-gray-800 ",
      on: " bg-[#EEF5FF] dark:bg-gray-800",
    },
    base: "h-[8px] w-[8px] rounded-full ",
    wrapper:
      "absolute bottom-[-25px] w-full  items-center flex justify-center  sm:left-1/2 left-[120px] -translate-x-1/2  space-x-1 ",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "hidden md:inline-flex h-[20px] w-[20px] px-2 items-center bg-[#292D32] justify-center border rounded-[8px] bg-opacity-10 hover:bg-opacity-50  group-focus:outline-none group-focus:ring-1 border-[#559CFF] group-focus:ring-[#EEF5FF] dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 sm:h-[30px] sm:w-[30px]",
    icon: "h-3 w-3 text-white/60 dark:text-gray-800 group-hover:text-white sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
