"use client";
import React from "react";
import Image from "next/image";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import addYearsToValues from "@/utils/addYearsToNumber";
import PopUpReceipt from "../../../../components/popUpReceipt";
import UseWalletStore from "@/store/tenantStore/useWalletStore";


const OfflinePayment = ({
    handleToggleMenu,
    setReceiptdata,
    popUpMenuTwo,
    selectedDataId,
    openReceipt,
    dropdownRef,
}) => {
    const { rentHisOffline: data, illuminateWallet, rentHisLoading, fetchRentData } = UseWalletStore();
    React.useEffect(() => {
        fetchRentData("offline")
    }, [])
    return (
        <div className="mt-6 w-full mx-auto">
            <div className="mt-6 w-full mx-auto">
                <div className={`${illuminateWallet ? "block" : "hidden"}`}>
                    <div className="border overflow-x-auto scrollbar-container">
                        <div className="w-[400%] md:w-[250%]">
                            <table border="1" className="w-full">
                                <thead>
                                    <tr className="bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz">
                                        <th className="text-left pl-4" style={{ width: "120px" }}>Amount</th>
                                        <th className="text-left" style={{ width: "100px" }}>Duration</th>
                                        <th className="text-left" style={{ width: "150px" }}>payment Date</th>
                                        <th className="text-left" style={{ width: "110px" }}>Payment Status</th>
                                        <th className="text-left" style={{ width: "110px" }}>Due Date</th>
                                        <th className="text-left" style={{ width: "100px" }}>Amount Paid</th>
                                        <th className="text-left" style={{ width: "110px" }}>Description</th>
                                        <th className="text-left" style={{ width: "110px" }}>Payment Method</th>
                                        <th style={{ width: "50px" }}></th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {data &&
                                        data?.map((data) => (
                                            <tr
                                                key={data._id}
                                                className=" w-2 border-b-[1px] items-center"
                                            >
                                                <td className="pl-4 text-GrayHomz4 font-[500] text-[11px]">
                                                    <span className={`${!data?.rent && "hidden"}`} style={{ fontFamily: "Arial", }}>₦</span>{data?.rent ? addCommasToNumber(data?.rent) : null}
                                                </td>
                                                <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                                    {addYearsToValues(data?.duration)}
                                                </td>
                                                <td className="text-GrayHomz text-left py-[15px] font-[500] text-[11px] ">
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
                                                <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{changeBackendDateFormat(data?.dueDate)}</td>
                                                <td className="text-GrayHomz py-[15px] font-[500] text-[11px]"> <span className={`${!data?.amountPaid && "hidden"}`} style={{ fontFamily: "Arial", }}>₦</span>{data?.amountPaid ? addCommasToNumber(data?.amountPaid) : null}</td>
                                                <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.description}</td>
                                                <td className="text-GrayHomz py-[15px] font-[500] text-[11px] flex flex-col"><span>{data?.paymentMethod}</span> <span>{data?.modeOfTransaction ? `[${data?.modeOfTransaction}]` : ""}</span></td>
                                                <td className="sticky right-[-24px] md:right-0 bg-white py-[15px] pr-4">
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
                                                            className={`z-10 ${data?.rentInfo?.paymentStatus === "pending" ? "hidden" : "table-cell"}`}
                                                        />
                                                    </button>
                                                    {popUpMenuTwo && selectedDataId === data._id && (
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
            </div>
        </div>
    );
}

export default OfflinePayment