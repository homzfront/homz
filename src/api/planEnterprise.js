import api from "@/utils/api";

export const planEnterPriseSub = async (planDetails) => {
    const {      
        fullName,
        estate,
        numberOfHouses,
        businessName,
        businessPhoneNumber,
        estateAddress,
        phoneNumber,
        planName,
        intervel
     } = planDetails;
    try {
        const response = await api.post(`/enterprisePlan/createaccount`, {
            fullName,
            estate,
            numberOfHouses,
            businessName,
            businessPhoneNumber,
            estateAddress,
            phoneNumber,
            planName,
            intervel
        });
        console.log(response);
        return { success: true, upDateddata: response?.data.data };
    } catch (error) {
        console.error("Update error", error);
        return { success: false, error: error?.response?.data }; // Adjusted this line
    }
};
