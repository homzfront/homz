import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import BlueThickArrow from "@/components/icons/blueThickArrow";
import Close from "@/components/icons/Close";
import PlanCard from "@/components/icons/planCard";
import SendTwo from "@/components/icons/sendTwo";
import GreenActive from "@/components/icons/greenActive";
import CloseSmall from "@/components/icons/closeSmall";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const PayMentModal = ({
  isOpen,
  planDetails,
  profile,
  setIsOpen,
  handleCardPayment,
}) => {
  const router = useRouter();
  const [openCardInfo, setOpenCardInfo] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);

  // Mutation to cancel the plan
  const cancelPlanMutation = useMutation({
    mutationKey: ["cancelPlan"],
    mutationFn: async () => {
      return api.post(`/subscribe/listingProperty/disable`, {
        token: profile?.email_token,
        code: profile?.subscription_code,
      });
    },
  });

  // Mutation for one-time payment
  const oneTimePaymentMutation = useMutation({
    mutationKey: ["oneTimePayment"],
    mutationFn: async () => {
      return api.post(`/subscribe/listingProperty/one-time-payment`, {
        planName: planDetails.type,
        interval: planDetails.interval,
        amount: planDetails.price,
        subscriptionType: "one-time",
      });
    },
  });

  // Function that calls the appropriate mutations based on the subscription_code
  const handleOneTimePayment = () => {
    if (profile?.status === "active") {
      // If there is a subscription code, first cancel the plan
      cancelPlanMutation.mutate(null, {
        onSuccess: (cancelResponse) => {
          // After successful cancellation, process one-time payment
          oneTimePaymentMutation.mutate(null, {
            onSuccess: (results) => {
              let url =
                results?.data?.paystackResponse?.data?.authorization_url;
              router.push(url);
            },
            onError: (paymentError) => {
              console.error(
                "Error processing one-time payment after canceling plan:",
                paymentError
              );
            },
          });
        },
        onError: (cancelError) => {
          console.error("Error canceling plan:", cancelError);
        },
      });
    } else {
      // Otherwise, process one-time payment directly
      oneTimePaymentMutation.mutate(null, {
        onSuccess: (results) => {
          let url = results?.data?.paystackResponse?.data?.authorization_url;
          router.push(url);
        },
        onError: (paymentError) => {
          console.error("Error processing one-time payment:", paymentError);
        },
      });
    }
    sessionStorage.setItem("selectedPlan", planDetails.type); 
  };

  const active = (
    <div className="ml-2 h-[28px] w-[72px] bg-[#ABDDC6] flex justify-center items-center font-medium text-[13px] text-[#039855] gap-0.5 rounded-[4px]">
      <p>Active</p>
      <button className="" onClick={() => setOpenCardInfo(!openCardInfo)}>
        <GreenActive />
      </button>
    </div>
  );
  return (
    <>
      <CustomizedModal isOpen={isOpen}>
        <div className="w-full sm:w-[450px] rounded-[12px] bg-white p-4 border">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0">
              <p className="text-BlackHomz text-[18px] sm:text-[20px] font-bold">
                Payment Methods
              </p>
              <p className="text-GrayHomz text-[12px] sm:text-[14px] font-normal">
                Select your preferred payment method
              </p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="z-20  cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
            >
              <Close />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="bg-whiteblue p-2 rounded-[4px] flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="bg-BlueHomz rounded-md w-[49.5px] h-[49.5px] flex justify-center items-center min-w-[49.5px] min-h-[49.5px]">
                  <PlanCard />
                </div>
                <div>
                  <p className="text-BlueHomz text-[14px] sm:text-[16px] font-[500] flex items-centers">
                    Pay with Card{" "}
                    {profile?.subscriptionType === "recurring" && active}
                  </p>
                  <p className="text-GrayHomz text-[12px] sm:text-[14px] font-normal">
                    Pay via your debit/credit card
                  </p>
                </div>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => {
                  handleCardPayment();
                  setIsOpen(false);
                }}
              >
                <BlueThickArrow />
              </button>
            </div>
            {openCardInfo &&
              profile?.subscriptionType &&
              profile?.subscriptionType !== "free_trial" && (
                <div className="p-2 rounded-[4px] bg-[#F6F6F6] text-GrayHomz font-normal text-[13px] flex w-full justify-between items-center">
                  Your subscription is running with{" "}
                  {profile.subscriptionType === "recurring"
                    ? "card payment"
                    : "one-time payment"}
                  <button
                    className="cursor-pointer"
                    onClick={() => setOpenCardInfo(false)}
                  >
                    <CloseSmall />
                  </button>
                </div>
              )}
            <div className="bg-whiteblue p-2 rounded-[4px] flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="bg-BlueHomz rounded-md w-[49.5px] h-[49.5px] flex justify-center items-center min-w-[49.5px] min-h-[49.5px]">
                  <SendTwo />
                </div>
                <div>
                  <p className="text-BlueHomz text-[14px] sm:text-[16px] font-[500] flex items-centers">
                    Pay with Bank Transfer{" "}
                    {profile?.subscriptionType === "one-time" && active}
                  </p>
                  <p className="text-GrayHomz text-[12px] sm:text-[14px] font-normal">
                    Transfer from your local bank account
                  </p>
                </div>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  setOpenTransfer(true);
                }}
              >
                <BlueThickArrow />
              </button>
            </div>
          </div>
        </div>
      </CustomizedModal>

      <ConfirmationModal
        isOpen={openTransfer}
        title="Pay with Bank Trasnfer"
        confirmatoryText="By choosing Bank Transfer, your subscription will no longer be recurring.
         You will need to manually renew it when it expires."
        handleEvent={() => handleOneTimePayment()}
        cancel={() => {
          setIsOpen(true);
          setOpenTransfer(false);
        }}
        optionText="Proceed"
        optionText2="Go Back"
        isLoading={!oneTimePaymentMutation.isIdle}
      />
    </>
  );
};

export default PayMentModal;
