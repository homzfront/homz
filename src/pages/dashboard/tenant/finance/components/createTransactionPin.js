import { enterprisePinCreation } from '@/api/enterpriseManagerService';
import BashedEye from '@/components/icons/BashedEye';
import Eye from '@/components/icons/Eye';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/confirmModal';
import LoadingForm from '@/components/mainmenu/loadingForm';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import { enterpriseWalletTenantCreation, tenantPinCreation } from '@/api/tenantSevice';
import Image from 'next/image';

const CreateTransactionPin = ({ closeForm, fetchDataAgain }) => {
    const [username, setUsername] = useState('')
    const [inputError, setInputError] = useState(false);
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const [visibleII, setVisibleII] = useState(false);
    const [loading, setLoading] = useState(false)
    const [successModal, setSuccessModal] = useState(false)

    const Visible = () => {
        setVisible(!visible);
    };

    const VisibleII = () => {
        setVisibleII(!visibleII)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password != Number(password)) {
            setError("Input 4 digits");
            return;
        }
        if (password.length !== 4) {
            setError("Wallet pin must be 4 characters long.");
            setInputError(true)
        } else if (password !== rePassword) {
            setError("Passwords do not match.");
            setInputError(true)
        } else {
            setLoading(true);
            try {
                const { success, error } = await enterpriseWalletTenantCreation(
                    password,
                    rePassword
                );
                if (success) {
                    setLoading(false);
                    setSuccessModal(true);
                    fetchDataAgain();
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
        }
    };


    return (
        <div className='w-full'>
            {
                successModal ? (
                    <ConfirmModal
                        header={"Tenant wallet created successfully"}
                        button={"Continue"}
                        returnHome={closeForm}
                    />
                )
                    :
                    <div className='w-full min-w-[330px] md:w-[550px] h-auto bg-white shadow-lg rounded-md p-8'>
                        <div className="flex items-start w-full justify-between">
                            <div className="w-full">
                                <p className="text-[14px] font-[500] text-BlueHomz">
                                    Create Wallet
                                </p>
                            </div>
                            <div className="cursor-pointer w-full flex justify-end" onClick={closeForm}>
                                <Image
                                    src={
                                        "/static/dashboard/enterprisemanager/payment/close-square.png"
                                    }
                                    height={24}
                                    width={24}
                                    alt=""
                                />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                            <div className={`flex flex-col gap-4 ${loading ? "pointer-events-none" : ""}`}>
                                <div className="relative flex flex-col gap-2 items-start">
                                    <div className='flex flex-col items-start'>
                                        <label className="text-center text-[13px] font-[500] text-GrayHomz">
                                            Create Transaction Pin
                                        </label>
                                        <span className='text-GrayHomz2 text-[11px] font-[400]'>
                                            Create a 4-Digit transaction pin
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="username" // Ensure a name attribute for password managers
                                        autocomplete="username"
                                        value={username}
                                        className='hidden'
                                        hidden // Hide visually but still accessible to screen readers
                                    />
                                    <input
                                        type={visible ? "text" : "password"}
                                        name="password" // Ensure a name attribute for password managers
                                        // autoComplete="new-password" // Use new-password for password fields
                                        value={password}
                                        className='w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]'
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                            setInputError(false);
                                        }}
                                    />
                                    <div className="absolute top-[59px] right-4" onClick={Visible}>
                                        {visible ? (
                                            <Eye className="w-4 h-4" />
                                        ) : (
                                            <BashedEye className="w-4 h-4" />
                                        )}
                                    </div>
                                </div>
                                <div className="relative flex flex-col gap-2 items-start">
                                    <label className="text-center text-[13px] font-[500] text-GrayHomz">
                                        Re-enter transaction pin
                                    </label>
                                    <input
                                        type={visibleII ? "text" : "password"}
                                        name="rePassword" // Ensure a name attribute for password managers
                                        autoComplete="new-password" // Use new-password for password fields
                                        value={rePassword}
                                        className='w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]'
                                        onChange={(e) => {
                                            setRePassword(e.target.value);
                                            setError("");
                                            setInputError(false);
                                        }}
                                    />
                                    <div className="absolute top-[42px] right-4" onClick={VisibleII}>
                                        {visibleII ? (
                                            <Eye className="w-4 h-4" />
                                        ) : (
                                            <BashedEye className="w-4 h-4" />
                                        )}
                                    </div>
                                </div>
                                {error && (
                                    <p className="text-red-500 text-[12px] mt-1">{error}</p>
                                )}
                            </div>
                            {password !== '' && rePassword !== '' ? (
                                <button
                                    className={`bg-BlueHomz mt-4 text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz ${loading ? "pointer-events-none w-full flex justify-center items-center" : ""}`}
                                    type="submit"
                                >
                                    {loading ? <LoadingFormII /> : "Create Transaction  Pin"}
                                </button>
                            ) : (
                                <button
                                    className="pointer-events-none bg-GrayHomz6 mt-4 text-GrayHomz5 font-[700] text-[16px] w-full rounded-[4px] h-[47px]"
                                    disabled
                                >
                                    Create Transaction  Pin
                                </button>
                            )}
                        </form>
                    </div>
            }
        </div>
    )
}

export default CreateTransactionPin