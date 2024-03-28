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
    interval,
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
      interval,
    });
    return { success: true, updatedData: response }; // Corrected typo 'upDateddata' to 'updatedData'
  } catch (error) {
    const errors = error.response?.data?.error
    // Handle "you have already created a enterprise Plan account" error
    if (errors === 'you  have already created a enterprise Plan  account') {
      return { success: false, error: 'You already have an Enterprise Plan account. Please log in or contact support for assistance.' };
    } else {
      // Handle other errors (generic or more specific)
      return { success: false, error: 'An error occurred. Please try again later or contact support for assistance.' };
    }
  }
};



export const updateEnterPriseSub = async (planNames) => {
  const {
    planName,
    interval
  } = planNames
  try {
    const response = await api.post(`/enterprisePlan/update/subscription`, {
      planName,
      interval,
    });
    return { success: true, updatedData: response }; // Corrected typo 'upDateddata' to 'updatedData'
  } catch (error) {
    const errors = error.response?.data?.error
    // Handle "you have already created a enterprise Plan account" error
    if (errors === 'you  have already created a enterprise Plan  account') {
      return { success: false, error: 'You already have an Enterprise Plan account. Please log in or contact support for assistance.' };
    } else {
      // Handle other errors (generic or more specific)
      return { success: false, error: 'An error occurred. Please try again later or contact support for assistance.' };
    }
  }
};

