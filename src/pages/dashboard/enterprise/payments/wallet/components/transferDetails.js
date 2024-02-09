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
import { sendMoneyEnterpriseToOwner } from "@/api/enterpriseManagerService";
import Loading from "@/components/mainmenu/loading";
import addCommasToNumber from "@/utils/addCommasToNumber";
import { toast } from "react-toastify";

const TransferDetails = ({
  illuminateWallet,
  setIlluminateWallet,
  fetchDataAgain,
}) => {
  console.log(illuminateWallet);
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [transfer, setTransfer] = useState([]);
  const [transferToggleModal, setTransferToggleModal] = useState(false);
  const [successfulTansferModal, setSuccessfulTansferModal] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [shareAbleReceipt, setShareAbleReceipt] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setSelectedBank(option.label);
  };
  const showReceipt = () => {
    setReceipt(!receipt);
    setSuccessfulTansferModal(false);
  };

  const closeReceipt = () => {
    setReceipt(false);
  };
  const options = [{ id: 1, label: "Moniepoint Microfinance Bank" }];
  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    // You can now access the form data here
    const formData = {
      destinationAccountNumber: accountNumber,
      recipientName,
      amount,
      description,
      // selectedBank,
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
        setAccountNumber("");
        setRecipientName("");
        setAmount("");
        setTransferToggleModal(false);
        setSelectedBank(null);
        setSuccessfulTansferModal(!successfulTansferModal);
        toast.success("transfer successful");
      } else {
        toast.error("Internal server error, transfer failed");
        setLoading(false);
        setTransferToggleModal(false)
        // setFailed(true);
      }
    } catch (error) {
      // console.error("Update error", error);
      setLoading(false);
      toast.error("Internal server error, transfer failed");
      setTransferToggleModal(false)
      // setFailed(true);
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

  console.log(accountNumber);
  console.log(amount);
  console.log(description);
  console.log(recipientName);
  console.log(selectedBank);

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
              )} to ${recipientName}`}
              button={"Yes, Send"}
              buttonTwo={"Cancel Transaction"}
              returnHome={handleSend}
              returnHomeTwo={cancelTranser}
            />
          </div>
        )}
      </div>

      <div className="p-5 border rounded-[12px] h-[533px] w-[542px] mt-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
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
              className={`text-[14px] font-[500] ${
                illuminateWallet ? "text-BlueHomz" : "text-GrayHomz6"
              }`}
            >
              Transfer
            </p>
          </div>
          {illuminateWallet ? (
            <button
              onClick={showTransferConfirmation}
              className={`w-[60px] h-[37px]  ${
                accountNumber !== "" &&
                selectedBank !== null &&
                recipientName !== "" &&
                amount !== "" &&
                description !== ""
                  ? "bg-BlueHomz text-white"
                  : "bg-GrayHomz6 text-GrayHomz5 pointer-events-none"
              }  p-[5px] rounded-md text-center`}
            >
              Send
            </button>
          ) : (
            <button
              className={`w-[60px] pointer-events-none h-[37px] bg-GrayHomz6 text-GrayHomz5  p-[5px] rounded-md text-center`}
            >
              Send
            </button>
          )}
        </div>
        <div
          className={`flex flex-col gap-4 justify-between ${
            illuminateWallet ? "" : "pointer-events-none"
          }`}
        >
          <div>
            <label
              className={`text-[13px] font-[500] ${
                illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
              }`}
            >
              Account Number
            </label>

            <input
              type="number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="012345678901"
              className={`mt-2 rounded-md border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>
          <div className="">
            <div
              className={`pb-2 text-[13px] font-[500] ${
                illuminateWallet ? "text-BlackHomz" : "text-GrayHomz6"
              } `}
            >
              Bank
            </div>
            <Dropdown
              options={options}
              onSelect={handleSelect}
              illuminateWallet={illuminateWallet}
              selectOption={
                selectedBank ? selectedBank.label : "Select recipient’s bank"
              }
              className={`w-[500px] ${
                illuminateWallet ? "" : "pointer-events-none"
              }   `}
            />
          </div>
          <div>
            <label
              className={`text-[13px] font-[500] ${
                illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
              }`}
            >
              Recipient’s Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Autofill Full Name"
              className={`mt-2 rounded-md  border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>
          <div>
            <label
              className={`text-[13px] font-[500] ${
                illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
              }`}
            >
              Amount (N)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="200,000"
              className={` mt-2 rounded-md  border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>
          <div>
            <label
              className={`text-[13px] font-[500] ${
                illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
              }`}
            >
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="2023 Rent Payments"
              className={`mt-2 rounded-md  border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferDetails;
