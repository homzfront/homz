"use client";
import React, { useEffect, useState } from "react";
import SearchEstate from "./getStarted/searchEstate";
import InviteLink from "./getStarted/InviteLink";
import AvailableEstate from "./availableEstate/availableEstate";
import ConfirmModal from "../components/confirmModal";
import SentInvite from "./components/sentInvite";
import EstateInfo from "./estateInfo/estateInfo";
import { toast } from "react-toastify";
import api from "@/utils/api";
import AcAndRejModelEs from "./components/acAndRejModalEs";

const Data = [
  {
    id: 1,
    EstateName: "New Suncity Estate",
    EstateLocation: "Yaba, Lagos",
    EstateAddress: "Estate's full address",
    Manager: "0000 - 000 - 0000",
    Emergency: "0000 - 000 - 0000",
    UtilityService: "0000 - 000 - 0000",
    EmergencyII: "0000 - 000 - 0000",
  },
];
const EstateInformation = () => {
  const [openEstate, setOpenEstate] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkConfirmationModal, setLinkConfirmationModal] = useState(false);
  const [invitLinkSent, setInviteLinkSent] = useState(false);
  const [data, setData] = useState(Data || []);
  const [loading, setLoading] = useState(false)
  const [inviteLink, setInviteLink] = useState("");

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow =
      openLinkModal || linkConfirmationModal ? "hidden" : "auto";
    if (openLinkModal || linkConfirmationModal) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [openLinkModal, linkConfirmationModal]);

  const openAvailableEstate = () => {
    setOpenEstate(!openEstate);
  };

  const closeAvailableEstate = () => {
    setOpenEstate(false);
  };

  function extractQueryParams(url) {
    const searchParams = new URL(url).searchParams;
    const estate = searchParams.get('estate');
    const invitation = searchParams.get('invitation');
  
    return { estate, invitation };
  }

  const openLink =  () => {
    setOpenLinkModal(!openLinkModal);

  };

  const closeLink = () => {
    setOpenLinkModal(false);
  };

  const openLinkConfirmationModal = async () => {
    if (loading) return; // Do nothing if already loading
    setLoading(true); // Set loading to true when submitting the form

    const url = inviteLink;
    const { estate, invitation } = extractQueryParams(url);
    console.log(inviteLink);
    console.log(estate)
    console.log(invitation)
    
    try {
      const response = await api.patch(`/tenantLink/add-tenant-estate-link?estate=${estate}&invitation=${invitation}`, {
        estate: estate,
        invitation: invitation
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("request sent", response.data);
        setLoading(false);
        toast.success("update successful");
        setLinkConfirmationModal(!linkConfirmationModal);

      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("request failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
      toast.error("update falied");
      // setLoginError(error.response?.data?.message);
      console.log(error.response?.data?.message)
    }
  };

  const closeLinkConfirmationModal = () => {
    setLinkConfirmationModal(false);
    setOpenLinkModal(false);
    setInviteLinkSent(!invitLinkSent);
    setOpenEstate(false);
  };

  return (
    <div className="w-[1147px]">
      {data.length >= 2 ? (
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
          <div className="border-t mt-6 w-full">
            <InviteLink openLink={openLink}  inviteLink={inviteLink} setInviteLink={setInviteLink} loading={loading}/>
          </div>
        </div>
      )}
      {openLinkModal && (
        <div>
          <AcAndRejModelEs
            header={"Proceed To Join Estate?"}
            body={"You’re about to join Suncity New Estate"}
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
              "Your request to join Suncity New  Estate has been sent to the estate manager."
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
