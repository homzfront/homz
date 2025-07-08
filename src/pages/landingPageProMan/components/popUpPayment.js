import BlueThickArrow from '@/components/icons/blueThickArrow'
import Close from '@/components/icons/Close'
import PlanCard from '@/components/icons/planCard'
import SendTwo from '@/components/icons/sendTwo'
import Warning from '@/components/icons/warning'
import React from 'react'
import useOpenPaymentType from "@/store/enterpriseStore/useOpenPaymentType.js";
import CloseSmall from '@/components/icons/closeSmall'
import GreenActive from '@/components/icons/greenActive'
import Referral from '@/components/icons/referral'
import ReferralCodeModal from './referralCodeModal'
import useEnterprisePlans from '@/store/enterpriseStore/enterprisePlans'
import { useRouter } from 'next/navigation'

const PopUpPayment = ({ profile }) => {
    console.log(profile)
    const router = useRouter();
    const [openProcess, setOpenProcess] = React.useState(false);
    const { fetchData: fetchEnterprisePlans } =
        useEnterprisePlans();
    const [referralModal, setReferralModal] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(true);
    const { isMonthlyData, setIsOpenModal, setOpenCardPayment, setIsMonthlyData, setIsBiAnnaullyData, setIsAnnaullyData, setOpenTransferPayment, error, setError, setOpenErrorAgain, openAgain, setOpenAgain, openErrorAgain } = useOpenPaymentType();
    const active = (
        <div className='ml-2 h-[28px] w-[72px] bg-[#ABDDC6] flex justify-center items-center font-medium text-[13px] text-[#039855] gap-0.5 rounded-[4px]'>
            <p>Active</p>
            <div className=''>
                <GreenActive />
            </div>
        </div>
    )

    React.useEffect(() => {
        fetchEnterprisePlans()
    }, []);

    return (
        <div className='rounded-[12px] bg-white p-4'>
            {error ?
                <div className="bg-white w-[620px] rounded-[12px] p-6 flex flex-col gap-2">
                    <p className="text-[20px] text-BlackHomz font-[700] text-center">
                        Pay with Bank Transfer
                    </p>
                    <p className="mt-2 text-center">
                        By choosing Bank Transfer, your subscription will no longer be recurring. You will need to manually renew it when it expires.
                    </p>
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => {
                                setOpenAgain(true)
                                setOpenTransferPayment(true)
                            }}
                            className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500]"
                        >
                            Proceed
                        </button>
                        <button
                            onClick={() => {
                                setIsOpenModal(false)
                                setOpenProcess(false)
                                setOpenCardPayment(false)
                                setIsMonthlyData(null)
                                setOpenTransferPayment(false)
                                setIsBiAnnaullyData(null)
                                setIsAnnaullyData(null)
                                setError(null)
                                setOpenErrorAgain(false)
                                setOpenAgain(false)
                            }}
                            className="mt-4 h-[48px] rounded-md w-full hover:border hover:border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                        >
                            Go Back
                        </button>
                    </div>
                </div> :
                openProcess ?
                    <div className='w-[460px] font-normal text-GrayHomz flex flex-col gap-4'>
                        <div className="flex flex-col gap-4 justify-center items-center text-center">
                            <Warning />
                        </div>
                        <p className='text-[14px] sm:text-[16px] text-center'>
                            Your Enterprise plan will be activated immediately your payment is confirmed.
                        </p>
                        <div className="text-[12px] sm:text-[14px]">
                            <button
                                onClick={() => {
                                    setIsOpenModal(false)
                                    setOpenProcess(false)
                                    setOpenCardPayment(false)
                                    setIsMonthlyData(null)
                                    setOpenTransferPayment(false)
                                    setIsBiAnnaullyData(null)
                                    setIsAnnaullyData(null)
                                    setError(null)
                                    setOpenErrorAgain(false)
                                    setOpenAgain(false)
                                }}
                                className="h-[48px] w-full hover:rounded-[4px] text-BlueHomz hover:border hover:border-BlueHomz"
                            > close
                            </button>
                        </div>
                    </div>
                    : referralModal ?
                        <ReferralCodeModal setReferralModal={setReferralModal} /> :
                        <div className='w-[460px]'>
                            <div className='flex items-start justify-between'>
                                <div className='flex flex-col gap-0'>
                                    <p className='text-BlackHomz text-[18px] sm:text-[20px] font-bold'>
                                        Payment Methods
                                    </p>
                                    <p className='text-GrayHomz text-[12px] sm:text-[14px] font-normal'>
                                        Select your preferred payment method
                                    </p>
                                </div>
                                <div
                                    onClick={() => {
                                        setIsOpenModal(false)
                                        setOpenProcess(false)
                                        setOpenTransferPayment(false)
                                        setOpenCardPayment(false)
                                        setIsMonthlyData(null)
                                        setIsBiAnnaullyData(null)
                                        setIsAnnaullyData(null)
                                        setError(null)
                                        setOpenAgain(false)
                                        setOpenErrorAgain(false)
                                    }}
                                    className="z-20  cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
                                >
                                    <Close />
                                </div>
                            </div>
                            <div className='mt-4 flex flex-col gap-2'>
                                <div onClick={() => setOpenCardPayment(true)} className='cursor-pointer bg-whiteblue p-2 rounded-[4px] flex justify-between items-start'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-[49.5px] h-[49.5px] flex justify-center items-center min-w-[49.5px] min-h-[49.5px]'>
                                            <PlanCard />
                                        </div>
                                        <div>
                                            <p className='text-BlueHomz text-[14px] sm:text-[16px] font-[500] flex items-centers'>
                                                Pay with Card {profile?.subscriptionType === "recurring" && active}
                                            </p>
                                            <p className='text-GrayHomz text-[12px] sm:text-[14px] font-normal'>
                                                Pay via your debit/credit card
                                            </p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <BlueThickArrow />
                                    </div>
                                </div>
                                {
                                    isOpen && profile?.subscriptionType && profile?.subscriptionType !== "free_trial" &&
                                    <div className='p-2 rounded-[4px] bg-[#F6F6F6] text-GrayHomz font-normal text-[13px] flex w-full justify-between items-center'>
                                        Your subscription is running with {profile.subscriptionType === "recurring" ? "card payment" : "transfer payment"}
                                        <span className='cursor-pointer' onClick={() => setIsOpen(false)}>
                                            <CloseSmall />
                                        </span>
                                    </div>
                                }
                                <div onClick={() => setOpenTransferPayment(true)} className='cursor-pointer bg-whiteblue p-2 rounded-[4px] flex justify-between items-start'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-[49.5px] h-[49.5px] flex justify-center items-center min-w-[49.5px] min-h-[49.5px]'>
                                            <SendTwo />
                                        </div>
                                        <div>
                                            <p className='text-BlueHomz text-[14px] sm:text-[16px] font-[500] flex items-centers'>
                                                Pay with Bank Transfer {profile?.subscriptionType === "one-time" && active}
                                            </p>
                                            <p className='text-GrayHomz text-[12px] sm:text-[14px] font-normal'>
                                                Transfer from your local bank account
                                            </p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <BlueThickArrow />
                                    </div>
                                </div>
                            </div>
                            {!isMonthlyData && <div className='flex gap-1 items-center mt-4'>
                                <Referral />
                                <h3 className='text-[16px] text-GrayHomz font-normal'>Have a referral code?
                                    <button
                                        onClick={() => {
                                            if (profile) {
                                                setReferralModal(true);
                                            }
                                            else {
                                                router.push('/register')
                                            }
                                        }} className='text-BlueHomz'>Proceed here</button>
                                </h3>
                            </div>
                            }
                        </div>
            }
        </div>
    )
}

export default PopUpPayment