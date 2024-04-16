"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import useBodyScroll from "/src/components/general/useBodyScroll";
import { toast } from "react-toastify";

import { rentDetails } from "/src/api/propertyService";
import LoadingII from "/src/components/mainmenu/loadingII";

const RentDetails = ({ data }) => {
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setMonthlyRent(parseInt(data.monthlyRent) || "");
      setAgencyFee(parseInt(data.agencyFee) || "");
      setMaintenanceFee(parseInt(data.maintenanceFee) || "");
      setYearlyRent(parseInt(data.yearlyRent) || "");
      setTotalFee(parseInt(data.totalFee) || "");
    }
  }, [data]);

  // rentDetails
  const [monthlyRent, setMonthlyRent] = useState(data?.monthlyRent);
  const [maintenanceFee, setMaintenanceFee] = useState(data?.maintenanceFee);
  const [totalFee, setTotalFee] = useState(data?.totalFee);
  const [agencyFee, setAgencyFee] = useState(data?.agencyFee);
  const [yearlyRent, setYearlyRent] = useState(data?.yearlyRent);
  const [loading, setLoading] = useState(false);

  useBodyScroll([loading]);

  const updateDone = async (e) => {
    e.preventDefault();

    if (loading) return; // Do nothing if already loading
    setLoading(true); // Set loading to true when submitting the form

    try {
      const updatedData = {
        maintenanceFee: parseInt(maintenanceFee),
        monthlyRent: parseInt(monthlyRent),
        totalFee: parseInt(totalFee),
        agencyFee: parseInt(agencyFee),
        yearlyRent: parseInt(yearlyRent),
      };

      const { success, upDateddata, error } = await rentDetails(
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
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Input
              label={"How much is the monthly rent?"}
              placeholder={"N  00.00"}
              type={"number"}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
            />
            <Input
              label={"How much is the yearly rent?"}
              placeholder={"N  00.00"}
              type={"number"}
              value={yearlyRent}
              onChange={(e) => setYearlyRent(e.target.value)}
            />

            <Input
              label={"How much is the maintenance fee?"}
              placeholder={"N  00.00"}
              type={"number"}
              value={maintenanceFee}
              onChange={(e) => setMaintenanceFee(e.target.value)}
            />
            <Input
              label={"How much is the Agency fee?"}
              placeholder={"N  00.00"}
              type={"number"}
              value={agencyFee}
              onChange={(e) => setAgencyFee(e.target.value)}
            />
            <Input
              label={"How much is the total fee?"}
              placeholder={"N  00.00"}
              type={"number"}
              value={totalFee}
              onChange={(e) => setTotalFee(e.target.value)}
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

export default RentDetails;
