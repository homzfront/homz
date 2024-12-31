"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import useBodyScroll from "@/utils/useBodyScroll";
import useClickOutside from "@/utils/clickOutside";
import Modal from "../../tenants/components/modal";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import ExpiredPlanModal from "../../components/expiredPlanModal";
import { isTrialExpired } from "@/utils/compareTrialTime";
import { useRouter } from "next/navigation";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";


const HomeCard = ({ revData }) => {
  const [inviteTenant, setInviteTenant] = useState(false);
  const router = useRouter();
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const {
    data: user,
    fetchData: fetchProfileData,
  } = useProfileEnterpriseMe();
  const { data: enterprisePlans, fetchData: fetchEnterprisePlans } =
    useEnterprisePlans();
  const [reachedLimit, setReachedLimit] = useState(null);
  const [openPurchasePlan, setOpenPurchasePlan] = useState(false);

  useEffect(() => {
    fetchProfileData();
    fetchEnterprisePlans();
  }, []);

  const toggleInvite = () => {
    if (isTrialExpired(user?.trialEndDate) && ((user?.planName === "Enterprise Free") || (user?.planName === "Enterprise Trial"))) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.reachedMaxTenants) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.expiredPlan) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else {
      setInviteTenant(!inviteTenant); // Toggle the state
    }
  };

  useBodyScroll([inviteTenant]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const totalHomes = () => {
    const vacant =
      (revData?.vacantHomes / revData?.numberOfHouses) * 100;
    const total = 100 - vacant;
    const rented =
      (revData?.RentedHomes / revData?.numberOfHouses) * 100;
    const total2 = 100 - rented;
    return {
      total,
      vacant,
      total2,
      rented,
    };
  };

  useEffect(() => {
    const values = checkPlanLimits(
      enterprisePlans,
      user?.planName,
      user?.estates?.length,
      user?.propertyOwners?.length,
      user?.tenants?.length,
      user?.IsExpired
    );
    setReachedLimit(values);
  }, [enterprisePlans, user]);

  const data = {
    datasets: [
      {
        data: [totalHomes()?.total2, totalHomes()?.rented], // Outer circle represents the total
        backgroundColor: ["#EEF5FF", "#0058D4"],
      },
      {
        data: [totalHomes()?.vacant, totalHomes()?.total], // Inner circle represents rented (20%) and available (80%)
        backgroundColor: ["#559CFF", "#EEF5FF"],
      },
    ],
  };

  const options = {
    cutout: "70%", // Adjust the cutout to control the size of the inner circle
  };

  const goToplan = () => {
    router.push("/plans");
  };

  return (
    <div className="border w-[100%] rounded-[12px] ">
      {inviteTenant && (
        <div className="absolute top-0 z-40 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal dropdownRef={dropdownRef} setInviteTenant={setInviteTenant} />
        </div>
      )}
      <CustomizedModal isOpen={reachedLimit?.reachedMaxTenants && !reachedLimit?.expiredPlan && openPurchasePlan}>
        <ExpiredPlanModal
          header={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Upgrade Your Plan" : "You’ve Hit Your Limit!"}
          body={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Kindly upgrade your plan now to unlock access to this feature." : "Upgrade your enterprise plan to add more tenants"}
          button={"Upgrade Plan"}
          buttonTwo={"close"}
          returnHome={goToplan}
          returnHomeTwo={() => setOpenPurchasePlan(false)}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={openPurchasePlan && reachedLimit?.enterprisePlanName === "Enterprise Free" && !reachedLimit?.expiredPlan && isTrialExpired(user?.trialEndDate)}>
        <ExpiredPlanModal
          header={"Your Trial Has Ended"}
          body={
            "Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."
          }
          button={"Buy Plan"}
          buttonTwo={"close"}
          returnHome={goToplan}
          returnHomeTwo={() => setOpenPurchasePlan(false)}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={openPurchasePlan && reachedLimit?.expiredPlan}>
        <ExpiredPlanModal
          header={`${reachedLimit?.enterprisePlanName} Plan Expired`}
          body={`Your ${reachedLimit?.enterprisePlanName} ${reachedLimit?.interval} plan has expired. Renew now to continue enjoying all features!`}
          button={"Upgrade Plan"}
          buttonTwo={"close"}
          returnHome={goToplan}
          returnHomeTwo={() => setOpenPurchasePlan(false)}
        />
      </CustomizedModal>
      <div className="flex justify-between h-[100px]">
        <h1 className="text-BlueHomz px-6 pt-6 pb-3 font-[500] text-[14px]">
          Homes
        </h1>
        <div className="flex flex-col pr-4 pt-4">
          <div>
            <p className="text-[11px] font-[400] text-BlackHomz">
              Add New Tenant
            </p>
            <Image
              alt=""
              height={40}
              width={40}
              src={
                "/static/dashboard/enterprisemanager/dashboard/add-square-blue.png"
              }
              className="ml-10 cursor-pointer"
              onClick={toggleInvite}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-1 pt-3 px-3 pb-3">
        <div className="h-[98px]">
          <Doughnut data={data} options={options} plugins={[]} />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex gap-2">
            <h3
              className={`h-[6px] w-[6px] rounded-full mt-1 bg-whiteblue`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Total Homes
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
                {revData?.numberOfHouses
                  ? `${revData?.numberOfHouses}`
                  : "0"}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <h3
              className={`h-[6px] w-[6px] rounded-full mt-1 bg-darkblue`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Rented Homes
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
                {revData?.rentedHomes
                  ? `${revData?.rentedHomes}`
                  : "0"}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <h3
              className={`h-[6px] w-[6px] rounded-full mt-1 bg-lightblue`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Vacant Homes
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
                {revData?.vacantHomes
                  ? `${revData?.vacantHomes}`
                  : "0"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
