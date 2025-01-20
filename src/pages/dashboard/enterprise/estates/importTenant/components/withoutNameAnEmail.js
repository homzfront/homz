import Close from '@/components/icons/Close';
import useCSVFileStore from '@/store/document/useCSVFileStore';
import { transformKeys } from '@/utils/transformKeys';
import React from 'react'

const WithoutNameAnEmail = ({ setUnimportedTenantModal }) => {
    const { withoutNameAEmail } = useCSVFileStore();
    console.log(withoutNameAEmail)
    return (
        <div className='w-full'>
            <div className='flex justify-between items-start'>
                <div className='w-[75%] flex flex-col gap-2'>
                    <h1 className='text-BlackHomz font-[500px] text-[16px] lg:text-[18px]'>
                        Tenant Name and Email are missing
                    </h1>
                    <h3 className='text-GrayHomz font-[400px] text-[12px] lg:text-[14px]'>
                        The following tenants will not be imported and will not receive invitation mails until the required fields are filled and mapped.
                    </h3>
                </div>
                <div className='w-[20%] flex justify-end'>
                    <div
                        onClick={() => setUnimportedTenantModal(false)}
                        className="cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
                    >
                        <Close />
                    </div>
                </div>
            </div>
            {/* CSV Table */}
            <div className="overflow-x-auto scrollbar-containerII mt-4 overflow-y-auto pr-1 pb-1">
                <div className="w-[500%] lg:w-[180%] max-h-[calc(100vh-60vh)]">
                    <div className="w-full border rounded-t-[12px]">
                        <div className="bg-BlueHomz h-[50px] text-[13px] flex items-center justify-center gap-2 font-[500] text-[#ffffff]  px-2 rounded-t-[12px]">
                            <div className="w-[15%]">Tenant Name</div>
                            <div className="w-[7%]">Apartment No</div>
                            <div className="w-[15%]">Address</div>
                            <div className="w-[15%]">Email</div>
                            <div className="w-[8%]">Phone No</div>
                            <div className="w-[8%]">Rent Amount</div>
                            <div className="w-[8%]">Rent Duration</div>
                            <div className="w-[8%]">Start Date</div>
                            <div className="w-[8%]">Due Date</div>
                            <div className="w-[8%]">Property Type</div>
                        </div>
                        <div className="">
                            {withoutNameAEmail &&
                                transformKeys(withoutNameAEmail).map((data, index) => (
                                    <div
                                        key={index}
                                        className="border-b-[1px] items-center flex justify-center w-full gap-2 px-2 h-[60px]"
                                    >
                                        <div className=" text-GrayHomz w-[15%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.tenantName}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[7%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.apartmentNo}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[15%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.address}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[15%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.email}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[8%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.phoneNo}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[8%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.rentAmount}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[8%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.rentDuration}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[8%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.startDate}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[8%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.dueDate}</span>
                                        </div>
                                        <div className=" text-GrayHomz w-[8%] font-[500] text-[11px] text-start">
                                            <span className="break-words"> {data?.propertyType}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithoutNameAnEmail