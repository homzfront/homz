"use client";
import React, { useEffect, useState } from "react";
import Input from "../components/input";
import SectionOne from "./components/sectionOne";

import ConfirmModal from "../components/confirmModal";
import AcAndRejModel from "../components/acAndRejModel";

const Support = () => {
  const [proceed, setProceed] = useState(false);
  const [doneDialogue, setDoneDialogue] = useState(false);
  const OpenProceedDialogue = () => {
    setProceed(true);
  };
  const returnHome = () => {
    setDoneDialogue(!doneDialogue);
  };

  const returnHomeTwo = () => {
    setProceed(false);
  };

  const returnHomeThree = () => {
    setProceed(false);
    setDoneDialogue(false);
  };

  // useEffect to handle scrolling
  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = proceed || doneDialogue ? "hidden" : "auto";
    if (proceed || doneDialogue) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [proceed, doneDialogue]);

  return (
    <div className=" w-[1147px] p-8">
      <h1 className="text-[20px] font-[500] mb-4 text-BlackHomz">Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <SectionOne />
        <div>
          <div className="flex flex-col gap-4 max-w-[780px]">
            <div>
              <Input
                label={"Full Name"}
                type={"text"}
                placeholder={"FullName"}
              />
            </div>
            <div>
              <Input
                label={"Phone Number"}
                type={"text"}
                placeholder={"Phone Number"}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-BlackHomz text-[14px] font-[500] mb-1">
                Your Message
              </label>
              <textarea
                placeholder="Your Message"
                className ="rounded-md px-4 h-[156px] border py-2"
              />
            </div>
            <button
              onClick={OpenProceedDialogue}
              className="bg-BlueHomz mt-4 hover:bg-blue-400 text-white h-10 w-full rounded-md"
            >
              Send Message
            </button>
          </div>
        </div>
        {proceed && (
          <div>
            <AcAndRejModel
              header={"Send Message?"}
              body={"Would you like to save your updates before leaving?"}
              button={"Yes"}
              buttonTwo={"No, don’t save"}
              returnHome={returnHome}
              returnHomeTwo={returnHomeTwo}
            />
          </div>
        )}
        {doneDialogue && (
          <div>
            <ConfirmModal
              returnHome={returnHomeThree}
              header={"Message Sent"}
              body={"We’ll get back to you shortly"}
              button={"Close"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
