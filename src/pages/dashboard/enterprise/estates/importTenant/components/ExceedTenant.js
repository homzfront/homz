import React, { useState } from 'react'
import Warning from "@/components/icons/warning";
import { useRouter } from "next/navigation";
import ArrowLeft from "@/components/icons/arrowLeft";
import ArrowRightLine from "@/components/icons/arrowRightLine";
import useCSVFileStore from '@/store/document/useCSVFileStore';

const ExceedTenant = ({setShowNumberOfHouseModal, estateData}) => {
    const [arrowColor, setArrowColor] = useState(false);
    const [arrowColorII, setArrowColorII] = useState(false);
    const router = useRouter();
    const { CSVFile } = useCSVFileStore();

    const handlePageTwo = () => {
        router.push(`/dashboard/enterprise-property/estates/estateInfo/${estateData?._id}`);
        // setShowNumberOfHouseModal(false)
    }

    return (<div className="text-[16px] text-GrayHomz rounded-md font-normal w-[360px] p-7 md:w-[600px] bg-white flex flex-col gap-4 justify-center items-center text-center">
        <Warning />
        <p className="text-[20px] text-BlackHomz font-semibold">
            Unable to Import Tenants
        </p>
        <div className="flex flex-col gap-3">
            <span>The number of tenants you are trying to import exceeds the available houses registered for this property.</span>
            <div>
                <span> <span className="bg-GrayHomz w-[5px] flex-1 h-[5px] rounded-full"></span>{`Number of Tenants in CSV File: [${CSVFile?.length}]`}</span><br/>
                <span> <span className="bg-GrayHomz w-[5px] flex-1 h-[5px] rounded-full"></span> {`Number of Registered Houses: [${estateData?.numberOfHouses}]`}</span>
            </div>

            <span>To proceed, you need to update the property information and increase the number of  houses.</span>
        </div>
        <div className="w-full flex flex-col gap-1">
            <button
                onClick={handlePageTwo}
                onMouseEnter={() => setArrowColorII(true)}
                onMouseLeave={() => setArrowColorII(false)}
                className="bg-BlueHomz w-full text-white rounded-[4px] flex justify-center items-center gap-2 hover:text-BlueHomz hover:border hover:border-BlueHomz hover:bg-white font-[500] text-[16px] h-[48px]">
                Update property information {arrowColorII ? <ArrowRightLine className="#006aff" /> : <ArrowRightLine />}
            </button>
            <div className="mt-4 text-[12px] md:text-[14px]">
                <button
                    onClick={() => 
                        setShowNumberOfHouseModal(false)
                    }
                    onMouseEnter={() => setArrowColor(true)}
                    onMouseLeave={() => setArrowColor(false)}
                    className="h-[48px] w-full hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz"
                >
                    <span className="flex justify-center items-center gap-2">
                        {arrowColor ? <ArrowLeft className="#006AFF" /> : <ArrowLeft />}
                        Go back </span>
                </button>
            </div>
        </div>
    </div>
    )
}

export default ExceedTenant