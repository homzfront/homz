"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import useBodyScroll from "@/components/general/useBodyScroll";
import Loading from "@/components/mainmenu/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";


const ContactInfo = ({ handlePageChangeTwo, handlePageChangeFour, data }) => {
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setSecurityPhoneNumber(parseInt(data.securityPhoneNumber) || "");
      setEmergencyPhoneNumber(parseInt(data.emergencyPhoneNumber) || "");
      setUtilityServicePhoneNumber(
        parseInt(data.utilityServicePhoneNumber) || ""
      );
      setManagerPhoneNumber(parseInt(data.managerPhoneNumber) || "");
    }
  }, [data]);

  // contactInfo
  const [managerPhoneNumber, setManagerPhoneNumber] = useState(
    data?.managerPhoneNumber
  );
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState(
    data?.emergencyPhoneNumber
  );
  const [utilityServicePhoneNumber, setUtilityServicePhoneNumber] = useState(
    data?.utilityServicePhoneNumber
  );
  const [securityPhoneNumber, setSecurityPhoneNumber] = useState(
    data?.securityPhoneNumber
  );

  const [loading, setLoading] = useState(false);

  useBodyScroll([loading]);

  const updateDone = async (e) => {
    e.preventDefault();

    if (loading) return; // Do nothing if already loading
    setLoading(true); // Set loading to true when submitting the form

    try {
      const response = await api.patch(
        `/estates/${data._id}/contact-information`,
        {
          managerPhoneNumber: parseInt(managerPhoneNumber),
          emergencyPhoneNumber: parseInt(emergencyPhoneNumber),
          utilityServicePhoneNumber: parseInt(utilityServicePhoneNumber),
          securityPhoneNumber: parseInt(securityPhoneNumber),
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
    <div className="">
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
      <div>
        <h1 className="text-[23px] font-[700] text-BlueHomz">
          Contact Information
        </h1>
        <p className="text-[18px] font-[400] text-GrayHomz">
          Kindly fill in your contact information
        </p>
      </div>
      <div className="w-[50%] mt-4 flex flex-col gap-2">
        <Input
          label={"Manager’s Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          value={managerPhoneNumber}
          onChange={(e) => setManagerPhoneNumber(e.target.value)}
        />
        <Input
          label={"Emergency Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          value={emergencyPhoneNumber}
          onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
        />
        <Input
          label={"Utility Services Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          span2={"(Dry cleaning, Waste disposal, etc)"}
          value={utilityServicePhoneNumber}
          onChange={(e) => setUtilityServicePhoneNumber(e.target.value)}
        />
        <Input
          label={"Security  Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"number"}
          value={securityPhoneNumber}
          onChange={(e) => setSecurityPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mt-[10%] flex justify-end">
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

export default ContactInfo;
