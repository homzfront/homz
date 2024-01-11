"use client"
import React, { useEffect, useState } from "react";
import AcAndRejModel from "../../components/acAndRejModel";
import ConfirmModal from "../../components/confirmModal";

const UpdateButton = () => {
  
  const [showDialogue, setShowDialogue] = useState(false);
  const [doneUpdate, setDoneUpdate] = useState(false);
  const handleUpdate = () => {
    setShowDialogue(!showDialogue)
  }

  const updateDone = () => {
    setDoneUpdate(!doneUpdate)
  }

  const returnHomeTwo = () => {
    setDoneUpdate(false)
    setShowDialogue(false)
  }

  const returnHome = () => {
    setDoneUpdate(false)
    setShowDialogue(false)
  }

  useEffect(() => {
    document.body.style.overflow = showDialogue || doneUpdate ? "hidden" : "auto";
    if (showDialogue || doneUpdate) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [showDialogue, doneUpdate]);

  return (
    <div className="">
      <div className="mt-[20%] flex justify-end">
        <button onClick={handleUpdate} className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
      {showDialogue && (
        <div>
          <AcAndRejModel returnHome={updateDone} returnHomeTwo={returnHomeTwo} header={"Save Updates?"} body={"Proceed with saving changes?"} button={"Yes"} buttonTwo={"No, don’t save"}/>
        </div>
      )}
      {
        doneUpdate && (
          <div>
            <ConfirmModal header={"Update Saved"} button={"Close"} returnHome={returnHome}/>
          </div>
        )
      }
    </div>
  );
};

export default UpdateButton;
