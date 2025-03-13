"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useBodyScroll from "@/utils/useBodyScroll";
import ReceiptRentHis from "../../../components/receiptRentHis";
import useClickOutside from "@/utils/clickOutside";
import Widget from "./components/widget";


const TransferHis = ({ illuminateWallet, data, tenantData }) => {
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

  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));

  // useEffect to handle scrolling
  useBodyScroll([showReceipt]);

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  return (
    <div>
      {showReceipt && (
        <div>
          <ReceiptRentHis closeReceipt={closeReceipt} rentData={receiptData} tenantData={tenantData} />
        </div>
      )}

      <div className="py-8 border rounded-[12px] h-[700px] max-w-[500px] w-full overflow-auto scrollbar-container">
        <div className="pb-4 px-4">
          <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/received.png"}
                width={20}
                height={21}
                alt=""
              />
            
            <p
              className={`text-[14px] font-[500] text-BlueHomz
                } `}
            >
              Rent History
            </p>
          </div>
          <p
            className={`mt-1 text-[13px] font-[400] text-GrayHomz
              }`}
          >
            All rent payments are displayed here
          </p>
        </div>
        <Widget
          handleToggleMenu={handleToggleMenu}
          setReceiptdata={setReceiptdata}
          popUpMenuTwo={popUpMenuTwo}
          selectedDataId={selectedDataId}
          illuminateWallet={illuminateWallet}
          openReceipt={openReceipt}
          data={data}
          dropdownRef={dropdownRef}
        />
      </div>
    </div>
  );
};

export default TransferHis;
