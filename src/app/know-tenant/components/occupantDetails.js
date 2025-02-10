import React from 'react'
import InputField from './inputField'
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall'
import ArrowRightSmall from '@/components/icons/arrowRightSmall'

const OccupantDetails = ({ setStep, register, setFormData, formData }) => {
    const [active, setActive] = React.useState(false)
    return (
        <div className='mt-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                    <div className='flex flex-col gap-3'>
                        <InputField label={"Occupant’s Name"} register={register} placeholder={"e.g Babalola Steven"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Age"} span={"(years)"} register={register} placeholder={"e.g 35 "} formData={formData} setFormData={setFormData} />
                        <InputField label={"Occupation"} register={register} placeholder={"e.g Accountant"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                    <div className='flex flex-col gap-3'>
                        <InputField label={"Occupant’s Name"} register={register} placeholder={"e.g Babalola Steven"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Age"} span={"(years)"} register={register} placeholder={"e.g 35 "} formData={formData} setFormData={setFormData} />
                        <InputField label={"Occupation"} register={register} placeholder={"e.g Accountant"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                    <InputField label={"No. of Cars"} register={register} placeholder={"e.g 3"} formData={formData} setFormData={setFormData} />
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-0 justify-center md:justify-between md:items-center mt-6 mb-[60px]'>
                <p className='cursor-pointer text-[16px] text-BlueHomz font-medium text-center md:text-start'>Save & skip to dashboard</p>
                <div className='flex items-center gap-4 md:gap-3 w-full md:w-auto'>
                    <button onClick={() => setStep(1)} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} className={`${active ? "text-white bg-[#4bb2e5]" : "text-BlueHomz"} w-[50%] md:w-auto border border-BlueHomz md:border-none rounded-[4px] p-3 flex justify-center items-center gap-1`}>
                        {active ? <ArrowLeftBlueSmall className='#FFFFFF' /> : <ArrowLeftBlueSmall />}
                        Back
                    </button>
                    <button onClick={() => setStep(3)} className={`${formData ? "border border-BlueHomz text-BlueHomz hover:bg-whiteblue" : "pointer-events-none bg-GrayHomz6 text-GrayHomz5"} p-3 rounded-[4px] hidden md:flex items-center gap-1`}>
                        Next {formData ? <ArrowRightSmall className='#006aff' /> : <ArrowRightSmall className='#d5d5d5' />}
                    </button>
                    <button onClick={() => setStep(3)} className={`${formData ? "bg-BlueHomz text-white hover:bg-blue-400" : "pointer-events-none bg-GrayHomz6 text-GrayHomz5"} w-[50%] p-3 rounded-[4px] flex md:hidden justify-center items-center gap-1`}>
                        Next {formData ? <ArrowRightSmall className='#ffffff' /> : <ArrowRightSmall className='#d5d5d5' />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OccupantDetails