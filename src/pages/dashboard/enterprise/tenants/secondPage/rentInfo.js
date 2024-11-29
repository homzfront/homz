import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import InputTwo from "./input";
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
import processNumber from "@/utils/processNumber";
import useRentSummaryTenant from "@/store/enterpriseStore/rentSummaryTenant";
import useWalletPaymentStore from "@/store/enterpriseStore/useWalletPaymentStore";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingProlonged from "@/components/general/loadingProlonged";
import DatePicker from "react-datepicker";
import DateIcon from "@/components/icons/date";



const RentInfo = ({ profile, fetchTenantData, tenantId, rentInfo, fetchRentInformation, reFetchSummaryData }) => {
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
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const {
    fetchData
  } = useRentSummaryTenant();
  const {
    fetchData: fetchWalletPayment,
  } = useWalletPaymentStore();

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setError("")
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setError("")
  };

  function addDurationToDate() {
    // Assuming duration and startDate are available in the current scope
    if (!duration || !startDate) return;

    // Convert the start date string into a Date object
    const selectedDate = new Date(startDate);

    // Extract the numeric value and time unit from the duration string (e.g., "2 years" or "18 months")
    // const [amountStr, unit] = duration.split(' ');
    let numericAmount = parseInt(duration, 10); // Convert the amount to a number

    if (isNaN(numericAmount)) {
      console.error('Invalid duration amount:', amountStr);
      return;
    }

    // Initialize variables for years and months
    let yearsToAdd = 0;
    let monthsToAdd = 0;

    yearsToAdd = Math.floor(numericAmount / 12);
    monthsToAdd = numericAmount % 12;

    // Adjust the date by adding years
    if (yearsToAdd > 0) {
      selectedDate.setFullYear(selectedDate.getFullYear() + yearsToAdd);
    }

    // Adjust the date by adding months
    if (monthsToAdd > 0) {
      selectedDate.setMonth(selectedDate.getMonth() + monthsToAdd);
    }

    // Subtract one day from the selected date
    selectedDate.setDate(selectedDate.getDate() - 1);

    // Extract the year, month, and day in the correct format (YYYY-MM-DD)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(selectedDate.getDate()).padStart(2, '0');

    // Create the final date string in YYYY-MM-DD format
    const newDate = `${year}-${month}-${day}`;

    // Set the due date (assuming setDueDate is a state setter function available in the scope)
    setDueDate(newDate);
  }


  useEffect(() => {
    addDurationToDate()
  }, [duration, startDate])

  useEffect(() => {
    if (tenantId) {
      fetchData(tenantId)
      fetchWalletPayment(tenantId)
    }
  }, [loading])

  useEffect(() => {
    if (!profile?.data?.rentInfo?._id) {
      fetchTenantData();
    }

  }, [showUpdate]);

  useEffect(() => {
    if (profile) {
      setProperty(profile?.data?.estateId?.name || "");
      fetchRentInformation();
    }
  }, [profile])

  useEffect(() => {
    // Check if data and required properties are available
    if (rentInfo) {
      setPropertyType(rentInfo?.upDateddata?.propertyType || "");
      setApartmentNumber(parseInt(rentInfo?.upDateddata?.apartmentNumber) || "");
      setRent(rentInfo?.upDateddata?.rent || "");
      setDuration(rentInfo?.upDateddata?.duration || "");
      setStartDate(formatDateII(rentInfo?.upDateddata?.startDate) || "");
      setDueDate(formatDateII(rentInfo?.upDateddata?.dueDate) || "")
      setSelectedValue(
        capitalizeFirstLetter(rentInfo?.upDateddata?.paymentStatus) || ""
      );
      setLoading(false); // Set loading to false once data is available
    }
  }, [rentInfo]);

  const handleSelect = (option) => {
    // Handle the selected value as needed
    // console.log("Selected Option:", option);
    setSelectedValue(option.label);
  };

  const options = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Paid" },
    { id: 3, label: "Over Due" },
  ];

  // useEffect to handle scrolling
  useBodyScroll([confirm]);

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
        rent: processNumber(rent),
        duration: parseInt(duration),
        startDate,
        dueDate,
        paymentStatus: lowerCaseData(selectedValue),
        property,
      };
      const id = profile?.data?._id;
      const { success, upDateddata, error } =
        await createSpecificTenantRentInfo(id, updatedData);

      if (success) {
        setLoading(false);
        setShowUpdate(!showUpdate)
        setConfirm(!confirm);
        setError(null)
        reFetchSummaryData();
      } else {
        toast.error(error?.msg);
        setLoading(false);
        setError(error?.error?.message)
        setError(error?.msg)
        toast.error(error?.error?.message)
      }
    } catch (error) {
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
        rent: processNumber(rent),
        duration: parseInt(duration),
        startDate,
        dueDate,
        paymentStatus: lowerCaseData(selectedValue),
        property,
      };
      const id = profile?.data?.rentInfo._id;
      const { success, upDateddata, error } =
        await updateSpecificTenantRentInfo(id, updatedData);

      if (success) {
        setLoading(false);
        toast.success("Update successful");
        setError(null);
        reFetchSummaryData();
      } else {
        toast.error(error);
        setLoading(false);
        setError(error?.error?.message)
        setError(error?.msg)
        toast.error(error?.error?.message)
      }
    } catch (error) {
      setLoading(false);
      toast.error("Update failed");
      setError(error)
    }
  };

  const returnHome = () => {
    fetchTenantData()
    fetchRentInformation();
    setConfirm(false);
  };

  function formatDateII(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    let timer;

    if (loading) {
      // Set a timer to show the long loading message after 3 seconds
      timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000); // 20 seconds
    } else {
      // Reset when loading is false
      setShowLongLoadingMessage(false);
    }

    // Cleanup the timer on component unmount or when loading changes
    return () => clearTimeout(timer);
  }, [loading]);

  const closeModal = () => {
    setShowLongLoadingMessage(false);
  };

  return (
    <div>
      <CustomizedModal isOpen={showLongLoadingMessage}>
        <LoadingProlonged closeModal={closeModal} />
      </CustomizedModal>
      <div className={`h-[auto] ${loading ? "pointer-events-none" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputTwo
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
          <div className="relative">
            <div className="md:h-[40px] text-[14px] font-[500] flex flex-col">
              <label className="">
                Rent Duration <span className="text-error">{"*"}</span>{" "}
              </label>
              <span className={`text-[12px] font-[400] text-GrayHomz2`}>Enter tenant's rent duration in months</span>
            </div>
            <input
              className={`px-4 border mt-2 rounded-md h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
              type={'number'}
              placeholder="e.g 18"
              onChange={handleDurationChange}
              value={duration}
            />
            <div className="absolute top-[42px] right-[5px]">
              <input
                className={` ${duration ? "text-BlackHomz" : "text-GrayHomz2"} px-4 mt-2 w-[100px] flex justify-center items-center h-[38px] placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
                type='text'
                placeholder="months"
                value="months"
              />
            </div>
          </div>
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
            readOnly
          />
          <div className="flex flex-col gap-3">
            <label className="text-[14px] font-[500]">
              Start Date <span className="text-error">*</span>
            </label>
            <div className="w-full rounded-md border">
              <div className="relative w-full">
                <DatePicker
                  selected={startDate} // Bind to formData
                  onChange={(date) =>
                    setStartDate(date)
                  } // Update using handleInputChange
                  dateFormat="d MMMM, yyyy" // Display format
                  placeholderText="Select Date"
                  className={`w-[100%] h-[41px] px-4 py-2 `}
                />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <DateIcon />
              </div>
              </div>
            </div>
          </div>
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
          <div className="flex flex-col gap-3">
            <label className="text-[14px] font-[500]">
              Due Date <span className="text-error">*</span>
            </label>
            <div className="pointer-events-none relative rounded-md border w-full">
              <div className="w-full">
                <DatePicker
                  selected={dueDate}
                  dateFormat="d MMMM, yyyy" // Display format
                  placeholderText="Select Date"
                  className={`w-full h-[41px] px-4 py-2 `}
                />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <DateIcon />
              </div>
              </div>
            </div>
          </div>
          <InputTwo
            label={"Rent Amount"}
            value={rent}
            onChange={(e) => {
              setRent(e.target.value)
              setError("")
            }}
            type={"text"}
            placeholder={"750000"}
            span2={"Entered value should match rent duration"}
            span={"*"}
          />
          <div className="flex flex-col gap-[10px]">
            <label className="md:h-[38px] text-[14px] font-[500]">Payment Status <span className="text-error">*</span></label>
            <Dropdown
              options={options}
              selectOption={`${rentInfo?.upDateddata?.paymentStatus === undefined
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
          {showUpdate || rentInfo?.upDateddata?.rent ? (
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
