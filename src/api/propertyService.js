import api from "@/utils/api";

export const fetchPropertyListedAll = async () => {
  try {
    const response = await api.get("/properties");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSingleProperty = async (id) => {
  try {
    const response = await api.get(`/properties/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSinglePropertyPublic = async (id) => {
  try {
    const response = await api.get(`/public/properties/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const propertyForMe = async () => {
  try {
    const response = await api.get("/properties/user/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addBankPropertyOwner = async (details) => {
  try {
    const response = await api.post(`/bank/add/property-owner`, details);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data };
  }
};


export const bankInfoPropertyOwner = async () => {
  try {
    const response = await api.get(`/bank/info/property-owner`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const withdrawPropertyOwner = async (details) => {
  try {
    const response = await api.post(`/bank/withdraw/property-owner`, details);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};




export const updateContactInfo = async (propertyId, updatedData) => {
  try {
    const response = await api.patch(
      `/properties/${propertyId}/contact-detail`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const updatePropertyDetails = async (id, updatedData) => {
  try {
    const response = await api.patch(
      `/properties/${id}/property-detail`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error };
  }
};


export const updatePropertyCoverPhoto = async (estateId, uploadedImage) => {
  const formData = new FormData();
  formData.append("coverPhoto", uploadedImage);

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      // add other headers as needed
    };
    const response = await api.patch(
      `/properties/${estateId}/cover-photo`,
      formData,
      { headers }
    );

    if (response.data.statuscode === 201 || 200) {
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};


export const updatePropertyOtherPhoto = async (id, uploadedImage, publicId) => {
  const formData = new FormData();
  formData.append("photos", uploadedImage);

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      // add other headers as needed
    };
    const response = await api.patch(
      `/properties/${id}/photos?publicId=${publicId}`,
      formData,
      { headers }
    );

    if (response.data.statuscode === 201 || 200) {
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};



export const rentDetails = async (id, updatedData) => {
  try {
    const response = await api.patch(
      `/properties/${id}/rent-detail`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error };
  }
};



export const propertyMe = async () => {
  try {
    const response = await api.get("/manageProperty/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePersonalInformation = async ( updatedData) => {
  try {
    const response = await api.patch(
      `/manageProperty/personalInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const updateProfilePicture = async (uploadedImage) => {
  const formData = new FormData();
  formData.append("coverPhoto", uploadedImage);

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      // add other headers as needed
    };
    const response = await api.patch(
      "/manageProperty/coverPhoto",
      formData,
      { headers }
    );

    if (response.data.statuscode === 201 || 200) {
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const updatePassword = async ( updatedData ) => {
try {
  const response = await api.patch(
    `/auth/change/password`,
    updatedData
  );
  return { success: true, upDateddata: response.data.data };
} catch (error) {
  return { success: false, error: error?.response.data.message };
}
};

export const createPropertyOwnerWallet = async (BVNDetails) => {
  const { bvn, bvnDateOfBirth, pinCode } = BVNDetails;
  try {
    const response = await api.post(`/wallet/create/property-owner`, {
      bvn,
      bvnDateOfBirth,
      pincode: pinCode
    });
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const propertyOwnerWallet = async () => {
  try {
    const response = await api.get(`/wallet/getWallet/property-owner`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const propertyOwnerWalletBalance = async () => {
  try {
    const response = await api.get(`/wallet/balance/property-owner`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error wallet:", error);
    throw error;
  }
};

export const ownerGetOtpPincode = async (password) => {
  try {
    const response = await api.post(`/wallet/pincode/otp/property-owner`, {
      password,
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};

export const ownerUpdatePincode = async (password, otp, pincode) => {
  try {
    const response = await api.post(`/wallet/pincode/update/property-owner`, {
      password,
      otp, 
      pincode
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};

export const propertyOwnerStatistics = async () => {
  try {
    const response = await api.get(`/estates/me/manageProperty/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const propertyOwnerRevenue = async () => {
  try {
    const response = await api.get(`/estates/me/property-owner/calculate-revenue`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchOwnerEstatesMe = async () => {
  try {
    const response = await api.get("/estates/me/property-owner");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ownerRentPayemntInfo = async () => {
  try {
    const response = await api.get(`/rentPayment/property-owner`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSpecificTenantRentPaymentOwner = async (id) => {
  try {
    const response = await api.get(`/rentPayment/property-owner/tenant/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ownerPinCreation = async (password, rePassword) => {
  try {
    const response = await api.post(`/wallet/pincode/create/property-owner`, {
      pincode: password,
      confirmPincode: rePassword,
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
}

export const getRentHisOwner = async () => {
  try {
    const response = await api.get(`/rentPayment/property-owner`);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data };
  }
};