import BlueThickArrow from '@/components/icons/blueThickArrow'
import Close from '@/components/icons/Close'
import PlanCard from '@/components/icons/planCard'
import SendTwo from '@/components/icons/sendTwo'
import Warning from '@/components/icons/warning'
import React from 'react'
import useOpenPaymentType from "@/store/enterpriseStore/useOpenPaymentType.js";
import Referral from '@/components/icons/referral'
import useEnterprisePlans from '@/store/enterpriseStore/enterprisePlans'
import ReferralCodeModal from '@/pages/landingPageProMan/components/referralCodeModal'


const PopUpPayment = () => {
    const [openProcess, setOpenProcess] = React.useState(false);
    const { fetchData: fetchEnterprisePlans } =
        useEnterprisePlans();
    const [referralModal, setReferralModal] = React.useState(false);
    const { isMonthlyData, setIsOpenModal, setOpenCardPayment, setIsMonthlyData, setIsBiAnnaullyData, setIsAnnaullyData, setOpenTransferPayment } = useOpenPaymentType();

    React.useEffect(() => {
        fetchEnterprisePlans()
    }, []);
    return (
        <div className='w-full sm:w-[450px] rounded-[12px] bg-white p-4'>
            {openProcess ?
                <div className='w-full font-normal text-GrayHomz flex flex-col gap-4'>
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
                            }}
                            className="h-[48px] w-full hover:rounded-[4px] text-BlueHomz hover:border hover:border-BlueHomz"
                        > close
                        </button>
                    </div>
                </div>
                : referralModal ?
                    <ReferralCodeModal setReferralModal={setReferralModal} fromSIgnUp={true} /> :

                    <div className='w-full'>
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
                                        <p className='text-BlueHomz text-[14px] sm:text-[16px] font-[500]'>
                                            Pay with Card
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
                            <div onClick={() => setOpenTransferPayment(true)} className='cursor-pointer bg-whiteblue p-2 rounded-[4px] flex justify-between items-start'>
                                <div className='flex items-center gap-2'>
                                     <div className='w-[49.5px] h-[49.5px] flex justify-center items-center min-w-[49.5px] min-h-[49.5px]'>
                                            <SendTwo />
                                        </div>
                                    <div>
                                        <p className='text-BlueHomz text-[14px] sm:text-[16px] font-[500]'>
                                            Pay with Bank Transfer
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
                                                setReferralModal(true);
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