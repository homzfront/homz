import { enterpriseUserWallet } from '@/api/enterpriseManagerService';
import React, { useEffect, useState } from 'react'
import Input from "../../components/input";
import PinCodeForm from './components/pinCodeForm';
import useBodyScroll from '@/utils/useBodyScroll';


const AccountInfo = () => {
    const [data, setData] = useState(null);
    const [pinCodeForm, setPinCodeForm] = useState(false);
    useBodyScroll([pinCodeForm]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await enterpriseUserWallet();
                setData(response?.data);
            } catch (error) {
                //   console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const openPinCodeChangeForm = () => {
        setPinCodeForm(!pinCodeForm);
    };

    const closeForm = () => {
        setPinCodeForm(false);
    };

    return (
        <div className="mt-8">
            {
                pinCodeForm && <PinCodeForm closeForm={closeForm} />
            }
            <div className="w-[498px] flex gap-4 flex-col">
                <Input
                    label={"BVN"}
                    placeholder={"0000000000"}
                    type={"text"}
                    value={data?.bvnDetails?.bvn ? data?.bvnDetails?.bvn : "----------"}
                />
                <Input
                    label={"Account Number"}
                    placeholder={"0000000000"}
                    type={"text"}
                    value={data?.topUpAccountDetails?.accountNumber ? data?.topUpAccountDetails?.accountNumber : "----------"}
                />
                <Input
                    label={"Account Name"}
                    placeholder={"0000000000"}
                    type={"text"}
                    value={data?.topUpAccountDetails?.accountName ? data?.topUpAccountDetails?.accountName : "----------"}
                />
                <div>
                    <label className="text-[14px] font-[500]">
                        Transaction Pin
                    </label>
                    <div className='relative'>
                        <input
                            className="border mt-2 rounded-md p-3 h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]"
                            type="text"
                            placeholder={"****"}
                            value={data ? "****" : "----------"}
                        />
                        <p onClick={openPinCodeChangeForm} className='absolute cursor-pointer text-warning2 text-[11px] font-[500] top-[22px] right-4'>
                            Change
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;