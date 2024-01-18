"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";
import useBodyScroll from "@/components/general/useBodyScroll";
import Loading from "@/components/mainmenu/loading";

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

    try {
      const response = await api.patch(
        `/properties/${data._id}/contact-detail`,
        {
          whatsapp,
          email,
          phoneNumber: parseInt(phoneNumber),
        }
      );

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        toast.success("update successful");
        setLoading(false);
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("update falied");
      setLoading(false);
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div>
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
  );
};

export default ContactDetails;
