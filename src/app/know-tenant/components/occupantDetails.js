import React from 'react'
import InputField from './inputField'
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall'
import ArrowRightSmall from '@/components/icons/arrowRightSmall'
import AddBlueSmall from '@/components/icons/addBlueSmall'

const OccupantDetails = ({ setOpenSaveModal, onSubmit, setStep, register, setFormData, formData }) => {
    const [active, setActive] = React.useState(false)
    const [occupants, setOccupants] = React.useState([{ id: 1 }, { id: 2 }]);
    const maxOccupants = 10;

    const addOccupant = () => {
        if (occupants.length < maxOccupants) {
            setOccupants([...occupants, { id: occupants.length + 1 }]);
        }
    };
    [{"key":"occupantDetails","value":"[{\"occupantName\":\"John Doe\",\"occupantAge\":50,\"occupantOccupation\":\"Engineer\"},{\"occupantName\":\"Jane Doe\",\"occupantAge\":28,\"occupantOccupation\":\"Nurse\"},{\"occupantName\":\"ola Doe\",\"occupantAge\":19,\"occupantOccupation\":\"software developer\"},{\"occupantName\":\"kola Doe\",\"occupantAge\":120,\"occupantOccupation\":\"software developer\"}]","description":"","type":"text","enabled":true}]

    return (
        <div className='mt-4'>
            <div className='bg-[#F6F6F6] py-4 px-6 rounded-[8px] mt-2 mb-4 font-medium text-[16px] text-GrayHomz'>
                Add other occupant information
            </div>
            <div className='grid grid-cols-1 gap-4'>
                <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                    <p className='text-[16px] text-BlackHomz font-medium mb-4'>Occupant 1</p>
                    <InputField name={"OccupantNameI"} label={"Occupant’s Name"} register={register} placeholder={"e.g Babalola Steven"} formData={formData} setFormData={setFormData} />
                    <div className='flex flex-col md:flex-row gap-3 mt-3'>
                        <InputField name={"OccupantAgeI"} label={"Age"} span={"(years)"} register={register} placeholder={"e.g 35 "} formData={formData} setFormData={setFormData} />
                        <InputField name={"OccupantOccupationI"} label={"Occupation"} register={register} placeholder={"e.g Accountant"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-4'>
                        {occupants.map((occupant, index) => (
                            <div key={occupant.id} className={`${occupant.id === 1 && "hidden"} border border-GrayHomz5 rounded-[12px] p-4`}>
                                <p className="text-[16px] text-BlackHomz font-medium mb-4">Occupant {occupant.id}</p>
                                <InputField label={"Occupant’s Name"} name={`OccupantName${occupant.id}`} register={register} placeholder={"e.g Babalola Steven"} formData={formData} setFormData={setFormData} />
                                <div className="flex flex-col md:flex-row gap-3 mt-3">
                                    <InputField label={"Age"} span={"(years)"} name={`OccupantAge${occupant.id}`} register={register} placeholder={"e.g 35 "} formData={formData} setFormData={setFormData} />
                                    <InputField label={"Occupation"} name={`OccupantOccupation${occupant.id}`} register={register} placeholder={"e.g Accountant"} formData={formData} setFormData={setFormData} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {occupants.length < maxOccupants && (
                        <button
                            onClick={addOccupant}
                            className="py-4 px-6 bg-whiteblue text-[16px] font-medium text-BlueHomz flex gap-1 items-center rounded-[8px] mt-4"
                        >
                            <AddBlueSmall /> Add occupant
                        </button>
                    )}
                </div>
                <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                    <p className='text-[16px] text-GrayHomz font-medium mb-4'>Please provide the total number of cars owned by all occupants</p>
                    <InputField name={"NoOfCars"} label={"No. of Cars"} register={register} placeholder={"e.g 3"} formData={formData} setFormData={setFormData} />
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-0 justify-center md:justify-between md:items-center mt-6 mb-[60px]'>
                <p onClick={() => setOpenSaveModal(true)} className='cursor-pointer text-[16px] text-BlueHomz font-medium text-center md:text-start'>Save & skip to dashboard</p>
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