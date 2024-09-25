import MobileBackButton from '@/components/icons/mobileBackButton';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import FilterMobile from '../../components/filterMobile';

const HeaderMobile = ({
    searchQuery,
    setSearchQuery,
    options,
    selectedStatus,
    setSelectedStatus,
    setSelectedDate,
    clear,
    filteredData
}) => {
    const [filterModal, setFilterModal] = useState(false);
    const route = useRouter()
    const goBack = () => {
        route.back();
    };

    const openMobileFilterModal = () => {
        setFilterModal(!filterModal)
    }

    const closeMobileFilterModal = () => {
        setFilterModal(false)
    }

    return (
        <div className='md:hidden pt-8 pb-4 px-4'>
            <CustomizedModal isOpen={filterModal}>
                <FilterMobile
                    reset={clear}
                    closeMobileModal={closeMobileFilterModal}
                    setSelectedDate={setSelectedDate}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    options={options}
                />
            </CustomizedModal>
            <div className='flex w-full md:hidden gap-4 items-center'>
                <div onClick={goBack} className='cursor-pointer'>
                    <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
                        <MobileBackButton />
                    </div>
                </div>
                <div className="w-[80%] flex items-center justify-center">
                    <div className="flex gap-2">
                        <p className="font-[500] text-[20px]">Notifications</p>
                        <div className="bg-whiteblue w-8 h-8 flex items-center justify-center rounded-md">
                            <p className="font-[400] text-[18px] text-BlueHomz">
                                {filteredData?.length ? filteredData?.length : "0"}
                            </p>
                        </div>
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
                        placeholder="Search"
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
        </div>
    )
}

export default HeaderMobile