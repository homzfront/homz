import React, { useState, useLayoutEffect } from "react";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import PromotionHooks from "@/utils/promoteProperty";
// import ThreeDotsLoader from "@/components/mainmenu/ThreeDotsLoader";
// import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

import Link from "next/link";

const SubscriptionInfo = () => {
  const [isLoading, setLoader] = useState(false);
  // const [isLoading2, setLoader2] = useState(false);
  const [cancelPlan, setCancelPlan] = useState(false);
  const [planCancelledModal, setPlanCancelledModal] = useState(false);
  const [restartPlanModal, setRestartPlanModal] = useState(true);

  const { isPending, refetch, data } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      return await api.get(
        "/subscribe/listingProperty/current-subscription-Detail"
      );
    },
    placeholderData: keepPreviousData,
    select: (plans) => {
      return plans.data.data;
    },
    // enabled: enable,
  });

  console.log(data);

  const formatDateFunction = (dateString) => {
    const date = new Date(dateString);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleCancelPlan = async () => {
    // setTimeout(() => {
    //   setLoader(true);
    // }, 2000);
    try {
      const results = await api.post(
        `/subscribe/listingProperty/disable`,
        {
          token: "r1mg46l8t83s6cb",
          code: "SUB_as4m0hgua8lt1hj",
        }
      );
      // console.log(results?.data?.data);
      return results?.data?.data?.paystackResponse;
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      return error;
    }
    setCancelPlan(false);
    setPlanCancelledModal(true);
  };

  // const handleCancelOrUpgradePlan = (status) => {
  //   status === "active"
  //     ? setCancelPlan(true)
  //     : router.push("/subscriptionPlans?upgrade=true");
  // };
  const closeSuccessModal = () => {
    setPlanCancelledModal(false);
    setRestartPlanModal(false);
  };
  return (
    <div className="space-y-2 leading-[21px] font-[500] text-[14px] pt-5 md:pt-0">
      <p className="text-[#202020]">Subscription Plan</p>
      <div className="flex items-center justify-between flex-wrap h-fit py-[16px] px-[20px] sm:gap-[32px] gap-[20px] bg-[#F6F6F6] rounded-[8px]">
        <div className="space-y-1">
          <p className="">{`You’re currently on the ${
            data?.plan?.name &&
            !data?.IsExpired &&
            (data?.status === "success" || data?.status === "active")
              ? data?.plan?.name
              : "Free Plan"
          }`}</p>

          {data?.plan?.plan_code &&
            !data?.IsExpired &&
            (data?.status === "success" || data?.status === "active") && (
              <p className="flex gap-2 flex-wrap text-[#4E4E4E]">
                <span className="">{`${data?.plan?.interval} subscription`}</span>
                <span className="sm:inline-block hidden">|</span>
                <span className="">{`${formatDateFunction(
                  data?.paid_at
                )} - ${formatDateFunction(data?.next_payment_date)}`}</span>
              </p>
            )}
        </div>
        <div className="flex gap-[12px] flex-wrap w-full sm:w-fit">
          <Link
            href={
              data?.subscription_code
                ? "/subscriptionPlans?upgrade=true"
                : "/subscriptionPlans"
            }
            className="bg-[#006AFF] text-white py-[8px] px-[12px] h-[37px] rounded-[4px] flex items-center w-full sm:w-[115px] justify-center"
          >
            Upgrade Plan
          </Link>

          {!data?.IsExpired && data?.subscription_code &&
            (data?.status === "success" || data?.status === "active") &&
            restartPlanModal && (
              <button
                className="text-[#006AFF] bg-white py-[8px] px-[12px] h-[37px] rounded-[4px] flex items-center w-full sm:w-fit justify-center border-[1px] border-[#006AFF]"
                onClick={() => setCancelPlan(true)}
              >
                Cancel subscription
              </button>
            )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={cancelPlan}
        title="Cancel Subscription?"
        confirmatoryText="Once you cancel your subscription you can only list 20 of your properties."
        handleEvent={() => handleCancelPlan()}
        cancel={() => {
          setLoader(false);
          setCancelPlan(false);
        }}
        optionText="Proceed"
        optionText2="Cancel"
        isLoading={isLoading}
      />
      <SuccessModal
        isOpen={planCancelledModal}
        title="Subscription Cancelled Successfully"
        successText={`Your ${data?.plan?.name} Subscription has successfully been cancelled.`}
        buttonColor={true}
        handleEvent={closeSuccessModal}
      />
    </div>
  );
};
export default SubscriptionInfo;
