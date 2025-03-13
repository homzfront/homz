import { useRouter } from "next/navigation";
import handleSelectPlans from "@/utils/promotionPlan";
import ThreeDots from "@/components/mainmenu/ThreeDotsLoader";
import Image from "next/image";
import React, { useState, useEffect, useTransition } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MobilePlan from "./MobilePlan";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import PayMentModal from "./PayMentModal";

const Plans = ({ profile, upgradePlan }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [isPending, startTransition] = useTransition();
  const [ind, setIndex] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [planDetails, setPlanDetails] = useState({
    type: "",
    price: 0,
    interval: "",
    index: "",
  });
  const router = useRouter();


  useEffect(() => {
    if (isPending) {
      return setLoadingStates((prev) => ({ ...prev, [ind]: true }));
    }
    setLoadingStates((prev) => ({ ...prev, [ind]: false }));
  }, [isPending, ind]);


 
  

  const handleSelectPlan = async (index, planType, interval, amount) => {
    setIndex(index);
    await handleSelectPlans.handleSelectPlan(
      index,
      planType,
      interval,
      setLoadingStates,
      amount,
      upgradePlan,
      router,
      startTransition
    );
  };

  return (
    <div className="mt-[60px] m-auto flex flex-col gap-[60px]">
      <div className="sm:hidden">
        <MobilePlan
          handleSelectPlan={handleSelectPlan}
          pricingPlans={pricingPlans}
          profile={profile}
          loadingStates={loadingStates}
          period="monthly"
          setIsOpen={setIsOpen}
          setPlanDetails={setPlanDetails}
        />
      </div>

      <div className="sm:grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 text-GrayHomz">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col p-6 text-[16px] font-[400] w-[265px] min-h-[540px] border shadow-lg rounded-2xl"
          >
            <div className="flex flex-col mb-4 items-center justify-center">
              <p className="text-[20px] leading-[30px] text-center font-[500] text-BlackHomz">
                {plan.title}
              </p>
              <p className="text-[14px] text-center font-[500] text-[#559CFF] mb-3">
                {plan.billing}
              </p>
              <p className="text-[23px] text-center font-[700] text-BlackHomz font-sans">
                {plan?.price && "₦" + Number(plan.price).toLocaleString()}
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
                      title={feature?.info && feature.info}
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
              onClick={() => {
                setPlanDetails({
                  type: plan.title,
                  interval: plan.interval,
                  price: plan.price,
                  index: index,
                });
                setIsOpen(true);
              }}
              className={`h-[48px] rounded-lg text-[16px] w-full mt-6 flex items-center justify-center ${
                plan.status === true || plan.title === "Free" ? "hidden" : ""
              } ${
                profile?.data?.plan?.name === plan.title &&
                profile?.data?.plan?.interval === "monthly"
                  ? "bg-walletBg text-BlueHomz4 border border-BlueHomz4 hover:text-white pointer-events-none"
                  : "bg-BlueHomz hover:bg-blue-400 text-white"
              }`}
            >
              {loadingStates[index] ? (
                <ThreeDots color="#ffffff" />
              ) : (
                <>
                  {profile?.data?.plan?.name === plan.title &&
                  profile?.data?.plan?.interval === "monthly"
                    ? "Active"
                    : "Select Plan"}
                </>
              )}
            </button>
          </div>
        ))}
      </div>
      <PayMentModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        planDetails={planDetails}
        profile={profile?.data}
        handleCardPayment={() => {
          handleSelectPlan(
            planDetails.index,
            planDetails.type,
            planDetails.interval,
            planDetails.price
          );
        }}
      />
    
    </div>
  );
};

export default Plans;
const pricingPlans = [
  {
    price: "", // You might want to provide an actual price for the premium plan
    title: "Free",
    billing: "",
    features: [
      {
        id: 1,

        name: "20 listings",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 2,

        name: " Manage leads",
        enable: false,
        info: "",
        opacity: true,
      },
      {
        id: 3,

        name: "Sponsored ads",
        enable: false,
        info: "",
        opacity: true,
      },
      {
        id: 4,

        name: "Featured listings",
        enable: false,
        info: "",
        opacity: true,
      },
      {
        id: 5,

        name: "Promoted listing",
        enable: false,
        info: "",
        opacity: true,
      },
      {
        id: 6,

        name: "Email promotions",
        enable: false,
        info: "",
        opacity: true,
      },
      {
        id: 7,

        name: "View property request",
        enable: false,
        info: "",
        opacity: true,
      },
      {
        id: 8,

        name: "Promote business page",
        enable: false,
        info: "",
        opacity: true,
      },
    ],
    status: false,
    interval: "monthly",
  },
  {
    price: "30000",
    title: "Basic Plan",
    billing: "monthly",
    features: [
      {
        id: 1,

        name: "100 listings",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 2,

        name: " Manage leads",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 3,

        name: " 30 Promoted listing",
        enable: true,
        info: "you can select up to 30 of your listings to be promoted on the platform during your subscription",
        opacity: false,
      },
      {
        id: 4,

        name: "View property request",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 5,

        name: "Sponsored ads",
        enable: true,
        info: "You can select 10 of any of your listings to be promoted on any of our advertisement channels during your subscription",
        opacity: true,
      },
      {
        id: 6,
        name: "Featured listings",
        enable: true,
        info: "Your selected property will be featured on homz during your subscription",
        opacity: true,
      },
      {
        id: 7,
        name: "Email promotions",
        enable: true,
        info: "",
        opacity: true,
      },
      {
        id: 8,

        name: "Promote business page",
        enable: true,
        info: "",
        opacity: true,
      },
    ],
    status: false,
    interval: "monthly",
  },
  {
    price: "50000",
    title: "Enterprise Plan",
    billing: "monthly",
    features: [
      {
        id: 1,
        name: "200 listings",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 2,
        name: " Manage leads",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 3,
        name: "50 Sponsored ads",
        enable: true,
        info: "You can select 50 of any of your listings to be promoted on any of our advertisement channels during your subscription",
        opacity: false,
      },
      {
        id: 4,
        name: " 50 Promoted listing",
        enable: true,
        info: "You can select up to 50 of your listings to be promoted on the platform during your subscription",
        opacity: false,
      },
      {
        id: 5,
        name: "View property request",
        enable: false,
        info: "",
        opacity: false,
      },

      {
        id: 6,
        name: "Featured listings",
        enable: true,
        info: "your selected property will be featured on homz during your subscription",
        opacity: true,
      },
      {
        id: 7,

        name: "Email promotions",
        enable: true,
        info: "Your selected property will be promoted via emails once every week",
        opacity: true,
      },
      {
        id: 8,

        name: "Promote business page",
        enable: true,
        info: "",
        opacity: true,
      },
    ],
    status: false,
    interval: "monthly",
  },
  {
    price: "100000",
    title: "Premium Plan",
    billing: "monthly",
    features: [
      {
        id: 1,

        name: "Unlimited listings",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 2,

        name: " Manage leads",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 3,

        name: "50 Sponsored ads",
        enable: true,
        info: "You can select 50 of any of your listings to be promoted on any of our advertisement channels during your subscription",
        opacity: false,
      },
      {
        id: 4,

        name: "Featured listings",
        enable: true,
        info: "Your selected property will be featured on homz during your subscription",
        opacity: false,
      },
      {
        id: 5,

        name: "Unlimited Promoted listing",
        enable: true,
        info: "You can select all of your listings to be promoted on the platform during your subscription",
        opacity: false,
      },

      {
        id: 6,

        name: "Email promotions",
        enable: true,
        info: "Your selected property will be promoted via emails once every week",
        opacity: false,
      },
      {
        id: 7,

        name: "View property request",
        enable: false,
        info: "",
        opacity: false,
      },
      {
        id: 8,

        name: "Promote business page",
        enable: true,
        info: "Promote business page",
        opacity: false,
      },
    ],
    status: false,
    interval: "monthly",
  },
];
