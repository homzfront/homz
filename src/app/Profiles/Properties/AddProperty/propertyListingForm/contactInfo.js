import React, { useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import AcAndRejModel from "../../components/acAndRejModel";
import useBodyScroll from "../../../../components/useBodyScroll";
// import ConfirmPropertyListing from "./components/confirmPropertyListing";
import Loading from "../../../../components/loading";

const ContactInfo = ({
  handlePageChangeThree,
  managerPhoneNumber,
  setManagerPhoneNumber,
  emergencyPhoneNumber,
  setEmergencyPhoneNumber,
  securityPhoneNumber,
  setSecurityPhoneNumber,
  utilityNumber,
  setUtilityNumber,
  handleSubmit,
  yesOrNoModal,
  openYesOrNo,
  closeYesOrNoModal,
  openConfirmationModal,
  closeAllModals,
  loading,
}) => {
 
  useBodyScroll([openConfirmationModal, yesOrNoModal, loading]);
  return (
    <div className="">
      {loading && <Loading />}
      {openConfirmationModal && (
        {/* <ConfirmPropertyListing
          header={"Property Added Successfully"}
          body={"Click on the button below to view estate"}
          button={"View Property"}
          returnHome={closeAllModals}
        /> */}
      )}
      {yesOrNoModal && (
        <AcAndRejModel
          header={"Proceed to Property?"}
          button={"Yes"}
          buttonTwo={"Close"}
          returnHome={handleSubmit}
          returnHomeTwo={closeYesOrNoModal}
        />
      )}
      <div className="text-[23px] font-[700] text-BlueHomz mt-2">
        Contact Information
      </div>
      <div className="text-[18px] font-[400] text-GrayHomz">
        Kindly fill in your correct contact information
      </div>
      <div className="flex  gap-[3rem] mt-5">
        <div className="profiles flex  flex-col space-y-7">
          <div className=" space-y-1">
            <label for="ManagerPhone" className="text-[14px]">
              Manager’s Phone Number
            </label>
            <br />
            <input
              type="text"
              id="ManagerPhone"
              className={`ContactInfoField adminCellBorders}`}
              name="ManagerPhone"
              placeholder="09000000000"
              value={managerPhoneNumber}
              onChange={(e) => setManagerPhoneNumber(e.target.value)}
              maxLength={11}
            />
          </div>

          <div className=" space-y-1">
            <label for="EmergencyPhoneNumber" className="text-[14px]">
              Emergency Phone Number
            </label>
            <br />
            <input
              type="text"
              id="EmergencyPhoneNumber"
              className={`ContactInfoField adminCellBorders}`}
              name="EmergencyPhoneNumber"
              placeholder="09000000000"
              value={emergencyPhoneNumber}
              onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
              maxLength={11}
            />
          </div>
          <div className=" space-y-1">
            <label for="utilityNumber" className="text-[14px]">
              Utility Services Phone Number{" "}
              <span className="text-[11px]">
                (Dry cleaning, Waste disposal, etc)
              </span>
            </label>
            <br />
            <input
              type="text"
              id="utilityNumber"
              className={`ContactInfoField adminCellBorders}`}
              name="utilityNumber"
              placeholder="[09000000000]"
              value={utilityNumber}
              onChange={(e) => setUtilityNumber(e.target.value)}
              maxLength={11}
              minLength={11}

            />
          </div>
          <div className=" space-y-1">
            <label for="SecurityPhoneNumber" className="text-[14px]">
              Security Phone Number
            </label>
            <br />
            <input
              type="text"
              id="SecurityPhoneNumber"
              className={`ContactInfoField adminCellBorders}`}
              name="SecurityPhoneNumber"
              placeholder="[09000000000]"
              value={securityPhoneNumber}
              onChange={(e) => setSecurityPhoneNumber(e.target.value)}
              maxLength={11}
              minLength={11}
            />
          </div>
        </div>
      </div>
      <div className="mt-[4rem] flex justify-between">
        <div>
          <button
            onClick={handlePageChangeThree}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        {!managerPhoneNumber ||
        !securityPhoneNumber ||
        !emergencyPhoneNumber ||
        !utilityNumber ? (
          <div className="">
            <button
              disabled
              className="flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
            >
              Add Property
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                }
                alt=""
                height={17}
                width={16}
              />
            </button>
          </div>
        ) : (
          <div className="">
            <button
              onClick={openYesOrNo}
              className="flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
            >
              Add Property
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                }
                alt=""
                height={16}
                width={16}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
