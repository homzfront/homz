import React, { useEffect, useState } from 'react';
import InputField from '@/app/know-tenant/components/inputField';
import UpdateButton from '../../components/updateButton';
import AddBlueSmall from '@/components/icons/addBlueSmall';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import ArrowRightSmall from '@/components/icons/arrowRightSmall';
import OccupantInput from '@/app/know-tenant/components/occupantInput';

const OccupantDetails = ({ setStep, loading, handleUpdate, register, setFormData, formData }) => {
    const maxOccupants = 10;

    // Ensure occupantDetails is initialized
    const [occupants, setOccupants] = useState(() => formData?.occupantDetails || []);

    // Sync occupants state when formData updates
    useEffect(() => {
        if (formData?.occupantDetails) {
            setOccupants(formData.occupantDetails);
        }
    }, [formData]);

    // Function to add a new occupant
    const addOccupant = () => {
        if (occupants.length < maxOccupants) {
            const newIndex = occupants.length;
            const newOccupant = {
                [`occupantName${newIndex}`]: '',
                [`occupantAge${newIndex}`]: '',
                [`occupantOccupation${newIndex}`]: '',
                index: newIndex,
                is_deleted: false,
                _id: `temp-${Date.now()}`
            };
            const updatedOccupants = [...occupants, newOccupant];
            setOccupants(updatedOccupants);
            setFormData(prev => ({
                ...prev,
                occupantDetails: updatedOccupants
            }));
        }
    };

    console.log(formData)

    return (
        <div>
            <div className='bg-[#F6F6F6] py-4 px-6 rounded-[8px] mt-2 mb-4 font-medium text-[16px] text-GrayHomz'>
                Add other occupant information
            </div>

            <div className='grid grid-cols-1 gap-4'>
                <div className='flex flex-col gap-4'>
                    {occupants.map((occupant, index) => (
                        <div key={index} className="border border-GrayHomz5 rounded-[12px] p-4">
                            <p className="text-[16px] text-BlackHomz font-medium mb-4">
                                Occupant {index + 1}
                            </p>
                            <OccupantInput
                                label="Occupant’s Name"
                                name={`occupantName${index}`}
                                register={register}
                                placeholder="e.g Babalola Steven"
                                formData={formData}
                                setFormData={setFormData}
                                index={index}
                                field="Name"
                            />
                            <div className="flex flex-col md:flex-row gap-3 mt-3">
                                <OccupantInput
                                    label="Age"
                                    span="(years)"
                                    name={`occupantAge${index}`}
                                    register={register}
                                    placeholder="e.g 35"
                                    formData={formData}
                                    setFormData={setFormData}
                                    index={index}
                                    field="Age"
                                    type='number'
                                />
                                <OccupantInput
                                    label="Occupation"
                                    name={`occupantOccupation${index}`}
                                    register={register}
                                    placeholder="e.g Accountant"
                                    formData={formData}
                                    setFormData={setFormData}
                                    index={index}
                                    field="Occupation"
                                />
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

                <div className='border border-GrayHomz5 rounded-[12px] p-4'>
                    <p className='text-[16px] text-GrayHomz font-medium mb-4'>
                        Please provide the total number of cars owned by all occupants
                    </p>
                    <InputField
                        label="No. of Cars"
                        name="numberOfCars"
                        register={register}
                        placeholder="e.g 3"
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>

            <div className='flex w-full justify-end mt-4'>
                <button
                    onClick={() => setStep(1)}
                    className={`w-[140px] h-[45px] rounded-[4px] hover:bg-whiteblue text-BlueHomz ${loading ? "pointer-events-none flex justify-center" : ""}`}
                >
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
                            Next <ArrowRightSmall className="#006AFF" />
                        </span>
                    }
                </button>
            </div>
        </div>
    );
};

export default OccupantDetails;
