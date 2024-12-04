import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useTransition,
} from "react";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import PromotionHooks from "@/utils/promoteProperty";
import ThreeDotsLoader from "@/components/mainmenu/ThreeDotsLoader";
import { useRouter } from "next/navigation";
import Link from "next/link";


const SubscriptionInfo = () => {
  const [isLoading, setLoader] = useState(false);
  const [isLoading2, setLoader2] = useState(false);
  const [cancelPlan, setCancelPlan] = useState(false);
  const [planCancelledModal, setPlanCancelledModal] = useState(false);
  // const [restartPlanModal, setRestartPlanModal] = useState(false);
  const [currentPlanData, setCurrentPlanData] = useState();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const getCurrentSubscriptionPlan = async () => {
    const response = await PromotionHooks.checkCurrentSubscription();
    console.log(response?.data?.data);
    setCurrentPlanData(response?.data?.data);
  };

  useLayoutEffect(() => {
    getCurrentSubscriptionPlan();
  }, []);

  useEffect(() => {
    if (isPending) {
      return setLoader2(true);
    }
    setLoader2(false);
  }, [isPending]);

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
    // setRestartPlanModal(false);
  };
  return (
    <div className="space-y-2 leading-[21px] font-[500] text-[14px]  pt-5 md:pt-0">
      <p className="text-[#202020]  ">Subscription Plan</p>
      <div className="flex items-center justify-between flex-wrap h-fit py-[16px] px-[20px] sm:gap-[32px] gap-[20px] bg-[#F6F6F6] rounded-[8px]">
        <div className="space-y-1">
          <p className="">{`You’re currently on the ${
            currentPlanData?.plan?.name && !currentPlanData?.IsExpired 
              ? currentPlanData?.plan?.name
              : "Free Plan"
          }`}</p>
          {currentPlanData?.subscription_code && !currentPlanData?.IsExpired  (
            <p className="flex gap-2 flex-wrap text-[#4E4E4E]">
              <span className="">{`${currentPlanData?.plan?.interval} subscription`}</span>
              <span className="sm:inline-block hidden">|</span>
              <span className="">{`${formatDateFunction(
                currentPlanData?.createdAt
              )} - ${formatDateFunction(
                currentPlanData?.next_payment_date
              )}`}</span>
            </p>
          )}
        </div>
        <div className="flex gap-[12px] flex-wrap w-full sm:w-fit">
          <Link
            href={
              currentPlanData?.subscription_code
                ? "/subscriptionPlans?upgrade=true"
                : "/subscriptionPlans"
            }
            className="bg-[#006AFF] text-white py-[8px] px-[12px] h-[37px] rounded-[4px] flex items-center w-full sm:w-[115px]  justify-center"
          >
            Upgrade Plan
          </Link>
          {/* {currentPlanData?.subscription_code && !currentPlanData?.IsExpired && currentPlanData?.status !=="cancelled" ( */}
          {!currentPlanData?.IsExpired  (
            <button
              className="text-[#006AFF] bg-white py-[8px] px-[12px] h-[37px] rounded-[4px] flex items-center w-full sm:w-fit  justify-center border-[1px] border-[#006AFF]"
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
        // color="text-[#D92D20]"
      />
      <SuccessModal
        isOpen={planCancelledModal}
        title="Subscription Cancelled Successfully"
        successText={`Your ${currentPlanData?.plan?.name} Subscription has successfully been cancelled.`}
        buttonColor={true}
        handleEvent={closeSuccessModal}
      />
    
    </div>
  );
};

export default SubscriptionInfo;
