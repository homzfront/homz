import Image from "next/image";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the styles for the skeleton
import addCommasToNumber from "@/utils/addCommasToNumber";
import handleCopyClick from "@/utils/handleCopyClick";
import formatPaidAtDate from "@/utils/formatPaidAtDate";
import PrintableReceipt from "./printableReceipt";

const Receipt = ({ closeReceipt, data }) => {
  const [copiedState, setCopiedState] = useState({ copied: false });
  const printableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: "Homz Receipt",
    onAfterPrint: () => console.log("Receipt printed."),
  });

  return (
    <div className="">
      <div
        id="receipt-content-transfer"
        className="h-auto md:w-[530px] bg-white rounded-lg p-8"
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
            {data && !data?.enterprise?.businessLogo?.url
              ?
              <Image
                src={"/static/dashboard/enterprisemanager/payment/BWFrame.png"}
                alt=""
                height={64}
                width={64}
              />
              : data?.enterprise?.businessLogo?.url ? (
                <Image
                  src={data.enterprise.businessLogo.url}
                  alt=""
                  height={64}
                  width={64}
                  className="rounded-full"
                />
              ) : (
                <Skeleton circle={true} height={64} width={64} />
              )}
            <p className="text-GrayHomz text-[18px] font-[500]">
              {data ? (
                data.enterprise.businessName
              ) : (
                <Skeleton width={150} />
              )}
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
                {data ? addCommasToNumber(data.amount) : <Skeleton width={100} />}
              </p>
            </div>
            <div className="w-full flex gap-3">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Recipient
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                {data ? (
                  data.metadate.custom_fields[0]?.value
                ) : (
                  <Skeleton width={150} />
                )}
              </p>
            </div>
            <div className="w-full flex gap-3">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Description
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                {data ? data.description : <Skeleton width={150} />}
              </p>
            </div>
            <div className="w-full flex gap-3">
              <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
                Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
                {data ? formatPaidAtDate(data.paidAt) : <Skeleton width={100} />}
              </p>
            </div>
          </div>
          <div className="relative rounded-lg bg-whiteblue p-4 flex flex-col gap-3">
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Transaction Reference No
              </p>
              <div className="flex items-center gap-2 w-[50%]">
                <p className="text-BlueHomz truncate text-[14px] font-[400]">
                  {data ? data.referenceTransaction : <Skeleton width={100} />}
                </p>
                {data && (
                  <Image
                    src={"/static/dashboard/enterprisemanager/payment/copy.png"}
                    alt=""
                    height={16}
                    width={16}
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopyClick(
                        `${data.referenceTransaction}`,
                        "copied",
                        setCopiedState
                      )
                    }
                  />
                )}
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
                {data ? "Successful" : <Skeleton width={100} />}
              </p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="w-full h-[48px] bg-BlueHomz rounded-md text-white"
            disabled={!data}
          >
            Share Receipt
          </button>
          <div className="border-t grid md:grid-cols-2 grid-cols-1 gap-2 pt-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/sms.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {data ? data.enterprise.email : <Skeleton width={150} />}
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
                {data ? data.enterprise.businessPhoneNumber : <Skeleton width={150} />}
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
                {data ? data.enterprise.businessAddress : <Skeleton width={200} />}
              </p>
            </div>
          </div>
        </div>
        <p className="text-[11px] mt-2 font-[400] text-GrayHomz text-center w-full">&copy; Copyright  2024  Homz.ng. All Rights Reserved</p>
      </div>
      <div style={{ display: 'none' }}>
        <PrintableReceipt
          ref={printableRef}
          data={data}
        />
      </div>
    </div>
  );
};

export default Receipt;
