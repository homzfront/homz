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
import processNumber from "@/utils/processNumber";
import useRentSummaryTenant from "@/store/enterpriseStore/rentSummaryTenant";
import useWalletPaymentStore from "@/store/enterpriseStore/useWalletPaymentStore";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingProlonged from "@/components/general/loadingProlonged";

 

const RentInfo = ({ profile, rentInformation, tenantId }) => {
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

    // Extract the numeric value and time unit from the duration string (e.g., "2 years" or "6 months")
    const [amount, unit] = duration.split(' ');
    const numericAmount = parseInt(amount, 10); // Convert the amount to a number

    // Adjust the date based on the unit ('years' or 'months')
    if (unit?.includes('year')) {
      selectedDate.setFullYear(selectedDate.getFullYear() + numericAmount);
    } else if (unit?.includes('month')) {
      selectedDate.setMonth(selectedDate.getMonth() + numericAmount);
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
  };

  useEffect(() => {
    addDurationToDate()
  }, [duration, startDate])

  useEffect(() => {
    if (tenantId) {
      fetchData(tenantId)
      fetchWalletPayment(tenantId)
    }
  }, [loading])

  function addYearsToValues(integers) {
    if (integers === "" || integers === null || integers === undefined) {
      return ""; // Render the actual name if it exists
    } else {
      const plural = integers !== 1 ? "s" : ""; // Add 's' for values other than 1
      return `${integers} year${plural}`;
    }
  }

  const rentInformationII = async () => {
    try {
      const response = await getSpecificTenantRentInfo(
        `${profile.data.rentInfo._id}`
      );
      const rentInfo = response;
      setData(rentInfo);
    } catch (error) {
      // console.error("Error fetching rent information", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    if (!profile?.data?.rentInfo?._id) {
      rentInformation();
    }

  }, [showUpdate]);

  useEffect(() => {
    if (profile) {
      setProperty(profile?.data?.estateId?.name || "");
      rentInformationII();
    }
  }, [profile])

  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setPropertyType(data?.upDateddata?.propertyType || "");
      setApartmentNumber(parseInt(data?.upDateddata?.apartmentNumber) || "");
      setRent(data?.upDateddata?.rent || "");
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
      <div className={`h-[430px] ${loading ? "pointer-events-none" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            onChange={handleDurationChange}
            value={duration}
            type={"text"}
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
            readOnly
          />
          <Input
            label={"Start Date"}
            type={"date"}
            value={startDate}
            onChange={handleStartDateChange}
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
            type={"date"}
            placeholder={"4th January, 2024"}
            span={"*"}
            disabled={true}
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
          {showUpdate || data?.upDateddata?.rent ? (
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
