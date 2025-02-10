
import React from 'react'
import InputField from '@/app/know-tenant/components/inputField';
import UpdateButton from '../../components/updateButton';

const SpouseNextKin = ({ register, setFormData, formData }) => {
    return (
        <div className=''>
            <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                <div className='flex flex-col gap-3 md:w-[50%]'>
                    <InputField label={"Spouse/Kin’s Occupation"} register={register} placeholder={"e.g Banker"} formData={formData} setFormData={setFormData} />
                    <InputField label={"Spouse/Kin’s Office Address"} register={register} placeholder={"e.g No 17, Sungbola Street, Isale Eko, Lagos State"} formData={formData} setFormData={setFormData} />
                </div>
            </div>
            <UpdateButton />
        </div>
    )
}

export default SpouseNextKin