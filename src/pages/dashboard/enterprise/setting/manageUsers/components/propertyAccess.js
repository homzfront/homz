import Image from "next/image";
import React, { useState } from "react";
// import ConfirmModal from "../../../components/confirmUpdateModal";
import AcAndRejModel from "../../../components/acAndRejModel";
import ConfirmModal from "../../../components/confirmModal";
import { enterprisePlanRevokeAccess, enterpriseplanRoleInvite, enterpriseplanRoleInviteHomz } from "@/api/enterpriseManagerService";
import { toast } from "react-toastify";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import Loading from "@/components/mainmenu/loading";
import Popup from "@/pages/tenantManagementPlan/popUp";

const PropertyAccess = ({ closeMenu, data, estateData, fetchData, profileData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [openRevoke, setOpenRevoke] = useState(false);
  const [openRevokeAccept, setOpenRevokeAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingII, setLoadingII] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [revokeData, setRevokeData] = useState(null);

  const showRevoke = (data) => {
    setOpenRevoke(true);
    setRevokeData(data);
  };

  const closeRevoke = () => {
    setOpenRevoke(false);
  };

  const RevokeAccept = async () => {
    setLoadingII(true)
    try {
      const { success, upDateddata, error } = await enterprisePlanRevokeAccess({
        landlordId: data?.propertyOwner?._id,
        estateId: revokeData?.estate?._id
      });

      if (success) {
        // console.log(upDateddata);
        // fetchData();
        setLoadingII(false);
        setOpenRevokeAccept(true);
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
  };

  const closeRevokeAccept = () => {
    setOpenRevokeAccept(false);
    setOpenRevoke(false);
    fetchData();
  };

  const sendRequest = async () => {
    setLoading(true);
    if (profileData && profileData?.planName === "Enterprise Unlimited Homz") {
      try {
        const { success, upDateddata, error } = await enterpriseplanRoleInviteHomz({
          email: data?.user?.email,
          estateName: selectedEstate?.name,
          slug: selectedEstate?.slug
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
          email: data?.user?.email,
          estateName: selectedEstate?.name,
          slug: selectedEstate?.slug
        });
        if (success) {
          setLoading(false);
          setOpenModal(!openModal);
        } else {
          setLoading(false);
          toast.error(error);
        }
      } catch (error) {
        setLoading(false);
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
  // console.log(data?.estatesDetails?.[0]?.estate?.name)
  const estatesData = data?.estatesDetails
  // console.log(estatesData);

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      {loadingII && <Loading />}
      {openRevokeAccept ? (
        <ConfirmModal
          returnHome={closeRevokeAccept}
          header={"User removed Successfully"}
          button={"Close"}
          body={`${data?.propertyOwner?.fullName} has successfully been removed from your dashboard`}
        />
      ) : openRevoke ? (
        <AcAndRejModel
          header={"Remove User?"}
          body={`Clicking on ‘Yes’ will remove ${data?.propertyOwner?.fullName} from your dashboard, proceed?`}
          button={"Yes"}
          buttonTwo={"No, go back"}
          returnHomeTwo={closeRevoke}
          returnHome={RevokeAccept}
        />
      ) : openModal ? (
        <ConfirmModal
          header={"Invite Sent Successfully"}
          body={`Your invite link has successfully been sent to ${data?.user?.email}`}
          button={"Close"}
          returnHome={() => {
            setOpenModal(false)
            closeMenu()
          }}
        />
      ) : (
        <div className="w-[464px] h-auto bg-white shadow-lg rounded-md py-8 px-8 flex justify-between flex-col">
          <div className="flex justify-between items-center">
            <p className="text-BlackHomz text-[20px] font-[700]">
              Property Access
            </p>
            <div
              onClick={closeMenu}
              className="cursor-pointer h-8 w-8 rounded-md flex items-center justify-center"
            >
              <Image
                src={"/static/dashboard/tenant/finance/close-square.png"}
                alt=""
                height={24}
                width={24}
              />
            </div>
          </div>

          <div>
            <p className="mt-2 text-[14px] font-[400] text-GrayHomz w-[291px]">
              {data?.propertyOwner?.fullName} has access to all properties listed below
            </p>
          </div>
          {data && estatesData?.map((data) => (
            <div
              key={data?._id}
              className={`w-[100%] mt-1 border-b py-5 flex justify-between items-center ${data?.is_deleted === true ? "hidden" : ""}`}
            >
              <p className="text-[14px] font-[400] text-GrayHomz">
                {data?.estate?.name}
              </p>
              <p
                onClick={() => showRevoke(data)}
                className="text-[13px] font-[400] text-warning2 cursor-pointer"
              >
                Revoke access
              </p>
            </div>
          ))}

          <div>
            <p className="mt-6 text-BlueHomz text-[13px] font-[500] cursor-pointer">
              Grant access to new properties
            </p>
            <div
              onClick={() => setShowPopup(true)}
              className="mt-2 flex w-full justify-between items-center cursor-pointer border h-[45px] rounded-[4px] px-4 border-BlueHomz4"
            >
              <div className="text-[14px] font-[500] text-BlueHomz">
                {selectedEstate ? selectedEstate?.name : "Select properties"}
              </div>
              <div className={` ${showPopup ? "transform rotate-180" : ""}`}>
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
                estateData={estateData}
                setEstate={setSelectedEstate}
              />
            )}
          </div>
          <div>
            <button
              type="text"
              onClick={sendRequest}
              className={` ${!selectedEstate?.name ? "pointer-events-none text-GrayHoms5 bg-GrayHomz6" : ""
                } mt-6 h-[48px] text-white bg-BlueHomz text-[16px] font-[700] w-full rounded-[4px] ${loading ? "pointer-events-none w-full flex justify-center" : ""}`}
            >
              {loading ? <LoadingFormII /> : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyAccess;
