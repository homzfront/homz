"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropDownTwo";
import AcAndRejModalII from "../rentSavings/components/modals/acAndRejModalII";
import ReceiptModal from "./receiptModal";
import Receipt from "./receipt";
import { payRent, ReceiptTenant } from "@/api/tenantSevice";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changePresentDateFormat from "@/utils/changePresentDateFormat";
import FailedModal from "../../components/failedModal";
import Eye from "@/components/icons/Eye";
import BashedEye from "@/components/icons/BashedEye";
import ConfirmModal from "../../components/confirmModal";

const RentInformation = ({ closeRentPay, rentData, fetchDataAgain }) => {
  const [proceed, setProceed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [shareAble, setShareAble] = useState(false);
  const [selecetedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [id, setId] = useState(null);
  const [showPending, setShowPending] = useState(false);

  const Visible = () => {
    setVisible(!visible);
  };

  const handleOptionSelect = (option) => {
    setSelectedYear(parseInt(option?.label));
    setError(null);
  };

  const RentValue = selecetedYear * rentData?.data?.rent;
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ReceiptTenant(id);
        setReceiptData(data?.upDateddata?.data?.data);
      } catch { }
    };
    fetchData();
  }, [confirm]);

  useEffect(() => {
    if (rentData?.data?.duration) {
      setSelectedYear(rentData.data.duration);
    }
  }, [rentData]);

  const proceeding = () => {
    if (pincode.length === 4) {
      if (selecetedYear === null) {
        setError("Select rent duration.");
        return;
      }
      setProceed(!proceed);
    } else {
      setError("Pincode should be 4 digits");
    }
  };

  const closeProceeding = () => {
    setProceed(false);
  };

  const openConfirm = async () => {
    setLoading(true);
    try {
      const { success, upDateddata, error } = await payRent(pincode, selecetedYear);
      setId(upDateddata?._id)
      if (success) {
        setLoading(false);
        fetchDataAgain();
        setConfirm(!confirm);
      } else {
        setLoading(false);
        setProceed(false);
        if (
          error?.response?.data?.error?.errors &&
          error.response.data.error.errors.length > 0
        ) {
          const errorMessage = error.response.data.error.errors[0];
          setError(`${errorMessage}`);
        } else if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          setError(`${errorMessage}`);
          setFailed(true);
        } else if (error?.response?.data?.error) {
          const errorMessage = error.response.data.error;
          setError(`${errorMessage}`);
          setFailed(true);
        } else {
          setError("Update failed");
        }
      }
    } catch (error) {
      setLoading(false);
      setProceed(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        setError(`${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setError(`${errorMessage}`);
        setFailed(true);
      } else {
        setError("Update failed");
      }
    }
  };

  const closeConfirm = () => {
    setConfirm(false);
    setReceipt(false);
    setConfirm(false);
    setProceed(false);
    closeRentPay();
  };

  const showReceipt = () => {
    if (!receiptData) {
      return;
    }
    if (receiptData?.status === 'pending') {
      setShowPending(!showPending);
    } else {
      setReceipt(!receipt);
    }
  };
  
  const closeReceipt = () => {
    setReceipt(false);
    setConfirm(false);
    setProceed(false);
    closeRentPay();
    setFailed(false);
  };

  const close = () => {
    setFailed(false);
    setProceed(false);
  };

  const options = [
    { id: 1, label: "1 year" },
    { id: 2, label: "2 years" },
    { id: 3, label: "3 years" },
    { id: 4, label: "4 years" },
    { id: 5, label: "5 years" },
  ];

  return (
    <div className="">
      {receipt ? (
        <Receipt closeReceipt={closeReceipt} rentData={rentData} receiptData={receiptData} />
      ) : confirm ? (
        <ReceiptModal
          header={"Transaction Complete"}
          body={"Your rent payment was successful"}
          button={"View Receipt"}
          buttonTwo={"Close"}
          returnHomeTwo={closeConfirm}
          returnHome={showReceipt}
        />
      ) :
        failed ? (
          <FailedModal
            header={"Unsuccessful"}
            body={
              error === "Invalid Wallet pin" ? error : error === "Insufficient balance" ? "Your wallet balance is not sufficient for this transaction" : error
            }
            button={"Close"}
            returnHome={close}
          />
        ) :
          showPending ?
            <ConfirmModal
              header={"Processing receipt"}
              button={"Close"}
              returnHome={() => setShowPending(false)}
            />
            : proceed ? (
              <div>
                <AcAndRejModalII
                  returnHomeTwo={closeProceeding}
                  returnHome={openConfirm}
                  header={"Proceed To Pay Rent?"}
                  body={`${addCommasToNumber(RentValue)} will be deducted from your wallet balance`}
                  button={"Yes"}
                  buttonTwo={"Cancel"}
                  loading={loading}
                />
              </div>
            ) : (
              <div className="h-auto w-full md:w-[530px] bg-white rounded-lg p-8">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-1 w-[80%]">
                      <p className="text-BlackHomz text-[14px] font-[500]">
                        Rent Information
                      </p>
                      <p className="text-GrayHomz text-[13px] font-[400] w-full">
                        Confirm your rent info is accurate before making payment
                      </p>
                    </div>
                    <div onClick={closeRentPay} className="cursor-pointer flex w-[20%] justify-end">
                      <Image
                        src={"/static/dashboard/enterprisemanager/payment/close-square.png"}
                        alt=""
                        height={24}
                        width={24}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-BlueHomz text-[14px] font-[500]">
                      Transaction Receipt
                    </p>
                  </div>
                  <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-2">
                    <div className="w-full flex gap-4">
                      <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                        Property Manager
                      </p>
                      <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                        {rentData?.data?.enterPrise?.fullName}
                      </p>
                    </div>
                    <div className="w-full flex gap-4">
                      <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                        Property Type
                      </p>
                      <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                        {rentData?.data?.propertyType}
                      </p>
                    </div>
                    <div className="w-full flex gap-4">
                      <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                        Property
                      </p>
                      <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                        {rentData?.data?.estateId?.name}
                      </p>
                    </div>
                    <div className="w-full flex gap-4">
                      <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                        Apartment Number
                      </p>
                      <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                        {rentData?.data?.apartmentNumber}
                      </p>
                    </div>
                    <div className="w-full flex gap-4">
                      <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                        Rent
                      </p>
                      <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                        {addCommasToNumber(rentData?.data?.rent)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 my-6">
                  <div className="w-full flex items-end md:items-center gap-4">
                    <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                      Rent Duration
                    </p>
                    <div className="ml-[-7px]">
                      <p className="text-GrayHomz text-[11px] font-[400]">
                        Select the duration you’re paying for
                      </p>
                      <Dropdown
                        options={options}
                        onSelect={handleOptionSelect}
                        selectOption={selecetedYear ? options.find(option => option.id === selecetedYear)?.label : 'select rent duration'}
                        selectedValue={selecetedYear ? options.find(option => option.id === selecetedYear)?.label : ''}
                        className={"w-full mt-2"}
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-4">
                    <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                      Total Rent
                    </p>
                    <p className="text-GrayHomz text-[14px] font-[500] w-[60%]">
                      {addCommasToNumber(RentValue)}
                    </p>
                  </div>
                  <div className="w-full flex gap-4">
                    <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                      Payment Date
                    </p>
                    <p className="text-GrayHomz text-[14px] font-[500] w-[60%]">
                      {changePresentDateFormat(today)}
                    </p>
                  </div>
                  <div className="relative flex flex-col gap-2 items-start">
                    <div className='flex flex-col items-start'>
                      <label className={`text-[13px] font-[500] text-GrayHomz`}>
                        Transaction Pin
                      </label>
                    </div>
                    <input
                      className={`w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]`}
                      type={visible ? "text" : "password"}
                      placeholder="Enter transaction pin"
                      value={pincode}
                      onChange={(e) => {
                        setError('');
                        setPincode(e.target.value);
                      }}
                    />
                    <div className="absolute top-[40px] right-4" onClick={Visible}>
                      {visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <BashedEye className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  {error && <span className="text-[10px] italic text-red-500">
                    {error}
                  </span>}
                </div>
                {pincode !== "" ? <button
                  onClick={proceeding}
                  className="w-full h-[48px] bg-BlueHomz rounded-md text-white text-[16px] font-[700]"
                >
                  {addCommasToNumber(RentValue)}
                </button> : <button
                  className="pointer-events-none w-full h-[48px] bg-GrayHomz5 rounded-md text-GrayHomz6 text-[16px] font-[700]"
                >
                  Pay Rent
                </button>}
              </div>
            )}
    </div>
  );
};

export default RentInformation;
