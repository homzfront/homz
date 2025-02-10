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
import UpdateButton from '../../components/updateButton';

const TenantVerification = ({ setStep, register, setFormData, formData }) => {
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
            <UpdateButton />
        </div>
    )
}

export default TenantVerification