"use client";
import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import useExpenseStore from "@/store/enterpriseStore/useExpenseStore";

const PrintableAll = ({
    data,
    printRef,
    summary,
    enterprise
}) => {

    const {
        fromDate,
        toDate,
    } =  useExpenseStore();

    return (
        <div ref={printRef} className="w-full max-w-6xl mx-auto font-sans bg-white shadow">
             {/* Add print styles */}
             <style jsx>{`
                @media print {
                    @page {
                        size: auto;
                        padding: 10mm; 
                        border: none;
                    }
                }
            `}</style>
            {/* Header */}
            <div className="bg-gradient-to-r from-BlueHomz2 to- bg-BlueHomzDark text-white p-4 rounded-t-md flex gap-2 items-center">
                <div>
                    <Image
                        src={enterprise?.businessLogo?.url ?? "/Checker.png"}
                        alt="img"
                        height={52}
                        width={52}
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[13px] font-bold">{enterprise?.businessName ?? "Property Management"}</h3>
                    <p className="text-[13px] font-medium">Expense report</p>
                </div>
            </div>

            {/* Summary Section */}
            <div className="mt-2 px-4 pt-4 pb-2">
                <p className="flex flex-col">
                    <span className="font-semibold">Expense report:</span> {fromDate} - {toDate}
                </p>
                <div className="flex justify-between items-end">
                    <p className="flex flex-col">
                        <span className="font-semibold">Property:</span> All Properties
                    </p>
                    <p className="">
                        <span className="font-semibold">Date Generated:</span> {changeBackendDateFormat(new Date())}
                    </p>
                </div>

                <div className="mt-4 bg-[#EEF5FF] p-4 text-BlackHomz text-xs font-normal">
                    <div className="flex justify-between p-2">
                        <span className="">Total Expenses:</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(summary?.totalExpenseAmount || 0)}</span>
                    </div>
                    <div className="flex justify-between mt-2 bg-white p-2">
                        <span className="">Total Rent Collected:</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(summary?.totalRentCollected || 0)}</span>
                    </div>
                    <div className="flex justify-between mt-2 p-2">
                        <span className="">Available Balance:</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(summary?.availableBalance || 0)}</span>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm text-left border-t border-gray-300">
                    <thead className="bg-BlueHomz text-white text-[11px]">
                        <tr>
                            <th className="px-4 py-2 border">Expense</th>
                            <th className="px-4 py-2 border">Amount</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Property</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.results?.map((item, i) => (
                            <tr key={item._id} className={i % 2 === 0 ? "bg-white" : "bg-[#F6F6F6]"}>
                                <td className="px-4 py-2 border flex items-center gap-2 text-[10px]">
                                   {item?.expenseName}
                                </td>
                                <td className="px-4 py-2 border text-[10px]">₦{addCommasToNumber(item?.amount)}</td>
                                <td className="px-4 py-2 border text-[10px]">{item?.category || "N/A"}</td>
                                <td className="px-4 py-2 border text-[10px]">
                                    {item?.date ? changeBackendDateFormat(item?.date) : "N/A"}
                                </td>
                                  <td className="px-4 py-2 border text-[10px]">
                                    {item?.property?.propertyName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            {/* <div className="bg-gradient-to-r from-BlueHomz2 to- bg-BlueHomzDark text-white text-center p-2 mt-2 text-sm">Page {currentPage ?? 1}</div> */}
        </div>
    );
};

export default PrintableAll;
