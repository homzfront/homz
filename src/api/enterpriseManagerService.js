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
    const response = await api.get(`/wallet/information/getWallet/enterprise`);
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


export const enterpriseWalletActivities = async () => {
  try {
    const response = await api.get(`/wallet/activies/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ReceiptEnterpriseToOwner = async (id) => {
  try {
    const response = await api.get(`/wallet/transfer/enterprise/property-owner/receipt/${id}`);
    return { success: true, upDateddata: response };
  } catch (error) {
    return { success: false, error };
  }
}

export const sendMoneyEnterpriseToOwner = async (details) => {
  const {
    pincode,
    recipientName,
    amount,
    description,
    id
  } = details
  try {
    const response = await api.post(`/wallet/transfer/enterprise/property-owner/${id}`, {
      pincode,
      recipientName,
      amount,
      description
    });
    return { success: true, upDateddata: response };
  } catch (error) {
    return { success: false, error };
  }
};

export const enterpriseplanRoleInviteHomz = async ({ email, estateName, slug }) => {
  try {
    const response = await api.post(`/enterpriseplan/role/property-owner/invite-link/homz`, {
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

export const enterprisePlanRevokeAccess = async ({ landlordId, estateId }) => {
  try {
    const response = await api.delete(`/enterpriseplan/role/property-owner/revoke/${landlordId}/estate/${estateId}`);
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
    const response = await api.get(`/estates/me/enterprise/${id}/calculate-revenue`);
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


export const enterprisePlans = async () => {
  try {
    const response = await api.get(`/enterprise/plans`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exportEnterpriseRentPayment = async () => {
  try {
    const response = await api.get(`/rentPayment/enterprise/export`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exportEnterpriseTenantRentPayment = async (id) => {
  try {
    const response = await api.get(`/rentPayment/enterprise/tenant/${id}/export`);
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

export const fetchSpecificTenantRentSummary = async (id, startDate, dueDate, rent) => {
  try {
    const response = await api.get(`/rentPayment/enterprise/tenant/${id}/summary?startDate=${startDate}&dueDate=${dueDate}&rent=${rent}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOwnerTenantRentSummary = async (id, startDate, dueDate, rent) => {
  try {
    let url = `/rentPayment/property-owner/tenant/${id}/summary`;
    const params = [];

    if (startDate) {
      params.push(`startDate=${startDate}`);
    }
    if (dueDate) {
      params.push(`dueDate=${dueDate}`);
    }
    if (rent) {
      params.push(`rent=${rent}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    const response = await api.get(url);
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


export const uploadKYC = async (uploadedImage) => {
  const formData = new FormData();
  formData.append("image", uploadedImage);

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await api.post(
      "/internationalPassport/kyc/create/enterprise",
      formData,
      { headers }
    );

    if (response.data.statuscode === 201 || 200) {
      return { success: true, updatedPassport: response };
    } else {
      const error = response.data.message;
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const uploadNINKYC = async (uploadedImage, NIN) => {
  const formData = new FormData();
  formData.append("image", uploadedImage);
  formData.append("ninNumber", NIN)

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await api.post(
      "/nin/kyc/create/enterprise",
      formData,
      { headers }
    );

    if (response.data.statuscode === 201 || 200) {
      return { success: true, updatedPassport: response };
    } else {
      const error = response.data.message;
    }
  } catch (error) {
    return { success: false, error };
  }
};

export const fetchKYCData = async () => {
  try {
    const response = await api.get(`/internationalPassport/kyc/information/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchKYCNINData = async () => {
  try {
    const response = await api.get(`/nin/kyc/information/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategory = async () => {
  try {
    const response = await api.get(`/expense/enterprise/get-all-categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const enterpriseWalletCreation = async (pincode, confirmPincode) => {
  try {
    const response = await api.post(`/wallet/pincode/create/enterprise`, {
      pincode,
      confirmPincode
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
}


export const WalletTopUp = async (amount) => {
  try {
    const response = await api.post(`/wallet/top-up/enterprise`, {
      amount
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
}

export const bankInfoPropertyEnterprise = async () => {
  try {
    const response = await api.get(`/bank/info/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBankPropertyEnterprise = async (details) => {
  try {
    const response = await api.post(`/bank/add/enterprise`, details);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data };
  }
};


// Helper function to build query parameters
const buildQueryParams = (params) => {
  const query = new URLSearchParams();

  // Add parameters only if they are defined
  if (params.FormName) query.append('FormName', params.FormName);
  if (params.DocType) query.append('DocType', params.DocType);
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.search) query.append('search', params.search);

  return query.toString();
};

export const getAllDocu = async (params) => {
  try {
    const queryString = buildQueryParams(params);
    const response = await api.get(`/enterprise/document/all?${queryString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
