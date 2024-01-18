"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import useBodyScroll from "@/components/general/useBodyScroll";
import Loading from "@/components/mainmenu/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";

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
      const response = await api.patch(
        `/properties/${data._id}/rent-detail`,
        {
          maintenanceFee: parseInt(maintenanceFee),
          monthlyRent: parseInt(monthlyRent),
          totalFee: parseInt(totalFee),
          agencyFee: parseInt(agencyFee),
          yearlyRent: parseInt(yearlyRent),
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
        <button onClick={updateDone} className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default RentDetails;
