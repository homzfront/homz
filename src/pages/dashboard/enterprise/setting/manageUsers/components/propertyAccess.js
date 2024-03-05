import Popup from "@/pages/tenantManagementPlan/popUp";
import Image from "next/image";
import React, { useState } from "react";
// import ConfirmModal from "../../../components/confirmUpdateModal";
import AcAndRejModel from "../../../components/acAndRejModel";
import ConfirmModal from "../../../components/confirmModal";

const PropertyAccess = ({ closeMenu, data, estateData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [openRevoke, setOpenRevoke] = useState(false);
  const [openRevokeAccept, setOpenRevokeAccept] = useState(false);
  const handleSelect = (value) => {
    setSelectedEstate(value);
  };

  const showRevoke = () => {
    setOpenRevoke(true);
  };

  const closeRevoke = () => {
    setOpenRevoke(false);
  };

  const RevokeAccept = () => {
    setOpenRevokeAccept(true);
  };

  const closeRevokeAccept = () => {
    setOpenRevokeAccept(false);
    setOpenRevoke(false);
  };
  console.log(data);
  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      {openRevokeAccept ? (
        <ConfirmModal
          returnHome={closeRevokeAccept}
          header={"User removed Successfully"}
          button={"Close"}
          body={`${data?.Tenant} has successfully been removed from your dashboard`}
        />
      ) : openRevoke ? (
        <AcAndRejModel
          header={"Remove User?"}
          body={`Clicking on ‘Yes’ will remove ${data?.Tenant} from your dashboard, proceed?`}
          button={"Yes"}
          buttonTwo={"No, go back"}
          returnHomeTwo={closeRevoke}
          returnHome={RevokeAccept}
        />
      ) : (
        <div className="w-[464px] h-[471px] bg-white shadow-lg rounded-md py-8 px-8 flex justify-between flex-col">
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
              {data?.Tenant} has access to all properties listed below
            </p>
          </div>
          {data?.Properties?.map((data) => (
            <div
              key={data?.id}
              className="w-[100%] mt-1 border-b py-5 flex justify-between items-center"
            >
              <p className="text-[14px] font-[400] text-GrayHomz">
                {data?.label}
              </p>
              <p
                onClick={showRevoke}
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
                {selectedEstate ? selectedEstate : "Select properties"}
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
                onSelect={handleSelect}
                estateData={estateData}
              />
            )}
          </div>
          <div>
            <button
              type="text"
              className="mt-6 h-[48px] text-white bg-BlueHomz text-[16px] font-[700] w-full rounded-[4px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default PropertyAccess;
