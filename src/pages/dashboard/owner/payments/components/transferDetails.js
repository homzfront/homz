"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Input from "./input";
import Dropdown from "./dropDown";
import AcAndRejModel from "../../components/acAndRejModel";
import ReceiptModal from "./receiptModal";
import Receipt from "./receipt";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ShareAbleReceipt from "./shareAbleReceipt";

const TransferDetails = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [transfer, setTransfer] = useState([]);
  const [transferToggleModal, setTransferToggleModal] = useState(false);
  const [successfulTansferModal, setSuccessfulTansferModal] = useState(false);
  const [receipt, setReceipt] = useState(false);

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow =
      receipt || successfulTansferModal || transferToggleModal
        ? "hidden"
        : "auto";
    if (receipt || successfulTansferModal || transferToggleModal) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [receipt, successfulTansferModal, transferToggleModal]);

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

    console.log("Form Data:", formData);
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



  console.log(transfer);

  return (
    <div>
      <div>
        {receipt && (
          <div>
            <Receipt closeReceipt={closeReceipt} />
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

      <div className="p-5 border rounded-[12px] h-[533px] w-[542px] mt-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/send-2.png"}
              width={20}
              height={21}
              alt=""
            />
            <p className="text-[14px] font-[500] text-BlueHomz">Transfer</p>
          </div>
          <button
            onClick={showTransferConfirmation}
            className="w-[60px] h-[37px] text-GrayHomz2 bg-GrayHomz6 p-[5px] rounded-md text-center"
          >
            Send
          </button>
        </div>
        <div className="flex flex-col gap-4 justify-between">
          <Input
            label={"Account Number"}
            type={"text"}
            value={accountNumber}
            changeInput={(e) => setAccountNumber(e.target.value)}
          />
          <div className="">
            <div className="pb-2 text-[13px] font-[500] text-BlackHomz">
              Bank
            </div>
            <Dropdown
              options={options}
              onSelect={handleSelect}
              selectOption={
                selectedBank ? selectedBank.label : "Select recipient’s bank"
              }
              className="w-[500px]"
            />
          </div>
          <Input
            label={"Recipient’s Name"}
            type={"text"}
            value={recipientName}
            changeInput={(e) => setRecipientName(e.target.value)}
          />
          <Input
            label={"Amount (N)"}
            type={"number"}
            value={amount}
            changeInput={(e) => setAmount(e.target.value)}
          />
          <Input
            label={"Description"}
            type={"text"}
            value={description}
            changeInput={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="hidden" ref={receiptRef}>
        <ShareAbleReceipt/>
      </div>
    </div>
  );
};

export default TransferDetails;
