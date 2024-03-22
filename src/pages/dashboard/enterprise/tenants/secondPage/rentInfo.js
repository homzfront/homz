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
import { toast } from "react-toastify";
import LoadingForm from "@/components/mainmenu/loadingForm";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import lowerCaseData from "@/utils/lowerCaseData";

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
  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  const [confirm, setConfirm] = useState(false);


  function addYearsToValues(integers) {
    if (integers === "" || integers === null || integers === undefined) {
      return ""; // Render the actual name if it exists
    } else {
      const plural = integers !== 1 ? "s" : ""; // Add 's' for values other than 1
      return `${integers} year${plural}`;
    }
  }


  console.log(data);

  const rentInformation = async () => {
    try {
      const response = await getSpecificTenantRentInfo(
        `${profile.data.rentInfo._id}`
      );
      const rentInfo = response;
      setData(rentInfo);
      setShowUpdate(!showUpdate)
    } catch (error) {
      console.error("Error fetching rent information", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
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
    rentInformation()
  }, [showUpdate])


  useEffect(() => {
    if (!profile?.data?.rentInfo?._id) {
      return;
    }
    rentInformation();
  }, [profile]);

  useEffect(() => {
    if (profile) {
      setProperty(profile?.data?.estateId?.name || "");
    }
  }, [profile])


  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setPropertyType(data?.upDateddata?.propertyType || "");
      setApartmentNumber(parseInt(data?.upDateddata?.apartmentNumber) || 0);
      setRent(data?.upDateddata?.totalRent || 0);
      setDuration(addYearsToValues(data?.upDateddata?.duration) || "");
      setStartDate(formatDateII(data?.upDateddata?.startDate) || "");
      setDueDate(formatDateII(data?.upDateddata?.dueDate) || "")
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
  console.log(lowerCaseData(selectedValue));
  console.log(property);
  console.log(parseInt(rent))



  const handleConfirm2 = async (e) => {
    e.preventDefault();

    if (dueDate <= startDate) {
      setLoading(false);
      toast.error("Invalid start date and due date");
      setError("Invalid start date and due date")
      return;

    }
    if (loading) return; // Do nothing if already loading
    setLoading(true); // Set loading to true when submitting the form

    if (!propertyType || !apartmentNumber || !rent || !duration || !startDate || !dueDate || !selectedValue || !property) {
      setLoading(false);
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }
    try {
      const updatedData = {
        propertyType,
        apartmentNumber: parseInt(apartmentNumber),
        rent: parseInt((rent)),
        duration: parseInt(duration),
        startDate,
        dueDate,
        paymentStatus: lowerCaseData(selectedValue),
        property,
      };
      const id = profile?.data?._id;
      console.log(id);
      console.log(updatedData)
      const { success, upDateddata, error } =
        await createSpecificTenantRentInfo(id, updatedData);

      if (success) {
        setProperty("")
        setApartmentNumber("")
        setRent("")
        setDuration("")
        setStartDate("")
        setDueDate("")
        setSelectedValue(null)
        setProperty("")
        console.log("Form successfully updated", upDateddata);
        setLoading(false);
        setShowUpdate(!showUpdate)
        const refetchData = async () => {
          try {
            const response = await getSpecificTenantRentInfo(`${profile.data.rentInfo._id}`);
            const rentInfo = response;
            setData(rentInfo); // Update state again if required
          } catch (error) {
            console.error("Error fetching rent information", error);
            // Handle the error as needed
          }
        };
        refetchData();
        setConfirm(!confirm);
        setError(null)
      } else {
        console.error("Update failed", error);
        toast.error(error?.msg);
        setLoading(false);
        setError(error?.error?.message)
        setError(error?.msg)
        toast.error(error?.error?.message)
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      toast.error("Update failed");
      setError(error)
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
        paymentStatus: lowerCaseData(selectedValue),
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
        setError(null);
      } else {
        console.error("Update failed", error);
        toast.error(error);
        setLoading(false);
        setError(error?.error?.message)
        setError(error?.msg)
        toast.error(error?.error?.message)
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      toast.error("Update failed");
      setError(error)
    }
  };

  const returnHome = () => {
    rentInformation()
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
      <div className="h-[430px]">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={"Property Type"}
            type={"type"}
            value={propertyType}
            span={"*"}
            placeholder={"2-Bedroom Bungalow"}
            onChange={(e) => {
              setPropertyType(e.target.value)
              setError("")
            }}
          />
          <Input
            label={"Duration"}
            onChange={(e) => {
              setDuration(e.target.value)
              setError("")
            }}
            value={duration}
            type={"type"}
            placeholder={"1 Year"}
            span={"*"}
          />
          <Input
            label={"Property"}
            // onChange={(e) => {
            //   setProperty(e.target.value)
            //   setError("")
            // }}
            value={property}
            type={"type"}
            placeholder={"Property Name"}
            span={"*"}
          />
          <Input
            label={"Start Date"}
            type={"date"}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)
              setError("")
            }}
            placeholder={"4th January, 2023"}
            span={"*"}
          />
          <Input
            label={"Apartment Number"}
            value={apartmentNumber}
            onChange={(e) => {
              setApartmentNumber(e.target.value)
              setError("")
            }}
            type={"type"}
            placeholder={"Apartment Number"}
            span={"*"}
          />
          <Input
            label={"Due Date"}
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value)
              setError("")
            }}
            type={"date"}
            placeholder={"4th January, 2024"}
            span={"*"}
          />
          <Input
            label={"Rent"}
            value={rent}
            onChange={(e) => {
              setRent(e.target.value)
              setError("")
            }}
            type={"text"}
            placeholder={"750000"}
            span2={"Entered value should be annual rent"}
            span={"*"}
          />
          <div className="flex flex-col gap-[10px]">
            <label className="text-[14px] font-[500]">Payment Status <span className="text-error">*</span></label>
            <Dropdown
              options={options}
              selectOption={`${data?.upDateddata?.paymentStatus === undefined
                ? "Select an option"
                : ` ${capitalizeFirstLetter(selectedValue)}`
                }`}
              onSelect={handleSelect}
            />
          </div>
          {error && typeof error === 'string' && (
            <span className="text-[10px] mt-[-16px] text-red-500 italic">
              {error}
            </span>
          )}
        </div>

        <div className="mt-6">
          {showUpdate ? (
            <button
              onClick={handleConfirm}
              className={` ${loading ? "pointer-events-none" : ""
                } h-[48px] border bg-BlueHomz text-white rounded-md w-full flex justify-center items-center`}
            >
              {loading ? <LoadingFormII /> : "Update"}
            </button>
          ) : (
            <button
              onClick={handleConfirm2}
              className={` ${loading ? "pointer-events-none" : ""
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
