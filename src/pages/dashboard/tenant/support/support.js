"use client";
import React, { useEffect, useState } from "react";
import Input from "../components/input";
import SectionOne from "./components/sectionOne";

import ConfirmModal from "../components/confirmModal";
import AcAndRejModel from "../components/acAndRejModel";
import Loading from "@/components/mainmenu/loading";
import { ToastContainer, toast } from "react-toastify";
import api from "@/utils/api";

const Support = () => {
  const [proceed, setProceed] = useState(false);
  const [doneDialogue, setDoneDialogue] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);

  const OpenProceedDialogue = () => {
    setProceed(true);
  };
  const returnHome = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const response = await api.post("/support/create/tenants", {
        fullname,
        message,
        phoneNumber: parseInt(phoneNumber),
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully submitted", response.data);
        setFullname("");
        setMessage("");
        setPhoneNumber("");
        setDoneDialogue(!doneDialogue);
        setLoading(false);
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
      // setLoginError(error.response?.data?.message);
    }
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
    document.body.style.overflow =
      proceed || doneDialogue || loading ? "hidden" : "auto";
    if (proceed || doneDialogue || loading) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [proceed, doneDialogue, loading]);

  return (
    <div className=" w-full p-8">
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
      <h1 className="text-[20px] font-[500] mb-4 text-BlackHomz">Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <SectionOne />
        <div>
          <div className="flex flex-col max-w-[780px]">
            <Input
              label={"Full Name"}
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              type={"text"}
              placeholder={"FullName"}
            />
            <Input
              label={"Phone Number"}
              type={"number"}
              placeholder={"Phone Number"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label className="text-BlackHomz mt-4 text-[14px] font-[500] mb-1">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="rounded-md px-4 h-[156px] border py-2"
            />

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
