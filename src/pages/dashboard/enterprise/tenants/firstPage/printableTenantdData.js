import React, { useState } from 'react'
import Image from "next/image";
import PopUpMenuTwo from "../components/popUpMenuTwo";
import StatusDropdown from "../../components/statusDropDown";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import truncateText from "@/utils/truncateText";
import useClickOutside from '@/utils/clickOutside';

const PrintableTenantdData = ({ printableRef, Data }) => {
    const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});
    const [loadingRows, setLoadingRows] = useState({});
    const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));
    const dropdownRefII = useClickOutside(() => setOpenDropdowns({}));

    const handleStatusChange = async (status, dataId, id) => {
    };

    const toggleDropdown = (dataId) => {
    };
    return (
        <div ref={printableRef} className='p-4'>
            <div className="border w-full">
                <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz px-4">
                    <div className="w-[25%]">Tenant</div>
                    <div className="w-[13%] table-cell">Property</div>
                    <div className="w-[17%] table-cell">Address</div>
                    <div className="w-[11%] pl-1 table-cell">Phone No</div>
                    <div className="w-[11%] pl-1 table-cell">Rent</div>
                    <div className="w-[13%] pl-1">Status</div>
                    <div className="w-[10%] table-cell">Due Date</div>
                </div>
                <div className="">
                    {Data &&
                        Data.map((data) => (
                            <div
                                key={data?._id}
                                className="border-b-[1px] items-center flex justify-center w-full gap-2 py-2 px-4"
                            >
                                <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px] w-[25%]">
                                    <div className='min-w-[40px] w-[25%]'>
                                        {!data?.coverPhoto?.url ? (
                                            <div className="min-w-[40px] h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                                                <EmptyAvatar />
                                            </div>
                                        ) : (
                                            <Image
                                                src={data?.coverPhoto?.url}
                                                alt=""
                                                width={40}
                                                height={40}
                                                layout="full" // Specify the desired height
                                                objectFit="cover"
                                                objectPosition="center"
                                                className="object-cover bg-center h-[40px] w-[40px] rounded-full"
                                                priority
                                            />
                                        )}
                                    </div>
                                    <span className="w-[75%] break-words">{data?.fullName}</span>
                                </div>
                                <div className="table-cell text-GrayHomz w-[13%] font-[500] text-[11px] text-start break-words">
                                    {data?.estateId?.name}
                                </div>
                                <div
                                    className="table-cell text-GrayHomz w-[17%] font-[500] text-[11px] text-start break-words">
                                    {data?.estateId?.address}
                                </div>
                                <div className="table-cell text-GrayHomz w-[11%] font-[500] text-[11px] text-start break-words">
                                    {data?.phoneNumber}
                                </div>
                                <div className="table-cell text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                                    {`${data?.rentInfo?.totalRent
                                        ? addCommasToNumber(data?.rentInfo?.totalRent)
                                        : "______"
                                        }`}
                                </div>
                                <div
                                    className={`text-GrayHomz w-[13%] font-[500] text-[11px] text-start`}
                                >
                                    {data?.rentInfo?.paymentStatus ? (
                                        <StatusDropdown
                                            setSelectedStatus={(status) =>
                                                setSelectedStatus((prev) => ({
                                                    ...prev,
                                                    [data._id]: status,
                                                }))
                                            }
                                            value={capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                                            selectedStatus={selectedStatus[data._id] || null}
                                            handleStatusChange={(status) =>
                                                handleStatusChange(status, data._id, data?.rentInfo?._id)
                                            }
                                            isOpen={openDropdowns[data?._id] || false}
                                            toggleDropdown={() => toggleDropdown(data?._id)}
                                            loading={loadingRows[data?._id] || false}
                                            dropdownRef={dropdownRefII}
                                        />
                                    ) : (
                                        "______"
                                    )}
                                </div>
                                <div className="table-cell text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                                    {`${data?.rentInfo?.dueDate
                                        ? changeBackendDateFormat(data?.rentInfo?.dueDate)
                                        : "______"
                                        }`}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default PrintableTenantdData