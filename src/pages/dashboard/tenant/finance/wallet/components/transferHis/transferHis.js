"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/input";
import Dropdown from "../../../components/dropDown";
import AcAndRejModel from "../../../../components/acAndRejModel";
import ReceiptModal from "../../../components/receiptModal";
import Receipt from "../../../components/receipt";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ShareAbleReceipt from "../../../components/shareAbleReceipt";
import PopUpMenuTwo from "/src/pages/dashboard/owner/tenants/components/popUpMenuTwo";
import PopUpReceipt from "../../../components/popUpReceipt";

const Data = [
  {
    id: 1,
    Rent: "N750,000",
    Status: "Confirmed",
    DueDate: "4th January, 2025",
    Duration: 1,
  },
  {
    id: 2,
    Rent: "N750,000",
    Status: "Confirmed",
    DueDate: "4th January, 2025",
    Duration: 2,
  },
  {
    id: 3,
    Rent: "N750,000",
    Status: "Pending",
    DueDate: "4th January, 2025",
    Duration: 1,
  },
  {
    id: 4,
    Rent: "N750,000",
    Status: "Pending",
    DueDate: "4th January, 2025",
    Duration: 2,
  },
];

const TransferHis = () => {
  const [data, setData] = useState(Data || []);
  const [transferToggleModal, setTransferToggleModal] = useState(false);
  const [successfulTansferModal, setSuccessfulTansferModal] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const openReceipt = () => {
    setShowReceipt(!showReceipt);
  };
  const closeReceipt = () => {
    setShowReceipt(false);
  };

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


  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  const shareReceipt = () => {
    setReceipt(!receipt);
  };

  const closeSharedReceipt = () => {
    setReceipt(false);
  };
  return (
    <div>
      {receipt && <ShareAbleReceipt />}
      {showReceipt && (
        <div>
          <Receipt closeReceipt={closeReceipt} shareReceipt={shareReceipt} />
        </div>
      )}

      <div className="py-8 border rounded-[12px] h-[700px] w-full">
        <div className="px-8 pb-4">
          <div className="flex items-center gap-2">
            <Image
              src={"/static/dashboard/enterprisemanager/payment/received.png"}
              width={20}
              height={21}
              alt=""
            />
            <p className="text-[14px] font-[500] text-BlueHomz">Rent History</p>
          </div>
          <p className="mt-1 text-[13px] font-[400] text-GrayHomz">
            All rent payments are displayed here
          </p>
        </div>

        <div>
          <table className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-6">Amount</th>
                <th className="text-left pl-4">Duration</th>
                <th className="text-left pl-4">payment Date</th>
                <th className="text-left">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {data &&
                data.map((data) => (
                  <tr
                    key={data.id}
                    className=" w-2 border-b-[1px] items-center"
                  >
                    <td className="pl-6 text-GrayHomz4 font-[500] text-[11px]">
                      {data.Rent}
                    </td>
                    <td className="text-GrayHomz pl-4 py-[15px] font-[500] text-[11px]">
                      {data.Duration} year(s)
                    </td>
                    <td className="text-GrayHomz pl-4 py-[15px] font-[500] text-[11px]">
                      {data.DueDate}
                    </td>
                    <td
                      className={`text-GrayHomz py-[15px] font-[500] text-[11px] `}
                    >
                      <p
                        className={`w-[73px] h-[25px] flex justify-center items-center rounded-[8px] ${
                          data.Status === "Confirmed"
                            ? "bg-successBg text-Success "
                            : ""
                        } ${
                          data.Status === "Pending"
                            ? "bg-warningBg text-warning "
                            : ""
                        } `}
                      >
                        {data.Status}
                      </p>
                    </td>
                    <td className="relative py-[15px] pr-2">
                      <button onClick={() => handleToggleMenu(data.id)}>
                        <Image
                          src={
                            "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                          }
                          alt=""
                          height={21}
                          width={20}
                          style={{ height: "auto", width: "auto" }}
                        />
                      </button>
                      {popUpMenuTwo && selectedDataId === data.id && (
                        <PopUpReceipt openReceipt={openReceipt} data={data} />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransferHis;
