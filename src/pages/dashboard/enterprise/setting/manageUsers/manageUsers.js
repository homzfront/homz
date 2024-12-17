"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "./components/dropDownManageUsers";
import Invites from "./components/invites";
import Input from "../../components/input";
import ConfirmModal from "../../components/confirmModal";
import ToggleButton from "../../components/toggle";
import DropDown from "@/pages/dashboard/enterprise/components/dropDownTwo";
import Link from "next/link";
import useEstateStore from "@/store/enterpriseStore/estates";
import estateStore from "@/store/enterpriseStore/estates";
import { toast } from "react-toastify";
import {
  enterpriseplanRoleInvite,
  enterpriseplanRoleInviteHomz,
} from "@/api/enterpriseManagerService";
import Loading from "@/components/mainmenu/loading";
import Image from "next/image";
import TableUser from "./components/tableUser";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import Popup from "@/pages/tenantManagementPlan/popUp";
import useTabForAddProperty from "@/store/document/useTabForAddProperty";
import { useRouter } from "next/navigation";
import ExpiredPlanModal from "../../components/expiredPlanModal";
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import { isTrialExpired } from "@/utils/compareTrialTime";

const ManageUsers = ({ typeOfUser }) => {
  const { setTab } = useTabForAddProperty();
  const { data, loading, fetchData } = estateStore();
  const [slog, setSlog] = useState(null);
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loadingII, setLoadingII] = useState(false);
  // const [selectedEstate, setSelectedEstate] = useState(null);
  const [reachedLimit, setReachedLimit] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectOp, setSelectedOp] = useState([]);
  const [dataEmail, setDataEmail] = useState([]);
  const [openPurchasePlan, setOpenPurchasePlan] = useState(false);
  const router = useRouter();
  const {
    data: profileData,
    loading: profileLoading,
    fetchData: fetchProfile,
  } = useProfileEnterpriseMe();
  const { data: enterprisePlans, fetchData: fetchEnterprisePlans } =
    useEnterprisePlans();
  // console.log(slog);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
    fetchProfile();
    fetchEnterprisePlans();
  }, []);

  useEffect(() => {
    const values = checkPlanLimits(
      enterprisePlans,
      profileData?.planName,
      data?.length,
      profileData?.propertyOwners?.length,
      profileData?.tenants?.length,
      profileData?.IsExpired
    );
    setReachedLimit(values);
  }, [enterprisePlans, profileData, data]);

  useBodyScroll([openModal, loadingII, showPopup]);

  const handleDropdownToggle = () => {
    if (reachedLimit?.reachedMaxUsers) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (isTrialExpired(profileData?.trialEndDate) && ((profileData?.planName === "Enterprise Free") || (profileData?.planName === "Enterprise Trial"))) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.expiredPlan) {
      setOpenPurchasePlan(!openPurchasePlan)
    }
    else {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
    
  };

  const goToplan = () => {
    router.push("/plans");
  };

  // console.log(profileData);
  // const options = [
  //   { id: 1, label: "Can View" },
  //   { id: 2, label: "Can Edit" },
  // ];

  // State to store the selected option
  // const [selectOp, setSelectedOp] = useState([]);
  // const [dataEmail, setDataEmail] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);

  // const handleToggle = () => {
  //   setIsOpen(!isOpen);
  // };

  // const [selectedRoleTwo, setSelectedRoleTwo] = useState(null);
  // const [pickedEstate, setPickedEstate] = useState([]);

  // const handleSelectEstate = (estate) => {
  //   // setSelectedRoleTwo(estate);
  //   // setPickedEstate(estate);\
  //   setSelectedEstate(estate);
  // };

  // Handle the selection of an option
  // const handleRoleSelect = (role) => {
  //   setSelectedRole(role);
  //   setSelectedOp(role);
  // };

  // // useEffect to handle scrolling
  // useEffect(() => {
  //   document.body.style.overflow = openModal ? "hidden" : "auto";
  //   if (openModal) {
  //     // Scroll to the top of the page
  //     window.scrollTo(0, 0);
  //   }
  // }, [openModal]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setDataEmail(email);
    // setOpenModal(!openModal);
    // Do something with the collected data, e.g., send it to the server

    setLoadingII(true);
    if (profileData && profileData?.planName === "Enterprise Unlimited Homz") {
      try {
        const { success, upDateddata, error } =
          await enterpriseplanRoleInviteHomz({
            email,
            estateName: slog?.name,
            slug: slog?.slug,
          });

        if (success) {
          // console.log(upDateddata);
          setLoadingII(false);
          setOpenModal(!openModal);
          // toast.success(upDateddata);
        } else {
          setLoadingII(false);
          toast.error(error);
        }
      } catch (error) {
        setLoadingII(false);

        if (
          error?.response?.data?.error?.errors &&
          error.response.data.error.errors.length > 0
        ) {
          const errorMessage = error.response.data.error.errors[0];
          toast.error(`Update failed: ${errorMessage}`);
        } else if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          toast.error(`Update failed: ${errorMessage}`);
        } else {
          toast.error("Update failed");
        }
      }
    } else {
      try {
        const { success, upDateddata, error } = await enterpriseplanRoleInvite({
          email,
          estateName: slog?.name,
          slug: slog?.slug,
        });

        if (success) {
          // console.log(upDateddata);
          setLoadingII(false);
          setOpenModal(!openModal);
          // toast.success(upDateddata);
        } else {
          setLoadingII(false);
          toast.error(error);
        }
      } catch (error) {
        setLoadingII(false);

        if (
          error?.response?.data?.error?.errors &&
          error.response.data.error.errors.length > 0
        ) {
          const errorMessage = error.response.data.error.errors[0];
          toast.error(`Update failed: ${errorMessage}`);
        } else if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          toast.error(`Update failed: ${errorMessage}`);
        } else {
          toast.error("Update failed");
        }
      }
    }
  };

  const returnHome = () => {
    setOpenModal(false);
    setSlog(null);
    setEmail("");
  };

  // Determine if the button should be disabled based on the email input value
  const isButtonDisabled = !email || slog === null;

  return (
    <div>
      {reachedLimit?.reachedMaxUsers && openPurchasePlan && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <ExpiredPlanModal
            header={"Landlord Limit Exceeded"}
            body={
              "Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."
            }
            button={"Upgrade Plan"}
            buttonTwo={"close"}
            returnHome={goToplan}
            returnHomeTwo={() => setOpenPurchasePlan(false)}
          />
        </div>
      )}
      {openPurchasePlan &&
        reachedLimit?.enterprisePlanName === "Enterprise Free" &&
        !reachedLimit?.expiredPlan &&
        isTrialExpired(profileData?.trialEndDate) && (
          <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
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
          </div>
        )}
      {openPurchasePlan && reachedLimit?.expiredPlan && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <ExpiredPlanModal
            header={`${reachedLimit?.enterprisePlanName} Plan Expired`}
            body={`Your ${reachedLimit?.enterprisePlanName} ${reachedLimit?.interval} plan has expired. Renew now to continue enjoying all features!`}
            button={"Upgrade Plan"}
            buttonTwo={"close"}
            returnHome={goToplan}
            returnHomeTwo={() => setOpenPurchasePlan(false)}
          />
        </div>
      )}
      {loadingII && <Loading />}
      <div className="border-t p-8 ">
        <div className="bg-inputBg rounded-[12px] p-6">
          <div
            onClick={handleDropdownToggle}
            className="flex w-full justify-between items-center cursor-pointer"
          >
            <p className="text-[14px] font-[400] text-GrayHomz">
              {typeOfUser === "landlords"
                ? "Add landlord to view and monitor properties"
                : "Add security personnel to manage visitor access records"}
            </p>
            <div className={` ${isOpen ? "transform rotate-180" : ""}`}>
              <Image
                src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                height={16}
                width={16}
                alt=""
              />
            </div>
          </div>
          <div className={`mt-1  ${isOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-[12px] items-center md:px-5 pb-2 md:h-[95px] w-full">
              <div className="w-full md:w-[360px]">
                <input
                  className="border mt-2 rounded-md p-3 h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]"
                  type={"email"}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div
                onClick={() => setShowPopup(true)}
                className={` ${!slog?.name  ?"border-[#A9A9A9] text-GrayHomz2":"border-[#4E4E4E] text-black"} md:w-[360px] w-full flex justify-between items-center cursor-pointer border mt-2 px-4 h-[45px] rounded-md `}
              >
                <div className=" text-[13px] font-[400]">
                  {slog?.name ? (
                    slog.name
                  ) : (
                    <>
                      Select property
                      {typeOfUser === "landlords" &&
                        " you want Landlord to view"}
                    </>
                  )}
                </div>

                <div
                  className={`w-5 h-5 p-1 ${
                    showPopup ? "transform rotate-180" : ""
                  }`}
                >
                  <Image
                    src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                    height={16}
                    width={16}
                    alt=""
                  />
                </div>
              </div>
              {showPopup && (
                <Popup
                  onClose={() => setShowPopup(false)}
                  estateData={data}
                  setEstate={setSlog}
                />
              )}
              <button
                onClick={handleSubmit}
                className={`w-full md:w-fit h-[45px] mt-2 text-[16px] font-[700]  px-[12px] rounded-md ${
                  isButtonDisabled
                    ? "pointer-events-none bg-GrayHomz6 text-GrayHomz5"
                    : "bg-BlueHomz text-white"
                }`}
                // disabled={isButtonDisabled}
              >
                Invite
              </button>
            </div>
            <div
              className={`w-full md:w-auto mt-4 flex md:gap-1 ${
                reachedLimit?.reachedMaxEstates ? "hidden" : ""
              }`}
            >
              <p className="w-full md:w-auto text-[12px] md:text-[14px] font-[400] text-GrayHomz">
                Yet to add a property?
              </p>
              <div
                onClick={() => {
                  setTab("addProperty");
                }}
                className="cursor-pointer w-full md:w-auto text-[12px] md:text-[14px] font-[700] text-BlueHomz"
              >
                <Link href={"/dashboard/enterprise-property/estates"}>
                  Add New Property
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* {selectOp.label === "Can View" && (
          <div className="mt-4">
            <div className="flex gap-3 items-center">
              <ToggleButton onToggle={handleToggle} isOpen={isOpen} />{" "}
              <p
                className={`text-[16px] font-[400] ${!isOpen ? "text-GrayHomz2" : "text-BlackHomz"
                  } `}
              >
                View as property owner
              </p>
            </div>
            {isOpen && (
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-[14px] font-[500]">
                  Select property you want property owner to view
                </p>
                <DropDown
                  options={option2}
                  className={"w-[350px]"}
                  onSelect={handleSelectEstate}
                  selectOption={"Select Property"}
                />
                <div className="flex gap-1">
                  <p className="text-[14px] font-[400] text-GrayHomz">
                    Yet to add a property?
                  </p>
                  <Link href={""} className="text-[14px] font-[700] text-BlueHomz">
                    Add New Property
                  </Link>
                </div>
              </div>
            )}
          </div>
        )} */}
        <div className="mt-8">
          <TableUser
            estateData={data}
            profileData={profileData}
            openPurchasePlan={openPurchasePlan}
            setOpenPurchasePlan={setOpenPurchasePlan}
            typeOfUser={typeOfUser}
          />
        </div>
      </div>
      {/* <Invites /> */}
      <CustomizedModal isOpen={openModal}>
        <div className="md:max-w-[464px] m-auto bg-white md:h-[260px] rounded-md">
          <div className="mt-[-10px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
              }
              alt=""
              height={48}
              width={48}
            />
            <h1 className="text-BlackHomz font-[700] text-[20px]">
              Invite Sent Successfully
            </h1>
            <p className="text-[16px] font-[400] text-GrayHomz text-center">{`Your invite link has successfully been sent to ${email}`}</p>
            <button
              onClick={returnHome}
              className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
            >
              Close
            </button>
          </div>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default ManageUsers;
