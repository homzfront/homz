import React, { useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import Loading from "@/components/mainmenu/loading";
import useBodyScroll from "@/utils/useBodyScroll";
import AcAndRejModel from "../../components/acAndRejModel";
import ConfirmEstateListing from "../components/confirmEstateListing";

const ContactInfo = ({
  handlePageChangeTwo,
  managerPhoneNumber,
  emergencyPhoneNumber,
  utilityServicePhoneNumber,
  securityPhoneNumber,
  setEmergencyPhoneNumber,
  setManagerPhoneNumber,
  setSecurityPhoneNumber,
  setUtilityServicePhoneNumber,
  handleSubmit,
  loading,
  yesOrNoModal,
  openYesOrNo,
  closeYesOrNoModal,
  showConfirm,
  closeAllModals,
  visibleAddProperty,
  setVisibleAddProperty,
  name
}) => {
  useBodyScroll([loading, showConfirm, yesOrNoModal]);

  return (
    <div className="p-8">
      {loading && <Loading />}
      {showConfirm && (
        <ConfirmEstateListing
          header={"Property Added Successfully"}
          body={"Click on the button below to view property"}
          button={`View ${name ? name : "property"}`}
          returnHome={closeAllModals}
        />
      )}
      {yesOrNoModal && (
        <div>
          <AcAndRejModel
            header={"Proceed to Add Property?"}
            button={"Yes"}
            buttonTwo={"Close"}
            returnHome={handleSubmit}
            returnHomeTwo={closeYesOrNoModal}
          />
        </div>
      )}
      <div>
        <h1 className="text-[23px] font-[700] text-BlueHomz">
          Contact Information
        </h1>
        <p className="text-[18px] font-[400] text-GrayHomz">
          Kindly fill in your contact information
        </p>
      </div>
      <div className="w-[50%] mt-4 flex flex-col gap-2">
        <Input
          label={"Manager’s Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          span={"*"}
          value={managerPhoneNumber}
          onChange={(e) => {
            setManagerPhoneNumber(e.target.value);
            setVisibleAddProperty(!!e.target.value);
          }}
        />
        <Input
          label={"Emergency Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          value={emergencyPhoneNumber}
          onChange={(e) => {
            setEmergencyPhoneNumber(e.target.value);
            setVisibleAddProperty(!!e.target.value);
          }}
        />
        <Input
          label={"Utility Services Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          span2={"(Dry cleaning, Waste disposal, etc)"}
          value={utilityServicePhoneNumber}
          onChange={(e) => {
            setUtilityServicePhoneNumber(e.target.value);
            setVisibleAddProperty(!!e.target.value);
          }}
        />
        <Input
          label={"Security  Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          value={securityPhoneNumber}
          onChange={(e) => {
            setSecurityPhoneNumber(e.target.value);
            setVisibleAddProperty(!!e.target.value);
          }}
        />
      </div>
      <div className="mt-[20%] flex justify-between">
        <div>
          <button
            onClick={handlePageChangeTwo}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div className="flex gap-4">
          {/* <button
            onClick={ableAddProperty}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            Skip
          </button> */}
          {managerPhoneNumber !== "" ? (
            <button
              onClick={openYesOrNo}
              className={`text-[14px] font-[500] p-4 rounded-md bg-BlueHomz border text-white flex w-[150px] justify-center items-center ${visibleAddProperty ? "block" : "hidden"
                }`}
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
          ) : (
            <button
              disabled
              className={`text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5 flex w-[150px] justify-center items-center ${visibleAddProperty ? "hidden" : "block"
                }`}
            >
              Add Property
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                }
                alt=""
                height={16}
                width={16}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
