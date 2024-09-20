"use client";
import React, { useState } from "react";
import Image from "next/image";
import addCommasToNumber from "@/utils/addCommasToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import EmptyAvatar from "@/components/icons/emptyAvatar";


const PrintableAll = ({ data, printRef }) => {
    return (
        <div
            ref={printRef}
            className="mt-[480px] mr-[180px] mx-auto w-[1200px]"
        >
            <div className="border w-full rotate-180">
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
                                        key={data?.id}
                                        className={`w-2 border-t-[1px] items-center`}
                                    >
                                        <td className="flex items-center gap-1 pr-2 py-[15px] pl-4 text-GrayHomz4 font-[500] text-[11px]">
                                            {!data?.image ? (
                                                <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                                                    <EmptyAvatar />
                                                </div>
                                            ) : (
                                                <Image
                                                    src={data?.image}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    layout="full" // Specify the desired height
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    className="object-cover bg-center h-[40px] rounded-full"
                                                    priority
                                                />
                                            )}
                                            <span className="">{data?.tenantName}</span>
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{addCommasToNumber(data?.rentAmount)}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.dueDate}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data?.paymentStatus === "Unpaid" ?
                                                <div className="bg-warningBg text-warning rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    Pending
                                                </div> :
                                                <div className="bg-successBg text-Success rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    {capitalizeFirstLetter(data?.paymentStatus)}
                                                </div>}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{addCommasToNumber(data?.amountPaid)}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.description}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.rentDuration}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.paymentMethod}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.paymentDate}</td>
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