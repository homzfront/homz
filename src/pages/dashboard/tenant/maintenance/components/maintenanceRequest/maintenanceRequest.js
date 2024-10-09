import Image from "next/image";
import React, { useEffect, useState } from "react";
import ConfirmModalI from "../../../components/confirmModalI";
import { maintenanceByTenant } from "@/api/maintenanceService";
import Loading from "@/components/mainmenu/loading";
import { Fascinate } from "next/font/google";
import ConfirmModal from "../../../components/confirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBodyScroll from "@/utils/useBodyScroll";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingProlonged from "@/components/general/loadingProlonged";


const MaintenanceRequest = ({ closeMaintenanceForm, data, fetchData }) => {
  const [subject, setSubject] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [openAccept, setOpenAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);

  const accept = () => {
    setOpenAccept(!openAccept);
  };

  const closeAccept = () => {
    setOpenAccept(false);
  };

  const closeConfirm = () => {
    try {
      fetchData();
    } catch (error) { }

    setConfirm(false);
    setOpenAccept(false);
    closeMaintenanceForm()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const maintenanceData = {
        subject,
        // requestDate,
      };

      const data = await maintenanceByTenant(maintenanceData);
      setLoading(false);
      setSubject("");
      setRequestDate("");
      setConfirm(!confirm);
      // toast.success("maintenance request sent!");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.error);
    }
  };
  useBodyScroll([loading, confirm, openAccept]);


  useEffect(() => {
    let timer;

    if (loading) {
      // Set a timer to show the long loading message after 3 seconds
      timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000); // 20 seconds
    } else {
      // Reset when loading is false
      setShowLongLoadingMessage(false);
    }

    // Cleanup the timer on component unmount or when loading changes
    return () => clearTimeout(timer);
  }, [loading]);

  const closeModal = () => {
    setShowLongLoadingMessage(false);
  };

  return (
    <div className="p-8">
      <CustomizedModal isOpen={showLongLoadingMessage}>
        <LoadingProlonged closeModal={closeModal} />
      </CustomizedModal>
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
      {loading && <Loading />}
      {openAccept && (
        <ConfirmModalI
          header={"Proceed To Send Request?"}
          body={`You’re sending maintenance request for ${subject}`}
          button={"Yes, send request"}
          buttonTwo={"Cancel"}
          returnHome={handleSubmit}
          returnHomeTwo={closeAccept}
        />
      )}
      {confirm && (
        <ConfirmModal
          header={"Request Successful"}
          body={
            "Your property manager has been notified of your request and will attend to it soon."
          }
          button={"Okay"}
          returnHome={closeConfirm}
        />
      )}
      <div className="flex gap-4 items-center">
        <div
          onClick={closeMaintenanceForm}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Image
            src={"/static/dashboard/tenant/maintenance/arrow-left.png"}
            alt=""
            height={16}
            width={16}
          />
          <p className="text-[14px] font-[400] text-GrayHomz2">Go Back</p>
        </div>
        <p className="text-[20px] font-[500] text-BlackHomz">
          Maintenance Request
        </p>
      </div>
      <p className="mt-2 text-[16px] font-[400] text-GrayHomz">
        Fill in the problem that needs maintenance in your home
      </p>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-[500] text-BlackHomz">
            Subject{" "}
            <span className="text-[11px] font-[400] text-GrayHomz">
              (State the problem that needs maintenance)
            </span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="E.g Broken Window"
            className="px-4 h-[45px] w-full md:w-[475px] border rounded-[4px]"
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <label className="text-[14px] font-[500] text-BlackHomz">
            Request Date
          </label>
          <input
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
            className="px-4 h-[45px] w-[475px] border rounded-[4px] text-GrayHomz2"
            type="date"
          />
        </div> */}
        {
          subject ?
            <button
              onClick={accept}
              className="mt-2 w-[130px] bg-BlueHomz text-white h-[45px] rounded-[4px]"
            >
              Send Request
            </button>
            :
            <button
              onClick={accept}
              className="mt-2 w-[130px] bg-GrayHomz6 text-GrayHomz5 h-[45px] rounded-[4px] pointer-events-none"
            >
              Send Request
            </button>
        }
      </div>
    </div>
  );
};

export default MaintenanceRequest;
