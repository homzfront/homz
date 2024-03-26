import { enterprisePinCreation } from '@/api/enterpriseManagerService';
import BashedEye from '@/components/icons/BashedEye';
import Eye from '@/components/icons/Eye';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/confirmModal';
import LoadingForm from '@/components/mainmenu/loadingForm';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

const CreateTransactionPin = ({ handlePageChangeTwo }) => {
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
        // Password validation
        if (password.length !== 4) {
            setError("Wallet pin must be 4 characters long.");
            setInputError(true)
        } else if (password !== rePassword) {
            setError("Passwords do not match.");
            setInputError(true)
        } else {
            setLoading(true);

            try {
                const { success, upDateddata, error } = await enterprisePinCreation(
                    password,
                    rePassword
                );
                if (success) {
                    setLoading(false);
                    setSuccessModal(true);
                    toast.success(upDateddata?.message);
                    if (typeof window !== 'undefined') {
                        const userData = { date: password };
                        localStorage.setItem('date', JSON.stringify(userData));
                    }
                } else {
                    setLoading(false);
                    toast.error(error);
                    setError(error);
                }
            } catch (error) {
                toast.error("Update error", error);
                setLoading(false);
                setError(error);
            }
        }
    };


    return (
        <div>
            {
                successModal && (
                    <ConfirmModal
                        header={"Transaction Pin Created Successfully"}
                        button={"Continue"}
                        returnHome={handlePageChangeTwo()}
                    />
                )
            }
            <div>
                <div className="flex items-start w-full justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-[14px] font-[500] text-BlueHomz">
                            Create Wallet
                        </p>
                        <p className="text-[13px] font-[400] text-GrayHomz">
                            Update your profile to create wallet
                        </p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                >
                    <div className="flex flex-col gap-4">
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
                                className={`w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500] ${inputError ? "border-red-500" : ""
                                    }`}
                                type={visible ? "text" : "password"}
                                value={password}
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
                                className={`w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500] ${inputError ? "border-red-500" : ""
                                    }`}
                                type={visibleII ? "text" : "password"}
                                value={rePassword}
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
                    {
                        password !== '' && rePassword !== '' ? <button
                            className={`bg-BlueHomz mt-4  text-white font-[700] text-[16px] w-full  rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz ${loading ? "pointer-events-none w-full flex justify-center items-center" : ""
                                }`}
                            type="Submit"
                        >
                            {loading ? <LoadingFormII /> : "Create Transaction  Pin"}
                        </button> : <button
                            className="pointer-events-none bg-GrayHomz6 mt-4 text-GrayHomz5 font-[700] text-[16px] w-full rounded-[4px] h-[47px]"
                        >
                            Create Transaction  Pin
                        </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CreateTransactionPin