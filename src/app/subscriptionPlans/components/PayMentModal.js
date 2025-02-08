import React from "react";
import CustomizedModal from "./CustomizedModal";
import Image from "next/image";

const PayMentModal = () => {
  return <CustomizedModal isOpen={isOpen}>
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
                                setOpenCardPayment(false)
                                setOpenTransferPayment(false)
                                setIsMonthlyData(null)
                                setIsBiAnnaullyData(null)
                                setIsAnnaullyData(null)
                            }}
                            className="z-20  cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
                        >
                            <Close />
                            <Image
                                    src="/static/images/Featured_icon.svg"
                                    height={48}
                                    width={48}
                                    alt=""
                                  />
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col gap-2'>
                        <div className='bg-whiteblue p-2 rounded-[4px] flex justify-between items-start'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-BlueHomz rounded-md w-[49.5px] h-[49.5px] flex justify-center items-center min-w-[49.5px] min-h-[49.5px]'>
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
                            <div className='cursor-pointer' onClick={() => setOpenCardPayment(true)}>
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
                        <div className='bg-whiteblue p-2 rounded-[4px] flex justify-between items-start'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-BlueHomz rounded-md w-[49.5px] h-[49.5px] flex justify-center items-center min-w-[49.5px] min-h-[49.5px]'>
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
                            <div className='cursor-pointer' onClick={() => setOpenTransferPayment(true)}>
                                <BlueThickArrow />
                            </div>
                        </div>
                    </div>
                </div>



  </CustomizedModal>;
};

export default PayMentModal;
