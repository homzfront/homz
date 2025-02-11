import Image from "next/image";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the styles for the skeleton
import addCommasToNumber from "@/utils/addCommasToNumber";
import handleCopyClick from "@/utils/handleCopyClick";
import formatPaidAtDate from "@/utils/formatPaidAtDate";
import PrintableReceipt from "./printableReceipt";
import EmailReceipt from "@/components/icons/emailReceipt";
import PhoneReceipt from "@/components/icons/phoneReceipt";
import AddressReceipt from "@/components/icons/addressReceipt";
import DateFooter from "@/components/auth/dateFooter";

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
                {data ?
                  <><span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data.amount)}
                  </>
                  : <Skeleton width={100} />}
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
                <p className="text-BlueHomz break-words text-[14px] font-[400] w-[85%]">
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
          <div className="border-t flex flex-col gap-2 pt-2 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-start md:items-center gap-2 w-[45%] break-words">
                <div className="mt-[2px] md:mt-0">
                  <EmailReceipt />
                </div>
                <p className="text-GrayHomz2 text-[11px] font-[500] w-[80%]">
                  {data ? data.enterprise.email : <Skeleton width={150} />}
                </p>
              </div>
              <div className="flex items-center gap-2 w-[45%]">
                <PhoneReceipt />
                <p className="text-GrayHomz2 text-[11px] font-[500]">
                  {data ? data.enterprise.businessPhoneNumber : <Skeleton width={150} />}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AddressReceipt />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {data ? data.enterprise.businessAddress : <Skeleton width={200} />}
              </p>
            </div>
          </div>
        </div>
        <p className="text-[11px] mt-2 font-[400] text-GrayHomz text-center w-full"><DateFooter /></p>
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
