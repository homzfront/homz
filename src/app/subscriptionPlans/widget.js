"use client";
import React, { useState } from "react";
import PlansMonthly from "./components/plansMonthly.js";
import PlansYearly from "./components/plansYearly.js";
import SuccessModal from "@/components/mainmenu/SuccessModal";

const Widget = ({ data, profile }) => {
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const pages = [
    {
      id: 1,
      name: "Pay Monthly",
      component: <PlansMonthly setSuccessModalIsOpen={setSuccessModalIsOpen} />,
    },
    {
      id: 2,
      name: "Pay Yearly",
      component: <PlansYearly setSuccessModalIsOpen={setSuccessModalIsOpen} />,
    },
  ];

  const [active, setActive] = useState(pages[0].id);
  const closeSaveToDraftModal = () => {
    setSuccessModalIsOpen(false);
    // router.back()
  };
  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div>
      <div className="w-auto h-auto py-4">
        <div className="flex mt-1 gap-2 justify-between w-[250px] cursor-pointer m-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md w-[105px] h-[37px] ${
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
        <div className="my-5 rounded-[12px] ">
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
    </div>
  );
};

export default Widget;
