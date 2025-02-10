import React from 'react'
import InputField from '@/app/know-tenant/components/inputField';
import UpdateButton from '../../components/updateButton';

const OccupantDetails = ({ register, setFormData, formData }) => {
    return (
        <div className=''>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                    <div className='flex flex-col gap-3'>
                        <InputField label={"Occupant’s Name"} register={register} placeholder={"e.g Babalola Steven"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Age"} span={"(years)"} register={register} placeholder={"e.g 35 "} formData={formData} setFormData={setFormData} />
                        <InputField label={"Occupation"} register={register} placeholder={"e.g Accountant"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                    <div className='flex flex-col gap-3'>
                        <InputField label={"Occupant’s Name"} register={register} placeholder={"e.g Babalola Steven"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Age"} span={"(years)"} register={register} placeholder={"e.g 35 "} formData={formData} setFormData={setFormData} />
                        <InputField label={"Occupation"} register={register} placeholder={"e.g Accountant"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                    <InputField label={"No. of Cars"} register={register} placeholder={"e.g 3"} formData={formData} setFormData={setFormData} />
                </div>
            </div>
            <UpdateButton />
        </div>
    )
}

export default OccupantDetails