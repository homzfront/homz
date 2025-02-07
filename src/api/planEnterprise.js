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
    subscriptionType
  } = planDetails;

  // Create a new object with only non-empty, non-null, and non-undefined fields
  const filteredPlanDetails = Object.fromEntries(
    Object.entries({
      fullName,
      estate,
      numberOfHouses,
      businessName,
      businessPhoneNumber,
      estateAddress,
      phoneNumber,
      planName,
      interval,
      subscriptionType
    }).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );


  let url
  if (subscriptionType === "one-time") {
    url = `/enterprisePlan/create/subscription/one-time-payment`
  } else {
    url = `/enterprisePlan/createaccount`
  }
  try {
    const response = await api.post(url, filteredPlanDetails);
    return { success: true, updatedData: response }; // Corrected typo 'upDateddata' to 'updatedData'
  } catch (error) {
    const errors = error.response?.data?.error
    // Handle "you have already created a enterprise Plan account" error
    if (errors === 'you  have already created a enterprise Plan  account') {
      return { success: false, error: 'You already have an Enterprise Plan account. Please log in or contact support for assistance.' };
    } else if (error?.response?.data?.msg) {
      return { success: false, error: error.response?.data?.msg }
    } else if (error.response?.data?.message) {
      return { success: false, error: error.response?.data?.message }
    } else {
      // Handle other errors (generic or more specific)
      return { success: false, error: 'An error occurred. Please try again later or contact support for assistance.' };
    }
  }
};



export const updateEnterPriseSub = async (planNames) => {
  const {
    planName,
    interval,
    subscriptionType
  } = planNames
  let url
  if (subscriptionType === "one-time") {
    url = `/enterprisePlan/update/subscription/one-time-payment`
  } else {
    url = `/enterprisePlan/update/subscription`
  }
  try {
    const response = await api.post(url, {
      planName,
      interval,
      subscriptionType
    });
    return { success: true, updatedData: response };
  } catch (error) {
    const errors = error.response?.data?.error
    // console.log(error)
    if (errors) {
      return { success: false, error: errors };
    } else if (error.response?.data?.message) {
      return { success: false, error: error.response?.data?.message }
    } else if (error.response?.msg) {
      return { success: false, error: error.response?.msg }
    }
    else if (error.response.data.msg) {
      return { success: false, error: error.response?.data?.msg }
    }
    else {
      return { success: false, error: 'An error occurred. Please try again later or contact support for assistance.' };

    }
  }
};

