import api from "@/utils/api";

export const enterpriseMe = async () => {
  try {
    const response = await api.get("/enterprisePlan/me");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};

export const updatePersonalInformation = async (updatedData) => {
  console.log(updatedData);
  try {
    const response = await api.patch(
      `/enterprisePlan/personalInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const updateBussinessInformation = async (updatedData) => {
  console.log(updatedData);
  try {
    const response = await api.patch(
      `/enterprisePlan/bussinessInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const updateBusinessLogo = async (uploadedImage) => {
  console.log(uploadedImage);

  const formData = new FormData();
  formData.append("businessLogo", uploadedImage);

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  console.log(formDataObject);

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
      console.log(response.data.data);
      console.log("form successfully updated ", response?.data);
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;
      console.log("Unexpected status code:", error);
    }
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const updatePassword = async (updatedData) => {
  console.log(updatedData);
  try {
    const response = await api.patch(`/auth/change/password`, updatedData);
    console.log(response);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const createWalletEnterprise = async (BVNDetails) => {
  const { bvn, bvnDateOfBirth } = BVNDetails;
  try {
    const response = await api.post(`/wallet/create/enterprise`, {
      bvn,
      bvnDateOfBirth,
    });
    console.log(response);
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const enterpriseUserWallet = async () => {
  try {
    const response = await api.get(`/wallet/getWallet/enterprise`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error wallet:", error);
    throw error;
  }
};

export const enterpriseWalletBalance = async () => {
  try {
    const response = await api.get(`/wallet/balance/enterprise`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error wallet:", error);
    throw error;
  }
};

export const sendMoneyEnterpriseToOwner = async (details) => {
  console.log(details);
  try {
    const response = await api.post(`/wallet/debit/enterprise`, details);
    console.log(response);
    return { success: true, upDateddata: response?.data.responseBody };
  } catch (error) {
    console.error("error", error);
    return { success: false, error: error?.response?.error }; // Adjusted this line
  }
};

export const enterpriseplanRoleInvite = async ({ email, estateName }) => {
  console.log(email);
  console.log(estateName);
  try {
    const response = await api.post(`/enterpriseplan/role/invite-link/property-owner`, {
      email,
      estateName,
    });
    console.log(response);
    return { success: true, upDateddata: response };
  } catch (error) {
    console.error(" error", error);
    return { success: false, error: response?.error }; // Adjusted this line
  }
};

export const enterpriseStatistics = async () => {
  try {
    const response = await api.get(`/estates/me/enterprise/statistics`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
};

export const enterpriseRevenue = async () => {
  try {
    const response = await api.get(`/estates/me/enterprise/calculate-revenue`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
};



export const enterpriseRevenueForAnEstate = async (id) => {
  console.log(id);
  try {
    const response = await api.get(`/estates/${id}/calculate-revenue`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tenants:", error.response?.data?.error);
    if (error.response?.data?.error === "Estate does not have tenants") {
      return {}
    }
    throw error;
  }
};



export const enterpriseRentPayemntInfo = async () => {
  try {
    const response = await api.get(`/rentPayment/enterprise`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
};


export const enterpriseTenantForAnEstate = async (id) => {
  console.log(id);
  try {
    const response = await api.get(`/estates/${id}/tenants/enterprise`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tenants:", error.response?.data?.message);
    if (error.response?.data?.message === "No items found") {
      return {}
    }
    throw error;
  }
};
