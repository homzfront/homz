"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AcAndRejModel from "../components/acAndRejModel";
import AddProperty from './addProperties';
import Property from './propertyListingForm/propertyForm';
const PropertyInfo = () => {
  const [showCancelDialogue, setShowCancelDialogue] = useState(false);
  const [registrationForm, setRegistrationForm] = useState(false);


  const returnToStartRegistration = () => {
    setRegistrationForm(false);
  };

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = showCancelDialogue ? "hidden" : "auto";
    if (showCancelDialogue) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [showCancelDialogue]);

  const handleShowCancelDialogue = () => {
    setShowCancelDialogue(!showCancelDialogue);
  };

  const returnHomeTwo = () => {
    setShowCancelDialogue(false);
  };


  return (
    <div className="adminCellBorders mt-6 rounded-[12px] px-8 py-9 flex flex-col gap-7">
      

      <div className="">
        {/* <AddProperty /> */}

        <Property returnToStartRegistration={returnToStartRegistration}/>
      </div>
      {/* <div className="flex justify-between mt-8">
        <div>
          <button
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz"
            onClick={handleShowCancelDialogue}
          >
            Cancel
          </button>
        </div>
        {!name ||
        !selectedArea ||
        !selectedState ||
        !address ||
        !description ||
        !propertyType ? (
          <div className="">
            <button
              disabled
              className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
            >
              Next
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
              onClick={handlePageChangeTwo}
              className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
            >
              Next
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
      {showCancelDialogue && (
        <div>
          <AcAndRejModel
            header={"Are you sure you want to cancel?"}
            button={"Yes"}
            buttonTwo={"No, take me back"}
            returnHome={returnToStartRegistration}
            returnHomeTwo={returnHomeTwo}
          />
        </div>
      )} */}
    </div>
  );
};

export default PropertyInfo;
