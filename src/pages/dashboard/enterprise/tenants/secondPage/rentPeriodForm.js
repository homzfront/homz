import React, { useState } from "react";
import ArrowRightBlueLight from "@/components/icons/arrowRightBlueLight";
import PlusBlue from "@/components/icons/plusBlue";
import { useForm, Controller } from "react-hook-form";
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

export default function RentPeriodForm() {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmSuccessModal, setShowConfirmSuccessModal] = useState(false);
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      rentPeriods: [
        {
          currentPeriod: false,
          rentDuration: "",
          startDate: null,
          dueDate: null,
          rentAmount: "",
          paymentStatus: "",
        },
      ],
    },
  });

  const [periods, setPeriods] = useState([{ id: uuidv4() }]);
  const [openDropDown, setOpenDropDown] = useState({});

  const addNewPeriod = () => {
    setPeriods([...periods, { id: uuidv4() }]);
  };
  
  const removeNewPeriod = (period) => {
    setPeriods((prevPeriods) => prevPeriods.filter((per) => per.id !== period.id));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const options = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Paid" },
    { id: 3, label: "Over Due" },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-[#E6E6E6]">
      <CustomizedModal
        isOpen={showConfirmSuccessModal}
        onRequestClose={() => setShowConfirmSuccessModal(false)}
      >
        <ConfirmModalIII
          header={"Rental Property Information Added Successfully"}
          button={"Close"}
          returnHome={() => {
            setShowConfirmSuccessModal(false);
            setShowData(true);
            setShowForm(false);
          }}
        />
      </CustomizedModal>

      <CustomizedModal
        isOpen={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <AcAndRejModel
          header={"Add Rental Property Information?"}
          body={"You are about to add a new rental property for [Tenant Name]"}
          button={"Proceed"}
          buttonTwo={"Cancel"}
          returnHome={() => {
            setShowConfirmSuccessModal(true);
            setShowSuccessModal(false);
          }}
          returnHomeTwo={() => setShowSuccessModal(false)}
        />
      </CustomizedModal>

      <CustomizedModal
        isOpen={showConfirmDeleteModal}
        onRequestClose={() => setShowConfirmDeleteModal(false)}
      >
        <ConfirmModalIII
          header={"[Period 1] deleted successfully"}
          button={"Close"}
          returnHome={() => {
            setShowConfirmDeleteModal(false);
            setShowForm(false);
            setShowData(false);
          }}
        />
      </CustomizedModal>

      <CustomizedModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <DeleteModel
          header={"Delete Rental Period?"}
          body={"You’re about to delete [Period 1]"}
          button={"Proceed "}
          buttonTwo={"Cancel"}
          returnHome={() => {
            setShowConfirmDeleteModal(true);
            setShowDeleteModal(false);
          }}
          returnHomeTwo={() => setShowDeleteModal(false)}
        />
      </CustomizedModal>

      {!showForm ? (
        <div>
          <h2 className="text-BlackHomz font-medium text-base">Rent Property Information</h2>
          <p className="mt-1 text-GrayHomz font-normal text-sm">
            Manage rental properties, rental periods and track payment history.
          </p>
          {showData && (
            <div
              onClick={() => setShowForm(true)}
              className="mt-4 p-4 bg-[#FCFCFC] rounded-[8px] flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 flex justify-center items-center h-[44px] w-[44px] rounded-full bg-BlueHomz">
                  <Tower />
                </div>
                <div className="text-GrayHomz font-medium flex flex-col gap-1 ml-1">
                  <p className="text-sm">[2-Bedroom Bungalow]</p>
                  <p className="text-[11px]">[View Gold Property]</p>
                </div>
              </div>
              <ArrowRightBlueLight className="#4E4E4E" />
            </div>
          )}
          <div
            onClick={() => setShowForm(true)}
            className="mt-4 p-4 bg-whiteblue rounded-[8px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <PlusBlue />
              <span className="font-medium text-BlueHomz text-sm">Add new property information</span>
            </div>
            <ArrowRightBlueLight />
          </div>
        </div>
      ) : (
        <div>
          <div onClick={() => setShowForm(false)} className="flex gap-2 items-center cursor-pointer">
            <ArrowLeftBrown /> Back
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto mt-2">
            <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
              <h2 className="text-sm font-normal text-GrayHomz mb-4">Rent Property Information</h2>
              <div>
                <label className="block text-sm font-medium">
                  Property Name <span className="text-error">*</span>
                </label>
                <input
                  {...register("propertyName")}
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
                    {...register("propertyName")}
                    className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none"
                    placeholder="e.g 2-Bedroom Apartment"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Apartment No<span className="text-error">*</span>
                  </label>
                  <input
                    {...register("apartmentNo")}
                    className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none"
                    placeholder="e.g Apartment 1"
                  />
                </div>
              </div>
            </div>
            {periods.map((period, index) => {
              const currentPeriod = watch(`rentPeriods[${index}].currentPeriod`);
              const duration = watch(`rentPeriods[${index}].rentDuration`)
              const handleToggleClick = () => {
                setValue(`rentPeriods[${index}].currentPeriod`, !currentPeriod);
              };
              return (
                <div key={period.id} className="mt-4">
                  <h3 className="text-sm text-GrayHomz font-medium">Rent Period {index + 1}</h3>
                  <div className="mt-4 p-4 bg-whiteblue rounded-[8px] flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-BlueHomz text-sm font-medium">Period {index + 1}</p>
                      <div
                        className="flex items-center gap-2 mt-2">
                        <div onClick={handleToggleClick} className="cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('currentPeriod', { valueAsBoolean: true })}
                            className="hidden"
                          />
                          {currentPeriod ? <Ticked /> : <UnTicked />}
                        </div>
                        <label className="cursor-pointer">Set as current rent period</label>
                      </div>
                    </div>
                    <div onClick={() => setOpenDropDown(!openDropDown)} className="cursor-pointer">
                      {openDropDown ?
                        <ArrowUpII className="#006AFF" /> :
                        <ArrowDown className="#006AFF" />
                      }
                    </div>
                  </div>
                  <div className="p-4 bg-[#FCFCFC] mt-4 rounded-[8px]">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="relative w-full md:w-[50%]">
                        <div className="text-[14px] font-[500] text-BlackHomz">
                          <label className="">
                            Rent Duration <span className="text-error">{"*"}</span>{" "}
                          </label>
                        </div>
                        <input
                          className={`mt-0.5 px-3 border border-[#a9a9a9] rounded-md h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]`}
                          type={'number'}
                          placeholder="e.g 18"
                          {...register(`rentPeriods[${index}].rentDuration`)}
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
                            <Controller
                              name={`rentPeriods[${index}].startDate`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                  dateFormat="d MMMM, yyyy"
                                  placeholderText="Select Date"
                                  className="w-[100%] h-[41px] px-4 py-2"
                                />
                              )}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <DateIcon />
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="text-sm font-medium">Due Date <span className="text-error">*</span></label>
                          <div className="relative w-full border border-[#a9a9a9] rounded-md h-[45px]">
                            <Controller
                              name={`rentPeriods[${index}].dueDate`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                  dateFormat="d MMMM, yyyy"
                                  placeholderText="Select Date"
                                  className="w-[100%] h-[41px] px-4 py-2"
                                />
                              )}
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
                        <input {...register(`rentPeriods[${index}].rentAmount`)} className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none" placeholder="e.g ₦1,000,000" />
                      </div>

                      <div className="w-full md:w-[50%]">
                        <label className="block text-sm font-medium">Payment Status <span className="text-error">*</span></label>
                        <div className="w-full mt-0.5">
                          <Controller
                            name={`rentPeriods[${index}].paymentStatus`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Dropdown
                                options={options}
                                selectOption="Select an option"
                                onSelect={(selectedOption) => field.onChange(selectedOption)}
                                value={field.value}
                                border={"border-[#a9a9a9]"}
                                className={"w-full bg-white"}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6 text-sm font-normal">
                      <div className='flex items-center gap-2'>
                        <button className={`border border-BlueHomz text-BlueHomz hover:bg-whiteblue py-2 px-4 rounded-[4px]`}>
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteModal(true)
                          }}
                          className={`hover:text-white hover:bg-[#4bb2e5] text-BlueHomz rounded-[4px] px-4 py-2`}>
                          Cancel
                        </button>
                      </div>
                      <button onClick={() => {
                        removeNewPeriod(period)
                      }} type="button" className="text-[#D92D20]">Delete period</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
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
            <div className="hidden md:block w-[50%]" />
            <div className="w-full md:w-[50%] flex flex-col-reverse md:flex-row gap-2 items-center">
              <button
                className={`w-full md:w-auto hover:text-white hover:bg-[#4bb2e5] text-BlueHomz rounded-[4px] px-4 py-2`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSuccessModal(true)}
                className="rounded-[4px] px-4 py-2 text-white bg-BlueHomz w-full md:w-auto hover:border hover:border-BlueHomz hover:bg-transparent hover:text-BlueHomz"
              >
                Save Rent Property Information
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}