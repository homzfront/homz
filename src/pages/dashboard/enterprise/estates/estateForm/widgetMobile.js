import React, { useState } from 'react'
import PropertyInfo from './propertyInfo';
import AddPhotos from './addPhotos';
import ContactInfo from './contactInfo';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

const WidgetMobile = ({ returnToStartRegistration, fetchData }) => {
    // to push to dashboard/property-listing
    const router = useRouter();

    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    // const [activeFour, setActiveFour] = useState(false); // State for the fourth page
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [yesOrNoModal, setYesOrNoModal] = useState(false);
    const [visibleAddProperty, setVisibleAddProperty] = useState(false);

    // Form states
    // propertyInfo
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [size, setSize] = useState("");
    const [numberOfHouses, setNumberOfHouses] = useState("");
    const [description, setDescription] = useState("");

    // addphotos
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedImage2, setUploadedImage2] = useState(null);
    const [uploadedImage3, setUploadedImage3] = useState(null);

    // contactInfo
    const [managerPhoneNumber, setManagerPhoneNumber] = useState("");
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState("");
    const [utilityServicePhoneNumber, setUtilityServicePhoneNumber] =
        useState("");
    const [securityPhoneNumber, setSecurityPhoneNumber] = useState("");

    const trimSpaces = (input) => {
        if (typeof input === 'string') {
            return input.trim();
        }
        return input;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Do nothing if already loading

        setLoading(true); // Set loading to true when submitting the form

        const formData = new FormData();
        // Only append images that are actual File objects — appending null sends
        // the string "null" to the server which saves a broken image reference
        if (uploadedImage instanceof File) formData.append("coverPhoto", uploadedImage);
        if (uploadedImage2 instanceof File) formData.append("photos", uploadedImage2);
        if (uploadedImage3 instanceof File) formData.append("photos", uploadedImage3);
        formData.append("area", selectedArea?.label);
        formData.append("state", selectedState?.label);
        formData.append("address", address);
        formData.append("size", parseInt(size));
        formData.append("name", trimSpaces(name));
        formData.append("numberOfHouses", numberOfHouses);
        formData.append("description", description);
        formData.append("managerPhoneNumber", parseInt(managerPhoneNumber));
        formData.append("emergencyPhoneNumber", parseInt(emergencyPhoneNumber));
        formData.append(
            "utilityServicePhoneNumber",
            parseInt(utilityServicePhoneNumber)
        );
        formData.append("securityPhoneNumber", parseInt(securityPhoneNumber));

        try {
            const response = await api.post("/estates/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // add other headers as needed
                },
            });

            if (response.data.statuscode === 201 || 200) {
                setLoading(false);
                setUploadedImage(null);
                setSelectedArea(null);
                setSelectedState(null);
                // setName("");
                setAddress("");
                setSize("");
                setNumberOfHouses("");
                setDescription("");
                setManagerPhoneNumber("");
                setEmergencyPhoneNumber("");
                setUtilityServicePhoneNumber("");
                setSecurityPhoneNumber("");
                setShowConfirm(!showConfirm);
            } else {
                const error = response.data.message;
                toast.error("update falied");
                setLoading(false);
                setYesOrNoModal(false);
            }
        } catch (error) {
            setLoading(false);
            setYesOrNoModal(false);
            if (
                error?.response?.data?.error?.errors &&
                error.response.data.error.errors.length > 0
            ) {
                const errorMessage = error.response.data.error.errors[0];
                toast.error(`Update failed: ${errorMessage}`);
            } else if (error?.response?.data?.message) {
                const errorMessage = error.response.data.message;
                toast.error(`Update failed: ${errorMessage}`);
            } else {
                toast.error("Update failed");
            }
        }

    };

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
        setActiveThree(false);
        // setActiveFour(false); // Reset the state for the fourth page
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(true);
        setActiveThree(false);
        // setActiveFour(false); // Reset the state for the fourth page
    };

    const handlePageChangeThree = () => {
        setActiveThree(true);
        setActiveTwo(false);
        setActive(true);
        // setActiveFour(false); // Reset the state for the fourth page
    };

    // const handlePageChangeFour = () => {
    //   setActiveFour(true);
    //   setActiveThree(false);
    //   setActiveTwo(false);
    //   setActive(true);
    // };


    const openYesOrNo = () => {
        setYesOrNoModal(!yesOrNoModal);
    };

    const closeYesOrNoModal = () => {
        setYesOrNoModal(false);
        setVisibleAddProperty(false);
    };

    const closeAllModals = () => {
        setShowConfirm(false);
        setYesOrNoModal(false);
        setVisibleAddProperty(false);
        fetchData();
        returnToStartRegistration();
    };



    return (
        <div>
            <div className="px-8 md:hidden flex flex-col gap-2 mt-8 w-full">
                <div className="flex flex-wrap gap-[15px] w-full">
                    <button
                        onClick={handlePageChange}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${!active
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Property Information
                    </button>
                    <button
                        onClick={handlePageChangeTwo}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeTwo
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Add Photo(s)
                    </button>
                    <button
                        onClick={handlePageChangeThree}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Contact Information
                    </button>
                    {/* <button
                        onClick={handlePageChangeFour}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Document
                    </button> */}
                </div>
            </div>
            <div className="my-7 rounded-[12px] w-full">
                <div className={`${!active ? "inline" : "hidden"}`}>
                    <PropertyInfo
                        active={active}
                        handlePageChangeTwo={handlePageChangeTwo}
                        returnToStartRegistration={returnToStartRegistration}
                        selectedArea={selectedArea}
                        selectedState={selectedState}
                        name={name}
                        numberOfHouses={numberOfHouses}
                        description={description}
                        size={size}
                        address={address}
                        setSelectedArea={setSelectedArea}
                        setSelectedState={setSelectedState}
                        setName={setName}
                        setAddress={setAddress}
                        setSize={setSize}
                        setNumberOfHouses={setNumberOfHouses}
                        setDescription={setDescription}
                    />
                </div>
                <div className={`${activeTwo ? "inline" : "hidden"}`}>
                    <AddPhotos
                        handlePageChangeThree={handlePageChangeThree}
                        handlePageChange={handlePageChange}
                        uploadedImage={uploadedImage}
                        uploadedImage2={uploadedImage2}
                        uploadedImage3={uploadedImage3}
                        setUploadedImage={setUploadedImage}
                        setUploadedImage2={setUploadedImage2}
                        setUploadedImage3={setUploadedImage3}
                    />
                </div>
                <div className={`${activeThree ? "inline" : "hidden"}`}>
                    <ContactInfo
                        handlePageChangeTwo={handlePageChangeTwo}
                        managerPhoneNumber={managerPhoneNumber}
                        emergencyPhoneNumber={emergencyPhoneNumber}
                        utilityServicePhoneNumber={utilityServicePhoneNumber}
                        securityPhoneNumber={securityPhoneNumber}
                        setEmergencyPhoneNumber={setEmergencyPhoneNumber}
                        setManagerPhoneNumber={setManagerPhoneNumber}
                        setSecurityPhoneNumber={setSecurityPhoneNumber}
                        setUtilityServicePhoneNumber={setUtilityServicePhoneNumber}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        yesOrNoModal={yesOrNoModal}
                        openYesOrNo={openYesOrNo}
                        closeYesOrNoModal={closeYesOrNoModal}
                        showConfirm={showConfirm}
                        closeAllModals={closeAllModals}
                        visibleAddProperty={visibleAddProperty}
                        setVisibleAddProperty={setVisibleAddProperty}
                        name={name}
                    />
                </div>
                {/* <div className={`${activeFour ? "inline" : "hidden"}`}>
            <Documents />
          </div> */}
            </div>
        </div>
    )
}

export default WidgetMobile;