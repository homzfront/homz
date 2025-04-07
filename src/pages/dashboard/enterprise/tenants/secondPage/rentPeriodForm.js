import React, { useState } from "react";
import ArrowRightBlueLight from "@/components/icons/arrowRightBlueLight";
import PlusBlue from "@/components/icons/plusBlue";
import ArrowLeftBrown from "@/components/icons/arrowLeftBrown";
import Ticked from "@/components/icons/ticked";
import UnTicked from "@/components/icons/unTicked";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";
import DatePicker from "react-datepicker";
import DateIcon from "@/components/icons/date";
import Dropdown from "../../components/dropDownTwo";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import AcAndRejModel from "../../components/acAndRejModel";
import ConfirmModalIII from "../../components/confirmModalII";
import DeleteModel from "../../components/deleteModal";
import Tower from "@/components/icons/tower";
import { v4 as uuidv4 } from 'uuid';
import { cleanObject } from "@/utils/cleanObject";
import { toast } from "react-toastify";
import { addDurationToDate, convertToNigeriaTime } from "@/utils/addDuration";
import { createSpecificTenantRentInfo, updateSpecificTenantRentInfo } from "@/api/tenantSevice";
import { debounce } from "lodash";
import LoadingFormIII from "@/components/mainmenu/loadingFormIII";

