"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/input";
import Dropdown from "../../../components/dropDown";
import AcAndRejModel from "../../../../components/acAndRejModel";
import ReceiptModal from "../../../components/receiptModal";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ShareAbleReceipt from "../../../components/shareAbleReceipt";
import PopUpReceipt from "../../../components/popUpReceipt";
import useBodyScroll from "@/utils/useBodyScroll";
import tenantRentHis from "@/store/tenantStore/tenantRentHis";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import lowerCaseData from "@/utils/lowerCaseData";
import ReceiptRentHis from "../../../components/receiptRentHis";
import useClickOutside from "@/utils/clickOutside";


const TransferHis = ({ illuminateWallet, data }) => {
  const [transferToggleModal, setTransferToggleModal] = useState(false);
  const [successfulTansferModal, setSuccessfulTansferModal] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptdata] = useState({});

  const openReceipt = () => {
    setShowReceipt(!showReceipt);
    setPopUpMenuTwo(false);
  };
  const closeReceipt = () => {
    setShowReceipt(false);
  };

  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false)); // Use the custom hook


  // useEffect to handle scrolling
  useBodyScroll([receipt, successfulTansferModal, transferToggleModal, showReceipt]);

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
      {showReceipt && (
        <div>
          <ReceiptRentHis closeReceipt={closeReceipt} shareReceipt={shareReceipt} rentData={receiptData} />
        </div>
      )}

      <div className="py-8 border rounded-[12px] h-[700px] w-full overflow-auto scrollbar-container">
        <div className="px-8 pb-4">
          <div className="flex items-center gap-2">
            {illuminateWallet ? (
              <Image
                src={"/static/dashboard/enterprisemanager/payment/received.png"}
                width={20}
                height={21}
                alt=""
              />
            ) : (
              <Image
                src={"/static/dashboard/tenant/finance/received.png"}
                width={20}
                height={21}
                alt=""
              />
            )}
            <p
              className={`text-[14px] font-[500]  ${illuminateWallet ? "text-BlueHomz" : "text-GrayHomz6"
                } `}
            >
              Rent History
            </p>
          </div>
          <p
            className={`mt-1 text-[13px] font-[400]  ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
              }`}
          >
            All rent payments are displayed here
          </p>
        </div>

        <div className={`${illuminateWallet ? "block" : "hidden"}`}>
          <table className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-2 md:pl-6">Amount</th>
                <th className="text-left pl-2 md:pl-4">Duration</th>
                <th className="text-left pl-2 md:pl-4 ">payment Date</th>
                <th className="text-left">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {data &&
                data.map((data) => (
                  <tr
                    key={data._id}
                    className=" w-2 border-b-[1px] items-center"
                  >
                    <td className="pl-2 md:pl-6 text-GrayHomz4 font-[500] text-[11px]">
                      {addCommasToNumber(data?.totalRent)}
                    </td>
                    <td className="text-GrayHomz pl-2 md:pl-4 py-[15px] font-[500] text-[11px]">
                      {addYearsToValues(data?.duration)}
                    </td>
                    <td className="text-GrayHomz text-left pl-2 md:pl-4 py-[15px] font-[500] text-[11px] ">
                      {changeBackendDateFormat(data?.paymentDate)}
                    </td>
                    <td
                      className={`text-GrayHomz py-[15px] font-[500] text-[11px] `}
                    >
                      <p
                        className={`w-[73px] h-[25px] flex justify-center items-center rounded-[8px] bg-successBg text-Success`}
                      >
                        {data?.status}
                      </p>
                    </td>
                    <td className="relative py-[15px] pr-2">
                      <button onClick={() => {
                        handleToggleMenu(data._id)
                        setReceiptdata(data)
                      }}>
                        <Image
                          src={
                            "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                          }
                          alt=""
                          height={21}
                          width={20}
                          style={{ height: "auto", width: "auto" }}
                          className={` ${data?.rentInfo?.paymentStatus === "pending" ? "hidden" : "table-cell"}`}
                        />
                      </button>
                      {popUpMenuTwo && selectedDataId === data._id && (
                        <PopUpReceipt openReceipt={openReceipt} dropdownRef={dropdownRef} data={data} />
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
