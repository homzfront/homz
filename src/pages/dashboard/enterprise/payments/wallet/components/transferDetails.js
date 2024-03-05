"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/input";
import Dropdown from "../../components/dropDown";
import AcAndRejModel from "../../../components/acAndRejModel";
import ReceiptModal from "../../components/receiptModal";
import Receipt from "../../components/receipt";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ShareAbleReceipt from "../../components/shareAbleReceipt";
import useBodyScroll from "@/utils/useBodyScroll";
import { enterpriseMePropertyOwner, sendMoneyEnterpriseToOwner } from "@/api/enterpriseManagerService";
import Loading from "@/components/mainmenu/loading";
import addCommasToNumber from "@/utils/addCommasToNumber";
import { toast } from "react-toastify";
import Eye from "@/components/icons/Eye";
import BashedEye from "@/components/icons/BashedEye";

const TransferDetails = ({
  illuminateWallet,
  setIlluminateWallet,
  fetchDataAgain,
}) => {
  console.log(illuminateWallet);
  const [pincode, setPincode] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transfer, setTransfer] = useState([]);
  const [transferToggleModal, setTransferToggleModal] = useState(false);
  const [successfulTansferModal, setSuccessfulTansferModal] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [shareAbleReceipt, setShareAbleReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [landlords, setLandlords] = useState([]);
  const [selectedLandlord, setSelectedLandlord] = useState(null)
  const [error, setError] = useState('')


  const Visible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await enterpriseMePropertyOwner();
        console.log(data);
        setLandlords(data?.data);
      } catch { }
    };
    fetchData();
  }, []);

  console.log(landlords);
  console.log(selectedLandlord);

  // useEffect to handle scrolling
  useBodyScroll([receipt, successfulTansferModal, transferToggleModal]);

  const showTransferConfirmation = () => {
    setTransferToggleModal(!transferToggleModal);
  };
  const cancelTranser = () => {
    setTransferToggleModal(false);
    setSuccessfulTansferModal(false);
  };

  const handleSelect = (option) => {
    setSelectedLandlord(option);
  };
  const showReceipt = () => {
    setReceipt(!receipt);
    setSuccessfulTansferModal(false);
  };

  const closeReceipt = () => {
    setReceipt(false);
  };
  const options = landlords


  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    // You can now access the form data here
    const formData = {
      pincode,
      recipientName: selectedLandlord?.fullName,
      amount,
      description,
      id: selectedLandlord?._id
    };
    try {
      console.log("Form Data:", formData);
      const { success, upDateddata, error } = await sendMoneyEnterpriseToOwner(
        formData
      );

      if (success) {
        setLoading(false);
        console.log("Form successfully updated", upDateddata);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "MoneyTransfer Response",
            JSON.stringify(upDateddata, formData)
          );
        }
        setTransfer(formData);
        setDescription("");
        setPincode("")
        setAmount("");
        setTransferToggleModal(false);
        setSelectedLandlord(null);
        setSuccessfulTansferModal(!successfulTansferModal);
        toast.success("transfer successful");
      } else {
        toast.error("Internal server error, transfer failed", error);
        setLoading(false);
        setTransferToggleModal(false)
        console.log(error)
        setError(error?.message || error?.error)
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      toast.error("Internal server error, transfer failed");
      setTransferToggleModal(false)

    }
  };

  const receiptRef = useRef(null);

  console.log(transfer);

  const openShareAbleReceipt = () => {
    setShareAbleReceipt((prevShareAbleReceipt) => {
      // Toggle shareAbleReceipt
      const newShareAbleReceipt = !prevShareAbleReceipt;

      // Set Receipt to false
      setReceipt(false);

      // Return the new value for shareAbleReceipt
      return newShareAbleReceipt;
    });
  };

  const closeShareAbleReceipt = () => {
    setShareAbleReceipt(false);
  };


  console.log(amount);
  console.log(description);
  console.log(selectedLandlord);

  return (
    <div>
      <div>
        {shareAbleReceipt && (
          <ShareAbleReceipt closeShareAbleReceipt={closeShareAbleReceipt} />
        )}
        {receipt && (
          <div>
            <Receipt
              closeReceipt={closeReceipt}
              openShareAbleReceipt={openShareAbleReceipt}
              transfer={transfer}
              setIlluminateWallet={setIlluminateWallet}
              fetchDataAgain={fetchDataAgain}
            />
          </div>
        )}
      </div>
      <div>
        {successfulTansferModal && (
          <div>
            <ReceiptModal
              body={`You have successfully sent ${addCommasToNumber(
                transfer?.amount
              )} to ${transfer?.recipientName}.`}
              header={"Transaction Complete"}
              button={"View Reciept"}
              buttonTwo={"Close"}
              returnHomeTwo={cancelTranser}
              returnHome={showReceipt}
            />
          </div>
        )}
      </div>
      <div>
        {transferToggleModal && (
          <div>
            {loading && <Loading />}
            <AcAndRejModel
              header={"Confirm Transaction"}
              body={`You’re sending ${addCommasToNumber(
                amount
              )} to ${selectedLandlord?.fullName}`}
              button={"Yes, Send"}
              buttonTwo={"Cancel Transaction"}
              returnHome={handleSend}
              returnHomeTwo={cancelTranser}
            />
          </div>
        )}
      </div>

      <div className="p-5 border rounded-[12px] h-auto w-[100%] mt-6 flex flex-col gap-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {illuminateWallet ? (
              <Image
                src={"/static/dashboard/enterprisemanager/payment/send-2.png"}
                width={20}
                height={21}
                alt=""
              />
            ) : (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/payment/send-2-Gray.png"
                }
                width={20}
                height={21}
                alt=""
              />
            )}
            <p
              className={`text-[14px] font-[500] ${illuminateWallet ? "text-BlueHomz" : "text-GrayHomz6"
                }`}
            >
              Transfer Money To Landlord
            </p>
          </div>

        </div>
        <div
          className={`flex flex-col gap-4 justify-between ${illuminateWallet ? "" : "pointer-events-none"
            }`}
        >
          <div className="w-full">
            <div
              className={`pb-2 text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                } `}
            >
              Select Landlord
            </div>
            <Dropdown
              options={options}
              onSelect={handleSelect}
              illuminateWallet={illuminateWallet}
              selectOption={
                selectedLandlord ? selectedLandlord?.fullName : "Select landlord you’re transferring to"
              }
              className={`w-[500px] ${illuminateWallet ? "" : "pointer-events-none"
                }   `}
            />
          </div>

          <div>
            <label
              className={`text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                }`}
            >
              Amount (N)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setError('')
                setAmount(e.target.value)
              }}
              placeholder="200,000"
              className={` mt-2 rounded-md  border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>
          <div>
            <label
              className={`text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                }`}
            >
              Description
            </label>
            <input
              value={description}
              onChange={(e) => {
                setError('')
                setDescription(e.target.value)
              }}
              type="text"
              placeholder="2023 Rent Payments"
              className={`mt-2 rounded-md  border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>

          <div className="relative flex flex-col gap-2 items-start">
            <div className='flex flex-col items-start'>
              <label
                className={`text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                  }`}
              >
                Transaction Pin
              </label>
            </div>
            <input
              className={`w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]`}
              type={visible ? "text" : "password"}
              placeholder="Enter transaction pin"
              value={pincode}
              onChange={(e) => {
                setError('')
                setPincode(e.target.value)
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
          {
            error && <span className="text-[10px] italic text-red-500">
              {error}
            </span>
          }

          {illuminateWallet ? (
            <button
              onClick={showTransferConfirmation}
              className={`w-full h-[37px]  ${selectedLandlord !== null &&
                pincode !== "" &&
                amount !== "" &&
                description !== ""
                ? "bg-BlueHomz text-white"
                : "bg-GrayHomz6 text-GrayHomz5 pointer-events-none"
                }  p-[5px] rounded-md text-center`}
            >
              Transfer
            </button>
          ) : (
            <button
              className={`w-full pointer-events-none h-[37px] bg-GrayHomz6 text-GrayHomz5  p-[5px] rounded-md text-center`}
            >
              Transfer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferDetails;