export default function RentPeriodForm({ fetchRentInformation, rentInfo, tenantData }) {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmSuccessModal, setShowConfirmSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dontHideForm, setDontHideForm]  = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [formData, setFormData] = useState({
    propertyType: "",
    apartmentNumber: "",
    periods: [
      {
        id: uuidv4(),
        isActive: true,
        duration: "",
        startDate: null,
        dueDate: null,
        rent: "",
        paymentStatus: "",
      },
    ],
  });

  const [openDropDown, setOpenDropDown] = useState({});

  const addNewPeriod = () => {
    setFormData((prevData) => ({
      ...prevData,
      periods: [
        ...prevData.periods,
        {
          id: uuidv4(),
          isActive: false,
          duration: "",
          startDate: null,
          dueDate: null,
          rent: "",
          paymentStatus: "",
        },
      ],
    }));
  };

  const removeNewPeriod = (periodId) => {
    setFormData((prevData) => ({
      ...prevData,
      periods: prevData.periods.filter((period) => period.id !== periodId),
    }));
  };

  const handleInputChange = (index, field, value) => {
    const updatedPeriods = [...formData.periods];
    updatedPeriods[index][field] = value;

    // Calculate dueDate if startDate or duration changes
    if (field === "startDate" || field === "duration") {
      const startDate = updatedPeriods[index].startDate;
      const duration = updatedPeriods[index].duration;

      if (startDate && duration) {
        updatedPeriods[index].dueDate = addDurationToDate(startDate, duration);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      periods: updatedPeriods,
    }));
  };

  const handleToggleClick = (index) => {
    const updatedPeriods = formData.periods.map((period, i) => ({
      ...period,
      isActive: i === index,
    }));
    setFormData((prevData) => ({
      ...prevData,
      periods: updatedPeriods,
    }));
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const removedFormData = {
        ...formData,
        periods: formData?.periods?.filter((period) => period.id !== selectedPeriod.id),
      };

      const cleanFormData = cleanObject(showDeleteModal ? removedFormData : formData);

      const hasActive = cleanFormData.periods.some(period => period.isActive); // Check if any period is active

      // If no period is active, set the first one to active
      if (!hasActive && cleanFormData.periods.length > 0) {
        cleanFormData.periods = cleanFormData.periods.map((period, index) => ({
          ...period,
          isActive: index === 0, // Set the first period to active
        }));
      }

      const activePeriod = cleanFormData.periods.find((data) => data.isActive === true);

      const finalFormData = {
        ...cleanFormData,
        property: tenantData?.data?.estateId?.name,
        duration: activePeriod?.duration,
        startDate: activePeriod?.startDate ? convertToNigeriaTime(activePeriod.startDate) : null, // Move and convert startDate
        dueDate: activePeriod?.dueDate,
        rent: activePeriod?.rent,
        paymentStatus: activePeriod?.paymentStatus?.toLowerCase(),
        periods: cleanFormData.periods.map(({ id, startDate, paymentStatus, ...rest }) => ({
          ...rest,
          startDate: convertToNigeriaTime(startDate),
          paymentStatus: paymentStatus?.toLowerCase(),
        })),
      };

      if (rentInfo?.upDateddata) {
        const id = rentInfo?.upDateddata?._id;
        const { success, upDateddata, error } = await updateSpecificTenantRentInfo(id, finalFormData);
        if (success) {
          setLoading(false);
          setShowSuccessModal(false);
          if (showDeleteModal) {
            setShowConfirmDeleteModal(true);
            setShowDeleteModal(false);
          } else {
            setShowConfirmSuccessModal(true)
          }
        } else {
          toast.error(error?.msg);
          setLoading(false);
          toast.error(error?.error?.message);
        }
      } else {
        const id = tenantData?.data?._id;
        const { success, upDateddata, error } = await createSpecificTenantRentInfo(id, finalFormData);

        if (success) {
          setLoading(false);
          setShowConfirmSuccessModal(true);
          setShowSuccessModal(false);
        } else {
          toast.error(error?.msg);
          setLoading(false);
          toast.error(error?.error?.message);
        }
      }
      fetchRentInformation()
    } catch (error) {
      setLoading(false);
      toast.error("Update failed");
    }
  };

  const options = ["Pending", "Paid", "Over Due"];


  const calculateDueDates = debounce(() => {
    const updatedPeriods = formData?.periods?.map((period) => {
      if (period.startDate && period.duration) {
        return {
          ...period,
          dueDate: addDurationToDate(period.startDate, period.duration),
        };
      }
      return period;
    });

    setFormData((prevData) => ({
      ...prevData,
      periods: updatedPeriods,
    }));
  }, 300);


  React.useEffect(() => {
    calculateDueDates();
    return () => calculateDueDates.cancel();
  }, [formData?.periods?.map((period) => [period.startDate, period.duration])]);


  React.useEffect(() => {
    if (tenantData && formData.propertyName !== tenantData?.data?.estateId?.name) {
      setFormData((prevData) => ({
        ...prevData,
        propertyName: tenantData?.data?.estateId?.name,
      }));
    }
  }, [tenantData?.data?.estateId]);

  React.useEffect(() => {
    if (rentInfo?.upDateddata) {
      const { estateId, propertyType, apartmentNumber, periods } = rentInfo?.upDateddata;

      setFormData({
        propertyName: estateId?.name || '',
        propertyType: propertyType || '',
        apartmentNumber: apartmentNumber?.toString() || '',
        periods: periods?.map((period) => ({
          id: uuidv4(),
          isActive: period.isActive || false,
          duration: period.duration?.toString() || '',
          startDate: convertToNigeriaTime(period.startDate),
          dueDate: convertToNigeriaTime(period.dueDate),
          rent: period.rent?.toString() || '',
          paymentStatus: period.paymentStatus || '',
        })),
      });
    }
  }, [rentInfo]);

  const toggleDropDown = (index) => {
    setOpenDropDown((prevOpenDropDowns) => ({
      ...prevOpenDropDowns,
      [index]: !prevOpenDropDowns[index],
    }));
  };

  return (
    <div className="mt-4 pt-4 border-t border-[#E6E6E6]">
      <CustomizedModal
        isOpen={showConfirmSuccessModal}
        onRequestClose={() => setShowConfirmSuccessModal(false)}
      >
        <ConfirmModalIII
          header={`Rental Property Information ${rentInfo?.upDateddata ? "Updated" : "Added"} Successfully`}
          button={"Close"}
          returnHome={() => {
            setShowConfirmSuccessModal(false);
            if (!dontHideForm) {
              setShowForm(false);
            }
          }}
        />
      </CustomizedModal>

      <CustomizedModal
        isOpen={showConfirmDeleteModal}
        onRequestClose={() => setShowConfirmDeleteModal(false)}
      >
        <ConfirmModalIII
          header={`Period ${selectedPeriod?.index} deleted successfully`}
          button={"Close"}
          returnHome={() => {
            setShowConfirmDeleteModal(false);
            setShowForm(false);
          }}
        />
      </CustomizedModal>

      <CustomizedModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <DeleteModel
          header={"Delete Rental Period?"}
          body={`You’re about to delete Period ${selectedPeriod?.index}`}
          button={"Proceed "}
          buttonTwo={"Cancel"}
          loading={loading}
          returnHome={() => {
            if (rentInfo?.upDateddata) {
              onSubmit()
            } else {
              removeNewPeriod(selectedPeriod.id)
            }
          }}
          returnHomeTwo={() => setShowDeleteModal(false)}
        />
      </CustomizedModal>

      {!showForm && (
        <div>
          <h2 className="text-BlackHomz font-medium text-base">Rent Property Information</h2>
          <p className="mt-1 text-GrayHomz font-normal text-sm">
            Manage rental properties, rental periods and track payment history.
          </p>
          {rentInfo?.upDateddata && (
            <div
              onClick={() => setShowForm(true)}
              className="mt-4 p-4 bg-[#FCFCFC] rounded-[8px] flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 flex justify-center items-center h-[44px] w-[44px] rounded-full bg-BlueHomz">
                  <Tower />
                </div>
                <div className="text-GrayHomz font-medium flex flex-col gap-1 ml-1">
                  <p className="text-sm">{rentInfo?.upDateddata?.propertyType}</p>
                  <p className="text-[11px]">{rentInfo?.upDateddata?.estateId?.name}</p>
                </div>
              </div>
              <ArrowRightBlueLight className="#4E4E4E" />
            </div>
          )}
          <div
            onClick={() => {
              setShowForm(true)
              addNewPeriod()
            }}
            className="mt-4 p-4 bg-whiteblue rounded-[8px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <PlusBlue />
              <span className="font-medium text-BlueHomz text-sm">Add new property information</span>
            </div>
            <ArrowRightBlueLight />
          </div>
        </div>
      )}
      {showForm && (
        <div>
          <div onClick={() => setShowForm(false)} className="flex gap-2 items-center cursor-pointer">
            <ArrowLeftBrown /> Back
          </div>
          <div className="max-w-3xl mx-auto mt-2">
            <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
              <h2 className="text-sm font-normal text-GrayHomz mb-4">Rent Property Information</h2>
              <div>
                <label className="block text-sm font-medium">
                  Property Name <span className="text-error">*</span>
                </label>
                <input
                  value={tenantData?.data?.estateId?.name}
                  disabled={true}
                  className="mt-0.5 w-full h-[45px] px-3 border border-[#A9A9A9] rounded-[4px] outline-none"
                  placeholder="Auto filled"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium">
                    Property Type <span className="text-error">*</span>
                  </label>
                  <input
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none"
                    placeholder="e.g 2-Bedroom Apartment"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Apartment No<span className="text-error">*</span>
                  </label>
                  <input
                    value={formData.apartmentNumber}
                    onChange={(e) => setFormData({ ...formData, apartmentNumber: e.target.value })}
                    className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none"
                    placeholder="e.g Apartment 1"
                  />
                </div>
              </div>
            </div>
            {formData?.periods?.map((period, index) => {
              const isActive = period.isActive;
              const duration = period.duration;

              return (
                <div key={period.id} className="mt-4">
                  <h3 className="text-sm text-GrayHomz font-medium">Rent Period {index + 1}</h3>
                  <div className="mt-4 p-4 bg-whiteblue rounded-[8px] flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-BlueHomz text-sm font-medium">Period {index + 1}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div onClick={() => {
                          handleToggleClick(index)
                          const addIndex = {
                            ...period,
                            index: index + 1
                          }
                          setSelectedPeriod(addIndex)
                        }} className="cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => {
                              handleToggleClick(index)
                              const addIndex = {
                                ...period,
                                index: index + 1
                              }
                              setSelectedPeriod(addIndex)
                            }}
                            className="hidden"
                          />
                          {isActive ? <Ticked /> : <UnTicked />}
                        </div>
                        <label className="cursor-pointer">Set as current rent period</label>
                      </div>
                    </div>
                    <div onClick={() => {
                      toggleDropDown(index)
                      const addIndex = {
                        ...period,
                        index: index + 1
                      }
                      setSelectedPeriod(addIndex)
                    }} className="cursor-pointer">
                      {openDropDown[index] ? <ArrowUpII className="#006AFF" /> : <ArrowDown className="#006AFF" />}
                    </div>
                  </div>
                  {openDropDown[index] && <div className="p-4 bg-[#FCFCFC] mt-4 rounded-[8px]">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="relative w-full md:w-[50%]">
                        <div className="text-[14px] font-[500] text-BlackHomz">
                          <label className="">
                            Rent Duration <span className="text-error">{"*"}</span>{" "}
                          </label>
                        </div>
                        <input
                          className={`mt-0.5 px-3 outline-none border border-[#a9a9a9] rounded-md h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
                          type={'number'}
                          placeholder="e.g 18"
                          value={duration}
                          onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                        />
                        <div className="absolute top-[17px] right-[5px]">
                          <input
                            className={`bg-white ${duration ? "text-BlackHomz" : "text-GrayHomz2"} px-4 mt-2 w-[100px] flex justify-center items-center h-[38px] placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
                            type='text'
                            placeholder="months"
                            value="months"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-[50%] grid grid-cols-2 gap-4">
                        <div className="w-full">
                          <label className="text-sm font-medium">Start Date <span className="text-error">*</span></label>
                          <div className="relative w-full border border-[#a9a9a9] rounded-md h-[45px]">
                            <DatePicker
                              selected={period.startDate}
                              onChange={(date) => handleInputChange(index, "startDate", date)}
                              dateFormat="d MMMM, yyyy"
                              placeholderText="Select Date"
                              className="w-[100%] h-[41px] px-4 py-2"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <DateIcon />
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="text-sm font-medium">Due Date <span className="text-error">*</span></label>
                          <div className="relative w-full border border-[#a9a9a9] rounded-md h-[45px]">
                            <DatePicker
                              selected={period.dueDate}
                              disabled={true}
                              dateFormat="d MMMM, yyyy"
                              placeholderText="Select Date"
                              className="w-[100%] h-[41px] px-4 py-2"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <DateIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-[50%]">
                        <label className="block text-sm font-medium">Rent Amount <span className="text-error">*</span></label>
                        <input
                          value={period.rent}
                          onChange={(e) => handleInputChange(index, "rent", e.target.value)}
                          className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none"
                          placeholder="e.g ₦1,000,000"
                        />
                      </div>

                      <div className="w-full md:w-[50%]">
                        <label className="block text-sm font-medium">Payment Status <span className="text-error">*</span></label>
                        <div className="w-full mt-0.5">
                          <Dropdown
                            options={options}
                            selectOption="Select an option"
                            onSelect={(selectedOption) => handleInputChange(index, "paymentStatus", selectedOption)}
                            value={period.paymentStatus}
                            border={"border-[#a9a9a9]"}
                            className={"w-full bg-white"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6 text-sm font-normal">
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => {
                            onSubmit()
                            const addIndex = {
                              ...period,
                              index: index + 1
                            }
                            setSelectedPeriod(addIndex)
                            setDontHideForm(true)
                          }}
                          className={`min-w-[68px] border border-BlueHomz text-BlueHomz hover:bg-whiteblue py-2 px-4 rounded-[4px] flex justify-center items-center ${loading ? "pointer-events-none" : ""}`}>
                          {loading && selectedPeriod?.index === index + 1 ? <LoadingFormIII /> : "Save"}
                        </button>
                        <button
                          onClick={() => toggleDropDown(index)}
                          className={`hover:text-white hover:bg-[#4bb2e5] text-BlueHomz rounded-[4px] px-4 py-2`}>
                          Cancel
                        </button>
                      </div>
                      <button
                        disable={() => {
                          (formData?.periods?.length === 1 && index === 0) ? true : false
                        }}
                        onClick={() => {
                          const addIndex = {
                            ...period,
                            index: index + 1
                          }
                          setSelectedPeriod(addIndex)
                          setShowDeleteModal(true)
                        }}
                        type="button" className={`text-[#D92D20] ${(formData?.periods?.length === 1 && index === 0) ? "pointer-events-none" : ""}`}>Delete period</button>
                    </div>
                  </div>
                  }
                </div>
              );
            })}
            <div>
              <CustomizedModal
                isOpen={showSuccessModal}
                onRequestClose={() => setShowSuccessModal(false)}
              >
                <AcAndRejModel
                  header={"Add Rental Property Information?"}
                  body={`You are about to add a new rental property for ${tenantData?.data?.fullName}`}
                  button={"Proceed"}
                  buttonTwo={"Cancel"}
                  returnHome={() => {
                    onSubmit()
                  }}
                  loading={loading}
                  returnHomeTwo={() => setShowSuccessModal(false)}
                />
              </CustomizedModal>
              <div
                onClick={addNewPeriod}
                className="mt-4 p-4 bg-whiteblue rounded-[8px] flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <PlusBlue />
                  <span className="font-medium text-BlueHomz text-sm">Add new rent period</span>
                </div>
                <div />
              </div>
              <div className="flex w-full gap-2 mt-6 mb-10 text-sm font-normal">
                <div className="hidden md:block w-[45%]" />
                <div className="w-full md:w-[55%] flex flex-col-reverse md:flex-row gap-2 items-center">
                  <button
                    onClick={() => {
                      setShowForm(false)
                    }}
                    className={`w-full md:w-auto hover:text-white hover:bg-[#4bb2e5] text-BlueHomz rounded-[4px] px-4 py-2`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(true)
                      setDontHideForm(false)
                    }}
                    className="rounded-[4px] px-4 py-2 text-white bg-BlueHomz w-full md:w-auto hover:border hover:border-BlueHomz hover:bg-transparent hover:text-BlueHomz"
                  >
                    Save Rent Property Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}