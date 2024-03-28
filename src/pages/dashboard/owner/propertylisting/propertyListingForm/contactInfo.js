import React, { useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import AcAndRejModel from "../../components/acAndRejModel";
import useBodyScroll from "@/utils/useBodyScroll";
import ConfirmPropertyListing from "../components/confirmPropertyListing";
import Loading from "@/components/mainmenu/loading";


const ContactInfo = ({
  handlePageChangeThree,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  whatsapp,
  setWhatsapp,
  handleSubmit,
  yesOrNoModal,
  openYesOrNo,
  closeYesOrNoModal,
  openConfirmationModal,
  closeAllModals,
  loading,
}) => {
  
  useBodyScroll([openConfirmationModal, yesOrNoModal, loading]);

  const [visibleAddProperty, setVisibleAddProperty] = useState(false);

  const ableAddProperty = () => {
    setVisibleAddProperty(true);
  };


  return (
    <div className="px-8">
      {loading && <Loading />}
      {openConfirmationModal && (
        <ConfirmPropertyListing
          header={"Property Added Successfully"}
          body={"Click on the button below to view estate"}
          button={"View Property"}
          returnHome={closeAllModals}
        />
      )}
      {yesOrNoModal && (
        <AcAndRejModel
          header={"Proceed to List Property?"}
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
      <div className="flex flex-col gap-4 w-[473px] mt-6">
        <Input
          label={"Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value)
            setVisibleAddProperty(true)
          }}
        />
        <Input
          label={"Email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setVisibleAddProperty(true)
          }}
          placeholder={"Email@email.com"}
          type={"text"}
        />
        <Input
          label={"WhatsApp Link"}
          placeholder={"WA.com/your-link"}
          type={"text"}
          value={whatsapp}
          onChange={(e) => {
            setWhatsapp(e.target.value)
            setVisibleAddProperty(true)
          }}
        />
      </div>
      <div className="mt-[20%] flex justify-between">
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
        <div className="flex items-center gap-2">
          <div>
            <button
              onClick={ableAddProperty}
              className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
            >
              Skip
            </button>
          </div>

          <div className="">
            <button
              disabled
              className={`flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5
              ${visibleAddProperty ? "hidden" : "block"} `}
            >
              List Property
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

          <div className="">
            <button
              onClick={openYesOrNo}
              className={`flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz 
              ${visibleAddProperty ? "block" : "hidden"} `}
            >
              List Property
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
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
