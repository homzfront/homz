import React, { useEffect } from 'react'
import TickSuccess from '@/components/icons/tickSuccess';
import Link from 'next/link';
import LoadingII from '@/components/mainmenu/loadingII';
import usePassportProfileStore from '@/store/propertyOwnerStore/usePassportProfile';
import useNINProfileStore from '@/store/propertyOwnerStore/useNINProfile';
import InternationalPassport from './components/internationalPassport';
import NationalIdentityNumber from './components/nationalIdentityNumber';


const AccountInfo = () => {
    const { data, loading, fetchData: fetchDataP } = usePassportProfileStore()
    const { data: dataTwo, fetchData } = useNINProfileStore()

    useEffect(() => {
        fetchDataP()
        fetchData()
    },[]);

    return (
        <div>
            {
                loading ? <LoadingII /> :
                    <div className="mt-8">
                        <div className="border-t py-8">
                            <div className='mb-4'>
                                <p className='text-[18px] font-[500] text-BlackHomz'>
                                    Verify your identity
                                </p>
                                <p className='text-[14px] font-[400] text-GrayHomz'>
                                    Choose either ‘International Passport’ or ‘National Identity Card’ to complete your verification
                                </p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div>
                                    <InternationalPassport passportProfile={data} />
                                    <div className={`${data?.verification?.status === "VERIFIED" ? "" : "hidden"} `}>
                                        <div className="mt-2 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center">
                                            <TickSuccess />
                                            <div>
                                                Your international passport has successfully been verified. You can now <></>
                                                <Link href="/dashboard/property-owner/payments?tab=wallet" className="text-BlueHomz">
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
                                                <Link href="/dashboard/property-owner/payments?tab=wallet" className="text-BlueHomz">
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
            }
        </div>
    )
}

export default AccountInfo;