"use client";
import React, { useEffect, useState } from "react";
import SearchEstate from "./getStarted/searchEstate";
import InviteLink from "./getStarted/InviteLink";
import AvailableEstate from "./availableEstate/availableEstate";
import SentInvite from "./components/sentInvite";
import EstateInfo from "./estateInfo/estateInfo";
import { toast } from "react-toastify";
import AcAndRejModelEs from "./components/acAndRejModalEs";
import tenantProfile from "@/store/tenantStore/tenantProfile";
import LoadingII from "@/components/mainmenu/loadingII";
import { sendInviteProperty } from "@/api/tenantSevice";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";

const EstateInformation = () => {
  const [openEstate, setOpenEstate] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkConfirmationModal, setLinkConfirmationModal] = useState(false);
  const [invitLinkSent, setInviteLinkSent] = useState(false);

  const [loadingii, setLoadingII] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const { data, loading, fetchData } = tenantProfile();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);
  const openAvailableEstate = () => {
    setOpenEstate(!openEstate);
  };

  const closeAvailableEstate = () => {
    setOpenEstate(false);
  };

  function extractQueryParams(url) {
    const searchParams = new URL(url).searchParams;
    const estateInvitation = searchParams.get("estateInvitation");


    return { estateInvitation };
  }

  const openLink = () => {
    setOpenLinkModal(!openLinkModal);
  };

  const closeLink = () => {
    setOpenLinkModal(false);
  };

  const openLinkConfirmationModal = async () => {
    if (loadingii) return; // Do nothing if already loadingii
    setLoadingII(true); // Set loadingii to true when submitting the form

    const url = inviteLink;
    // console.log(inviteLink)
    const { estateInvitation } = extractQueryParams(url);
    try {
      const { success, upDateddata, error } = await sendInviteProperty(
        estateInvitation
      );

      if (success) {
        setLoadingII(false);
        setLinkConfirmationModal(!linkConfirmationModal);
        toast.success("Update successful");
      } else {
        toast.error(error);
        setLoadingII(false);
      }
    } catch (error) {
      setLoadingII(false);
      toast.error("Update failed");
    }
  };

  const closeLinkConfirmationModal = () => {
    setLinkConfirmationModal(false);
    setOpenLinkModal(false);
    setInviteLinkSent(!invitLinkSent);
    setOpenEstate(false);
  };

  return (
    <div className="w-full">
      {loading ? (
        <LoadingII />
      ) : data?.status === "accepted" ? (
        <EstateInfo data={data} />
      ) : openEstate ? (
        <div className=" relative">
          <AvailableEstate
            closeAvailableEstate={closeAvailableEstate}
            openLink={openLink}
          />
        </div>
      ) : invitLinkSent ? (
        <div className=" relative">
          <SentInvite />
        </div>
      ) : (
        <div>
          <SearchEstate openAvailableEstate={openAvailableEstate} />
          <div className="w-full">
            <InviteLink
              openLink={openLink}
              inviteLink={inviteLink}
              setInviteLink={setInviteLink}
              loading={loadingii}
            />
          </div>
        </div>
      )}
      <CustomizedModal isOpen={openLinkModal}>
        {
          linkConfirmationModal
            ?
            <div className="w-full md:max-w-[464px] bg-white h-[290px] rounded-md">
              <div className="w-full h-full flex justify-center items-center m-auto">
                <div className="w-[464px] flex flex-col justify-around px-8  items-center gap-3">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                    }
                    alt=""
                    height={48}
                    width={48}
                  />
                  <h1 className="text-BlackHomz font-[700] text-[20px]">Request sent</h1>
                  <p className="text-[16px] font-[400] text-GrayHomz text-center">
                    Your request to join Property has been sent to the property manager.
                  </p>
                  <button
                    onClick={closeLinkConfirmationModal}
                    className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
            :
            <div>
              <AcAndRejModelEs
                header={"Proceed To Join Property?"}
                body={"You’re about to join Property"}
                button={"Yes"}
                buttonTwo={"No"}
                returnHomeTwo={closeLink}
                returnHome={openLinkConfirmationModal}
                loading={loadingii}
              />
            </div>
        }
      </CustomizedModal>
    </div>
  );
};

export default EstateInformation;
