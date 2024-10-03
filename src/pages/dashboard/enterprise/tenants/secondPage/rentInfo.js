import React, { useEffect, useReducer } from "react";
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

// Utility Functions
const addYearsToValues = (years) => {
  if (!years) return "";
  return `${years} year${years !== 1 ? "s" : ""}`;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Initial State for Reducer
const initialState = {
  propertyType: "",
  apartmentNumber: "",
  rent: "",
  duration: "",
  startDate: "",
  dueDate: "",
  selectedValue: null,
  property: "",
  loading: false,
  error: null,
  showUpdate: false,
  confirm: false,
  data: [],
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, error: null };
    case "SET_DATA":
      return { ...state, data: action.data };
    case "SET_LOADING":
      return { ...state, loading: action.value };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "TOGGLE_UPDATE":
      return { ...state, showUpdate: !state.showUpdate };
    case "TOGGLE_CONFIRM":
      return { ...state, confirm: !state.confirm };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const RentInfo = ({ profile, tenantId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    propertyType,
    apartmentNumber,
    rent,
    duration,
    startDate,
    dueDate,
    selectedValue,
    property,
    loading,
    error,
    showUpdate,
    confirm,
    data,
  } = state;

  const { fetchData: fetchRentSummary } = useRentSummaryTenant();
  const { fetchData: fetchWalletPayment } = useWalletPaymentStore();

  // Fetch Rent and Wallet Data
  useEffect(() => {
    if (tenantId) {
      fetchRentSummary(tenantId);
      fetchWalletPayment(tenantId);
    }
  }, [tenantId, fetchRentSummary, fetchWalletPayment]);

  // Fetch Specific Rent Info
  useEffect(() => {
    const fetchRentInfo = async () => {
      if (!profile?.data?.rentInfo?._id) return;
      try {
        const response = await getSpecificTenantRentInfo(profile.data.rentInfo._id);
        dispatch({ type: "SET_DATA", data: response });
      } catch (err) {
        toast.error("Error fetching rent information");
      }
    };
    fetchRentInfo();
  }, [profile]);

  // Populate Form Fields when Data Changes
  useEffect(() => {
    if (data?.upDateddata) {
      dispatch({ type: "SET_FIELD", field: "propertyType", value: data.upDateddata.propertyType || "" });
      dispatch({
        type: "SET_FIELD",
        field: "apartmentNumber",
        value: data.upDateddata.apartmentNumber || "",
      });
      dispatch({ type: "SET_FIELD", field: "rent", value: data.upDateddata.rent || "" });
      dispatch({
        type: "SET_FIELD",
        field: "duration",
        value: addYearsToValues(data.upDateddata.duration) || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "startDate",
        value: formatDate(data.upDateddata.startDate) || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "dueDate",
        value: formatDate(data.upDateddata.dueDate) || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "selectedValue",
        value: capitalizeFirstLetter(data.upDateddata.paymentStatus) || "",
      });
      dispatch({ type: "SET_FIELD", field: "property", value: data.upDateddata.property || "" });
    } else if (profile) {
      dispatch({ type: "SET_FIELD", field: "property", value: profile.data.estateId?.name || "" });
    }
    dispatch({ type: "SET_LOADING", value: false });
  }, [data, profile]);

  // Handle Dropdown Selection
  const handleSelect = (option) => {
    dispatch({ type: "SET_FIELD", field: "selectedValue", value: option.label });
  };

  const options = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Paid" },
    { id: 3, label: "Over Due" },
  ];

  // Handle Scrolling when Confirm Modal is Open
  useBodyScroll([confirm]);

  // Validate Form Fields
  const validateForm = () => {
    if (dueDate <= startDate) {
      dispatch({ type: "SET_ERROR", error: "Invalid start date and due date" });
      toast.error("Invalid start date and due date");
      return false;
    }

    const requiredFields = [propertyType, apartmentNumber, rent, duration, startDate, dueDate, selectedValue, property];
    if (requiredFields.some((field) => !field)) {
      dispatch({ type: "SET_ERROR", error: "All fields are required" });
      toast.error("All fields are required");
      return false;
    }

    return true;
  };

  // Handle Form Submission for Creating Rent Info
  const handleCreate = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) return;

    dispatch({ type: "SET_LOADING", value: true });

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
      const tenantId = profile?.data?._id;
      const { success, error } = await createSpecificTenantRentInfo(tenantId, updatedData);

      if (success) {
        dispatch({ type: "SET_LOADING", value: false });
        dispatch({ type: "TOGGLE_UPDATE" });
        dispatch({ type: "TOGGLE_CONFIRM" });
        dispatch({ type: "SET_ERROR", error: null });
      } else {
        throw error;
      }
    } catch (err) {
      dispatch({ type: "SET_LOADING", value: false });
      const errorMessage = err?.msg || err?.error?.message || "Update failed";
      dispatch({ type: "SET_ERROR", error: errorMessage });
      toast.error(errorMessage);
    }
  };

  // Handle Form Submission for Updating Rent Info
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) return;

    dispatch({ type: "SET_LOADING", value: true });

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
      const rentInfoId = profile?.data?.rentInfo?._id;
      const { success, error } = await updateSpecificTenantRentInfo(rentInfoId, updatedData);

      if (success) {
        dispatch({ type: "SET_LOADING", value: false });
        toast.success("Update successful");
        dispatch({ type: "SET_ERROR", error: null });
      } else {
        throw error;
      }
    } catch (err) {
      dispatch({ type: "SET_LOADING", value: false });
      const errorMessage = err?.msg || err?.error?.message || "Update failed";
      dispatch({ type: "SET_ERROR", error: errorMessage });
      toast.error(errorMessage);
    }
  };

  // Handle Confirm Modal Action
  const handleConfirmAction = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className={`h-[430px] ${loading ? "pointer-events-none" : ""}`}>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Property Type"
            type="text"
            value={propertyType}
            required
            placeholder="2-Bedroom Bungalow"
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "propertyType", value: e.target.value })}
          />
          <Input
            label="Duration"
            type="text"
            value={duration}
            required
            placeholder="1 Year"
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "duration", value: e.target.value })}
          />
          <Input
            label="Property"
            type="text"
            value={property}
            required
            placeholder="Property Name"
            readOnly
          />
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            required
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "startDate", value: e.target.value })}
          />
          <Input
            label="Apartment Number"
            type="number"
            value={apartmentNumber}
            required
            placeholder="Apartment Number"
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "apartmentNumber", value: e.target.value })}
          />
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            required
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "dueDate", value: e.target.value })}
          />
          <Input
            label="Rent"
            type="text"
            value={rent}
            required
            placeholder="750000"
            helperText="Entered value should be annual rent"
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "rent", value: e.target.value })}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Payment Status <span className="text-error">*</span>
            </label>
            <Dropdown
              options={options}
              selectOption={selectedValue ? capitalizeFirstLetter(selectedValue) : "Select an option"}
              onSelect={handleSelect}
            />
          </div>
          {error && typeof error === "string" && (
            <span className="text-xs mt-[-16px] text-red-500 italic col-span-2">
              {error}
            </span>
          )}
        </div>

        <div className="mt-6">
          {showUpdate || data?.upDateddata?.rent ? (
            <button
              onClick={handleUpdate}
              type="submit"
              className={`h-12 border bg-BlueHomz text-white rounded-md w-full flex justify-center items-center ${
                loading ? "pointer-events-none" : ""
              }`}
            >
              {loading ? <LoadingFormII /> : "Update"}
            </button>
          ) : (
            <button
              onClick={handleCreate}
              type="submit"
              className={`h-12 border border-BlueHomz rounded-md w-full flex justify-center items-center ${
                loading ? "pointer-events-none" : ""
              }`}
            >
              {loading ? <LoadingForm /> : "Save Update"}
            </button>
          )}
        </div>
      </form>

      {confirm && (
        <ConfirmModal
          body="Tenant Information has successfully been updated"
          header="Update Saved"
          button="Okay"
          returnHome={handleConfirmAction}
        />
      )}
    </div>
  );
};

export default RentInfo;
