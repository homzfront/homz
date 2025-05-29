"use client";
import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import Image from "next/image";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import usePaymentFilterStore from "@/store/enterpriseStore/usePaymentFilterStore";

const PrintableAll = ({
    data,
    printRef,
    summary,
    fee
}) => {
    const { data: enterprise, loading, fetchData } = useProfileEnterpriseMe();
    const lastFeeIndex = fee?.fees?.length - 1;
    const isLastFeeWhite = lastFeeIndex % 2 === 0;


    React.useEffect(() => {
        fetchData();
    }, []);

    const {
        fromDate,
        toDate,
    } = usePaymentFilterStore();

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
                    <p className="text-[13px] font-medium">Financial Statement</p>
                </div>
            </div>

            {/* Summary Section */}
            <div className="mt-2 px-4 pt-4 pb-2">
                <p className="flex flex-col">
                    <span className="font-semibold">Financial Statement:</span> {fromDate} - {toDate}
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
                        <span className="">Total Expected Revenue:</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(summary?.totalPayment)}</span>
                    </div>
                    <div className="flex justify-between mt-2 bg-white p-2">
                        <span className="">Rent Collected:</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(summary?.amountPaid)}</span>
                    </div>
                    <div className="flex justify-between mt-2 p-2">
                        <span className="">Pending Rent:</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(summary?.pendingPayment)}</span>
                    </div>
                    {fee?.totalFeeList && <div className="flex justify-between mt-2 bg-white p-2">
                        <span className="">Total Fees:</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(fee?.totalFeeList)}</span>
                    </div>}
                    {fee?.totalAfterFees && <div className="flex justify-between mt-2 p-2">
                        <span className="">Total (AfterFees):</span>
                        <span className="text-GrayHomz">₦{addCommasToNumber(fee?.totalAfterFees)}</span>
                    </div>}
                    {fee?.fees.length > 0 &&
                        fee?.fees?.map((fee, index) => (
                            <div className={`flex justify-between mt-2 p-2 ${index % 2 === 0 ? "bg-white" : ""}`} key={fee._id}>
                                <span className="">{fee.name} {fee.amountPct}%</span>
                                <span className="text-GrayHomz">₦{addCommasToNumber(fee?.amountN)}</span>
                            </div>
                        ))
                    }
                    <div className={`flex justify-between mt-2 p-2 ${!isLastFeeWhite ? "bg-white" : ""}`}>
                        <span>No of Transactions:</span>
                        <span className="text-GrayHomz">{summary?.totalTranscation}</span>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm text-left border-t border-gray-300">
                    <thead className="bg-BlueHomz text-white text-[11px]">
                        <tr>
                            <th className="px-4 py-2 border">Tenant Name</th>
                            <th className="px-4 py-2 border">Property</th>
                            <th className="px-4 py-2 border">Rent Amount</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, i) => (
                            <tr key={item._id} className={i % 2 === 0 ? "bg-white" : "bg-[#F6F6F6]"}>
                                <td className="px-4 py-2 border flex items-center gap-2 text-[10px]">
                                    {!item?.tenantId?.coverPhoto?.url ? (
                                        <div className="h-[32px] w-[32px] flex justify-center items-center bg-avatarBg rounded-full">
                                            <EmptyAvatar />
                                        </div>
                                    ) : (
                                        <Image
                                            src={item?.tenantId?.coverPhoto?.url}
                                            alt="Tenant"
                                            width={32}
                                            height={32}
                                            className="object-cover rounded-full"
                                        />
                                    )}
                                    {item?.tenantId?.fullName || "N/A"}
                                </td>
                                <td className="px-4 py-2 border text-[10px]">{item?.estateId?.name || "N/A"}</td>
                                <td className="px-4 py-2 border text-[10px]">₦{addCommasToNumber(item?.rent)}</td>
                                <td className="px-4 py-2 border text-[10px]">{item?.description || "N/A"}</td>
                                <td className="px-4 py-2 border text-[10px]">
                                    {item?.paidAt ? changeBackendDateFormat(item?.paidAt) : "N/A"}
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
