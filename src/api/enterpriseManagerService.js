import api from "@/utils/api";

export const enterpriseMe = async () => {
  try {
    const response = await api.get("/enterprisePlan/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enterpriseMePropertyOwner = async () => {
  try {
    const response = await api.get("/enterprisePlan/me/property-owners");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const enterpriseMePropertyOwnerUnderEstate = async () => {
  try {
    const response = await api.get("/enterpriseplan/role/property-owner/role-permission");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePersonalInformation = async (updatedData) => {
  try {
    const response = await api.patch(
      `/enterprisePlan/personalInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const updateBussinessInformation = async (updatedData) => {
  try {
    const response = await api.patch(
      `/enterprisePlan/bussinessInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const updateBusinessLogo = async (uploadedImage) => {
  const formData = new FormData();
  formData.append("businessLogo", uploadedImage);

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
      "/enterprisePlan/bussinesslogo",
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

export const updatePassword = async (updatedData) => {
  try {
    const response = await api.patch(`/auth/change/password`, updatedData);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const createWalletEnterprise = async (BVNDetails) => {
  const { bvn, bvnDateOfBirth, pinCode } = BVNDetails;
  try {
    const response = await api.post(`/wallet/create/enterprise`, {
      bvn,
      bvnDateOfBirth,
      pincode: pinCode
    });
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const enterpriseUserWallet = async () => {
  try {
    const response = await api.get(`/wallet/getWallet/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enterpriseWalletBalance = async () => {
  try {
    const response = await api.get(`/wallet/balance/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMoneyEnterpriseToOwner = async (details) => {
  const {
    pincode,
    recipientName,
    amount,
    description,
    id
  } = details
  try {
    const response = await api.post(`/enterprisePlan/payment/send/${id}/property-owner`, {
      pincode,
      recipientName,
      amount,
      description
    });
    return { success: true, upDateddata: response?.data?.data };
  } catch (error) {
    return { success: false, error: error?.response.data }; // Adjusted this line
  }
};

export const enterpriseplanRoleInvite = async ({ email, estateName, slug }) => {
  try {
    const response = await api.post(`/enterpriseplan/role/property-owner/invite-link`, {
      email,
      estateName,
      slug
    });
    return { success: true, upDateddata: response };
  } catch (error) {
    const errorMessage = error?.response?.data?.error || error?.response?.data?.message;
    return { success: false, error: errorMessage };
  }
};

export const enterpriseStatistics = async () => {
  try {
    const response = await api.get(`/estates/me/enterprise/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enterpriseRevenue = async () => {
  try {
    const response = await api.get(`/estates/me/enterprise/calculate-revenue`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const enterpriseRevenueForAnEstate = async (id) => {
  try {
    const response = await api.get(`/estates/${id}/calculate-revenue`);
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.error === "Estate does not have tenants") {
      return {}
    }
    throw error;
  }
};



export const enterpriseRentPayemntInfo = async () => {
  try {
    const response = await api.get(`/rentPayment/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSpecificTenantRentEnterprise = async (id) => {
  try {
    const response = await api.get(`/rentPayment/enterprise/tenant/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const enterpriseTenantForAnEstate = async (id) => {
  try {
    const response = await api.get(`/estates/${id}/tenants/enterprise`);
    // console.log(response);
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.message === "No items found") {
      return {}
    }
    throw error;
  }
};

export const enterprisePinCreation = async (password, rePassword) => {
  try {
    const response = await api.post(`/wallet/pincode/create/enterprise`, {
      pincode: password,
      confirmPincode: rePassword,
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
}


export const enterpriseGetOtpPincode = async (password) => {
  try {
    const response = await api.post(`/wallet/pincode/otp/enterprise`, {
      password,
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};


export const enterpriseUpdatePincode = async (password, otp, pincode) => {
  try {
    const response = await api.post(`/wallet/pincode/update/enterprise`, {
      password,
      otp, 
      pincode
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};


