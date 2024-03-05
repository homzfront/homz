"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import { toast } from "react-toastify";
import useBodyScroll from "@/utils/useBodyScroll";
import { updateContactInfo } from "@/api/propertyService";
import LoadingII from "@/components/mainmenu/loadingII";

const ContactDetails = ({ data }) => {
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setPhoneNumber(parseInt(data.contacts.phoneNumber) || "");
      setEmail(data.contacts.email || "");
      setWhatsapp(data.contacts.whatsapp || "");
    }
  }, [data]);

  // contactInfo
  const [phoneNumber, setPhoneNumber] = useState(data?.contacts?.phoneNumber);
  const [email, setEmail] = useState(data?.contacts?.email);
  const [whatsapp, setWhatsapp] = useState(data?.contacts?.whatsapp);
  const [loading, setLoading] = useState(false);

  useBodyScroll([loading]);

  const updateDone = async (e) => {
    e.preventDefault();

    if (loading) return; // Do nothing if already loading
    setLoading(true); // Set loading to true when submitting the form
    // Validate WhatsApp link format
    const whatsappRegex = /^https:\/\/wa\.me\/\d{10,}$/;
    if (!whatsappRegex.test(whatsapp)) {
      toast.error("Invalid WhatsApp link format");
      setLoading(false)
      return;
    }
    try {
      const updatedData = {
        whatsapp,
        email,
        phoneNumber: parseInt(phoneNumber),
      };
      const { success, upDateddata, error } = await updateContactInfo(
        data._id,
        updatedData
      );
      if (success) {
        console.log("Form successfully updated", upDateddata);
        setLoading(false);
        toast.success("Update successful");
      } else {
        console.error("Update failed", error);
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      toast.error("Update failed");
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingII />
      ) : (
        <div>
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
          <div className="mt-[20%] flex justify-end">
            <button
              onClick={updateDone}
              className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
