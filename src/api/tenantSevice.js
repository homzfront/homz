import api from "@/utils/api";

export const fetchSpecificTenant = async (id) => {
  try {
    const response = await api.get(`/tenants/${id}/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOneTenant = async (id) => {
  try {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchSpecificTenantOwner = async (id) => {
  try {
    const response = await api.get(`/tenants/${id}/property-owner`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tenantMe = async () => {
  try {
    const response = await api.get("/tenants/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tenantEnterprise = async () => {
  try {
    const response = await api.get("/tenants/enterprise");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelEnterprisePlanSub = async (emailToken, subscriptionCode) => {
  try {
    const response = await api.post("/enterprisePlan/disable/subscription", {
      emailToken,
      subscriptionCode
    });
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const tenantOwner = async () => {
  try {
    const response = await api.get("/tenants/property-owner");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updatePersonalInformation = async (updatedData) => {
  try {
    const response = await api.patch(
      `/tenants/personalInformation`,
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
    const response = await api.patch("/tenants/profileImage", formData, {
      headers,
    });

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
  // console.log(updatedData);
  try {
    const response = await api.patch(`/auth/change/password`, updatedData);
    // console.log(response);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    // console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const tenantRentInfo = async () => {
  try {
    const response = await api.get(`/rentInformation/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const sendInviteProperty = async (estateInvitation) => {
  // console.log(estateInvitation);
  try {
    const response = await api.patch(
      `/tenantLink/add-tenant-estate-link?estateInvitation=${estateInvitation}`,
      {
        estateInvitation
      }
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const getSpecificTenantRentInfo = async (id) => {
  try {
    const response = await api.get(`/rentInformation/${id}/enterprise`);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const getSpecificTenantRentInfoOwner = async (id) => {
  try {
    const response = await api.get(`/rentInformation/${id}/property-owner`);
    console.log(response)
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};



export const createSpecificTenantRentInfo = async (id, payload) => {
  try {
    const response = await api.post(`/rentInformation/${id}`, payload);
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const updateSpecificTenantRentInfo = async (id, payload) => {
  try {
    const response = await api.patch(`/rentInformation/${id}/enterprise`, payload);
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const updatePaymentStatusTenant = async ({ id, status, duration, periods }) => {
  try {
    const response = await api.patch(`/rentInformation/${id}/status`, {
      paymentStatus: status,
      duration,
      periods
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTenantWallet = async (BVNDetails) => {
  const { bvn, bvnDateOfBirth, pinCode } = BVNDetails;
  try {
    const response = await api.post(`/wallet/create/tenant`, {
      bvn,
      bvnDateOfBirth,
      pincode: pinCode
    });
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const tenantWallet = async () => {
  try {
    const response = await api.get(`/wallet/getWallet/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tenantGetOtpPincode = async (password) => {
  try {
    const response = await api.post(`/wallet/pincode/otp/tenant`, {
      password,
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};

export const tenantUpdatePincode = async (password, otp, pincode) => {
  try {
    const response = await api.post(`/wallet/pincode/update/tenant`, {
      password,
      otp,
      pincode
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};

export const payRent = async (pincode, duration) => {
  try {
    const response = await api.post(`/wallet/transfer/tenant/pay-rent/enterprise`, {
      pincode,
      duration
    });
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error };
  }
};


export const ReceiptTenant = async (id) => {
  try {
    const response = await api.get(`/wallet/transfer/tenant/pay-rent/receipt/${id}`);
    return { success: true, upDateddata: response };
  } catch (error) {
    return { success: false, error };
  }
}

export const getRentHis = async (paymentMethod = null) => {
  try {
    const query = paymentMethod ? `?paymentMethod=${paymentMethod}` : "";
    const response = await api.get(`/rentPayment/tenant${query}`);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};



export const tenantWalletBalance = async () => {
  try {
    const response = await api.get(`/wallet/balance/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tenantPinCreation = async (password, rePassword) => {
  try {
    const response = await api.post(`/wallet/pincode/create/tenant`, {
      pincode: password,
      confirmPincode: rePassword,
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
}

export const uploadTenantKYC = async (uploadedImage) => {
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
      "/internationalPassport/kyc/create/tenant",
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

export const uploadNINTenantKYC = async (uploadedImage, NIN) => {
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
      "/nin/kyc/create/tenant",
      formData,
      { headers }
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    const result = JSON.parse(error?.request?.response)

    if (result?.data?.ResponseInfo) {
      return { success: false, error: result?.data?.ResponseInfo?.Message }
    }
    if (error && error?.response?.data?.error?.message) {
      return { success: false, error: error?.response?.data?.error?.message }
    }
    else if (error && error?.response?.data?.error?.errors) {
      return { success: false, error: error?.response?.data?.error?.errors };
    } else if (error && error?.response?.data?.message) {
      return { success: false, error: error?.response.data.message };
    }
  }
};

export const fetchTenantKYCData = async () => {
  try {
    const response = await api.get(`/internationalPassport/kyc/information/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTenantKYCNINData = async () => {
  try {
    const response = await api.get(`/nin/kyc/information/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const enterpriseWalletTenantCreation = async (pincode, confirmPincode) => {
  try {
    const response = await api.post(`/wallet/pincode/create/tenant`, {
      pincode,
      confirmPincode
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
}

export const tenantUserWallet = async () => {
  try {
    const response = await api.get(`/wallet/information/getWallet/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tenantWalletActivities = async () => {
  try {
    const response = await api.get(`/wallet/activies/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const WalletTopUp = async (amount) => {
  try {
    const response = await api.post(`/wallet/top-up/tenant`, {
      amount
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
}

export const bankInfoTenant = async () => {
  try {
    const response = await api.get(`/bank/info/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBankTenant = async (details) => {
  try {
    const response = await api.post(`/bank/add/tenant`, details);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data };
  }
};

export const acceptTenantInvitation = async (tenantEmail, tenantFullName, invitation, password, rePassword) => {
  try {
    const response = await api.post(`/public-invitation/estate/accept-single-tenant-invitation?tenantEmail=${tenantEmail}&tenantFullName=${tenantFullName}&invitation=${invitation}`, {
      newPassword: password,
      confirmPassword: rePassword
    });
    return { success: true, upDateddata: response.data };
  } catch (error) {
    let errors
    if (error?.response?.data?.error?.errors) {
      errors = error?.response?.data?.error?.errors?.[0]
    } else if (error?.response?.data?.message) {
      errors = error?.response?.data?.message
    } else errors = error
    return { success: false, error: errors };
  }
};


export const tenantInformationKYC = async (tenantData) => {
  try {
    const response = await api.post(`/tenants/on-boarding-form`, tenantData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    if (error && error?.response?.data?.error?.message) {
      return { success: false, error: error?.response?.data?.error?.message }
    }
    else if (error && error?.response?.data?.error?.errors) {
      return { success: false, error: error?.response?.data?.error?.errors };
    } else if (error && error?.response?.data?.message) {
      return { success: false, error: error?.response.data.message };
    }
  }
};


export const tenantOnboardingConfirmation = async (payload) => {
  try {
    const response = await api.post(`/tenants/on-boarding-form/confirmation`, payload);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    if (error && error?.response?.data?.error?.message) {
      return { success: false, error: error?.response?.data?.error?.message }
    }
    else if (error && error?.response?.data?.error?.errors) {
      return { success: false, error: error?.response?.data?.error?.errors };
    } else if (error && error?.response?.data?.message) {
      return { success: false, error: error?.response.data.message };
    }
  }
};

export const tenantOnboardingAccept = async (tenantId) => {
  try {
    const response = await api.post(`/tenants/${tenantId}/enterprise/on-boarding-form/approve`);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    if (error && error?.response?.data?.error?.message) {
      return { success: false, error: error?.response?.data?.error?.message }
    }
    else if (error && error?.response?.data?.error?.errors) {
      return { success: false, error: error?.response?.data?.error?.errors };
    } else if (error && error?.response?.data?.message) {
      return { success: false, error: error?.response.data.message };
    }
  }
};

export const tenantOnboardingReject = async (tenantId, reason) => {
  try {
    const response = await api.post(`/tenants/${tenantId}/enterprise/on-boarding-form/rejection`, reason);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    if (error && error?.response?.data?.error?.message) {
      return { success: false, error: error?.response?.data?.error?.message }
    }
    else if (error && error?.response?.data?.error?.errors) {
      return { success: false, error: error?.response?.data?.error?.errors };
    } else if (error && error?.response?.data?.message) {
      return { success: false, error: error?.response.data.message };
    }
  }
};

