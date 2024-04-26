import Image from "next/image";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // For converting HTML to canvas
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import handleCopyClick from "@/utils/handleCopyClick";

const Receipt = ({
  closeReceipt,
  openShareAbleReceipt,
  transfer,
  setIlluminateWallet,
  fetchDataAgain,
  data
}) => {
  const [transferData, setTransferData] = useState("");
  const [copiedState, setCopiedState] = useState({
    copied: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Data = localStorage.getItem("MoneyTransfer Response");
      if (Data) {
        const parsedData = JSON.parse(Data);
        setTransferData(parsedData);
      }
    }
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById("receipt-content-transfer");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Create new PDF with portrait orientation
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.save("Homz-Rent-Receipt.pdf"); // Download PDF with filename 'receipt.pdf'
    });

  };

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div
        id="receipt-content-transfer"
        className="h-[660px] w-[530px] bg-white rounded-lg p-8"
      >
        <div
          onClick={closeReceipt}
          className="cursor-pointer flex w-full justify-end"
        >
          <Image
            src={"/static/dashboard/enterprisemanager/payment/close-square.png"}
            alt=""
            height={24}
            width={24}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            {data?.businessLogo?.url ?
              <Image
                src={
                  data?.businessLogo?.url
                }
                alt=""
                height={64}
                width={64}
                className="rounded-full"
              />
              :
              <Image
                src={"/static/dashboard/enterprisemanager/payment/BWFrame.png"}
                alt=""
                height={64}
                width={64}
              />
            }
            <p className="text-GrayHomz text-[18px] font-[500]">
              {data?.businessName}
            </p>
          </div>
          <div>
            <p className="text-BlueHomz text-[14px] font-[500]">
              Transaction Receipt
            </p>
          </div>
          <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-4">
            <div className="w-full flex gap-3">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Amount
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                {addCommasToNumber(transferData?.amount)}
              </p>
            </div>
            <div className="w-full flex gap-3">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Recipient
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                {transfer?.recipientName}
              </p>
            </div>
            <div className="w-full flex gap-3">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Description
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                {transfer?.description}
              </p>
            </div>
            <div className="w-full flex gap-3">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                {changeBackendDateFormat(transferData?.dateCreated)}
              </p>
            </div>
          </div>
          <div className="relative rounded-lg bg-whiteblue p-4 flex flex-col gap-3">
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Transaction Reference No
              </p>
              <div className="flex items-center gap-2 w-[50%]">
                <p className="text-BlueHomz text-[14px] font-[400]">
                  {transferData?.reference}
                </p>
                <Image
                  src={"/static/dashboard/enterprisemanager/payment/copy.png"}
                  alt=""
                  height={16}
                  width={16}
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyClick(
                      `${transferData?.reference}`,
                      "copied",
                      setCopiedState
                    )
                  }
                />
                {copiedState.copied && (
                  <span className=" absolute right-1 text-[10px] italic text-Success">
                    copied
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex gap-3">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Status
              </p>
              <p className="text-BlueHomz text-[14px] font-[400] w-[50%]">
                Successful
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              downloadPDF();
            }}
            className="w-full h-[48px] bg-BlueHomz rounded-md text-white"
          >
            Share Receipt
          </button>
          <div className="border-t grid grid-cols-2 gap-2 pt-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/sms.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {data?.user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/call.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {data?.phoneNumber}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/location.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {data?.estateAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
