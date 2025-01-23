import ArrowLeft from '@/components/icons/arrowLeft';
import ArrowRightLine from '@/components/icons/arrowRightLine';
import Warning from '@/components/icons/warning';
import useCSVFileStore from '@/store/document/useCSVFileStore';
import React from 'react'
import WithoutNameAnEmail from './withoutNameAnEmail';
import WithoutRentInfo from './withoutRentInfo';
import { transformData } from '@/utils/transformData';
import api from '@/utils/api';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

const ImportSummary = ({ setShowMappingSummaryModal, estateId, unimportedTenantRentModal, setUnimportedTenantRentModal, unimportedTenantModal, setUnimportedTenantModal, setSuccessfulModal }) => {
    const {
        mappedData,
        setWithoutNameAEmail,
        setWithoutRentInfo,
        withoutNameAEmail,
        withoutRentInformation,
        response,
        setResponse,
        setOpenMapping
    } = useCSVFileStore();
    const [arrowColor, setArrowColor] = React.useState(false);
    const [arrowColorII, setArrowColorII] = React.useState(false);
    const [finalData, setFinalData] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState(null);


    // Function to validate email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Filter the data without valid email or no email and tenant name
    const withoutEmailName = mappedData?.filter(item => {
        const hasNoName = !item['Tenant Name'];
        const hasInvalidEmail = !item.Email || !isValidEmail(item.Email);
        return hasNoName || hasInvalidEmail;
    });

    const remainingData = mappedData?.filter(item => {
        const hasName = !!item['Tenant Name'];
        const hasValidEmail = item.Email && isValidEmail(item.Email);
        return hasName && hasValidEmail;
    });

    // Fliter the data without rent information
    const withoutRentInf = mappedData?.filter(item => {
        const hasNoApart = !item['Apartment No'];
        const hasNoPropertyType = !item['Property Type'];
        const hasNoStartData = !item['Start Date'];
        const hasNoDuration = !item['Rent Duration'];
        const hasNoRentAmount = !item['Rent Amount'];
        return hasNoApart || hasNoPropertyType || hasNoStartData || hasNoDuration || hasNoRentAmount;
    });

    React.useEffect(() => {
        if (withoutRentInf) {
            setWithoutRentInfo(withoutRentInf)
        }
        if (withoutEmailName) {
            setWithoutNameAEmail(withoutEmailName)
        }
    }, [mappedData])

    React.useEffect(() => {
        setFinalData(transformData(mappedData))
    }, [mappedData])

    const submitData = async () => {
        setLoading(true)
        try {
            const response = await api.post(
                `/tenants/invitation/estate/${estateId}/bulk-tenant-upload`,
                { "tenantsData": finalData });
            if (response?.data?.success) {
                setSuccessfulModal(true)
                setShowMappingSummaryModal(false);
                setResponse(response?.data);
            }
        } catch (error) {
            if (error && error?.response?.data?.error?.errors) {
                // Assign backend errors to state
                setErrors(error?.response?.data?.error?.errors);
            } else if (error && error?.response?.data?.message) {
                // If there's a general message
                setErrors(error?.response?.data?.message);
            } else {
                // If the error is not in the expected format, rethrow it
                throw error;
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className={`rounded-md p-7 bg-white ${loading && 'pointer-events-none'}`}>
                {unimportedTenantModal ?
                    <WithoutNameAnEmail setUnimportedTenantModal={setUnimportedTenantModal} /> :
                    unimportedTenantRentModal ?
                        <WithoutRentInfo setUnimportedTenantRentModal={setUnimportedTenantRentModal} /> :
                        <div className='w-[360px] lg:w-[600px] font-normal text-[16px] text-GrayHomz flex flex-col gap-4'>
                            <div className="flex flex-col gap-4 justify-center items-center text-center">
                                <Warning />
                                <p className="text-[20px] text-BlackHomz font-semibold">
                                    Import Summary
                                </p>
                            </div>
                            <div className='font-normal flex flex-col gap-2'>
                                <div className={`flex flex-col gap-2 bg-[#F6F6F6] px-6 py-3 rounded-[8px] ${withoutEmailName?.length === 0 && "hidden"}`}>
                                    <span className='text-BlackHomz text-[16px]'>Tenant Name and Email are missing for [{withoutEmailName?.length}] tenants.</span>
                                    <span className="text-GrayHomz text-[14px]">These tenants will not be imported and will not receive invitation mails until the required fields are filled and mapped.</span>
                                    <span onClick={() => setUnimportedTenantModal(true)} className='text-BlueHomz text-[13px] cursor-pointer'>View tenants</span>
                                </div>
                                <div className={`flex flex-col gap-2 bg-[#F6F6F6] px-6 py-3 rounded-[8px] ${withoutRentInformation?.length === 0 && "hidden"}`}>
                                    <span className='text-BlackHomz text-[16px]'>Rent information is incomplete/unmapped for [{withoutRentInformation?.length}] tenants.</span>
                                    <span className="text-GrayHomz text-[14px]">Tenants without rent details will be imported, but their rent information will not be added. Please remap the data to include all required rent details or upload a new CSV file containing the complete rent information.</span>
                                    <span onClick={() =>{
                                        setShowMappingSummaryModal(false)
                                        setOpenMapping(true)
                                        }} className='text-BlueHomz text-[13px] cursor-pointer'>Re-map data</span>
                                </div>
                            </div>
                            <div className='text-start'>
                                <div className='hidden lg:block'>
                                    [{mappedData ? mappedData?.length - withoutEmailName?.length : 0}]
                                    <span className='font-[400] pl-0.5 pr-1'>
                                        Tenants to be imported
                                    </span>
                                    |
                                    <span className='text-[#D92D20] pr-0.5 pl-1'>
                                        [ {withoutEmailName ? withoutEmailName?.length : 0}]
                                        <span className='text-[#DF5045] font-[400] pl-0.5'>
                                            Tenants to be skipped
                                        </span>
                                    </span>
                                </div>
                                <div className='lg:hidden'>
                                    <span>
                                        [{mappedData ? mappedData?.length - withoutEmailName?.length : 0}]
                                        <span className='font-[400] pl-0.5'>
                                            Tenants to be imported
                                        </span>
                                    </span>
                                    <br />
                                    <span>
                                        <span className='text-[#D92D20]'>
                                            [ {withoutEmailName ? withoutEmailName?.length : 0}]
                                            <span className='text-[#DF5045] font-[400] pl-0.5 mt-1'>
                                                Tenants to be skipped
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            {
                                errors && <div className='text-[12px] italic text-red-600 font-normal'>
                                    {errors}
                                </div>
                            }
                            <div className="w-full flex flex-col gap-1">
                                <button
                                    onClick={submitData}
                                    type='button'
                                    onMouseEnter={() => setArrowColorII(true)}
                                    onMouseLeave={() => setArrowColorII(false)}
                                    className={` bg-BlueHomz w-full text-white rounded-[4px] hover:text-BlueHomz hover:border hover:border-BlueHomz hover:bg-white font-[500] text-[16px] h-[48px] ${loading ? "pointer-events-none w-full flex justify-center" : ""} `}>
                                    {loading ? (
                                        <LoadingFormII />
                                    ) : (
                                        <div className='flex justify-center items-center gap-2'>
                                            Proceed {arrowColorII ? <ArrowRightLine className="#006aff" /> : <ArrowRightLine />}
                                        </div>
                                    )}

                                </button>
                                <div className="text-[12px] md:text-[14px]">
                                    <button
                                        onClick={() =>
                                            setShowMappingSummaryModal(false)
                                        }

                                        onMouseEnter={() => setArrowColor(true)}
                                        onMouseLeave={() => setArrowColor(false)}
                                        className="h-[48px] w-full hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz"
                                    >
                                        <span className="flex justify-center items-center gap-2">
                                            {arrowColor ? <ArrowLeft className="#006AFF" /> : <ArrowLeft />}
                                            Cancel </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ImportSummary