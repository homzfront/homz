import Close from '@/components/icons/Close'
import React, { useState } from 'react'
import InputVisible from '../../changePassword/components/inputVisible'
import { enterpriseGetOtpPincode, enterpriseUpdatePincode } from '@/api/enterpriseManagerService';
import ConfirmModal from '../../../components/confirmModal';
import Loading from '@/components/mainmenu/loading';
import AcAndRejModel from '../../../components/acAndRejModel';

const PinCodeForm = ({ closeForm }) => {
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState('')
    const [pincode, setPincode] = useState('')
    const [passwordError, setPasswordError] = useState(null);
    const [passwordErrorII, setPasswordErrorII] = useState(null);
    const [successModal, setSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [confirmSubmission, setConfirmSubmission] = useState(false);
    const [changedDone, setChangedDone] = useState(false);

    const getOTP = async (e) => {
        e.preventDefault();
        setShowSubmit(false);
        // Password validation
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
        } else {
            setLoading(true);
            try {
                const { success, upDateddata, error } = await enterpriseGetOtpPincode(
                    password,
                );
                if (success) {
                    setLoading(false);
                    setSuccessModal(true);
                    setShowSubmit(!showSubmit)
                } else {
                    setLoading(false);
                    setPasswordError(error);
                }
            } catch (error) {
                setLoading(false);
                setPasswordError(error);
            }
        };
    };


    const handlePinChnage = async () => {
        if (otp.length !== 4) {
            setConfirmSubmission(false);
            setPasswordErrorII("Invalid OTP. OTP must be 4 digits");
        } else {
            setLoading(true);
            try {
                const { success, upDateddata, error } = await enterpriseUpdatePincode(
                    password,
                    otp,
                    pincode
                );
                if (success) {
                    setLoading(false);
                    setChangedDone(!changedDone)
                } else {
                    setLoading(false);
                    setPasswordErrorII(error);
                    setConfirmSubmission(false);
                }
            } catch (error) {
                setLoading(false);
                setPasswordErrorII(error);
                setConfirmSubmission(false);
            }
        }
    }

    return (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
            {loading && <Loading />}
            {
                successModal ? <ConfirmModal
                    returnHome={() => {
                        setShowSubmit(true)
                        setSuccessModal(false)
                    }}
                    header={"OTP Sent Successfully"}
                    body={"Check your mail for OTP"}
                    button={"Close"}
                />
                    :
                    changedDone
                        ?
                        <ConfirmModal
                            returnHome={() => {
                                setSuccessModal(false)
                                setChangedDone(false);
                                closeForm()
                            }}
                            header={"New Pin Created Successfully"}
                            body={"Your transaction pin has successfully been changed"}
                            button={"Close"}
                        />
                        :
                        confirmSubmission ? <AcAndRejModel
                            header={"Proceed to create new pin?"}
                            button={"Proceed"} buttonTwo={"Cancel"}
                            returnHome={handlePinChnage}
                            returnHomeTwo={() => setConfirmSubmission(false)}
                        />
                            :
                            <div className="h-[420px] w-[560px] px-[28px] py-[36px] bg-white rounded-[12px]">
                                <div className='flex w-full justify-between items-center'>
                                    <p className='text-BlueHomz text-[14px] font-[500]'>
                                        Create New Transaction Pin
                                    </p>
                                    <button onClick={closeForm} className='rounded-[4px] border-[1.5px] border-GrayHomz'>
                                        <Close />
                                    </button>
                                </div>
                                <div className='mt-3 flex flex-col justify-between h-[90%]'>
                                    <InputVisible
                                        password={password}
                                        setPassword={setPassword}
                                        label={"Current Password"}
                                        placeholder={"Enter your current password"}
                                        setError={setPasswordError}
                                    />
                                    {
                                        passwordError && <span className='text-[10px] text-error italic '>
                                            {passwordError}
                                        </span>
                                    }
                                    <div>
                                        <label className="text-[14px] font-[500]">
                                            Enter OTP
                                        </label>
                                        <div className='relative'>
                                            <input
                                                className="border mt-2 rounded-md p-3 h-[45px] w-full placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500]"
                                                type="text"
                                                placeholder={"Enter OTP"}
                                                value={otp}
                                                onChange={(e) => {
                                                    setOtp(e.target.value)
                                                    setPasswordErrorII("")
                                                }}
                                            />
                                            <p onClick={getOTP} className='absolute cursor-pointer text-warning2 text-[11px] font-[500] top-[22px] right-4'>
                                                Send OTP
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`${showSubmit && otp !== "" ? "" : "pointer-events-none opacity-20"}`}>
                                        <InputVisible
                                            password={pincode}
                                            setPassword={setPincode}
                                            label={"Create New Transaction Pin"}
                                            placeholder={"0000"}
                                            setError={setPasswordErrorII}
                                        />
                                    </div>
                                    {
                                        passwordErrorII && <span className='text-[10px] text-error italic '>
                                            {passwordErrorII}
                                        </span>
                                    }
                                    {
                                        showSubmit && pincode !== ""
                                            ?
                                            <button onClick={() => setConfirmSubmission(true)} className='mt-1 text-white bg-BlueHomz w-full h-[48px] rounded-[4px]' type='button'>
                                                Create Transaction Pin
                                            </button>
                                            :
                                            <button className='mt-1 text-GrayHomz5 bg-GrayHomz6 w-full h-[48px] rounded-[4px] pointer-events-none' type='text'>
                                                Create Transaction Pin
                                            </button>
                                    }

                                </div>
                            </div>
            }
        </div>
    )
}

export default PinCodeForm