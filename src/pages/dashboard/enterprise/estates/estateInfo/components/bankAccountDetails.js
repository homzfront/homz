import React, { useEffect, useState } from 'react'
import LoadingForm from "@/components/mainmenu/loadingForm";
import BankSelect from "./selectBank";
import { bankCodes, VerifyBank } from "@/api/bankCodes";

const BankAccountDetails = ({ id }) => {
    const [accountNo, setAccountNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [errorName, setErrorName] = useState('')
    const [loadingBank, setLoadingBank] = useState(false)
    const [banks, setBanks] = useState([]);

    const fetchData = async () => {
        const data = await bankCodes();
        setBanks(data)
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        const fetchBankName = async () => {
            try {
                if (accountNo.length === 10 && bankName) {
                    setLoadingBank(true)
                    const { success, data, error } = await VerifyBank(accountNo, bankName);
                    if (success) {
                        setAccountName(data?.account_name);
                        setLoadingBank(false)
                    } else {
                        setLoadingBank(false)
                        if (
                            error?.response?.data?.error?.errors &&
                            error.response.data.error.errors.length > 0
                        ) {
                            const errorMessage = error.response.data.error.errors[0];
                            setErrorName(`${errorMessage}`);
                        } else if (error?.response?.data?.message) {
                            const errorMessage = error.response.data.message;
                            setErrorName(`${errorMessage?.message}`);
                        } else {
                            setError("Update failed");
                        }
                    }
                }
            } catch (error) {
                setLoadingBank(false)
                if (
                    error?.response?.data?.error?.errors &&
                    error.response.data.error.errors.length > 0
                ) {
                    const errorMessage = error.response.data.error.errors[0];
                    setErrorName(`${errorMessage}`);
                } else if (error?.response?.data?.message) {
                    const errorMessage = error.response.data.message;
                    setErrorName(`${errorMessage}`);
                } else {
                    setError("Update failed");
                }
            }
        };

        fetchBankName();
    }, [accountNo, bankName]);


    return (
        <div className='border-t w-full p-8'>
            <div className='flex flex-col w-full gap-1'>
                <p className='text-[14px] md:text-[18px] font-[400] text-GrayHomz'>
                    Ensure you provide the right details to your active bank account
                </p>
                <p className='text-[13px] md:text-[16px] font-[400] text-GrayHomz2'>
                    (Account provided will be an alternative account for tenants to pay their rents)
                </p>
            </div>
            <div className="mt-2">
                <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
                    <div className='w-[100%]'>
                        <label className="text-[13px] md:text-[14px] font-[500]">
                            Account Number
                        </label>
                        <input
                            className="border mt-2 rounded-md px-3 flex items-center h-[45px] w-full placeholder:text-[13px] placeholder:text-GrayHomz2 md:placeholder:text-[14px] placeholder:font-[500]"
                            type="text"
                            placeholder={"e.g  1524368709"}
                            onChange={(e) => {
                                setAccountNo(e.target.value);
                                setAccountName('')
                                setErrorName('')
                            }}
                            value={accountNo}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[100%] md:ml-4 mt-2">
                        <h1 className="text-[14px] font-[500]">Bank Name</h1>
                        <BankSelect
                            banks={banks?.data}
                            setSelectedBank={setBankName}
                            selectedBank={bankName}
                            setErrorName={setErrorName}
                        />
                    </div>
                    <div className="w-[100%]">
                        <label className="text-[14px] font-[500]">
                            Account Name
                        </label>
                        <div
                            className={`border mt-2 rounded-md h-[45px] px-3 w-full flex items-center truncate ${loadingBank ? "justify-center" : "justify-start"}`}>

                            {
                                loadingBank ? <LoadingForm /> : accountName ? accountName : "Account Name"}
                        </div>
                    </div>
                </div>
                {
                    errorName && (
                        <span className="text-[10px] text-red-500 italic">
                            {errorName}
                        </span>
                    )
                }
            </div>
            <div className="mt-[10%] flex justify-end">
                <button
                    //   onClick={updateDone}
                    className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center"
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default BankAccountDetails