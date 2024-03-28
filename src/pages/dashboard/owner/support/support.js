"use client";
import React, { useState } from "react";
import Input from "../components/input";
import SectionOne from "./components/sectionOne";
import useBodyScroll from "@/utils/useBodyScroll";
import ConfirmModal from "../components/confirmModal";
import api from "@/utils/api";
import LoadingFormII from "@/components/mainmenu/loadingFormII";

const Support = () => {
  const [doneDialogue, setDoneDialogue] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !message, !phoneNumber) {
      setError("Fill in the above fields")
      return;
    }
    if (loading) return; // Do nothing if already loading
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await api.post("/support/create/ManagerProperty", {
        fullname,
        message,
        phoneNumber: parseInt(phoneNumber),
      });

      if (response.data.statuscode === 201 || 200) {
        setFullname("");
        setMessage("");
        setPhoneNumber("");
        setDoneDialogue(!doneDialogue);
        setLoading(false);
      } else {
        const error = response?.error?.message;
        setError(error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        setError(`Update failed: ${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setError(`Update failed: ${errorMessage}`);
      } else {
        setError("Update failed");
      }
    }
  };

  // useEffect to handle scrolling
  useBodyScroll([, doneDialogue, loading]);

  return (
    <div className=" w-full p-8">
      <h1 className="text-[20px] font-[500] mb-4 text-BlackHomz">Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <SectionOne />
        <div>
          <div className="flex flex-col max-w-[780px]">
            <Input
              label={"Full Name"}
              onChange={(e) => {
                setFullname(e.target.value)
                setError(null);
              }}
              value={fullname}
              type={"text"}
              placeholder={"FullName"}
              span={"*"}
            />
            <Input
              label={"Phone Number"}
              type={"number"}
              placeholder={"Phone Number"}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                setError(null);
              }}
              span={"*"}
            />
            <label className="text-BlackHomz mt-4 text-[14px] font-[500] mb-1">
              Your Message <span className="text-error">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                setError(null);
              }}
              placeholder="Your Message"
              className="rounded-md px-4 h-[156px] border py-2"         
            />
            {
              error && <span className="text-error text-[11px] italic">{error}</span>
            }
            <button
              onClick={handleSubmit}
              className={`bg-BlueHomz mt-4 hover:bg-blue-400 text-white h-10 w-full rounded-md ${loading ? "pointer-events-none w-full flex justify-center" : ""} `}
              type="Submit"
            >
              {loading ? <LoadingFormII /> : " Send Message"}
            </button>
          </div>
        </div>
        {doneDialogue && (
          <div>
            <ConfirmModal
              returnHome={() => setDoneDialogue(false)}
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
