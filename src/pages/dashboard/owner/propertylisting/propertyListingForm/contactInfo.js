import React, { useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import AcAndRejModel from "../../components/acAndRejModel";
import useBodyScroll from "@/components/general/useBodyScroll";
import ConfirmModal from "../../components/confirmModal";
import ConfirmPropertyListing from "../components/confirmPropertyListing";
import Loading from "@/components/mainmenu/loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  console.log(email);
  console.log(phoneNumber);
  console.log(whatsapp);
  useBodyScroll([openConfirmationModal, yesOrNoModal, loading]);
  return (
    <div className="px-8">
      {
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeButton={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      }
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
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input
          label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Email@email.com"}
          type={"text"}
        />
        <Input
          label={"WhatsApp Link"}
          placeholder={"WA.com/your-link"}
          type={"text"}
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
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
        {!phoneNumber || !email || !whatsapp ? (
          <div className="">
            <button
              disabled
              className="flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
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
        ) : (
          <div className="">
            <button
              onClick={openYesOrNo}
              className="flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
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
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
