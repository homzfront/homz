import React from 'react'
import InputField from '@/app/know-tenant/components/inputField';
import UpdateButton from '../../components/updateButton';
import AddBlueSmall from '@/components/icons/addBlueSmall';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import ArrowRightSmall from '@/components/icons/arrowRightSmall';

const OccupantDetails = ({ setStep, loading, handleUpdate, setShowDialogue, showDialogue, success, setSuccess, updateDone, register, setFormData, formData }) => {
    const [occupants, setOccupants] = React.useState([{ id: 1 }, { id: 2 }]);
    const maxOccupants = 10;

    const addOccupant = () => {
        if (occupants.length < maxOccupants) {
            setOccupants([...occupants, { id: occupants.length + 1 }]);
        }
    };

    return (
        <div className=''>
            <div className='bg-[#F6F6F6] py-4 px-6 rounded-[8px] mt-2 mb-4 font-medium text-[16px] text-GrayHomz'>
                Add other occupant information
            </div>
            <div className='grid grid-cols-1 gap-4'>
                <div className='border border-GrayHomz5 rounded-[12px] p-4'>
                    <p className='text-[16px] text-BlackHomz font-medium mb-4'>Occupant 1</p>
                    <InputField label={"Occupant’s Name"} name={"occupantName"} register={register} placeholder={"e.g Babalola Steven"} formData={formData} setFormData={setFormData} />
                    <div className='flex flex-col md:flex-row gap-3 mt-3'>
                        <InputField label={"Age"} name={"occupantAge"} span={"(years)"} register={register} placeholder={"e.g 35 "} formData={formData} setFormData={setFormData} />
                        <InputField label={"Occupation"} name={"occupantOccupation"} register={register} placeholder={"e.g Accountant"} formData={formData} setFormData={setFormData} />
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
                <div className='border border-GrayHomz5 rounded-[12px] p-4'>
                    <p className='text-[16px] text-GrayHomz font-medium mb-4'>Please provide the total number of cars owned by all occupants</p>
                    <InputField label={"No. of Cars"} name={"numberOfCars"} register={register} placeholder={"e.g 3"} formData={formData} setFormData={setFormData} />
                </div>
            </div>
            <div className='flex w-full justify-end mt-4'>
                <button
                    onClick={() => {
                        setStep(1)
                    }}
                    className={`w-[140px] h-[45px] rounded-[4px] hover:bg-whiteblue text-BlueHomz ${loading ? "pointer-events-none flex justify-center" : ""}`}>
                    Back
                </button>
                <button
                    onClick={async (e) => {
                        try {
                            await handleUpdate(e);
                            setStep(3);
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

export default OccupantDetails