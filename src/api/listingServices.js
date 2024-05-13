import api from "@/utils/api";

export const listingMe = async () => {
  try {
    const response = await api.get("/listingProperty/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updatePersonalInfoLister = async (data) => {
  const formData = new FormData();
  formData.append("coverPhoto", data?.coverPhoto);
  formData.append("fullName", data?.fullName);
  formData.append("whatsappLink", data?.whatsappLink);
  formData.append("phoneNumber", data?.phoneNumber);
  formData.append("houseAddress", data?.houseAddress);
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await api.patch(
      "listingProperty/me/update/personal-information",
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