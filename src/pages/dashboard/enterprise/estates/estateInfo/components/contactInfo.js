"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import useBodyScroll from "@/utils/useBodyScroll";
import { toast } from "react-toastify";

import { updateContactInfo } from "@/api/estateService";
import LoadingII from "@/components/mainmenu/loadingII";

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
      const updatedContactInfo = {
        ...(managerPhoneNumber && { managerPhoneNumber: parseInt(managerPhoneNumber) }),
        ...(emergencyPhoneNumber && { emergencyPhoneNumber: parseInt(emergencyPhoneNumber) }),
        ...(utilityServicePhoneNumber && { utilityServicePhoneNumber: parseInt(utilityServicePhoneNumber) }),
        ...(securityPhoneNumber && { securityPhoneNumber: parseInt(securityPhoneNumber) }),
      };      

      const { success, upDateddata, error } = await updateContactInfo(
        data._id,
        updatedContactInfo
      );

      if (success) {
        setLoading(false);
        toast.success("Update successful");
      } else {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Update failed");
    }
  };

  return (
    <div className="">

      {loading ? (
        <LoadingII />
      ) : (
        <div>
          <div>
            <h1 className="text-[20px] md:text-[23px] font-[700] text-BlueHomz">
              Contact Information
            </h1>
            <p className="text-[15px] md:text-[18px] font-[400] text-GrayHomz">
              Kindly fill in your contact information
            </p>
          </div>
          <div className="w-full md:w-[50%] mt-4 flex flex-col gap-2">
            <Input
              label={"Manager’s Phone Number"}
              placeholder={"0000 - 000 - 0000"}
              type={"number"}
              value={managerPhoneNumber}
              span={"*"}
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
      )}
    </div>
  );
};

export default ContactInfo;
