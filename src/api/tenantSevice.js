import api from "@/utils/api";

export const fetchSpecificTenant = async (id) => {
  console.log(id);
  try {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenant details:", error);
    throw error;
  }
};

export const tenantMe = async () => {
  try {
    const response = await api.get("/tenants/me");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenant details:", error);
    throw error;
  }
};

export const tenantEnterprise = async () => {
  try {
    const response = await api.get("/tenants/enterprise");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

export const updatePersonalInformation = async (updatedData) => {
  console.log(updatedData);
  try {
    const response = await api.patch(
      `/tenants/personalInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const updateProfilePicture = async (uploadedImage) => {
  console.log(uploadedImage);

  const formData = new FormData();
  formData.append("coverPhoto", uploadedImage);

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
    const response = await api.patch("/tenants/profileImage", formData, {
      headers,
    });

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

export const tenantRentInfo = async () => {
  try {
    const response = await api.get(`/rentInformation/tenant`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching rent Information:", error);
    throw error;
  }
};

export const sendInviteProperty = async (estate, invitation) => {
  console.log(estate);
  console.log(invitation);
  try {
    const response = await api.patch(
      `/tenantLink/add-tenant-estate-link?estate=${estate}&invitation=${invitation}`,
      {
        estate,
        invitation,
      }
    );
    console.log(response);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const getSpecificTenantRentInfo = async (id) => {
  console.log(id);
  try {
    const response = await api.get(`/rentInformation/${id}`);
    console.log(response);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const createSpecificTenantRentInfo = async (id, updatedData) => {
  const {
    propertyType,
    apartmentNumber,
    rent,
    duration,
    startDate,
    dueDate,
    paymentStatus,
    property,
  } = updatedData;
  try {
    const response = await api.post(`/rentInformation/${id}`, {
      propertyType,
      apartmentNumber,
      rent,
      duration,
      startDate,
      dueDate,
      paymentStatus,
      property,
    });
    console.log(response);
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const updateSpecificTenantRentInfo = async (id, updatedData) => {
  const {
    propertyType,
    apartmentNumber,
    rent,
    duration,
    startDate,
    dueDate,
    paymentStatus,
    property,
  } = updatedData;
  try {
    const response = await api.patch(`/rentInformation/${id}`, {
      propertyType,
      apartmentNumber,
      rent,
      duration,
      startDate,
      dueDate,
      paymentStatus,
      property,
    });
    console.log(response);
    return { success: true, upDateddata: response?.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response?.data }; // Adjusted this line
  }
};

export const updatePaymentStatusTenant = async ({ id, status }) => {
  console.log(id);
  console.log(status);
  try {
    const response = await api.patch(`/rentInformation/${id}/status`, {
      paymentStatus: status,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

export const createTenantWallet = async (BVNDetails) => {
  const { bvn, bvnDateOfBirth } = BVNDetails;
  try {
    const response = await api.post(`/wallet/create/tenant`, {
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

export const tenantWallet = async () => {
  try {
    const response = await api.get(`/wallet/getWallet/tenant`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error wallet:", error);
    throw error;
  }
};

export const payRent = async (amount) => {
  console.log(amount);
  try {
    const response = await api.post(`/rentPayment/tenant`, amount);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};



export const tenantWalletBalance = async () => {
  try {
    const response = await api.get(`/wallet/balance/tenant`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error wallet:", error);
    throw error;
  }
};


