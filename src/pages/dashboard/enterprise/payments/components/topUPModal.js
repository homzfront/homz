import { WalletTopUp } from '@/api/enterpriseManagerService';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const TopUPModal = ({ closeTopUpModal }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const Router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount != Number(amount)) {
            setError("Input digits");
            return;
        } else {
            setLoading(true);
            try {
                const { success, error, upDateddata } = await WalletTopUp(
                    amount,
                );
                if (success) {
                    setLoading(false);
                    Router.push(upDateddata?.data?.data?.authorization_url)
                } else {
                    setLoading(false);
                    if (
                        error?.response?.data?.error?.errors &&
                        error.response.data.error.errors.length > 0
                    ) {
                        const errorMessage = error.response.data.error.errors[0];
                        setError(`Update failed: ${errorMessage}`);
                    } else if (error?.response?.data?.message) {
                        const errorMessage = error.response.data.message;
                        setError(`Update failed: ${errorMessage}`);
                    } else {
                        setError("Update failed");
                    }
                }
            } catch (error) {
                setLoading(false);
            }
        }
    };



    return (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30 px-4 md:px-0">
            <div className="h-auto w-full md:w-[530px] bg-white rounded-lg p-8">
                <div
                    onClick={closeTopUpModal}
                    className="cursor-pointer flex w-full justify-between items-center"
                >
                    <p className='text-BlueHomz text-[14px] font-[500]'>Top Up Your Wallet</p>
                    <Image
                        src={
                            "/static/dashboard/enterprisemanager/payment/close-square.png"
                        }
                        alt=""
                        height={24}
                        width={24}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className='text-[13px] font-[400] text-GrayHomz w-[90%]'>
                            Enter the amount you want to top your wallet with. Amount will reflect on your wallet balance.
                        </p>
                    </div>
                    <div>
                        <p className='text-[14px] font-[500] text-BlackHomz'>
                            Amount  (₦)
                        </p>
                    </div>
                    <div className="">
                        <input
                            type="text"
                            name="amount"
                            value={amount}
                            placeholder='000000000'
                            className='w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]'
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setError(null);
                            }}
                        />
                        {error && (
                            <p className="text-red-500 text-[12px] mt-1">{error}</p>
                        )}
                    </div>
                    <div className='w-full'>
                        {amount !== '' ?
                            <button
                                onClick={handleSubmit}
                                className={`${loading ? "pointer-events-none w-full flex justify-center items-center" : ""} w-full bg-BlueHomz font-[700] text-[16px] h-[48px] rounded-[4px] text-white`}
                            >
                                {loading ? <LoadingFormII /> : "Top Up"}
                            </button> :
                            <button className='w-full pointer-events-none bg-GrayHomz6 text-GrayHomz5 font-[700] text-[16px] h-[48px] rounded-[4px]'>
                                Top Up
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopUPModal