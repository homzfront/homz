import Close from '@/components/icons/Close'
import addCommasToNumberWithoutN from '@/utils/addCommasToNumberWithoutN'
import changeBackendDateFormat from '@/utils/changeBackendDateFormat'
import React from 'react'

const AllDetails = ({ singleTableData, setOpenDetails }) => {
    return (
        <div className="max-h-[600px]">
            <div className="w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-4 overflow-y-auto scrollbar-container">
                <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col w-[85%]">
                        <p className="text-BlackHomz font-[500] text-[14px] md:text-[16px]">
                            Expense Information
                        </p>
                    </div>
                    <div
                        onClick={() => setOpenDetails(false)}
                        className="cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
                    >
                        <Close />
                    </div>
                </div>
                <div className='mt-4 bg-[#FCFCFC] rounded-[8px] p-3 flex flex-col gap-4'>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Expense</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.expenseName ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Amount</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>
                            <span style={{ fontFamily: "Arial" }}>₦</span>
                            {addCommasToNumberWithoutN(singleTableData?.amount)}
                        </span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Date</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{changeBackendDateFormat(singleTableData?.date)}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Category</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.expenseCategoryName  ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Description</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.description  ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Status</span>
                        <span className={`${singleTableData?.paymentStatus === "Unpaid" ? "text-[#DC6803]" : "text-Success"} text-[13px] w-[48%] flex justify-end`}>{singleTableData?.paymentStatus ?? "---------"}</span>
                    </div>
                </div>
                <div className='mt-4 bg-[#FCFCFC] rounded-[8px] p-3 flex flex-col gap-4'>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz font-medium text-sm w-[48%]'>Vendor Details</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'></span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Vendor Name</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.vendor?.name ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Contact Person</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.vendor?.contactPerson ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Vendor Email</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.vendor?.email ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Vendor Phone</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.vendor?.phone ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Business Address</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.vendor?.businessAddress ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Payment Method</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.vendor?.paymentMethod ?? "---------"}</span>
                    </div>
                </div>
                <div className='mt-4 bg-[#FCFCFC] rounded-[8px] p-3 flex flex-col gap-4'>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz font-medium text-sm w-[48%]'>Property Information</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'></span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Property Name</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.property?.propertyName ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Apartment</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.property?.apartment ?? "---------"}</span>
                    </div>
                    <div className='flex items-start justify-between font-normal'>
                        <span className='text-BlackHomz text-sm w-[48%]'>Tenant Name</span>
                        <span className='text-GrayHomz text-[13px] w-[48%] flex justify-end'>{singleTableData?.property?.tenantName ?? "---------"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllDetails