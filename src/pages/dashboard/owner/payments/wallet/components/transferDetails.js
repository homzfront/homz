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

const TransferDetails = ({ illuminateWallet }) => {
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
  const options = [
    { id: 1, label: "First Bank" },
    { id: 2, label: "GT Bank" },
    { id: 3, label: "Access Bank" },
  ];
  const handleSend = (e) => {
    e.preventDefault();

    // You can now access the form data here
    const formData = {
      accountNumber,
      recipientName,
      amount,
      description,
      selectedBank,
    };

    setTransfer(formData);
    setDescription("");
    setAccountNumber("");
    setRecipientName("");
    setAmount("");
    setTransferToggleModal(false);
    setSelectedBank(null);
    setSuccessfulTansferModal(!successfulTansferModal);
    // Add your logic to handle the form data as needed
  };

  const receiptRef = useRef(null);

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
            />
          </div>
        )}
      </div>
      <div>
        {successfulTansferModal && (
          <div>
            <ReceiptModal
              body={"You have successfully sent N200,000 to Victor Simon."}
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
            <AcAndRejModel
              header={"Confirm Transaction"}
              body={"You’re sending N200,000 to Victor Simon"}
              button={"Yes, Send"}
              buttonTwo={"Cancel Transaction"}
              returnHome={handleSend}
              returnHomeTwo={cancelTranser}
            />
          </div>
        )}
      </div>

      <div className="p-5 border rounded-[12px] h-[533px] w-[100%] mt-6 flex flex-col justify-between">
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
