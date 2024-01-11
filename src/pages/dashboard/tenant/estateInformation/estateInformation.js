"use client";
import React, { useEffect, useState } from "react";
import SearchEstate from "./getStarted/searchEstate";
import InviteLink from "./getStarted/InviteLink";
import AvailableEstate from "./availableEstate/availableEstate";
import AcAndRejModel from "../components/acAndRejModel";
import ConfirmModal from "../components/confirmModal";
import SentInvite from "./components/sentInvite";
import EstateInfo from "./estateInfo/estateInfo";

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
const estateInformation = () => {
  const [openEstate, setOpenEstate] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkConfirmationModal, setLinkConfirmationModal] = useState(false);
  const [invitLinkSent, setInviteLinkSent] = useState(false);
  const [data, setData] = useState(Data || []);

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

  const openLink = () => {
    setOpenLinkModal(!openLinkModal);
  };

  const closeLink = () => {
    setOpenLinkModal(false);
  };

  const openLinkConfirmationModal = () => {
    setLinkConfirmationModal(!linkConfirmationModal);
  };

  const closeLinkConfirmationModal = () => {
    setLinkConfirmationModal(false);
    setOpenLinkModal(false);
    setInviteLinkSent(!invitLinkSent);
    setOpenEstate(false);
  };

  return (
    <div className="w-[1147px]">
      {data.length >= 1 ? (
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
            <InviteLink openLink={openLink} />
          </div>
        </div>
      )}
      {openLinkModal && (
        <div>
          <AcAndRejModel
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

export default estateInformation;
