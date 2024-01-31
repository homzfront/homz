"use client"
import AcAndRejModel from "../../components/acAndRejModel";
import Loading from "@/components/mainmenu/loading";
import ConfirmModal from "../../../../../components/general/confirmUpdateModal";
import useBodyScroll from "@/components/general/useBodyScroll";

const UpdateButton = ({updateDone, doneUpdate, setDoneUpdate, loading, showDialogue, setShowDialogue}) => {
  
 
  const handleUpdate = () => {
    setShowDialogue(!showDialogue)
  }

  const returnHomeTwo = () => {
    setDoneUpdate(false)
    setShowDialogue(false)
  }

  const returnHome = () => {
    setDoneUpdate(false)
    setShowDialogue(false)
  }

  useBodyScroll([showDialogue, doneUpdate]);

  return (
    <div className="">
      {
        loading && <Loading/>
      }
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
