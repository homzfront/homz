"use client";
import React from "react";
import Image from "next/image";
import addCommasToNumber from "@/utils/addCommasToNumber";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";


const PrintableAll = ({ Data, data, printRef }) => {
    return (
        <div
            ref={printRef}
            className="mx-auto w-auto px-4 py-8"
        >
            <div className="border w-full">
                <div className="w-full">
                    <table border="1" className="w-full">
                        <thead>
                            <tr className="bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz">
                                <th className="text-left pl-4" style={{ width: "130px" }}>Tenant</th>
                                <th className="text-left" style={{ width: "110px" }}>Rent Amount</th>
                                <th className="text-left" style={{ width: "120px" }}>Due Date</th>
                                <th className="text-left" style={{ width: "120px" }}>Payment Status</th>
                                <th className="text-left" style={{ width: "120px" }}>Amount Paid</th>
                                <th className="text-left" style={{ width: "130px" }}>Description</th>
                                <th className="text-left" style={{ width: "130px" }}>Rent Duration</th>
                                <th className="text-left" style={{ width: "130px" }}>Payment Method</th>
                                <th className="text-left" style={{ width: "130px" }}>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data?.map((data) => (
                                    <tr
                                        key={data?._id}
                                        className="w-2 border-t-[1px] items-center"
                                    >
                                        <td className="flex items-center gap-1 pr-2 py-[15px] pl-4 text-GrayHomz4 font-[500] text-[11px]">
                                            {!Data?.coverPhoto?.url ? (
                                                <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                                                    <EmptyAvatar />
                                                </div>
                                            ) : (
                                                <Image
                                                    src={Data?.coverPhoto?.url}
                                                    alt="Tenant Image"
                                                    width={40}
                                                    height={40}
                                                    layout="full"
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    className="object-cover bg-center h-[40px] rounded-full"
                                                    priority
                                                />
                                            )}
                                            <span>{Data?.fullName || "N/A"}</span>
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {addCommasToNumber(data?.rent)}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {changeBackendDateFormat(data?.dueDate)}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data?.status !== "success" ? (
                                                <div className="bg-warningBg text-warning rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    Pending
                                                </div>
                                            ) : (
                                                <div className="bg-successBg text-Success rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    Paid
                                                </div>
                                            )}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {addCommasToNumber(data?.amountPaid)}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data?.description || "N/A"}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data.duration === 1 ? `${data.duration} year` : `${data.duration} years`}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data?.paymentMethod || "N/A"}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data?.paidAt ? changeBackendDateFormat(data?.paidAt) : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PrintableAll