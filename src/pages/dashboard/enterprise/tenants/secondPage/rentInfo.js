import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import ConfirmModal from "../../components/confirmModal";
import Dropdown from "../../components/dropDownTwo";
import useBodyScroll from "@/utils/useBodyScroll";
import {
  createSpecificTenantRentInfo,
  getSpecificTenantRentInfo,
  updateSpecificTenantRentInfo,
} from "@/api/tenantSevice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingForm from "@/components/mainmenu/loadingForm";

const RentInfo = ({ profile }) => {
  console.log(profile);
  const [data, setData] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [rent, setRent] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [property, setProperty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const [confirm, setConfirm] = useState(false);

  function capitalizeFirstLetter(str) {
    if (str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      // Return an empty string or handle the error as needed
      return "";
    }
  }

  function addYearsToValues(integers) {
    if (integers === "" || integers === null || integers === undefined) {
      return ""; // Render the actual name if it exists
    } else {
      const plural = integers !== 1 ? "s" : ""; // Add 's' for values other than 1
      return `${integers} year${plural}`;
    }
  }

  function lowerCase(str) {
    if (typeof str === "string" && str !== "") {
      return str.toLowerCase();
    } else {
      return "";
    }
  }

  console.log(data);

useEffect(() => {
  if (!profile?.data?.rentInfo?._id) {
    return;
  }

  const rentInformation = async () => {
    try {
      const response = await getSpecificTenantRentInfo(
        `${profile.data.rentInfo._id}`
      );
      const rentInfo = response;
      setData(rentInfo);
    } catch (error) {
      console.error("Error fetching rent information", error);
      // Handle the error as needed
    }
  };

  rentInformation();
}, [profile]);

  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setPropertyType(data?.upDateddata?.propertyType || "");
      setApartmentNumber(parseInt(data?.upDateddata?.apartmentNumber) || 0);
      setRent(data?.upDateddata?.totalRent || 0);
      setDuration(addYearsToValues(data?.upDateddata?.duration) || "");
      setStartDate(formatDateII(data?.upDateddata?.startDate) || "");
      setDueDate(formatDateII(data?.upDateddata?.dueDate) || "");
      setProperty(data?.upDateddata?.estateId?.name || "");
      setSelectedValue(
        capitalizeFirstLetter(data?.upDateddata?.paymentStatus) || ""
      );
      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);

  const handleSelect = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedValue(option.label);
  };

  const options = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Paid" },
    { id: 3, label: "Over Due" },
  ];

  // useEffect to handle scrolling
  useBodyScroll([confirm]);

  console.log(propertyType);
  console.log(parseInt(apartmentNumber)),
    console.log(parseInt(rent)),
    console.log(parseInt(duration)),
    console.log(startDate);
  console.log(dueDate);
  console.log(lowerCase(selectedValue));
  console.log(property);


  const handleConfirm2 = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form
    if (dueDate <= startDate) {
      setLoading(false);
      toast.error("Invalid start date and due date");
      return;
    }
    try {
      const updatedData = {
        propertyType,
        apartmentNumber: parseInt(apartmentNumber),
        rent: parseInt(rent),
        duration: parseInt(duration),
        startDate,
        dueDate,
        paymentStatus: lowerCase(selectedValue),
        property,
      };
      const id = profile?.data?._id;
      console.log(id);
      const { success, upDateddata, error } =
        await createSpecificTenantRentInfo(id, updatedData);

      if (success) {
        console.log("Form successfully updated", upDateddata);
        setLoading(false);
        toast.success("Update successful");
        setConfirm(!confirm);
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
  }
  const handleConfirm = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form
    if (dueDate <= startDate) {
      setLoading(false);
      toast.error("Invalid start date and due date");
      return;
    }
    try {
      const updatedData = {
        propertyType,
        apartmentNumber: parseInt(apartmentNumber),
        rent: parseInt(rent),
        duration: parseInt(duration),
        startDate,
        dueDate,
        paymentStatus: lowerCase(selectedValue),
        property,
      };
      const id = profile?.data?.rentInfo._id;
      console.log(id);
      const { success, upDateddata, error } =
        await updateSpecificTenantRentInfo(id, updatedData);

      if (success) {
        console.log("Form successfully updated", upDateddata);
        setLoading(false);
        toast.success("Update successful");
        setConfirm(!confirm);
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

  const returnHome = () => {
    setConfirm(false);
  };

  function formatDateII(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      {
        <ToastContainer
          position="top-center"
          autoClose={1000}
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
      }
      <div className="h-[430px]">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={"Property Type"}
            type={"type"}
            value={propertyType}
            placeholder={"2-Bedroom Bungalow"}
            onChange={(e) => setPropertyType(e.target.value)}
          />
          <Input
            label={"Duration"}
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            type={"type"}
            placeholder={"1 Year"}
          />
          <Input
            label={"Property"}
            onChange={(e) => setProperty(e.target.value)}
            value={property}
            type={"type"}
            placeholder={"Property Name"}
          />
          <Input
            label={"Start Date"}
            type={"date"}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder={"4th January, 2023"}
          />
          <Input
            label={"Apartment Number"}
            value={apartmentNumber}
            onChange={(e) => setApartmentNumber(e.target.value)}
            type={"type"}
            placeholder={"Apartment Number"}
          />
          <Input
            label={"Due Date"}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type={"date"}
            placeholder={"4th January, 2024"}
          />
          <Input
            label={"Rent"}
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            type={"number"}
            placeholder={"N750,000"}
          />
          <div className="flex flex-col gap-[10px]">
            <label className="text-[14px] font-[500]">Payment Status</label>
            <Dropdown
              options={options}
              selectOption={`${
                data?.upDateddata?.paymentStatus === undefined
                  ? "Select an option"
                  : ` ${capitalizeFirstLetter(selectedValue)}`
              }`}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <div className="mt-6">
          {data == !{} ? (
            <button
              onClick={handleConfirm2}
              className={` ${
                loading ? "pointer-events-none border-GrayHomz" : ""
              } h-[48px] border border-BlueHomz rounded-md w-full flex justify-center items-center`}
            >
              {loading ? <LoadingForm /> : "Save Update"}
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className={` ${
                loading ? "pointer-events-none border-GrayHomz" : ""
              } h-[48px] border border-BlueHomz rounded-md w-full flex justify-center items-center`}
            >
              {loading ? <LoadingForm /> : "Save Update"}
            </button>
          )}
        </div>
        {confirm ? (
          <ConfirmModal
            body={"Tenant Information has successfully been updated"}
            header={"Update Saved"}
            button={"Okay"}
            returnHome={returnHome}
          />
        ) : (
          ""
        )}
      </div>{" "}
    </div>
  );
};

export default RentInfo;
