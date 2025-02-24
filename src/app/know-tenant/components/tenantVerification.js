import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall'
import AccountInfo from '@/pages/dashboard/tenant/profile/accountInfo/accountInfo'
import React from 'react'
import TickSuccess from '@/components/icons/tickSuccess';
import Link from 'next/link';
import LoadingII from '@/components/mainmenu/loadingII';
import usePassportProfileStore from '@/store/tenantStore/usePassportProfile';
import useNINProfileStore from '@/store/tenantStore/useNINProfile';
import InternationalPassport from '@/pages/dashboard/tenant/profile/accountInfo/components/internationalPassport';
import NationalIdentityNumber from '@/pages/dashboard/tenant/profile/accountInfo/components/nationalIdentityNumber';
import { useRouter } from 'next/navigation';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

const TenantVerification = ({ loading: loadingSubmit, setOpenSaveModal, onSubmit, setStep, register, setFormData, formData }) => {
    const router = useRouter()
    const [active, setActive] = React.useState(false)
    const { data, loading: loadingP, fetchData: fetchDataP } = usePassportProfileStore()
    const { data: dataTwo, loading, fetchData } = useNINProfileStore()

    React.useEffect(() => {
        fetchDataP()
        fetchData()
    }, []);

    return (
        <div className='mt-4'>
            <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                <div className="">
                    <div className='mb-4'>
                        <p className='text-[18px] font-[500] text-BlackHomz'>
                            Verify your identity
                        </p>
                        <p className='text-[14px] font-[400] text-GrayHomz'>
                            Select either ‘National Identity Card’ or ‘International Passport’ to complete your verification
                        </p>
                    </div>
                    <div className='flex flex-col-reverse gap-4'>
                        <div>
                            <InternationalPassport passportProfile={data} />
                            <div className={`${data?.verification?.status === "VERIFIED" ? "" : "hidden"} `}>
                                <div className="mt-2 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center">
                                    <TickSuccess />
                                    <div>
                                        Your international passport has successfully been verified. You can now <></>
                                        <Link href="/dashboard/tenant/finance" className="text-BlueHomz">
                                            create a wallet
                                        </Link>{' '}
                                        on your dashboard
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <NationalIdentityNumber nationalProfile={dataTwo} />
                            <div className={`${dataTwo?.face_data?.status === true ? "" : "hidden"} `}>
                                <div className="mt-2 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center">
                                    <TickSuccess />
                                    <div>
                                        Your national identity card has successfully been verified. You can now <></>
                                        <Link href="/dashboard/tenant/finance" className="text-BlueHomz">
                                            create a wallet
                                        </Link>{' '}
                                        on your dashboard
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-0 justify-center md:justify-between md:items-center mt-6 mb-[60px]'>
                <p onClick={() => setOpenSaveModal(true)} className='cursor-pointer text-[16px] text-BlueHomz font-medium text-center md:text-start'>Save & skip to dashboard</p>
                <div className={`flex items-center gap-4 md:gap-3 w-full md:w-auto ${loading && "pointer-events-none"}`}>
                    <button onClick={() => setStep(3)} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} className={`${active ? "text-white bg-[#4bb2e5]" : "text-BlueHomz"} w-[50%] md:w-auto border border-BlueHomz md:border-none rounded-[4px] p-3 flex justify-center items-center gap-1`}>
                        {active ? <ArrowLeftBlueSmall className='#FFFFFF' /> : <ArrowLeftBlueSmall />}
                        Back
                    </button>
                    <button onClick={() => {
                        onSubmit()
                    }} className={`${formData ? "bg-BlueHomz text-white hover:bg-BlueHomz2" : "bg-GrayHomz6 text-GrayHomz5 pointer-events-none"} w-[50%] md:w-auto p-3 rounded-[4px]  ${loading ? "pointer-events-none w-full flex justify-center" : ""} `}>
                        {loadingSubmit ? <LoadingFormII /> : "Complete Registration"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TenantVerification