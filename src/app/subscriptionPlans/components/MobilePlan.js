import Image from "next/image";
import React from "react";
import { Carousel } from "flowbite-react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import ThreeDotsLoader from "@/components/mainmenu/ThreeDotsLoader";
const MobilePlan = ({
  handleSelectPlan,
  pricingPlans,
  profile,
  loadingStates,
  period,
}) => {
  // console.log(profile);
  return (
    <div className="cursor-pointer rounded-[10px] w-full sm:hidden h-[630px] mb-8">
      <Carousel slide={false} theme={parentTheme} className="h-full">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col p-6 text-[16px] font-[400] w-full h-full border shadow-lg rounded-2xl"
          >
            <div className="flex flex-col mb-4">
              <p className="text-[20px] leading-[30px] text-center font-[700] text-BlackHomz">
                {plan.title}
              </p>
              <p className="text-[14px] text-center font-[500] text-[#559CFF] mb-3">
                {plan.billing}
              </p>
              <p className="text-[23px] text-center font-[700] text-BlackHomz">
                {plan.price}
              </p>
            </div>

            <div className="flex-grow mt-3">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start mb-2 flex-col">
                  <div className="flex flex-row items-center justify-between w-full gap-[12px] mb-2">
                    <div className="flex items-center gap-3">
                      <p
                        className={`h-[24px] w-[24px] ${
                          feature.opacity ? "opacity-35" : "bg-[#D1FADF]"
                        } flex items-center justify-center border rounded-full`}
                      >
                        <Image
                          height={10.5}
                          width={12}
                          alt="img"
                          src={"/static/images/IconMark.png"}
                        />
                      </p>
                      <p
                        className={`${
                          feature.opacity ? "text-GrayHomz5" : ""
                        } font-['Text md/Regular']`}
                      >
                        {feature.name}
                      </p>
                    </div>

                    <Tooltip
                      title={feature.info}
                      position="left"
                      trigger="click"
                      arrow={true}
                      style={{ fontSize: "11px", borderRadius: "20px" }}
                    >
                      <button
                        className={`relative h-[14px] w-[16px] cursor-pointer ${
                          !feature.enable && "hidden"
                        }`}
                        disabled={feature.info === ""}
                      >
                        <Image
                          height={10.5}
                          width={12}
                          alt="img"
                          src={"/static/images/gray-info-icon.svg"}
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>

            <button
              key={index}
              onClick={() =>
                handleSelectPlan(index, plan.title, plan.interval, plan.price)
              }
              className={`h-[48px] rounded-lg text-[16px] w-full mt-1 flex items-center justify-center ${
                plan.status === true || plan.title === "Free" ? "hidden" : ""
              } ${
                profile?.data?.plan?.name === plan.title && profile?.data?.plan?.interval === period
                  ? "bg-walletBg text-BlueHomz4 border border-BlueHomz4 hover:text-white pointer-events-none"
                  : "bg-BlueHomz hover:bg-blue-400 text-white"
              }`}
            >
              {loadingStates && loadingStates[index] ? (
                <ThreeDotsLoader color="#ffffff" />
              ) : (
                <>
                  {profile?.data?.plan?.name === plan.title &&
                    profile?.data?.plan?.interval === period
                    ? "Active"
                    : "Select Plan"}
                </>
              )}
            </button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MobilePlan;
const parentTheme = {
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
      off: " bg-[#D5D5D5] hover:bg-white dark:bg-blue-600/50 dark:hover:bg-gray-800 ",
      on: " bg-[#202020] dark:bg-gray-800",
    },
    base: "h-[8px] w-[8px] rounded-full ",
    wrapper:
      "absolute bottom-[-40px] w-full  items-center flex justify-center   left-[155px] -translate-x-1/2   space-x-4 ",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform gap-1 cursor-default snap-center",
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
