import Add from '@/components/icons/add';
import MobileBackButton from '@/components/icons/mobileBackButton';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import MaintenanceRequest from '../maintenanceRequest/maintenanceRequest';
import formatDateII from '@/utils/formatDateII';
import lowerCaseData from '@/utils/lowerCaseData';
import FilterMobile from '../../../components/filterMobile';
import WidgetMobile from '../widget/widgetMobile';

const RequestMobile = ({ data, maintenanceReq, closeMaintenanceForm, fetchData, openMaintenanceForm }) => {
    const route = useRouter()
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null)
    const [filterModal, setFilterModal] = useState(false);

    const goBack = () => {
        route.back();
    };

    const openMobileFilterModal = () => {
        setFilterModal(!filterModal)
    }

    const closeMobileFilterModal = () => {
        setFilterModal(false)
    }

    const clear = () => {
        setSelectedStatus(null);
        setSelectedDate(null)
        setSearchQuery(null)
    };

    const options = ["Pending", "In-progress", "Resolved"];

    const filteredData = data?.filter(
        (data) => {
            const matchesSearchQuery = !searchQuery ||
                data?.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const selectedDateTimestamp = Date.parse(selectedDate);
            const dueDateTimestamp = Date.parse(formatDateII(data?.requestDate));
            return (
                (!selectedStatus || data?.status === lowerCaseData(selectedStatus)) &&
                (!selectedDate || selectedDateTimestamp <= dueDateTimestamp) && matchesSearchQuery
            );
        });

    return (
        <div className='md:hidden'>
            {filterModal &&
                <div>
                    <FilterMobile
                        reset={clear}
                        closeMobileModal={closeMobileFilterModal}
                        setSelectedDate={setSelectedDate}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        options={options}
                    />
                </div>
            }
            {maintenanceReq ? (
                <div>
                    <MaintenanceRequest
                        closeMaintenanceForm={closeMaintenanceForm}
                        data={data}
                        fetchData={fetchData}
                    />
                </div>
            ) : (
                <div className='p-8'>
                    <div className='flex w-full md:hidden gap-4 items-center'>
                        <div onClick={goBack} className='cursor-pointer'>
                            <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
                                <MobileBackButton />
                            </div>
                        </div>
                        <div className="w-[90%] flex items-center justify-between">
                            <div className='flex gap-2 items-center'>
                                <div
                                    className="p-1 bg-whiteblue text-BlueHomz rounded-[8px]"
                                >
                                    {filteredData?.length ? filteredData?.length : "0"}
                                </div>
                                <div className="text-[16px] font-[400] text-BlackHomz">
                                    Maintenance Request
                                </div>
                            </div>
                            <div onClick={openMaintenanceForm}>
                                <Add />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between md:hidden w-full">
                        <div className="relative w-[86%] rounded-[4px]">
                            <input
                                type="text"
                                className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full "
                                id="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search subject"
                            />
                            <Image
                                src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
                                alt=""
                                className="absolute top-3 left-3"
                                height={16}
                                width={16}
                            />
                        </div>
                        <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
                            <button
                                onClick={openMobileFilterModal}
                            >
                                <Image
                                    src="/static/images/filter.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                />
                            </button>
                        </div>
                    </div>
                    <div>
                        <WidgetMobile data={filteredData} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default RequestMobile