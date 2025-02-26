
import React from 'react'
import InputField from '@/app/know-tenant/components/inputField';
import UpdateButton from '../../components/updateButton';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import ArrowRightSmall from '@/components/icons/arrowRightSmall';

const SpouseNextKin = ({ setStep, handleUpdate, setShowDialogue, showDialogue, success, setSuccess, loading, updateDone, register, formData, setFormData }) => {
    return (
        <div className=''>
            <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                <div className='flex flex-col gap-3 md:w-[50%]'>
                    <InputField label={"Spouse/Kin’s Occupation"} name={"spouseOccupation"} register={register} placeholder={"e.g Banker"} formData={formData} setFormData={setFormData} />
                    <InputField label={"Spouse/Kin’s Office Address"} name={"spouseOfficeAddress"} register={register} placeholder={"e.g No 17, Sungbola Street, Isale Eko, Lagos State"} formData={formData} setFormData={setFormData} />
                </div>
            </div>
            <div className='flex w-full justify-end mt-4'>
                <button
                    onClick={() => {
                        setStep(0)
                    }}
                    className={`w-[140px] h-[45px] rounded-[4px] hover:bg-whiteblue text-BlueHomz ${loading ? "pointer-events-none flex justify-center" : ""}`}>
                    Back
                </button>
                <button
                    onClick={async (e) => {
                        try {
                            await handleUpdate(e);
                        } catch (error) {
                            console.error("Update failed:", error);
                        }
                    }}
                    className={`w-[140px] h-[45px] rounded-[4px] hover:bg-whiteblue border border-BlueHomz text-BlueHomz ${loading ? "pointer-events-none flex justify-center" : ""}`}
                >
                    {loading ? <LoadingFormII className='#006aff' /> :
                        <span className='flex justify-center items-center gap-2'>
                            Next   <ArrowRightSmall className="#006AFF" />
                        </span>
                    }
                </button>
            </div>
        </div>
    )
}

export default SpouseNextKin