"use client";
import React, { useEffect, useState } from "react";
import SearchEstate from "./getStarted/searchEstate";
import InviteLink from "./getStarted/InviteLink";
import AvailableEstate from "./availableEstate/availableEstate";
import ConfirmModal from "../components/confirmModal";
import SentInvite from "./components/sentInvite";
import EstateInfo from "./estateInfo/estateInfo";
import { toast } from "react-toastify";
import AcAndRejModelEs from "./components/acAndRejModalEs";
import tenantProfile from "@/store/tenantStore/tenantProfile";
import LoadingII from "@/components/mainmenu/loadingII";
import useBodyScroll from "@/utils/useBodyScroll";
import { sendInviteProperty } from "@/api/tenantSevice";

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

  console.log(data);

  // useEffect to handle scrolling
  useBodyScroll([openLinkModal, linkConfirmationModal]);

  const openAvailableEstate = () => {
    setOpenEstate(!openEstate);
  };

  const closeAvailableEstate = () => {
    setOpenEstate(false);
  };

  function extractQueryParams(url) {
    const searchParams = new URL(url).searchParams;
    const estate = searchParams.get("estate");
    const invitation = searchParams.get("invitation");

    return { estate, invitation };
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
    const { estate, invitation } = extractQueryParams(url);
    console.log(estate);
    console.log(invitation)
    try {
      const { success, upDateddata, error } = await sendInviteProperty(
        estate,
        invitation
      );

      if (success) {
        console.log("Form successfully updated", upDateddata);
        setLoadingII(false);
        setLinkConfirmationModal(!linkConfirmationModal);
        toast.success("Update successful");
      } else {
        console.error("Update failed", error);
        toast.error(error);
        setLoadingII(false);
      }
    } catch (error) {
      console.error("Update error", error);
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
      {openLinkModal && (
        <div>
          <AcAndRejModelEs
            header={"Proceed To Join Property?"}
            body={"You’re about to join Property"}
            button={"Yes"}
            buttonTwo={"No"}
            returnHomeTwo={closeLink}
            returnHome={openLinkConfirmationModal}
          />
        </div>
      )}
      {linkConfirmationModal && (
        <div>
          <ConfirmModal
            header={"Request sent"}
            body={
              "Your request to join Property has been sent to the property manager."
            }
            button={"Close"}
            returnHome={closeLinkConfirmationModal}
          />
        </div>
      )}
    </div>
  );
};

export default EstateInformation;
